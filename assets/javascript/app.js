$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyCJfllA-MFcEQHp73lRcLdf0gAv6XeD-m4",
        authDomain: "fir-homework-82530.firebaseapp.com",
        databaseURL: "https://fir-homework-82530.firebaseio.com",
        projectId: "fir-homework-82530",
        storageBucket: "fir-homework-82530.appspot.com",
        messagingSenderId: "476352335441"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');


  $("#submit-btn").on("click", function () {
      event.preventDefault();

    // Grabs user input

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // Creates local "temporary" object for holding train data

    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrainTime,
        frequency: frequency,
        /*minutesAway: minutesAway,
        nextArrival: nextArrival*/
    };

    // Uploads train data to database
    database.ref().push(newTrain);

    // Console log everything

    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    // Alert

    alert("New Train Added!");

    // Clears out all text-boxes

    $("#trainName").val("");
    $("#destination").val("");
    $("firstTrainTime").val("");
    $("#frequency").val("");
  });

    database.ref().on("child_added", function(trainAdded, prevChildKey)
    {
    console.log(trainAdded.val());

    var trainName = trainAdded.val().trainName;
    var destination = trainAdded.val().destination;
    var firstTrain = trainAdded.val().firstTrainTime;
    var frequency = trainAdded.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var firstTrainStructure = moment(firstTrain, "hh:mm").subtract("1, years");

      // the time difference between current time and the first train
      var difference = currentTime.diff(moment(firstTrainStructure), "minutes");
      var remainder = difference % frequency;
      var minutesUntilTrain = frequency - remainder;
      var nextArrival = moment().add(minUntilTrain, "minutes").format("hh:mm a");

      // Add each train's data into the table 

      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesUntilTrain + "</td></tr>");

  });
   
}); // <--- End of JavaScript