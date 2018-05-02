// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtC6TyWH0pE0gng-SMGVZwrgBbRYDSR1A",
    authDomain: "fir-homework-7f74d.firebaseapp.com",
    databaseURL: "https://fir-homework-7f74d.firebaseio.com",
    projectId: "fir-homework-7f74d",
    storageBucket: "fir-homework-7f74d.appspot.com",
    messagingSenderId: "655417347247"
};
firebase.initializeApp(config);

var scores = [];
var lowestDiff;
var bestMatch;
var bestMatchPhoto;
var fileType;
var fileName;
var file;
var acceptable = false;
var validFileExtensions = ["image/jpg", "image/jpeg", "image/png", ""];
var input = document.getElementById("photo");
var reader = new FileReader;

// when the file input changes...
input.onchange = () => {
    reader.abort();
    reader.readAsDataURL(input.files[0]);
    file = input.files[0];
    fileType = file["type"];
    fileName = file.name
    checkType(fileType);
}


function isThisMyFriend(otherName, otherScores, otherPhoto) {
    var diff = 0; // diff starts at 0

    for (let i = 0; i < scores.length; i++) { // compare your score to each score
        diff += Math.abs(scores[i] - otherScores[i]);
    } // whichever has the lowest diff and doesn't match your name is your friend
    if (diff < lowestDiff) { // the get route works great it is only the post that doesn't work, yes, I'm trting to find the post route:)
        bestMatch = otherName;
        bestMatchPhoto = otherPhoto;
        lowestDiff = diff;
    }
}

// when you click on the submit button 
$("#find-friend").on("click", function(event) {
    var name = $("#name").val().trim();
    event.preventDefault();
    scores = [];
    scores.push($("#question1").val());
    scores.push($("#question2").val());
    scores.push($("#question3").val());
    scores.push($("#question4").val());
    scores.push($("#question5").val());
    scores.push($("#question6").val());
    scores.push($("#question7").val());
    scores.push($("#question8").val());
    scores.push($("#question9").val());
    scores.push($("#question10").val());

    // get all friends
    $.ajax({
            method: "GET",
            url: "/friends"
        })
        .done(function(friendData) {
            console.log(friendData);
            var results = friendData
            lowestDiff = 9999; // Any big number here
            bestMatch = ""; // Haven't found anyone yet
            if (friendData.length !== 0) {
                // for each friend call isThisMyFriend
                friendData.forEach(function(result) {
                    isThisMyFriend(result.name, result.scores, result.photo)
                });
            }
            // get the attributes for the best match
            $("#match-name").text(bestMatch);
            $("#match-img").attr("src", bestMatchPhoto);
            // Show the modal with the best match
            $("#results-modal").modal("toggle");

        }).done(function() { // post our results

            // if file type is not supported
            if (fileName != undefined && acceptable == false) {
                alert("FILE TYPE NOT SUPPORTED")
                return;
            }
            uploadToFirebase(file, fileName, name, scores)
        });

});

// close the modal
$("#closeModal").on("click", function(event) {
    $("#results-modal").modal("toggle");
});


// checks the type of file user input
function checkType(fileType) {
    for (let i = 0; i < validFileExtensions.length; i++) {
        if (fileType === validFileExtensions[i]) {
            acceptable = true;
        }
    }
}


// function submits image to firebase
function uploadToFirebase(file, fileName, name, scores) { // submit image
    var storageRef = firebase.storage().ref('/surveyPhotos/' + fileName);
    var uploadTask = storageRef.put(file) // gets link to image
    uploadTask.on('state_changed', function(snapshot) {}, function(error) {}, function() {
        var downloadUrl = uploadTask.snapshot.downloadURL;
        $.ajax({ // add to friends
            method: "POST",
            url: "/friends",
            data: {
                name: name,
                photo: downloadUrl,
                scores: [scores]
            } // did it work
        }).done(function(data) {
            console.log("new friend created: " + data.name + " photo: " + data.downloadUrl + " scores: " + data.scores);
        });
    });
}
