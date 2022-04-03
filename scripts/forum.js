const threadsToPopulate = document.querySelector('#threads');
const form = document.querySelector('#inputBoxes');

//Renders threads
function renderThreads(doc){
    let li = document.createElement('li');
    let threadTitle = document.createElement('h4');
    let btn = document.createElement('button');
    btn.innerHTML = "Delete Thread";
    //let threadTime = document.createElement('p');
    let link = document.createElement('a');
    link.setAttribute('href', "/pages/thread.html");

    li.setAttribute('data-id', doc.id);
    threadTitle.textContent = doc.data().title;
    link.appendChild(threadTitle);
    li.appendChild(link);
    li.appendChild(btn);
    //threadTime.textContent = doc.data().timestamp.toDate();

    
    //li.appendChild(threadTime);

    threadsToPopulate.appendChild(li);

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('threads').doc(id).delete();
    })
}

db.collection('threads').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderThreads(doc);
    })
})

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
        timestamp: Date.now()
    })
})

// sleeps then refreshes page
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