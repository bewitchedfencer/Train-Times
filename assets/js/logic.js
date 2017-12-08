
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

$("#submit-button").on("click", function(event){
    event.preventDefault();
    var train = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var startT = $("#start-time").val().trim();
    var frequency = $("#frequency").val().trim();

    //we create this local variable object so we can push it to our database
    //and make it cleaner. Also making the variables above allows for data
    //validation.

    var newTrain ={
        name:train,
        destination:destination,
        start:startT,
        frequency:frequency
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

database.ref().on("child_added", function(childSnapshot, prevChildKey){
    var newChild = childSnapshot.val();
    var empName = newChild.name;
    var empRole = newChild.role;
    var empStart = newChild.start;
    var empRate = newChild.rate;
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);

    var dateFormat="MM/DD/YY";
    var convertedDate=moment(empStart, dateFormat);

    var totalMonths = (moment(convertedDate).diff(moment(), "months"))*(-1);
    
    var totalBilled = totalMonths*empRate;
    
    $("#employeeTable").append(`<tr><td>${empName}</td><td>${empRole}</td><td>${empStart}</td><td>${totalMonths}</td><td>${empRate}</td><td>${totalBilled}</td></tr>`);

});