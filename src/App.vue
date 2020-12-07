<template >
  <div>



    <div id="menu">
      <div id="menuContainer">
        
        <button class="menuButton" @click="undo" ><img src="./assets/icons/undoWhite.png"></button>
        <button class="menuButton" @click="redo"><img src="./assets/icons/redoWhite.png"></button>
      </div>
    </div>

    <div class="clear"></div>
    <div id="tools">

      
      <button class="tool" @click="handlePointer" ref="pointerRef"><img src="./assets/icons/pointerWhite.png"></button>
      <button class="tool" @click="handleLine"  ref="pointerLine"><img src="./assets/icons/lineWhite.png"></button>
      <button class="tool" @click="handleTraingle"  ref="pointerTriangle"><img src="./assets/icons/triangleWhite.png"></button>
      <button class="tool" @click="handleRect"  ref="pointerRect"><img src="./assets/icons/rectWhite.png"></button>
      <button class="tool" @click="handleSquare"  ref="pointerSquare"><img src="./assets/icons/squareWhite.png"></button>
      <button class="tool" @click="handleCircle"  ref="pointerCircle"><img src="./assets/icons/circleWhite.png"></button>
      <button class="tool" @click="handleZoom"  ref="pointerZoom"><img src="./assets/icons/zoomWhite.png"></button>
      <button class="tool" @click="handleMove"  ref="pointerMove"><img src="./assets/icons/moveWhite.png"></button>
     
    </div>
    <div id="canvas">
      <div id="stageId">
        <v-stage v-bind:style="cursorStyle"
          ref="stage"
          :config="stageSize"
          @mouseup.native="updateCoordinatesUp"
          @mousedown.native="updateCoordinatesDown"
          @mousemove.native="updateCoordinates"
        >
          <div v-for="indexR in layers" :key="indexR.id">
            <v-layer v-if="ifList[indexR]">
               <v-line
                v-for="item in lineList[indexR]"
                :config="item"
                :key="item.id"
                @mousemove.native="updateCoordinates"
              />

              <v-rect
                :config="{
                  x: 0,
                  y: 0,
                  width: 100,
                  height: 100,
                  fill: 'red',
                  
                  
                }"
              />

              <v-rect
                v-for="item in rectList[indexR]"
                :config="item"
                :key="item.id"
                @mousemove.native="updateCoordinates"
              />

              <v-regular-polygon
                v-for="item in polygonList[indexR]"
                :config="item"
                :key="item.id"
                @mousemove.native="updateCoordinates"
              />
            </v-layer>
            <!--
            <div class="layerSettings">
              <span> Layer: {{layers[indexR]}}</span> 
              <button v-on:click="ButtonPress(indexR)" ref="layerBtn">Layer: {{layers[indexR]}}</button>
              <input type="checkbox" ref="checkbox" v-on:click="handleCheckbox(indexR)" checked>
            </div>
            --->
          </div>
        </v-stage>
      </div>
    </div>

    <div id="settings">
      
        

        <div id="rectSettings">
         <h2 >Settings</h2>
         <hr>
         <div class="settingsContainer">
           <div class="innerSettings">
            <h3>Line Settings</h3>
            <label>Size:</label>
            <input type="range" min="1" max="20" step="1" v-model="strokeWidth">
            <input type="number" v-model="strokeWidth">
            <br>
          
            <label>Stroke Color:</label>
            <input type="color" v-model="stroke">
            <br>
            
           
            <label>Dash:</label>
            <input type="checkbox" v-model="dashEnabled">
            <div v-if="dashEnabled" id="dashSettings">
            <input type="number" v-model="dash1" class="dashInput">
            <input type="number" v-model="dash2" class="dashInput">
            <input type="number" v-model="dash3" class="dashInput">
            <input type="number" v-model="dash4" class="dashInput">
            <input type="number" v-model="dash5" class="dashInput">
            <input type="number" v-model="dash6" class="dashInput">
            </div>
          </div>
          </div>

          <hr> 
              
          
        <div class="settingsContainer">
        <div class="innerSettings">
         
         
         <label>Fill:</label>
         <input type="checkbox" v-model="fillEnabled">
         <div v-if="fillEnabled" id="dashSettings">
           <label>Fill Color:</label>
          <input type="color" v-model="fill">
          </div>
          
        </div>
        </div>
        <hr>

        <div class="settingsContainer">
        <div class="innerSettings">
         
         <label>Shadow:</label>
         <input type="checkbox" v-model="shadowEnabled">
         <br>
         <div v-if="shadowEnabled" id="dashSettings">
         <label>Shadow Color:</label>
         <input type="color" v-model="shadowColor">
         <br>
         <label>Shadow Blur:</label>
         <input type="number" v-model="shadowBlur">
         <br>
         <label>Shadow Offset:</label>
         <input type="number" v-model="shadowOffsetX">
         <input type="number" v-model="shadowOffsetY">
         <br>
         <label>Shadow Opacity:</label>
         <input type="number" v-model="shadowOpacity">
        </div></div></div>
         <hr>
         <div class="settingsContainer">
          <div class="innerSettings">
         <label>Opacity:</label>
         <input type="range" min="0" max="1" step="0.01" v-model="opacity">{{opacity}}
          </div></div>
         
         


        </div>

        <hr>
        <div id="layers">
            <div class="settingsContainer">
           <div class="innerSettings"> 
           <button @click="addLayer" ref="button" id="addLayerButton">Add Layer</button><br>
           

           <div v-for="(item, indexR) in layers" v-bind:key="item.id" class="layerSettings">
              
             
              <button v-on:click="ButtonPress(indexR)" ref="layerBtn" class="layerButton">Layer: {{layers[indexR]}}</button>
              <input type="checkbox" ref="checkbox" v-on:click="handleCheckbox(indexR)" checked>
              
            
           </div>
           </div></div>
        </div>

     
    </div>

    <div class="clear"></div>
    


  </div>
</template>



<script>
/* eslint-disable */
const width = window.innerWidth;
const height = window.innerHeight;
var counter = 0;



export default {
  data() {
    return {
      debug: false,

      stroke: "#000000",
      strokeWidth: 4,
      lineCap:"round",

      dashEnabled:false,
      dash:[0,0,0,0,0,0],
      dash1:10,
      dash2:10,
      dash3:0,
      dash4:0,
      dash5:0,
      dash6:0,
      

      fillEnabled:false,
      fill:"red",

      shadowEnabled:false,
      shadowColor:'black',
      shadowBlur: 10,
      shadowOffsetX:10,
      shadowOffsetY:10,
      shadowOpacity: 1,

      opacity:1,



      fillColor: "#00000000",


      layerConfig:{
        visible:true,
      },

      layers: [],
      ifList: [],
      lists: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      index: 0,

      lineList: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      rectList: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      polygonList: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],

      listSelector: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      redoListSelector: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],

      listData: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      redoListData: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],

      stageSize: {
        width: 900,
        height: 740,
        scaleX: 1,
        scaleY: 1,
        x:430,
        y:330,
        
      },
      x: 0,
      y: 0,
      xd: 1,
      yd: 1,
      xd2:1,
      yd2:1,
      xu: 1,
      yu: 1,
      radius: 0,
      rotation: 0,
      sides: 4,

      magnify: 0.5,

      LMB:false,
      RMB:false,
      

      isMouseDown: false,
      triangle: false,
      square: false,
      circle: false,

      rect: false,
      line: false,
      polygon: false,
      zoom: false,
      move:false,
      pointer:false,

      width: 1,
      height: 1,

      activeBtn:'',
    };
  },
  methods: {
    handleKeyUp(event){
        console.log("yay");
    },
    ButtonPress(indexR) {
      this.index = indexR;
      console.log(this.index);
    },
    handleCheckbox(indexR) {
      var a = this.$refs.checkbox[indexR].checked;
      //console.log("citajOVO: " +a);

     // var b =this.$refs.werd[indexR].;
     // console.log("OVO JE LAYER:" + b)

      

      if (a) {
        this.ifList[indexR] = true;
        //this.$refs.werd[indexR].config.visible = true;
        //console.log(this.ifList);
      } else {
        this.ifList[indexR] = false;
        //this.$refs.werd[indexR].config.visible = false;
        //console.log(this.ifList);
      }
      this.ifList.push("a");
      this.ifList.pop();
    },
    addLayer(event) {
      if(counter <= 13){
      this.layers.push(this.layers.length);
      this.ifList.push("true");
      console.log(this.ifList);
      counter = counter + 1;
      }
      
    },
     
    handleShowColor(event) {
      var a = this.$refs.showFillCheckbox.checked;
      console.log(a);

      if (!a) {
        console.log(a);
        this.fillColor = "#00000000";
      }
    },
    updateCoordinatesDown(event) {
      this.isMouseDown = true;
      this.xd =(event.offsetX - this.stageSize.x) / this.stageSize.scaleY;
      this.yd =(event.offsetY - this.stageSize.y) / this.stageSize.scaleY;
      this.xd2 = event.offsetX;
      this.yd2 = event.offsetY;

      if (this.line) {
        const pos = {
          points: [this.xd, this.yd, this.xd, this.yd],
          stroke: this.stroke,
          strokeWidth: this.strokeWidth,
          lineCap:this.lineCap,

          dashEnabled:this.dashEnabled,
          dash:[this.dash1,this.dash2,this.dash3,this.dash4,this.dash5,this.dash6],

          fillEnabled: this.fillEnabled,
          fill: this.fill,

          shadowEnabled:this.shadowEnabled,
          shadowColor:this.shadowColor,
          shadowBlur: this.shadowBlur,
          shadowOffsetX:this.shadowOffsetX,
          shadowOffsetY:this.shadowOffsetY,
          shadowOpacity: this.shadowOpacity,
          
          opacity:this.opacity,
          
          
         
        };

        this.listSelector[this.index].push("line");
        this.lineList[this.index].push(pos);
        this.listData[this.index].push(pos);
        console.log(this.lineList[this.index]);
      }

      if (this.rect) {
        const pos = {
          x: this.xd,
          y: this.yd,
          width: 100,
          height: 100,

          

          stroke: this.stroke,
          strokeWidth: this.strokeWidth,
          lineCap:'',  // butt, round, or square. 
          lineJoin:'', //miter, round, or bevel.

          dashEnabled:this.dashEnabled,
          dash:[this.dash1,this.dash2,this.dash3,this.dash4,this.dash5,this.dash6],

          fillEnabled: this.fillEnabled,
          fill: this.fill,

          shadowEnabled:this.shadowEnabled,
          shadowColor:this.shadowColor,
          shadowBlur: this.shadowBlur,
          shadowOffsetX:this.shadowOffsetX,
          shadowOffsetY:this.shadowOffsetY,
          shadowOpacity: this.shadowOpacity,
          
          opacity:this.opacity,

         
        };
        this.listSelector[this.index].push("rect");
        this.rectList[this.index].push(pos);
        this.listData[this.index].push(pos);
        console.log(this.rectList[this.index]);
      }
      if (this.polygon) {
        const pos = {
          x: this.xd,
          y: this.yd,
          radius: 0,
          sides: this.sides,
          rotation: this.rotation,
         
          stroke: this.stroke,
          strokeWidth: this.strokeWidth,
          lineCap:this.lineCap,

          dashEnabled:this.dashEnabled,
          dash:[this.dash1,this.dash2,this.dash3,this.dash4,this.dash5,this.dash6],

          fillEnabled: this.fillEnabled,
          fill: this.fill,

          shadowEnabled:this.shadowEnabled,
          shadowColor:this.shadowColor,
          shadowBlur: this.shadowBlur,
          shadowOffsetX:this.shadowOffsetX,
          shadowOffsetY:this.shadowOffsetY,
          shadowOpacity: this.shadowOpacity,
          
          opacity:this.opacity,
        };
        this.listSelector[this.index].push("polygon");
        this.polygonList[this.index].push(pos);
        this.listData[this.index].push(pos);
        console.log(this.polygonList[this.index]);
      }
    },
    updateCoordinatesUp(event) {
      this.isMouseDown = false;
      this.xu = (event.offsetX - this.stageSize.x) / this.stageSize.scaleY;
      this.yu = (event.offsetY - this.stageSize.y) / this.stageSize.scaleY;

      if (this.rect) {
        this.rectList[this.index][
          this.rectList[this.index].length - 1
        ].x = this.xd;
        this.rectList[this.index][
          this.rectList[this.index].length - 1
        ].y = this.yd;
      }
      if (this.line) {
        this.lineList[this.index][
          this.lineList[this.index].length - 1
        ].points = [this.xd, this.yd, this.xu, this.yu];

        console.log(
          "up: " +
            this.lineList[this.index][this.lineList[this.index].length - 1]
              .points
        );
      }
    },
    updateCoordinates(event) {
      this.x2 = event.offsetX;
      this.y2 = event.offsetY;
      if (this.isMouseDown) {
        this.x = (event.offsetX - this.stageSize.x) / this.stageSize.scaleY;
        this.y = (event.offsetY - this.stageSize.y) / this.stageSize.scaleY ;
        

       
        if (this.rect) {
          this.rectList[this.index][
            this.rectList[this.index].length - 1
          ].width = this.x - this.xd;
          this.rectList[this.index][
            this.rectList[this.index].length - 1
          ].height = this.y - this.yd;
        }

        if (this.line) {
          this.lineList[this.index][
            this.lineList[this.index].length - 1
          ].points = [this.xd, this.yd, this.x, this.y];
        }
        if (this.polygon) {
          //this.polygonList[this.polygonList.length - 1].radius = Math.sqrt(Math.pow(this.xd - this.x, 2) + Math.pow(this.yd - this.y, 2));
          this.polygonList[this.index][
            this.polygonList[this.index].length - 1
          ].radius = Math.sqrt(
            Math.pow(this.xd - this.x, 2) + Math.pow(this.yd - this.y, 2)
          );
        }
        if (this.zoom) {
          
        if(this.stageSize.scaleX > 1){
          console.log("--");
        }else{
          console.log("++");
        }

        
          
           this.stageSize.scaleX  = event.offsetY / 500;
           this.stageSize.scaleY = event.offsetY / 500;

           var newY=event.offsetY;

           
           
          // console.log("oldY:" + this.yd);
           //console.log("newY:" +  newY);

        
          
          
          
         
        }
        /*
        if(this.LMB && this.zoom){
          var stageScale = this.stageSize.scaleX;
          var x = this.xd;
          var y = this.yd;
         
          var curX = (event.offsetX)-x*stageScale;
          var curY = (event.offsetY)-y*stageScale;
  
          this.stageSize.x = curX;
          this.stageSize.y = curY;

        }
*/
        if(this.move){
          /*
          var x = this.xd
          var y = this.yd
        
          this.stageSize.x=Math.round(event.offsetX-x);
          this.stageSize.y=Math.round(event.offsetY-y);
          */
          var stageScale = this.stageSize.scaleX;
          var x = this.xd;
          var y = this.yd;
         
          var curX = (event.offsetX)-x*stageScale;
          var curY = (event.offsetY)-y*stageScale;
          
  
          this.stageSize.x = curX;
          this.stageSize.y = curY;
         
          
          
          console.log("x= "+x+ ", y= "+y + ", stageSize.x= " + this.stageSize.x+ ", stageSize.y= " +this.stageSize.y + ", stageScale= " + stageScale);
        }
      }
    },
    clearLines(event) {
      this.lineList = [];
      this.rectList = [];
    },
    undo(event) {
      const lastName = this.listSelector[this.index][
        this.listSelector[this.index].length - 1
      ];
      //const lastName = this.listSelector[this.listSelector.length - 1];
      console.log("long: " + lastName);
      console.log(
        "short: " + this.listSelector[this.listSelector[this.index].length - 1]
      );
      console.log(this.redoListSelector[this.index]);

      const lastData = this.listData[this.index][
        this.listData[this.index].length - 1
      ];
      //const lastData = this.listData[this.listData.length - 1];

      if (lastName == "line") {
        this.redoListData[this.index].push(
          this.lineList[this.index][this.lineList[this.index].length - 1]
        );
        this.lineList[this.index].pop();
      }

      if (lastName == "rect") {
        this.redoListData[this.index].push(
          this.rectList[this.index][this.rectList[this.index].length - 1]
        );
        this.rectList[this.index].pop();
      }

      if (lastName == "polygon") {
        this.redoListData[this.index].push(
          this.polygonList[this.index][this.polygonList[this.index].length - 1]
        );
        this.polygonList[this.index].pop();
      }

      if (lastName == "line" || lastName == "rect" || lastName == "polygon") {
        this.listData[this.index].pop();
        this.redoListSelector[this.index].push(lastName);
        this.listSelector[this.index].pop();
      }
    },
    redo(event) {
      const lastName = this.redoListSelector[this.index][
        this.redoListSelector[this.index].length - 1
      ];
      console.log(lastName);
      console.log(this.redoListSelector[this.index]);

      const lastData = this.redoListData[this.index][
        this.redoListData[this.index].length - 1
      ];

      if (lastName == "line") {
        this.lineList[this.index].push(
          this.redoListData[this.index][
            this.redoListData[this.index].length - 1
          ]
        );
      }
      if (lastName == "rect") {
        this.rectList[this.index].push(
          this.redoListData[this.index][
            this.redoListData[this.index].length - 1
          ]
        );
      }
      if (lastName == "polygon") {
        this.polygonList[this.index].push(
          this.redoListData[this.index][
            this.redoListData[this.index].length - 1
          ]
        );
      }

      if (lastName == "line" || lastName == "rect" || lastName == "polygon") {
        this.listData[this.index].push(
          this.redoListData[this.index][
            this.redoListData[this.index].length - 1
          ]
        );
        this.redoListData[this.index].pop();
        this.listSelector[this.index].push(
          this.redoListSelector[this.index][
            this.redoListSelector[this.index].length - 1
          ]
        );
        this.redoListSelector[this.index].pop();
      }
    },

    optC(event) {
      this.rect = false;
      this.line = false;
      this.polygon = true;
      console.log(
        "rect: " +
          this.rect +
          ", line: " +
          this.line +
          ", polygon: " +
          this.polygon
      );
    },
    optD(event) {
      console.log("list selector: " + this.listSelector[this.index]);
      console.log("list trying: " + this.listData[this.index]);
      console.log("list redoListData: " + this.redoListData[this.index]);
      console.log(
        "list redoListDataSelect: " + this.redoListSelector[this.index]
      );
    },
     handlePointer(event) {
      this.$refs.pointerRef.style.border = "5px solid gray"
      this.$refs.pointerLine.style.border = "none"
      this.$refs.pointerTriangle.style.border = "none"
      this.$refs.pointerRect.style.border = "none"
      this.$refs.pointerSquare.style.border = "none"
      this.$refs.pointerCircle.style.border = "none"
      this.$refs.pointerZoom.style.border = "none"
      this.$refs.pointerMove.style.border = "none"

      this.pointer = true;
      this.rect = false;
      this.line = false;
      this.polygon = false;
      this.zoom = false;
      this.move= false;
     },
    handleLine(event) {
      this.$refs.pointerRef.style.border = "none"
      this.$refs.pointerLine.style.border = "5px solid gray"
      this.$refs.pointerTriangle.style.border = "none"
      this.$refs.pointerRect.style.border = "none"
      this.$refs.pointerSquare.style.border = "none"
      this.$refs.pointerCircle.style.border = "none"
      this.$refs.pointerZoom.style.border = "none"
      this.$refs.pointerMove.style.border = "none"

      this.pointer = false;
      this.rect = false;
      this.line = true;
      this.polygon = false;
      this.zoom = false;
      this.move= false;
       
     },
    handleRect(event) {
       this.$refs.pointerRef.style.border = "none"
      this.$refs.pointerLine.style.border = "none"
      this.$refs.pointerTriangle.style.border = "none"
      this.$refs.pointerRect.style.border = "5px solid gray"
      this.$refs.pointerSquare.style.border = "none"
      this.$refs.pointerCircle.style.border = "none"
      this.$refs.pointerZoom.style.border = "none"
      this.$refs.pointerMove.style.border = "none"

      this.pointer = false;
      this.rect = true;
      this.line = false;
      this.polygon = false;
      this.zoom = false;
      this.move= false;
     },
    handleTraingle(event) {
      this.$refs.pointerRef.style.border = "none"
      this.$refs.pointerLine.style.border = "none"
      this.$refs.pointerTriangle.style.border = "5px solid gray"
      this.$refs.pointerRect.style.border = "none"
      this.$refs.pointerSquare.style.border = "none"
      this.$refs.pointerCircle.style.border = "none"
      this.$refs.pointerZoom.style.border = "none"
      this.$refs.pointerMove.style.border = "none"

      this.pointer = false;
      this.rect = false;
      this.line = false;
      this.polygon = true;
      this.zoom = false;
      this.move= false;
      this.sides = 3;
      this.rotation = 0;
    },
    handleSquare(event) {
      this.$refs.pointerRef.style.border = "none"
      this.$refs.pointerLine.style.border = "none"
      this.$refs.pointerTriangle.style.border = "none"
      this.$refs.pointerRect.style.border = "none"
      this.$refs.pointerSquare.style.border = "5px solid gray"
      this.$refs.pointerCircle.style.border = "none"
      this.$refs.pointerZoom.style.border = "none"
      this.$refs.pointerMove.style.border = "none"

      this.pointer = false;
      this.rect = false;
      this.line = false;
      this.polygon = true;
      this.zoom = false;
      this.move= false;
      this.sides = 4;
      this.rotation = 45;
    },
    handleCircle(event) {
      this.$refs.pointerRef.style.border = "none"
      this.$refs.pointerLine.style.border = "none"
      this.$refs.pointerTriangle.style.border = "none"
      this.$refs.pointerRect.style.border = "none"
      this.$refs.pointerSquare.style.border = "none"
      this.$refs.pointerCircle.style.border = "5px solid gray"
      this.$refs.pointerZoom.style.border = "none"
      this.$refs.pointerMove.style.border = "none"

      this.pointer = false;
      this.rect = false;
      this.line = false;
      this.polygon = true;
      this.zoom = false;
      this.move= false;
      this.sides = 64;
      this.rotation = 45;
    },
    handleZoom(event) {
      this.$refs.pointerRef.style.border = "none"
      this.$refs.pointerLine.style.border = "none"
      this.$refs.pointerTriangle.style.border = "none"
      this.$refs.pointerRect.style.border = "none"
      this.$refs.pointerSquare.style.border = "none"
      this.$refs.pointerCircle.style.border = "none"
      this.$refs.pointerZoom.style.border = "5px solid gray"
      this.$refs.pointerMove.style.border = "none"

      this.pointer = false;
      this.rect = false;
      this.line = false;
      this.polygon = false;
      this.zoom = true;
      this.move= false;
    },
    handleMove(event){
      this.$refs.pointerRef.style.border = "none"
      this.$refs.pointerLine.style.border = "none"
      this.$refs.pointerTriangle.style.border = "none"
      this.$refs.pointerRect.style.border = "none"
      this.$refs.pointerSquare.style.border = "none"
      this.$refs.pointerCircle.style.border = "none"
      this.$refs.pointerZoom.style.border = "none"
      this.$refs.pointerMove.style.border = "5px solid gray"

      this.pointer = false;
      this.rect = false;
      this.line = false;
      this.polygon = false;
      this.zoom = false;
      this.move= true;
    },
     keyupHandler (event) {
      if (event.ctrlKey && event.code === 'KeyY') {
      console.log("undo")
      this.undo(event);
    }
    if (event.ctrlKey && event.code === 'KeyZ') {
      console.log("redo")
      this.redo(event);
    }
    if (event.code === "KeyL") {
      
      this.handleLine(event);
    }
    if (this.LMB && event.code === "Space") {
      console.log("WORKING")
    }
    if (event.code === "KeyQ") {
      this.stageSize.scaleX = this.stageSize.scaleX + 0.1
      this.stageSize.scaleY = this.stageSize.scaleY + 0.1
     
      
     
      
     

        
  
       
         
    }
    if (event.code === "KeyE") {
      this.stageSize.scaleX = this.stageSize.scaleX - 0.1
      this.stageSize.scaleY = this.stageSize.scaleY - 0.1
    }
    
  },
  mousedownHandler(e){
    console.log("yay")
    switch (e.button) {
        case 0:
         
          this.LMB = true;
           console.log(this.LMB);
          break;
        case 1:
          // middle mouse button
          break;
        default:
          // 2 === right mouse button
    }
  },
  mouseupHandler(){
    this.LMB = false;
    this.RMB = false;
  },
  handleScroll(event) {
      console.log("a");
    },
  },
    mounted () {
    document.addEventListener('keyup', this.keyupHandler);
    document.addEventListener('mousedown', this.mousedownHandler);
    document.addEventListener('mouseup', this.mouseupHandler);
    window.addEventListener('scroll', this.handleScroll);

         
    },
    created () {
      
    
    },
    destroyed () {
    document.removeEventListener('keyup', this.keyupHandler);
    document.removeEventListener('mousedown', this.mousedownHandler);
    document.removeEventListener('mouseup', this.mouseupHandler);
    window.removeEventListener('scroll', this.handleScroll);
     
},
beforeMount(){
    this.addLayer()
 },
 computed:{
     cursorStyle: function(){
       if(this.move){
        var styleObject = {
            cursor: '-webkit-grab',
            
        }
       }
       if(this.move &&  this.isMouseDown){
        var styleObject = {
            cursor: '-webkit-grabbing',
            
        }
       }
       if(this.rect || this.line || this.polygon){
        var styleObject = {
            cursor: 'crosshair',
            
        }
       }
      if(this.zoom){
        var styleObject = {
              cursor: 'zoom-in',            
        }
       }
     
        return styleObject;
      },
 },

};
</script>

<style scoped>
/*
* {
  margin: 0;
  padding: 0;
}
.tools {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background: #efefef;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  z-index: 100;
}

.tools input {
  margin-right: 20px;
}

.debugger {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 10;
  background: rgba(255, 255, 255, 0.8);
}
*/
* {
  margin: 0;
  padding: 0;
  background-color: white;
}
template {
  margin: 0;
  padding: 0;
}
#stageId {
  width: 900px;
  margin: 30px auto;
}
.clear {
  clear: both;
}
#menu{
  width:100%;
  height:55px;
  background-color:#474747;
  margin-bottom:1px;
  
}
#menuContainer{
  background-color:#474747;
  margin-left:5%;
  height:55px;
  width:120px;
  
  
}
.menuButton{
 

  border:none;
  
 
  width:50px;
  height:35px;
  margin-right:10px;
}
.menuButton:hover{

  border:5px solid gray;
  background-color:gray;
  color:white;
  width:50px;
  height:35px;
  margin-right:10px;
  cursor: pointer;
}
#tools {
  width: 5%;
  height: 90vh;
  background-color: #474747;
  float: left;
}
#canvas {
  width: 75%;
  height: 90vh;
  background-color: #242424;
  float: left;
}
#settings {
  width: 20%;
  height: 90vh;
  background-color: #474747;
  float: left;
}
.tool {
  width: 80%;
  height: 50px;
  margin: 10%;
  border: none;
  background-color: #474747;
  color: white;
}
.tool:hover{
  width: 80%;
  height: 50px;
  margin: 10%;
  border: 5px solid gray;
  cursor: pointer;
}
.tool:active{
  width: 80%;
  height: 50px;
  margin: 10%;
  border: 5px solid gray;
  cursor: pointer;
}

h2{
  background-color:#474747;
  text-align: center;
  color:white;
  font-family: Arial;
  font-weight: normal;
}
#lineSettings{
  width: 100%;
  height:  45vh;
  background-color:#474747;
}
#rectSettings{
  width: 100%;
  
  background-color:#474747;
}
#layers{
  width: 100%;
  
  background-color:#474747;
}
input[type=range]{
  width:120px;
  position:relative;
  top:4px;
  left: 5px;
  
  margin-right:20px;
  
}
input[type=number]{
  width:50px;
  

}
input[type=color]{
 position:relative;
  top:2px;
  left:5px;
}
input[type=checkbox]{
 position:relative;
  top:2px;
  left:5px;
  

}
label{
  background-color:#474747 ;
  color:white;
}
.settingsContainer{
  width:90%;
  margin:5%;
  border-radius: 25px;
  background-color:#474747;

  
}
.settingsContainer h3{
  
  background-color:#474747;
  color:white

  
}
.innerSettings{
  background-color:#474747;
  
}
.layerButton{
  width:90%;
  height:30px;
  border:3px solid #242424;
  background-color:#0075ff;
  color:white;
  font-size: 15px;
}
.layerSettings{
background-color:#474747;
}

#addLayerButton{
  border:none;
  padding:5px;
  margin-bottom:10px;
  background-color:#E7E6DD;
  
}
#dashSettings{
  background-color:#474747;
}



</style>