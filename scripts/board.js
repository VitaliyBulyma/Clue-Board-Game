Vue.component('tile',{
    //x and y will be the position
    //type will be the tile type on the board:
        //regular
        //door
        //warp
        //wall
    props:['type','x','y'],	
    template:
    `<span 
        v-bind:class="'tile'" 
        v-bind:style="{'left':x*25+'px', 'top':y*25+'px'}"
        v-on:click="prompt();">
    </span>`,
    methods:{
        prompt:function(){
            alert("You clicked on tile ("+ this.x + ", " + this.y + ")");
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
    created: function() {
        //tile [x][y]
        this.tiles = [];
        var i = 0;
        for (var x = 0; x < GRID_X; x++) {
            var row = [];
            for (var y = 0; y < GRID_Y; y++) {
                row.push({id:i,type: "regular", x:x, y:y});
                i++;
            }   
            this.tiles.push(row);
        }
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