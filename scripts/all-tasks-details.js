//Using this as a var that can be reused in multiple functions.
//Put this right after you start script tag before writing any functions.
var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        displayTask();

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

let taskID = localStorage.getItem("taskID");

function displayTask() {
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
                //name = thisTask.name;
                taskName = thisTask.name; //gets the name field
                taskDate = thisTask.taskMonth[0] + "-" + thisTask.taskDate[0] + "-" + thisTask.taskYear + " at " + thisTask.taskTime[0] + "hrs"; //gets the date added field
                taskCity = thisTask.city; //gets the city field
                taskLocation = thisTask.location; //gets the location (address) field
                taskDetails = thisTask.description; //gets the description field

                //assigns the data from Firestore to the respective html elements for display
                document.getElementById("title").innerHTML = taskName;
                document.getElementById("taskDate").innerHTML = taskDate;
                document.getElementById("taskCity").innerHTML = taskCity;
                document.getElementById("taskLoc").innerHTML = taskLocation;
                document.getElementById("details").innerHTML = taskDetails;

                //Add a listener for users to sign up for the task on the task details page.
                document.getElementById("apply").addEventListener("click", saveTask(taskID));

            } else {
                console.log("Query has more than one data")
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}



//Adds the task id to the Users collection in an array format.
function saveTask(taskID) {
    currentUser.set({
        myTasks: firebase.firestore.FieldValue.arrayUnion(taskID)
    }, {
        merge: true
    })
};