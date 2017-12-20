// Initialize Firebase
var config = {
    apiKey: "AIzaSyBnIIqHG_GRrCty2t1et8MetqTRsYKGGvw",
    authDomain: "my-awesome-project-9b6dd.firebaseapp.com",
    databaseURL: "https://my-awesome-project-9b6dd.firebaseio.com",
    projectId: "my-awesome-project-9b6dd",
    storageBucket: "my-awesome-project-9b6dd.appspot.com",
    messagingSenderId: "604008240457"
};
firebase.initializeApp(config);
var database = firebase.database();

$("#submit-button").on("click", function (event) {
    event.preventDefault();
    var train = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var startT = $("#start-time").val().trim();
    var frequency = $("#frequency").val().trim();

    //we create this local variable object so we can push it to our database
    //and make it cleaner. Also making the variables above allows for data
    //validation.

    var newTrain = {
        name: train,
        destination: destination,
        start: startT,
        frequency: frequency
    };


    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    $("#train-name").val("");
    $("#destination").val("");
    $("#start-time").val("");
    $("#frequency").val("");
});

function updateTrains() {
    $("#trainTimes").empty();
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        console.log("update trains");
        var newChild = childSnapshot.val();
        var trainName = newChild.name;
        var trainDestination = newChild.destination;
        var trainStart = newChild.start;
        var trainFrequency = parseInt(newChild.frequency);
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainStart);
        console.log(trainFrequency);

        var timeFormat = "HH:mm";
        var convertedTime = moment(trainStart, timeFormat);

        console.log("converted Time", convertedTime);
        console.log(trainFrequency);


        var firstTrain = moment(convertedTime).subtract(1, "years");
        console.log("firstTrain: ", firstTrain)
        var diffTime = moment().diff(firstTrain, "minutes");
        console.log(diffTime);

        var timeRemainder = diffTime % trainFrequency;
        console.log(timeRemainder);

        var minToTrain = trainFrequency - timeRemainder;
        console.log(minToTrain);

        var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm");

        $("#trainTimes").append(`<tr><td>${trainName}</td><td>${trainDestination}</td><td>${trainStart}</td><td>${trainFrequency}</td><td>${nextTrain}</td><td>${minToTrain}</td></tr>`);

    });
    console.log("reprocessed");
};
updateTrains();
setInterval(updateTrains, 60000);
