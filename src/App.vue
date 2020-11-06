<template>
   <div id="app">
      <div id="container">
         <div id="tools">
           <p>Tools:</p>
            <button>Pen</button>
            <button>Color</button>
         </div>
         <canvas id="canvas" height="400px" width="500px"></canvas>
         <div id="options">
          <p>Options:</p>
            <div v-if="OptPen">
               
            </div>
            <div v-if="OptColor">
              
            </div>
         </div>
      </div>
      <br>
   </div>
   
</template>

<script>
</script>

<style>
*{
	margin: 0;
	padding: 0;
	box-sizing:border-box;
	
}
#container{
width:600px;
height:400px;
margin:0 auto;	


}
#canvas{
	border:2px solid black;
}

#tools{
	
	width:504px;
	height:100px;
	border:2px solid black;
  background-color:lightgray;
}
button{
	width:40%;
	margin-left:6%;
	height:60px;
	margin-top:5px;
  
}
#options{
	width:504px;
	height:100px;
	border:2px solid black;
  margin-top:-4px;
  background-color:lightgray;
}
p{
  text-align:center;
  background-color:gray;
}

</style>
