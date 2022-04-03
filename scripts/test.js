const threadsToPopulate = document.querySelector('#threads');


function renderThreads(doc){
    let li = document.createElement('li');
    let threadTitle = document.createElement('h4');
    let threadTime = document.createElement('p');
    let link = document.createElement('a');
    link.setAttribute('href', "/pages/thread.html");

    li.setAttribute('data-id', doc.id);
    threadTitle.textContent = doc.data().title;
    link.appendChild(threadTitle);
    threadTime.textContent = doc.data().timestamp.toDate();

    li.appendChild(link);
    li.appendChild(threadTime);

    threadsToPopulate.appendChild(li);
}

db.collection('threads').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderThreads(doc);
    })
})