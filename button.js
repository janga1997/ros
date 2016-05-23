var radius=255;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var gradient = ctx.createRadialGradient(radius,radius,radius,radius,radius,30);
gradient.addColorStop(0,"white");
gradient.addColorStop(1,"black");

ctx.fillStyle = gradient;

ctx.fillRect(0,0,510,510);



    var rbServer = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
});




// These lines create a topic object as defined by roslibjs
var motionTopic = new ROSLIB.Topic({
    ros : rbServer,
    name : '/motion',
    messageType : 'std_msgs/ColorRGBA'
});

var color=new ROSLIB.Message({

	r:0,
	g:0,
	b:0,
	a:0

});

function mod(num){

	if (num<0){

	return -1*num	

}

return num
		

}



canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event)
{
  var x_1=event.pageX;
  var y_1=event.pageY;

	x_1-=radius
	y_1-=radius

y_1=-y_1

color.r=x_1;
color.g=y_1;

if (mod(color.r)<=30 && mod(color.g)<=30){

	color.r=0;
	color.g=0;
	motionTopic.publish(color);
console.log(color.r+","+color.g);

	return

}


motionTopic.publish(color);

console.log(color.r+","+color.g);


return
 
}


function stop() {
   
 

    color.r=0;
    color.g=0;
console.log(color.r+","+color.g);
	motionTopic.publish(color);
}


