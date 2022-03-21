//var currentUser                     //Using this as a var that can be reused in multiple functions.
                                    //Put this right after you start script tag before writing any functions.


function insertName(){
    // to check if the user is logged in:
     firebase.auth().onAuthStateChanged(user =>{
         if (user){
             console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc=>{
                //get the user name
                var user_Name= userDoc.data().name;
                console.log(user_Name);
                // $("#name-goes-here").text(user_Name); //same method as below but using jquery
                document.getElementById("name-goes-here").innerText = user_Name;    //using javascript            
            })    
        }
    
     })
    }
    insertName();

    function read_display_Quote(){
        //console.log("inside the function")
    
        //get into the right collection
        db.collection("quotes").doc("tuesday")
        .onSnapshot(function(tuesdayDoc) {
            //console.log(tuesdayDoc.data());
            document.getElementById("quote-goes-here").innerHTML=tuesdayDoc.data().quote;
        })
    }
    // Activate function after manually adding quotes in the database collection: quotes
    // read_display_Quote();

    // Function that runs once to manually add task data to Firestore. Can modify later to allow organisers to add/modify tasks.
    function writeNewTask() {
        //define a variable for the collection you want to create in Firestore to populate data
        var taskRef = db.collection("all-tasks");

        taskRef.add({
            id:"t2",
            name: "Task 2",    
            city: "North Vancouver",
            dateAdded: "Date Added: March 20, 2022",
            //  (Needs Tech Help) date: [1 May 2022 at 08:30:00, 2 May 2022 at 08:30:00 ],
            description: "Task 2 description",
            location: "1700 Mt Seymour Rd, North Vancouver, BC V7G 1L3",
        });
        taskRef.add({
            id:"t3",
            name: "Task 3",    
            city: "North Vancouver",
            dateAdded: "Date Added: March 20, 2022",
            // (Needs Tech Help) date: [1 May 2022 at 10:30:00, 2 May 2022 at 14:30:00 ],
            description: "Task 3 description",
            location: "1700 Mt Seymour Rd, North Vancouver, BC V7G 1L3",
        });
        taskRef.add({
            id:"t4",
            name: "Task 4",    
            city: "North Vancouver",
            dateAdded: "Date Added: March 20, 2022",
            //  (Needs Tech Help) date: [10 May 2022 at 14:30:00, 12 May 2022 at 14:30:00 ],
            description: "Task 4 description",
            location: "1700 Mt Seymour Rd, North Vancouver, BC V7G 1L3",
        });
    }

    function populateCardsDynamically() {
        let taskCardTemplate = document.getElementById("taskCardTemplate");
        let taskCardGroup = document.getElementById("taskCardGroup");
        
        db.collection("all-tasks").get()
            .then(allTasks => {
                // forEach is a loop command to run through each task data
                allTasks.forEach(doc => {
                    var taskName = doc.data().name; //gets the name field
                    var taskID = doc.data().id; //gets the unique ID field
                    var taskCity = doc.data().city; //gets the city field
                    var taskDateAdded = doc.data().dateAdded; //gets the date added field
                    let testTaskCard = taskCardTemplate.content.cloneNode(true);
                    testTaskCard.querySelector('.card-title').innerHTML = taskName;
                    testTaskCard.querySelector('.card-date').innerHTML = taskDateAdded;
                    testTaskCard.querySelector('.card-city').innerHTML = taskCity;
    
                    //sets direction for clicking on the a tag.
                    testTaskCard.querySelector('a').onclick = () => setTaskData(taskID);
    
                    // (not using images) testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                    taskCardGroup.appendChild(testTaskCard);
                })
    
            })
    }
    populateCardsDynamically();

    function setTaskData(id){
        localStorage.setItem ('taskID', id);
}