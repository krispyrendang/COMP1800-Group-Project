document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dateClick: function (info) {
            console.log(info)
            alert('a day has been clicked!');
        }

    });
    calendar.render();
});

// this is for when a user has signed up for a task.
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        //get the document for current user.
        currentUser.get()
            .then(userDoc => {
                // Start a new collection and add all data in it.
                db.collection("calendar").add({
                    owner: userID,
                })
            })
    } else {
        // No user is signed in.
        console.log("no user signed in");
    }
});