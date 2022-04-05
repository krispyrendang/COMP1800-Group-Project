const threadsToPopulate = document.querySelector('#threads');
const form = document.querySelector('#inputBoxes');
var userName;
var docId;

//Renders threads
function renderThreads(doc){
    let li = document.createElement('li');
    let threadTitle = document.createElement('h4');
    let btn = document.createElement('button');
    let hr = document.createElement('hr');
    btn.innerHTML = "Delete Thread";
    //let threadTime = document.createElement('p');
    let link = document.createElement('a');
    link.setAttribute('href', "/pages/thread.html");
    li.setAttribute('data-id', doc.id);
    threadTitle.textContent = doc.data().title;
    link.appendChild(threadTitle);
    li.appendChild(link);
    li.appendChild(btn);
    li.appendChild(hr);
    //threadTime.textContent = doc.data().timestamp.toDate();
    //li.appendChild(threadTime);

    threadsToPopulate.appendChild(li);

//deletes thread from database
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('threads').doc(id).delete();
    })
}

db.collection('threads').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderThreads(doc);
        console.log(doc.id);
        docId = doc.id;
    })
})

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

//Shows and hides the form
var $button = $('#addThread'),
  $text   = $('#inputBoxes'),
  visible = false;

$button.click(function(){
if ( visible ) {
    $text.slideUp(0,function(){
        $text.removeClass('hide')
             .slideDown('fast');
  });
} else {
    $text.slideUp('fast',function(){
        $text.addClass('hide')
             .slideDown(0);
  });
}
visible = ! visible;
});

//hides the form when submitted and uploads data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('threads').add({
        title: form.inputTitle.value,
        content: form.inputContent.value,
        timestamp: Date.now(),
        name: userName
    })
})

// sleeps then refreshes page because who even knows how
// snapshot refreshes even work
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));s
}

async function refreshPage(){
    $text.slideUp('fast',function(){
        $text.addClass('hide')
             .slideDown(0);
             visible = ! visible;
    })
    await sleep(1000);
    window.location.reload();
}
