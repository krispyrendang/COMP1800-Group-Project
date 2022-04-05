const commentToPopulate = document.querySelector('#commentsToPopulate');
const comment = document.querySelector('#inputBoxes');
var userName;

var threadId = localStorage.getItem("link");
console.log(threadId);

var docRef = db.collection("threads").doc(threadId);

console.log(docRef);

docRef.get().then((doc) => {
    console.log(doc.data());
})

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

db.collection('threads').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderComments(doc);
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
