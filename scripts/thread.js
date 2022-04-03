const threadsToPopulate = document.querySelector('#threads');
const comment = document.querySelector('#comments');

//Renders threads
function renderContent(doc){
    let forumThread = document.createElement('div');
    let threadTitle = document.createElement('h4');
    let threadContent = document.createElement('p');

    threadTitle.textContent = doc.data().title;
    threadContent.textContent = doc.data().content;

    forumThread.setAttribute('data-id', doc.id);
    forumThread.appendChild(threadtitle);
    forumThread.appendChild(threadContent);
}

db.collection('threads').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderContent(doc);
    })
})