let input =document.getElementById("input")
let addBtn =document.getElementById("add")
let myTasksArea =document.getElementById("tasks")
let arrOfTasks = []; 

/////////////////////////////////////////////////////////
addBtn.addEventListener("click",()=>{
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
})

if(window.localStorage.getItem("tasks")) {
    arrOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}
/////////////////////////////////////////////////////////
myTasksArea.addEventListener("click" ,(e)=>{

    if(e.target.classList.contains("del")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("chk")) {
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        e.target.parentElement.classList.toggle("done")
        // e.target.parentElement.classList.toggle("task-done")
    }
})

/////////remove from local storage/////////////
function deleteTaskWith(parameterID) {
    arrOfTasks = arrOfTasks.filter((task)=> task.id != parameterID)
    addDataToLocalStorage(arrOfTasks)
}

////////////////Update task ////////////////////
function toggleStatusTaskWith(taskID) {
    for(let i=0 ; i< arrOfTasks.length ; i++) {
        if(arrOfTasks[i] ===taskID ) {
            arrOfTasks[i].completed==false ? (arrOfTasks[i].completed==true) : (arrOfTasks[i].completed==false)
        }

    }
    addDataToLocalStorage(arrOfTasks);
}
/////////////////////////////////////////////////////////
getDateFromLocalStorage();
function addTaskToArray(taskText) {
    const task = {
        id:Date.now(),
        title: taskText,
        completed: false,
    };
    arrOfTasks.push(task)
    addTaskstoPage(arrOfTasks);
    addDataToLocalStorage(arrOfTasks);
}
//////////////////////////////////////////////////////////


////////////////////////////////////////////////////
function addTaskstoPage(array) {

    myTasksArea.innerHTML = " ";
    ///loop to array of tasks
    array.forEach((task)=> {
        myDiv = document.createElement('div')
        myDiv.className=("task");
        if(task.completed) {
            myDiv.className=("task done");
        }
        myDiv.setAttribute("data-id" , task.id);
        myDiv.appendChild(document.createTextNode(task.title))

        let spandel = document.createElement("span");
        let spanchk = document.createElement("span");
        spandel.className=("del");
        spanchk.className=("chk");
        spandel.appendChild(document.createTextNode("✖️"));
        spanchk.appendChild(document.createTextNode("✔️"));
        
        myDiv.appendChild(spandel)
        myDiv.appendChild(spanchk)
        myTasksArea.appendChild(myDiv);
    });

}
//////////////////////////////////////////////////////////


function addDataToLocalStorage(arrOfTasks) {
    //add array to local storage
    window.localStorage.setItem("tasks",JSON.stringify(arrOfTasks))
}

function getDateFromLocalStorage () {
    let data = window.localStorage.getItem("tasks")
    if(data) {
        let task = JSON.parse(data);
        addTaskstoPage(task)
    }
}