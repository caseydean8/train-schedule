// Initialize firebase
var config = {
    apiKey: 'AIzaSyAgc85qULigTIbF658xdHmrHrlIt33YVCc',
    authDomain: 'fir-jump-b7b14.firebaseapp.com',
    databaseURL: 'https://fir-jump-b7b14.firebaseio.com',
    projectId: 'fir-jump-b7b14',
    storageBucket: '',
    messagingSenderId: '893336609914',
    appId: '1:893336609914:web:21a305b4f0cd4746',
  };

firebase.initializeApp(config);
var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

$(".button").on("click", function(event) {
    event.preventDefault();

    // Get values from form input.
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();
    
    // Push values to database.
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrain),
        $("<td>").text(frequency),
        // $("<td>").text(0),
        )
        $("tbody").append(newRow);
});