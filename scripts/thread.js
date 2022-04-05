const commentToPopulate = document.querySelector('#comments');
const comment = document.querySelector('#inputBoxes');
var userName;

//Renders threads
function renderContent(doc) {
    let threadTitle = document.createElement('h4');
    let threadContent = document.createElement('p');
    let div = document.getElementById("contents");

    div.setAttribute('data-id', doc.id);
    threadTitle.textContent = doc.data().title;
    div.appendChild(threadTitle);
    threadContent.textContent = doc.data().content;
    div.appendChild(threadContent);
};





docRef.get().then((doc) => {
    console.log("Document data:", doc.data());
    renderContent(doc);
});

//getting the correct thread and displaying the messages.
db.collection("threads").where("id", "==", doc.id).get()
    .then(allThreads => {
        // forEach is a loop command to run through each task data
        allThreads.forEach(doc => {

            var messageArray = doc.data().messages;
            var userArray = doc.data().users;
            console.log(messageArray[0]);
            console.log(userArray[0]);


            // for (let i = 0; i < taskRef.length; i++) {
            //     // console.log(taskRef[i]);

            //     db.collection("all-tasks").where("id", "==", taskRef[i]).get()
            //         .then(allTasks => {
            //             // forEach is a loop command to run through each task data
            //             allTasks.forEach(doc => {

            //                 var taskName = doc.data().name; //gets the name field
            //                 var taskID = doc.data().id; //gets the unique ID field
            //                 var taskCity = doc.data().city; //gets the city field
            //                 var taskDesc = doc.data().description; //gets the description
            //                 var taskDates = doc.data().taskDate; //gets the task dates in array.
            //                 var displayDates = ""; //collate data from array to a string.
            //                 const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


            //             });
            //         });
            // }
        });
    });

//gets username
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        currentUser = db.collection("users").doc(user.uid);
        currentUser.get()
            .then(userDoc => {
                userName = userDoc.data().name;
                console.log(userName);
            })
    });
}
insertName();

//adds comment to thread database
comment.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('messages').add({
        name: userName,
        content: comment.commentBox.value
    })
})

// sleeps then refreshes page because who even knows how
// snapshot refreshes even work
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    s
}

async function refreshPage() {
    await sleep(1000);
    window.location.reload();
}

//renders the comments
function renderComments(doc) {
    let dl = document.createElement('dl');
    let dt = document.createElement('dt');
    let dd = document.createElement('dd');
    let commentContent = document.createElement('p');
    let commentName = document.createElement('p');
    let line = document.createElement('hr');

    commentContent.textContent = doc.data().content;
    commentName.textContent = doc.data().name;
    dt.appendChild(commentContent);
    dd.appendChild(commentName);
    dl.appendChild(dt);
    dl.appendChild(dd);
    dl.appendChild(line);

    commentToPopulate.appendChild(dl);
}

//writes the comments
db.collection('messages').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderComments(doc);
        console.log(doc.id);
        docId = doc.id;
    })
})