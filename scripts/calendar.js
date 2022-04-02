var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        displayUserTasks();

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function displayUserTasks() {
    let taskCardTemplate = document.getElementById("taskCardTemplate");
    //let taskCardGroup = document.getElementById("taskCardGroup");

    currentUser.get().then(userDoc => {

        var taskRef = userDoc.data().myTasks;

        for (let i = 0; i < taskRef.length; i++) {

            db.collection("all-tasks").where("id", "==", taskRef[i]).get()
                .then(allTasks => {
                    allTasks.forEach(doc => {

                        var taskName = doc.data().name;
                        var taskID = doc.data().id;
                        //var taskCity = doc.data().city; // not needed when showing the schedule
                        //var taskDesc = doc.data().description; //not needed when showing the schedule 
                        var taskDates = doc.data().taskDate;
                        var m = 0;
                        var displayDates = ""; //collate data from array to a string.
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



                        //Loop to extract all the dates attached to the task, including the scheduled time for each event.
                        for (let i = 0; i < taskDates.length; i++) {

                            m = doc.data().taskMonth[i];

                            let taskCardGroup = document.getElementById("taskCardGroup+" + m);
                            let taskInfo = taskCardTemplate.content.cloneNode(true);

                            console.log(m);
                            console.log(months[m - 1]);
                            displayDates = months[m - 1] + "-" + doc.data().taskDate[i] + "-" + doc.data().addedYear + "<br>" + "at " + doc.data().taskTime[i] + "hrs" + "<br><br>"; //gets the date added field

                            taskInfo.querySelector('.card-title').innerHTML = taskName;
                            taskInfo.querySelector('.card-date').innerHTML = displayDates;

                            taskInfo.querySelector('a').onclick = () => setTaskData(taskID);

                            taskInfo.querySelector('img').src = `../images/${taskID}.jpg`;

                            taskCardGroup.appendChild(taskInfo);
                            console.log(taskCardGroup);
                            //console.log(displayDates);
                        }







                        // let taskInfo = taskCardTemplate.content.cloneNode(true);
                        // taskInfo.querySelector('.card-title').innerHTML = taskName;
                        // taskInfo.querySelector('.card-date').innerHTML = displayDates;

                        //console.log(taskDates);
                        //console.log(taskName);



                        // taskInfo.querySelector('img').src = `../images/${taskID}.jpg`;

                        // taskCardGroup.appendChild(taskInfo);
                    })
                })
        }
    })
}

function setTaskData(id) {
    localStorage.setItem('taskID', id);
}

// function setTaskDate(date) {
//     localStorage.setItem('taskDate', date);
// } 

// document.addEventListener('DOMContentLoaded', function () {
//     var taskDate = localStorage.getItem("taskID");
//     var calendarEl = document.getElementById('calendar');
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         headerToolbar: {
//             left: 'prev,next today',
//             center: 'title',
//             right: 'none',
//         },
//         events: [{
//             title: 'hi',
//             url: '../pages/all-tasks-details.html', //does not link to the users task yet
//             start: '2022-05-01'
//         }],
//         // eventClick: function (info) {
//         //     if (info.event.url) {
//         //         var taskRef = userDoc.data().myTasks;
//         //         setTaskData(taskRef[2]);
//         //     }
//         //     console.log(info)
//         //     alert('a day has been clicked! ' + info.dateStr);
//         // }

//     });


//     calendar.render();
// });













// this is for when a user has signed up for a task.
// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         var currentUser = db.collection("users").doc(user.uid);
//         var userID = user.uid;
//         //get the document for current user.
//         currentUser.get()
//             .then(userDoc => {
//                 // Start a new collection and add all data in it.
//                 db.collection("calendar").add({
//                     owner: userID,
//                 })
//             })
//     } else {
//         // No user is signed in.
//         console.log("no user signed in");
//     }
// });