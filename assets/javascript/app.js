// Initialize firebase.
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

// Collect user input to send to firebase.
$(".button").on("click", function(event) {
    event.preventDefault();

    // Collect user form inputs.
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();
    
    // Create a temporary object to hold train data.
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: moment().format("HH:mm A")
    };

    // Clear form inputs.
    $(".clear").val("");
    
    // Push data to firebase.
    database.ref().push(newTrain);
});

// Retrieve data from our database with "child_added" event.
database.ref().on("child_added", function(childSnapshot) {
    var trainNameDisplay = childSnapshot.val().trainName;
    var destinationDisplay = childSnapshot.val().destination;
    var frequencyDisplay = childSnapshot.val().frequency;
    var firstTrainTime = childSnapshot.val().firstTrain;
    
    // Subtract one year from first train time.
    var firstTrainConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

    // Determine difference between current time and first train time in minutes.
    var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
    
    // Divide the difference by the frequency of train runnings.
    var timeDiffRemainder = timeDiff % frequencyDisplay;
    
    // Subtract the remainder from the frequency.
    var minutesTilTrain = frequencyDisplay - timeDiffRemainder;

    // Add minutes until next train arrival to current time to display next train arrival time.
    var nextArrival = moment().add(minutesTilTrain, "minutes").format("HH:mm");

    // Create a new table row with data displayed in correct table data element.
    var newRow = $("<tr>").append(
        $("<td>").text(trainNameDisplay),
        $("<td>").text(destinationDisplay),
        $("<td>").text(frequencyDisplay),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesTilTrain),
        )
        // Add new table row to table body.
        $("tbody").append(newRow);
});