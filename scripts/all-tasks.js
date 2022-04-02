//Using this as a var that can be reused in multiple functions.
//Put this right after you start script tag before writing any functions.
var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        populateCardsDynamically();


    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function populateCardsDynamically() {
    let taskCardTemplate = document.getElementById("taskCardTemplate");
    let taskCardGroup = document.getElementById("taskCardGroup");

    db.collection("all-tasks").get()
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
                //var taskDateAdded = doc.data().addedMonth + "-" + doc.data().addedDate + "-" + doc.data().addedYear; //gets the date added field
                let testTaskCard = taskCardTemplate.content.cloneNode(true);
                testTaskCard.querySelector('.card-title').innerHTML = taskName;
                testTaskCard.querySelector('.card-date').innerHTML = displayDates;
                testTaskCard.querySelector('.card-city').innerHTML = taskCity;
                testTaskCard.querySelector('.card-description').innerHTML = taskDesc;

                //sets direction for clicking on the a tag.
                testTaskCard.querySelector('a').onclick = () => setTaskData(taskID);

                //grabs the photo for each task.
                testTaskCard.querySelector('img').src = `../images/${taskID}.jpg`;

                // (not using images) testTaskCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                taskCardGroup.appendChild(testTaskCard);
            })

        })
}


function setTaskData(id) {
    localStorage.setItem('taskID', id);
}


// Function that runs once to manually add task data to Firestore. Can modify later to allow organisers to add/modify tasks.
function writeNewTask() {
    //define a variable for the collection you want to create in Firestore to populate data
    var taskRef = db.collection("all-tasks");

    taskRef.add({
        id: "t1",
        name: "Task 1",
        city: "North Vancouver",
        addedDate: 18,
        addedMonth: 3,
        addedYear: 2022,
        taskTime: [0830, 0830],
        taskDate: [1, 2],
        taskMonth: [5, 5],
        taskYear: 2022,
        description: "Task 1 description",
        location: "Mt Seymour: 1700 Mt Seymour Rd, North Vancouver, BC V7G 1L3",
    });

    taskRef.add({
        id: "t2",
        name: "Task 2",
        city: "North Vancouver",
        addedDate: 20,
        addedMonth: 3,
        addedYear: 2022,
        taskTime: [0830, 0830],
        taskDate: [1, 2],
        taskMonth: [5, 5],
        taskYear: 2022,
        description: "Task 2 description",
        location: "Mt Seymour: 1700 Mt Seymour Rd, North Vancouver, BC V7G 1L3",
    });
    taskRef.add({
        id: "t3",
        name: "Task 3",
        city: "North Vancouver",
        addedDate: 22,
        addedMonth: 3,
        addedYear: 2022,
        taskTime: [1030, 1430],
        taskDate: [1, 2],
        taskMonth: [5, 5],
        taskYear: 2022,
        description: "Task 3 description",
        location: "Mt Seymour: 1700 Mt Seymour Rd, North Vancouver, BC V7G 1L3",
    });
    taskRef.add({
        id: "t4",
        name: "Task 4",
        city: "North Vancouver",
        addedDate: 21,
        addedMonth: 3,
        addedYear: 2022,
        taskTime: [1430, 1430],
        taskDate: [10, 12],
        taskMonth: [5, 5],
        taskYear: 2022,
        description: "Task 4 description",
        location: "Mt Seymour: 1700 Mt Seymour Rd, North Vancouver, BC V7G 1L3",
    });
    taskRef.add({
        id: "t5",
        name: "Task 5",
        city: "Whistler",
        addedDate: 18,
        addedMonth: 3,
        addedYear: 2022,
        taskTime: [0830, 0830],
        taskDate: [1, 2],
        taskMonth: [5, 5],
        taskYear: 2022,
        description: "Task 5 description",
        location: "Whistler Blackcomb: 4545 Blackcomb Way, Whistler, BC V0N 1B4",
    });

    taskRef.add({
        id: "t6",
        name: "Task 6",
        city: "Whistler",
        addedDate: 20,
        addedMonth: 3,
        addedYear: 2022,
        taskTime: [0830, 0830],
        taskDate: [1, 2],
        taskMonth: [5, 5],
        taskYear: 2022,
        description: "Task 6 description",
        location: "Whistler Blackcomb: 4545 Blackcomb Way, Whistler, BC V0N 1B4",
    });
    taskRef.add({
        id: "t7",
        name: "Task 7",
        city: "Whistler",
        addedDate: 22,
        addedMonth: 3,
        addedYear: 2022,
        taskTime: [1030, 1430],
        taskDate: [1, 2],
        taskMonth: [5, 5],
        taskYear: 2022,
        description: "Task 7 description",
        location: "Whistler Blackcomb: 4545 Blackcomb Way, Whistler, BC V0N 1B4",
    });
    taskRef.add({
        id: "t8",
        name: "Task 8",
        city: "Whistler",
        addedDate: 21,
        addedMonth: 3,
        addedYear: 2022,
        taskTime: [1430, 1430],
        taskDate: [10, 12],
        taskMonth: [5, 5],
        taskYear: 2022,
        description: "Task 8 description",
        location: "Whistler Blackcomb: 4545 Blackcomb Way, Whistler, BC V0N 1B4",
    });
}