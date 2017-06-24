// Your code goes here

var vinElem = document.getElementById('vin');
/*gm.info.getVehicleConfiguration(function(data) {
  vinElem.innerHTML = gm.info.getVIN();
  //console.log("hi");
});*/


console.log("hello");

var divRoot = $("#affdex_elements")[0];
//var divRoot = document.getElementById('affdex_elements')[0];
// The captured frame's width in pixels
var width = 640; //640

// The captured frame's height in pixels
var height = 480; //480

/*
   Face detector configuration - If not specified, defaults to
   affdex.FaceDetectorMode.LARGE_FACES
   affdex.FaceDetectorMode.LARGE_FACES=Faces occupying large portions of the frame
   affdex.FaceDetectorMode.SMALL_FACES=Faces occupying small portions of the frame
*/

console.log(width + "," + height);
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;

//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

detector.detectAllExpressions();
detector.detectAllEmotions();
detector.detectAllEmojis();
detector.detectAllAppearance();

console.log(detector);

detector.addEventListener("onInitializeSuccess", function() {
  console.log("success");
});
detector.addEventListener("onInitializeFailure", function() {
  console.log("failure");
});
detector.addEventListener("onWebcamConnectSuccess", function() {
	console.log("I was able to connect to the camera successfully.");
});

detector.addEventListener("onWebcamConnectFailure", function() {
	console.log("I've failed to connect to the camera :(");
});
detector.start();

detector.addEventListener("onImageResultsSuccess", function (faces, image, timestamp) {
  console.log(faces.length);

  if (faces.length > 0) {
    console.log(faces[0].emotions);

        console.log("Anger: " + faces[0].emotions.anger);

        vinElem.innerHTML = ""+faces[0].emotions.anger;
          //console.log("hi");

      //alert("angry");
    //vinElem.innerHTML = "";
  }
});


detector.addEventListener("onImageResultsFailure", function (image, timestamp, err_detail) {
  console.log(err_detail);
});
