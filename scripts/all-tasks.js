//Using this as a var that can be reused in multiple functions.
//Put this right after you start script tag before writing any functions.
var currentUser

function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                // $("#name-goes-here").text(user_Name); //same method as below but using jquery
                document.getElementById("name-goes-here").innerText = user_Name; //using javascript            
            })
        }

    })
}
insertName();

function read_display_Quote() {
    //console.log("inside the function")

    //get into the right collection
    db.collection("quotes").doc("tuesday")
        .onSnapshot(function (tuesdayDoc) {
            //console.log(tuesdayDoc.data());
            document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;
        })
}
// Activate function after manually adding quotes in the database collection: quotes
// read_display_Quote();

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
                var taskDateAdded = doc.data().addedMonth + "-" + doc.data().addedDate + "-" + doc.data().addedYear; //gets the date added field
                let testTaskCard = taskCardTemplate.content.cloneNode(true);
                testTaskCard.querySelector('.card-title').innerHTML = taskName;
                testTaskCard.querySelector('.card-date').innerHTML = taskDateAdded;
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
populateCardsDynamically();

function setTaskData(id) {
    localStorage.setItem('taskID', id);
}