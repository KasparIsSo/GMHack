// Your code goes here

//var vinElem = document.getElementById('vin');
var tooAngry = document.getElementById('result');
var tooDistracted = document.getElementById('result2');
var unable = document.getElementById('unable');
var avgang = 0;
var avgatt = 0;
var countang = 0;
var countatt = 0;
var onTheRoad = 0;
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
    unable.innerHTML = "";
    avgatt += faces[0].expressions.attention;
    avgang += faces[0].emotions.anger;
    countatt ++;
    countang ++;
    console.log(faces[0].emotions);
    console.log("Anger: " + faces[0].emotions.anger);
    console.log("Attention: " + faces[0].expressions.attention);
  //  vinElem.innerHTML = "Angriness: "+faces[0].emotions.anger;
    if (countang ==15){
      var realavgang = avgang/countang;
    if (realavgang > 40){
      tooAngry.innerHTML =  "Warning: Your emotional level may be affecting your driving";
    }
    else{
      tooAngry.innerHTML = "";
    }
    countang = 0;
    avgang = 0;
    realavgang = 0;
  }
  if (countatt == 10){
    var realavgatt = avgatt/countatt;
    if (realavgatt < 70){
      tooDistracted.innerHTML = "Pay attention to the road!";
      if(onTheRoad >= 10){
        var id = gm.voice.startTTS(function(){ }, 'Keep your eyes on the road.');
        onTheRoad = 0;
      }
      onTheRoad++;
    }
    else {
      tooDistracted.innerHTML = "";
    }
    countatt = 0;
    avgatt = 0;
    realavgatt = 0;
  }

          //console.log("hi");

      //alert("angry");
    //vinElem.innerHTML = "";
  }
  else{
    tooAngry.innerHTML = "";
    tooDistracted.innerHTML = "";
    unable.innerHTML = " UNABLE TO DETECT FACE";
  }
});


detector.addEventListener("onImageResultsFailure", function (image, timestamp, err_detail) {
  console.log(err_detail);
});
