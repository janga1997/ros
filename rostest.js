

// This function connects to the rosbridge server running on the local computer on port 9090

var rbServer = new ROSLIB.Ros({
    url : 'ws://192.168.1.102:9090'
 });




 // This function is called upon the rosbridge connection event
 rbServer.on('connection', function() {
     // Write appropriate message to #feedback div when successfully connected to rosbridge
     var fbDiv = document.getElementById('feedback');
     fbDiv.innerHTML += "<p>Connected to websocket server.</p>";
 });

// This function is called when there is an error attempting to connect to rosbridge
rbServer.on('error', function(error) {
    // Write appropriate message to #feedback div upon error when attempting to connect to rosbridge
    var fbDiv = document.getElementById('feedback');
    fbDiv.innerHTML += "<p>Error connecting to websocket server.</p>";
});

// This function is called when the connection to rosbridge is closed
rbServer.on('close', function() {
    // Write appropriate message to #feedback div upon closing connection to rosbridge
    var fbDiv = document.getElementById('feedback');
    fbDiv.innerHTML += "<p>Connection to websocket server closed.</p>";
 });

// These lines create a topic object as defined by roslibjs
var cmdVelTopic = new ROSLIB.Topic({
    ros : rbServer,
    name : '/turtle1/cmd_vel',
    messageType : 'geometry_msgs/Twist'
});


var twist = new ROSLIB.Message({
    linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    }
});


function up() {
   
    var linearX = 0.0;
    var angularZ=0.0;

    // get values from text input fields. Note for simplicity we are not validating.
    linearX = 3


    // Set the appropriate values on the message object
    twist.linear.x = linearX;
 twist.angular.z=angularZ;

    // Publish the message 

    cmdVelTopic.publish(twist);

}


function left() {
   var linearX=0.0;
    var angularZ = 0.0;

    // get values from text input fields. Note for simplicity we are not validating.
    angularZ = 1

    // Set the appropriate values on the message object
    twist.angular.z = angularZ;
twist.linear.x=linearX;

    // Publish the message 
    cmdVelTopic.publish(twist);
}


function right() {
   
	var linearX=0.0;
    var angularZ = 0.0;

    // get values from text input fields. Note for simplicity we are not validating.
    angularZ = -1

    // Set the appropriate values on the message object
    twist.angular.z = angularZ;
twist.linear.x=linearX;

    // Publish the message 
    cmdVelTopic.publish(twist);
}


function down() {
   
    var linearX = 0.0;
var angularZ=0.0;

    // get values from text input fields. Note for simplicity we are not validating.
    linearX = -3

    // Set the appropriate values on the message object
    twist.linear.x = linearX;
twist.angular.z=angularZ;
    // Publish the message 
    cmdVelTopic.publish(twist);
pose();


}


//For topic Pose

//For topic subscribe

  // Subscribing to a Topic
  // ----------------------

function pose() {
var posTopic = new ROSLIB.Topic({
    ros : rbServer,
    name : '/turtle1/pose',
    messageType : 'turtlesim/Pose'
  });


posTopic.subscribe(function(message) {
    console.log('Received message on ' + posTopic.name + ': ' + message.theta);
   posTopic.unsubscribe(); 
  });

}




