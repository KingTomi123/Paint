<template>
 
</template>

<script>
var app = new Vue({
		el: '#app',
		  data: {
			on: false,
		  color: "purple",
		  brightness: 0.5,
		  
		  },
		 computed: {
		  //computed properties are always FUNCTIONS that RETURNs something
		  //When the value inide computed is changed it changes the value in html automaticly
		  style: function(){
			var styleObject = {
				backgroundColor: this.color,
				opacity: this.brightness,
			}
			return styleObject;
		  },
			
		   DimPercentage: function(){
			  return Math.round(this.brightness*100) + "%";
			
		  },
		   
		   
		},
		methods:{
		  toggle:function(){
			// this invertes from flase to true and from true to false
			// <----------- how JS reads this
		   this.on = !this.on;
		  },
		 
		}
		});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lamp{
	  position:absolute;
	  top: 50px;
	  left 50px;
	}
	.shade{
	  position:aboslute;
	  width: 70px;
	  height: 50px;
	  background-color:bisque;
	}
	.light{
	  position:absolute;
	  width:100%;
	  height:100%;
	  background-color:yellow;
	}
	.base{
	  position: absolute;
	  width:10px;
	  height:70px;
	  left:30px;
	  top:50px;
	  background-color:brown;
	}
</style>
