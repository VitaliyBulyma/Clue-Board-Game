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

Vue.component("room", {
    props:['type', 'name','x','y', 'width', 'height', 'opacity', 'src'],	
    template:
    `
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
    `,
    data: function () {
        return {
          ispossible: false
        }
    },
    methods:{
        prompt:function(){
            console.log(this.$parent.tiles);
            this.ispossible = !this.ispossible;
            //alert("You clicked on room ("+ this.x + ", " + this.y + ")");
        }	
    }
});

Vue.component("door", {
    props:['type', 'name','x','y', 'width', 'height', 'opacity', 'src'],	
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
        prompt:function(){
            console.log(this.$parent.tiles);
            this.ispossible = !this.ispossible;
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
const GRID_Y = 24;
var app = new Vue({
    el: '#app',
    data:{
        tiles: null
    },
    methods: {
        createRoom: function(id, name, x, y, width, height, imageSrc, doorX, doorY) {
            //this.tiles[0][0] = {id:id, type: "room", x:x, y:y, src:imageSrc};
            for(var v = 0; v < width; v++) {
                for(var w = 0; w < height; w++) {
                    //this.tiles[x + v][y + w] = {id:id, type: "room", x:x + w, y:y + w, src:imageSrc};
                    this.tiles[x + v][y + w].type = "room";
                    this.tiles[x + v][y + w].name = "study";
                    this.tiles[x + v][y + w].width = 25;
                    this.tiles[x + v][y + w].height = 25;
                    this.tiles[x + v][y + w].opacity = 0;
                    //this.tiles[x + v][y + w].ispossible = false;
                    this.tiles[x + v][y + w].src = imageSrc;
                }
            }
            this.tiles[x][y].width = width * 25;
            this.tiles[x][y].height = height * 25;
            this.tiles[x][y].opacity = 1;

            this.tiles[doorX][doorY].type = "door";
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
        this.createRoom(0, "study", 0, 0, 7, 4, "images/study.png", 6, 3);

        /*
        this.tiles = [
            [
                {id:1,type: "regular", x:1, y:1},
                {id:2,type: "regular", x:2, y:1}
            ],
            [
                {id:3,type: "regular", x:1, y:2},
                {id:4,type: "regular", x:2, y:2}
            ]
        ];
        */
    }    
});