Vue.component('tile',{
    //x and y will be the position
    //type will be the tile type on the board:
        //regular
        //door
        //warp
        //wall
    //isPossible will be if the player can move to this square    
    props:['type', 'x', 'y'],	
    template:
    `
    <span v-if="ispossible">
        <span 
            v-bind:class="'glow'"
            v-bind:style="{'left':x*25+'px', 'top':y*25+'px', 'width':25+'px', 'height':25+'px'}"
            v-on:click="prompt();">
        </span>
        <span 
            v-bind:class="'tile'" 
            v-bind:style="{'left':x*25+'px', 'top':y*25+'px'}">
        </span>
    </span>
    <span v-else>
        <span 
            v-bind:class="'tile'" 
            v-bind:style="{'left':x*25+'px', 'top':y*25+'px'}"
            v-on:click="prompt();">
        </span>
    </span>
    `,
    data: function () {
        return {
          ispossible: false
        }
    },
    methods:{
        prompt:function(){
            //Must change this when the game logic is implemented
            this.ispossible = !this.ispossible;
            //alert("You clicked on tile ("+ this.x + ", " + this.y + ")");
        }	
    }

});

Vue.component("empty", {
    props:['type', 'x', 'y'],	
    template:
    `
    <span>
        <span 
            v-bind:class="'empty'" 
            v-bind:style="{'left':x*25+'px', 'top':y*25+'px'}">
        </span>
    </span>
    `,
});

Vue.component("room", {
    props:['type', 'name', 'x', 'y', 'width', 'height', 'opacity', 'src'],	
    template:
    //The outer if is for the rare case where the tile is empty type but the coordinate is at top left (where the image is being shown)
    //this means it is a room component but act like a room and empty (no input, but render the image)
    `
    <span v-if="type == 'empty'">
        <span 
            v-bind:class="'room'" 
            v-bind:style="{'left':x*25+'px', 'top':y*25+'px', 'width':width+'px', 'height':height+'px', 'opacity':opacity, backgroundImage: 'url(' + src + ')' }">
        </span>
    </span>
    <span v-else>
        <span v-if="ispossible">
            <span 
                v-bind:class="'glow'"
                v-bind:style="{'left':x*25+'px', 'top':y*25+'px', 'width':25+'px', 'height':25+'px'}"
                v-on:click="prompt();">
            </span>
            <span 
                v-bind:class="'room'" 
                v-bind:style="{'left':x*25+'px', 'top':y*25+'px', 'width':width+'px', 'height':height+'px', 'opacity':opacity, backgroundImage: 'url(' + src + ')' }">
            </span>
        </span>
        <span v-else>
            <span 
                v-bind:class="'room'" 
                v-bind:style="{'left':x*25+'px', 'top':y*25+'px', 'width':width+'px', 'height':height+'px', 'opacity':opacity, backgroundImage: 'url(' + src + ')' }"
                v-on:click="prompt();">
            </span>
        </span> 
    </span>   
    `,
    data: function () {
        return {
          ispossible: false
        }
    },
    methods:{
        prompt:function(){
            //console.log(this.$parent.tiles);
            this.ispossible = !this.ispossible;
            //alert("You clicked on room ("+ this.x + ", " + this.y + ")");
        }
    }
});

Vue.component("door", {
    props:['type', 'name', 'x', 'y', 'width', 'height', 'opacity', 'src'],	
    template:
    `
    <span v-if="ispossible">
        <span 
            v-bind:class="'glow'"
            v-bind:style="{'left':x*25+'px', 'top':y*25+'px', 'width':25+'px', 'height':25+'px'}"
            v-on:click="prompt();">
        </span>
        <span 
            v-bind:class="'door'"
            v-bind:style="{'left':x*25+'px', 'top':y*25+'px', 'width':width+'px', 'height':height+'px', 'opacity':opacity, backgroundImage: 'url(' + src + ')' }">
        </span>
    </span>
    <span v-else>
        <span 
            v-bind:class="'door'"
            v-bind:style="{'left':x*25+'px', 'top':y*25+'px', 'width':width+'px', 'height':height+'px', 'opacity':opacity, backgroundImage: 'url(' + src + ')' }"
            v-on:click="prompt();">
        </span>
    </span> 
    `,
    methods:{
        prompt:function() {
            //console.log(this.$parent.tiles);
            this.ispossible = !this.ispossible;
            if (this.ispossible){
                this.makeRoomPossible();
            }
        },
        //Function will make this door have the whole room be a possible option for the player to select
        makeRoomPossible:function() {
            for (var i = 0; i < GRID_X * GRID_Y; i++) {
                //Check if the name is the same as this door name 
                    //Ex. study
                if ((this.$parent.$children[i].type === "room" || this.$parent.$children[i].type === "door") &&
                    this.$parent.$children[i].name === this.name) {
                    this.$parent.$children[i].ispossible = true;
                }
            }
            //console.log(this.$parent.$children[this.x * 24 + this.y] === this);
        }
    },
    data: function () {
        return {
          ispossible: false
        }
    }
});

//24 x 24 board
const GRID_X = 24;
const GRID_Y = 25;
var app = new Vue({
    el: '#app',
    data:{
        tiles: null
    },
    methods: {
        createRoom: function(name, x, y, width, height, imageSrc) {
            //this.tiles[0][0] = {id:id, type: "room", x:x, y:y, src:imageSrc};
            for(var v = 0; v < width; v++) {
                for(var w = 0; w < height; w++) {
                    //this.tiles[x + v][y + w] = {id:id, type: "room", x:x + w, y:y + w, src:imageSrc};
                    this.tiles[x + v][y + w].type = "room";
                    this.tiles[x + v][y + w].name = name;
                    this.tiles[x + v][y + w].width = 25;
                    this.tiles[x + v][y + w].height = 25;
                    //This is to make it transparent
                    this.tiles[x + v][y + w].opacity = 0;
                    this.tiles[x + v][y + w].src = imageSrc;
                }
            }
            //This is for the top left of the room where it will show the whold image of the room
            this.tiles[x][y].width = width * 25;
            this.tiles[x][y].height = height * 25;
            this.tiles[x][y].opacity = 1;
        }
    },
    created: function() {
        //tile [x][y]
        this.tiles = [];
        var i = 0;
        for (var x = 0; x < GRID_X; x++) {
            var row = [];
            for (var y = 0; y < GRID_Y; y++) {
                row.push({id:i,type: "regular", x:x, y:y, ispossible:false});
                i++;
            }   
            this.tiles.push(row);
        }

        //Set up the study room
        this.createRoom("study", 0, 0, 7, 4, "images/study.png");
        this.tiles[6][3].type = "door";
        this.tiles[6][0].type = "empty";

        //Set up the library room
        this.createRoom("library", 0, 6, 7, 5, "images/library.png");
        this.tiles[3][10].type = "door";
        this.tiles[6][8].type = "door";
        this.tiles[6][6].type = "regular";
        this.tiles[6][10].type = "regular";
        this.tiles[0][6].type = "empty";
        this.tiles[0][10].type = "empty";

        //Set up the billiard room
        this.createRoom("billiard", 0, 12, 6, 5, "images/billiard.png");
        this.tiles[1][12].type = "door";
        this.tiles[5][15].type = "door";

        //Set up the conservatory
        this.createRoom("conservatory", 0, 19, 6, 5, "images/conservatory.png");
        this.tiles[4][19].type = "door";
        this.tiles[5][19].type = "regular";
        this.tiles[0][19].type = "empty";

        //Set up the ball room
        this.createRoom("ball", 8, 17, 8, 8, "images/ball.png");
        this.tiles[9][17].type = "door";
        this.tiles[14][17].type = "door";
        this.tiles[8][19].type = "door";
        this.tiles[15][19].type = "door";
        this.tiles[8][23].type = "regular";
        this.tiles[9][23].type = "regular";
        this.tiles[14][23].type = "regular";
        this.tiles[15][23].type = "regular";
        this.tiles[8][24].type = "empty";
        this.tiles[15][24].type = "empty";

        //Set up the kitchen
        this.createRoom("kitchen", 18, 18, 6, 6, "images/kitchen.png");
        this.tiles[19][18].type = "door";

        //Set up the dining room
        this.createRoom("dining", 16, 9, 8, 7, "images/dining.png");
        this.tiles[17][9].type = "door";
        this.tiles[16][12].type = "door";
        this.tiles[16][15].type = "regular";
        this.tiles[17][15].type = "regular";
        this.tiles[18][15].type = "regular";

        //Set up the lounge
        this.createRoom("lounge", 17, 0, 7, 6, "images/lounge.png");
        this.tiles[17][5].type = "door";
        this.tiles[17][0].type = "empty";

        //Set up the hall
        this.createRoom("hall", 9, 0, 6, 7, "images/hall.png");
        this.tiles[9][4].type = "door";
        this.tiles[11][6].type = "door";
        this.tiles[12][6].type = "door";
        this.tiles[9][4].type = "door";
        this.tiles[9][0].type = "empty";
        this.tiles[14][0].type = "empty";


    }    
});