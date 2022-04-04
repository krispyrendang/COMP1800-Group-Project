const threadsToPopulate = document.querySelector('#threads');
const comment = document.querySelector('#comments');

//Renders threads
function renderContent(doc){
    let threadTitle = document.createElement('h4');
    let threadContent = document.createElement('p');
    let div = document.getElementById("contents");

    div.setAttribute('data-id', doc.id);
    threadTitle.textContent = doc.data().title;
    div.appendChild(threadTitle);
    threadContent.textContent = doc.data().content;
    div.appendChild(threadContent);
}

var docRef = db.collection("threads").doc("North");

docRef.get().then((doc) => {
    console.log("Document data:", doc.data());
    renderContent(doc);
});