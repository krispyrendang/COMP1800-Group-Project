//Using this as a var that can be reused in multiple functions.
//Put this right after you start script tag before writing any functions.
var currentUser;
var userName;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global



        // the following functions are always called when someone is logged in
        createThread();

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


function createThread() {


    let name = document.getElementById("title").value;
    let Description = document.getElementById("description").value;


    currentUser.get().then(userDoc => {
        //get the user name
        userName = userDoc.data().name;
        //console.log(userName);
    });
    db.collection("threads").doc().set({

        messages: firebase.firestore.FieldValue.arrayUnion(Description),
        users: firebase.firestore.FieldValue.arrayUnion(userName),
        title: name

    }, {
        merge: true
    });



}