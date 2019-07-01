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


$(".button").on("click", function(event) {
    event.preventDefault();

    // collect user form inputs.
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();
    
    // Create a temporary object to hold train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: moment().format("HH:mm A")
    };

    // Clear form inputs.
    $("input").val("");
    
    // Push data to firebase.
    database.ref().push(newTrain);
    

});

database.ref().on("child_added", function(childSnapshot) {
    var trainNameDisplay = childSnapshot.val().trainName;
    var destinationDisplay = childSnapshot.val().destination;
    var frequencyDisplay = childSnapshot.val().frequency;
    var firstTrainTime = childSnapshot.val().firstTrain;
    
    var firstTrainConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

    var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
    
    var timeDiffRemainder = timeDiff % frequencyDisplay;

    var minutesTilTrain = frequencyDisplay - timeDiffRemainder;

    var nextArrival = moment().add(minutesTilTrain, "minutes").format("HH:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(trainNameDisplay),
        $("<td>").text(destinationDisplay),
        $("<td>").text(frequencyDisplay),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesTilTrain),
        )
        $("tbody").append(newRow);
});