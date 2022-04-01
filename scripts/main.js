//Using this as a var that can be reused in multiple functions.
//Put this right after you start script tag before writing any functions.
var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        insertName();
        displayMyTask();

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


function insertName() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        // $("#name-goes-here").text(user_Name); //same method as below but using jquery
        document.getElementById("name-goes-here").innerText = user_Name; //using javascript            
    })
}



//displays all the tasks assigned/applied by the user.
function displayMyTask() {
    let taskCardTemplate = document.getElementById("taskCardTemplate");
    let taskCardGroup = document.getElementById("taskCardGroup");

    currentUser.get().then(userDoc => {
        //get the array that holds the task id under the current user.
        var taskRef = userDoc.data().myTasks;
        // console.log(taskRef);

        for (let i = 0; i < taskRef.length; i++) {
            // console.log(taskRef[i]);

            db.collection("all-tasks").where("id", "==", taskRef[i]).get()
                .then(allTasks => {
                    // forEach is a loop command to run through each task data
                    allTasks.forEach(doc => {

                        var taskName = doc.data().name; //gets the name field
                        var taskID = doc.data().id; //gets the unique ID field
                        var taskCity = doc.data().city; //gets the city field
                        var taskDesc = doc.data().description; //gets the description
                        var taskDates = doc.data().taskDate; //gets the task dates in array.
                        var displayDates = ""; //collate data from array to a string.
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                        //Loop to extract all the dates attached to the task, including the scheduled time for each event.
                        for (let i = 0; i < taskDates.length; i++) {
                            let m = doc.data().taskMonth[i];
                            //console.log(months[m - 1]);
                            displayDates += months[m - 1] + "-" + doc.data().taskDate[i] + "-" + doc.data().addedYear + "<br>" + "at " + doc.data().taskTime[i] + "hrs" + "<br><br>"; //gets the date added field

                            //console.log(displayDates);
                        }

                        let testTaskCard = taskCardTemplate.content.cloneNode(true);
                        testTaskCard.querySelector('.card-title').innerHTML = taskName;
                        testTaskCard.querySelector('.card-date').innerHTML = displayDates;
                        testTaskCard.querySelector('.card-city').innerHTML = taskCity;
                        testTaskCard.querySelector('.card-description').innerHTML = taskDesc;

                        console.log(taskRef[i]);
                        console.log(taskName);

                        //sets direction for clicking on the a tag.
                        testTaskCard.querySelector('a').onclick = () => setTaskData(taskID);

                        //grabs the photo for each task.
                        testTaskCard.querySelector('img').src = `../images/${taskID}.jpg`;
                        taskCardGroup.appendChild(testTaskCard);
                    })

                })

        }

    })

};

function setTaskData(id) {
    localStorage.setItem('taskID', id);
}