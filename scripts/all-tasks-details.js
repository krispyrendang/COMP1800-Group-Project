let taskID = localStorage.getItem("taskID");

db.collection("all-tasks").where("id", "==", taskID)
            .get()
            .then(queryTask => {
                //see how many results you have got from the query
                size = queryTask.size;
                // get the documents of query
                Tasks = queryTask.docs;

                // We want to have one document per hike, so if the the result of 
                //the query is more than one, we can check it right now and clean the DB if needed.
                if (size = 1) {
                    var thisTask = Tasks[0].data();
                    name = thisTask.name;
                    document.getElementById("TaskName").innerHTML = name;
                } else {
                    console.log("Query has more than one data")
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


function writeReview() {

//For the Fields and drop-down menus
let Title = document.getElementById("title").value;
let Level = document.getElementById("level").value;
let Season = document.getElementById("season").value;
let Description = document.getElementById("description").value;

//For the Radio buttons
let Flooded = document.querySelector('input[name="flooded"]:checked').value;
let Scrambled = document.querySelector('input[name="scrambled"]:checked').value;

//to have access to the user information and from there, 
//you can write a new collection called "Reviews" and write the user input in it.
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        //get the document for current user.
        currentUser.get()
            .then(userDoc => {
                                            // Start a new collection and add all data in it.
                db.collection("reviews").add({
                    code: hikeID,
                    owner: userID,
                    title: Title,
                    level: Level,
                    season: Season,
                    description: Description,
                    flooded: Flooded,
                    scrambled: Scrambled
                })
                .then(function(){
                    window.location.href = "thanks.html"

                });
            })
    } else {
        // No user is signed in.
        console.log("no user signed in");
    }
});
}

