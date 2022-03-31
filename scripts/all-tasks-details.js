let taskID = localStorage.getItem("taskID");

db.collection("all-tasks").where("id", "==", taskID)
            .get()
            .then(queryTask => {
                //see how many results you have got from the query
                size = queryTask.size;
                // get the documents of query
                Tasks = queryTask.docs;

                // We want to have one document per hike, so if the the result of 
                //the query is more than one, we can check it right now and clean the DB if needed.
                if (size = 1) {
                    var thisTask = Tasks[0].data();
                    //name = thisTask.name;
                    taskName = thisTask.name; //gets the name field
                    taskDate = thisTask.taskMonth[0] + "-" + thisTask.taskDate[0] + "-" + thisTask.taskYear + " at " + thisTask.taskTime[0] + "hrs"; //gets the date added field
                    taskCity = thisTask.city; //gets the city field
                    taskLocation = thisTask.location; //gets the location (address) field
                    taskDetails = thisTask.description; //gets the description field
                    // document.getElementById("TaskName").innerHTML = taskName;
                    document.getElementById("title").innerHTML = taskName;
                    document.getElementById("taskDate").innerHTML = taskDate;
                    document.getElementById("taskCity").innerHTML = taskCity;
                    document.getElementById("taskLoc").innerHTML = taskLocation;
                    document.getElementById("details").innerHTML = taskDetails;

                } else {
                    console.log("Query has more than one data")
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });




