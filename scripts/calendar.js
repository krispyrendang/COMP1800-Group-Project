document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'none',
        },
        events: [
            {
                title: 'hi',
                url: '../pages/all-tasks-details.html', //does not link to the users task yet
                start: '2022-03-30T14:30:00'
            }
        ],
        dateClick: function (info) {
            console.log(info)
            alert('a day has been clicked! ' + info.dateStr);
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