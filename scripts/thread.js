const commentToPopulate = document.querySelector('#commentsToPopulate');
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







let threadID = localStorage.getItem("link");
console.log(threadID);

//getting the correct thread and displaying the messages.

db.collection("threads").doc(threadID).get()
    .then(allThreads => {
        // forEach is a loop command to run through each task data
        //allThreads.forEach(doc => {

        var messageArray = allThreads.data().messages;
        var userArray = allThreads.data().users;
        //console.log(messageArray[0]);
        //console.log(userArray[0]);


        for (let i = 0; i < userArray.length; i++) {
            console.log(messageArray[i]);
            var userName = userArray[i];
            var userMessage = userArray[i];
            let dl = document.createElement('dl');
            let dt = document.createElement('dt');
            let dd = document.createElement('dd');
            let commentContent = document.createElement('p');
            let commentName = document.createElement('p');

            commentContent.textContent = userMessage;
            commentName.textContent = userName;

            dd.appendChild(commentName);
            dt.appendChild(commentContent);
            dl.appendChild(dd);
            dl.appendChild(dt);

            commentToPopulate.appendChild(dl);



        }
    });
//});

//gets username
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        currentUser = db.collection("users").doc(user.uid);
        currentUser.get()
            .then(userDoc => {
                userName = userDoc.data().name;
                //console.log(userName);
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

    commentContent.textContent = doc.data().messages;
    commentName.textContent = doc.data().users;

    dd.appendChild(commentName);
    dt.appendChild(commentContent);
    dl.appendChild(dd);
    dl.appendChild(dt);

    commentToPopulate.appendChild(dl);
}

//writes the comments
// db.collection('messages').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderComments(doc);
//         console.log(doc.id);
//         docId = doc.id;
//     })
// })