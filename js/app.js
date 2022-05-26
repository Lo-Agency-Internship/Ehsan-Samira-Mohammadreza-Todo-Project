//add an eventListener to the from
const form = document.querySelector('#itemForm'); // select form
const itemtaskInput = document.querySelector('#itemInput'); // select input box from form --> task 
const itemtimeinput = document.querySelector('#itemtime'); // select input box from form --> time 
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback'); // a section that has feedback massage
const clearButton = document.querySelector('#clear-list');//a button that when we click on remove all list 



let todo = [];
function handleItem(todoitemsssss) {
    const items = itemList.querySelectorAll('.item');
    // console.log(items)
    items.forEach(function (item) {

        item.querySelector('.complete-item').addEventListener('click', function () {
            item.querySelector('.item-name').classList.toggle('completed');
            this.classList.toggle('visibility');
            todoitemsssss[item.id].iscm = true;
            localStorage.setItem('alltodoItems', JSON.stringify(todoitemsssss));
            getLocalStorage();
        });

        //edit event listener
        item.querySelector('.edit-item').addEventListener('click', function () {
            itemtaskInput.value = todoitemsssss[item.id - 1].title;
            itemList.removeChild(item);
            todoitemsssss[item.id-1].title = itemtaskInput.value
            localStorage.setItem('alltodoItems', JSON.stringify(todoitemsssss));
            const eee = itemList.querySelectorAll('.item');
            eee.forEach(function(aaa) {
                itemList.removeChild(aaa)
            })
            getList(todo)
        });
       
    })
}

// delete event listener
// item.querySelector('.delete-item').addEventListener('click', function(){
//     itemList.removeChild(item);
//     todoitemsssss = todoitemsssss.filter(function(item){
//         return item !== todo ;
//     });
// })
// }


const removeItem = function (item) {
    const removeIndex = (todo.indexOf(item));
    console.log(todo.indexOf(item))
    todo.splice(removeIndex, 1);
}


//get data from getlocalstorage and show in client
const getList = function (todoItems) {
    itemList.innerHTML = '';
    todoItems.forEach(task => {
        itemList.insertAdjacentHTML('beforeend', `<div class="item my-3" id=${task.taskId}><div class="right-part"><h5 class="item-name text-capitalize" style="fony-size=30px">${task.title}</h5> <h6 class="item-name text-capitalize">${task.time}</h6></div><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>`);
    });
    handleItem(todoItems)
}




//get our data from local storage and send into getline function 
const getLocalStorage = function () {
    const allitems = localStorage.getItem('alltodoItems')

    if (allitems === 'undefined' || allitems === null) {
        todo = [];

    } else {
        for (let index = 0; index < todo.length; index++) {
            if (todo[index].iscm === false) {
                getList(JSON.parse(allitems).filter(i => (i.iscm !== true)))
                // console.log(JSON.parse(allitems))
                todo = JSON.parse(allitems).filter(i => (i.iscm !== true))
            }

        }

    }
}



// set our data in local storage 
const setLocalStorage = function (todoItems) {
    localStorage.setItem('alltodoItems', JSON.stringify(todoItems));
}

// get local storage from page
getLocalStorage();
getList(todo)

//add an item to the List, including to local storage
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const itemTask = itemtaskInput.value;
    const itemTime = itemtimeinput.value;
    getLocalStorage();
    let id = todo.length > 0 ? todo[todo.length - 1].taskId : 0
    id++;
    // when send empty input we will have a massage
    if (itemTask.length === 0) {
        feedback.innerHTML = 'Please Enter Valid Value';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(
            function () {
                feedback.classList.remove('showItem');
            }, 3000);
    }
    else {
        todo.push(
            {
                title: itemTask,
                time: itemTime,
                taskId: id,
                iscm: false
            }
        )
        setLocalStorage(todo);
        getList(todo)
        //add event listeners to icons;
    }
    itemTask.value = '';
    itemTime.value = '';
});



// clear all items from the list
clearButton.addEventListener('click', function () {
    todo = []
    localStorage.clear();
    getList(todo);

})




function handldaily() {
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    const items = itemList.querySelectorAll('.item');
    items.forEach(function (item) {
        itemList.removeChild(item)
    })
       let tododate = [] ;
        for (let index = 0; index < todo.length; index++) {
            let editdate = todo[index].time
            let editmonth =editdate.slice(6,7)
            let editmonthitem = parseInt(editmonth)
            let dayitem=editdate.slice(8,10)
            let editdayitem = parseInt(dayitem)
            if (editmonthitem === month+1) {
                if (editdayitem === day) {
                    tododate.push(todo[index])
                }
            }
        }
        getList(tododate)
    }



function handlweekly() {
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let endday = day + 7;
    let endmonth = month + 1
    if (endday > 31) { 
     endmonth = month + 1
    }
    const items = itemList.querySelectorAll('.item');
    items.forEach(function (item) {
        itemList.removeChild(item)
    })
    let tododate = [] ;
    for (let index = 0; index < todo.length; index++) {
        let editdate = todo[index].time
        let editmonth =editdate.slice(6,7)
        let editmonthitem = parseInt(editmonth)
        let dayitem=editdate.slice(8,10)
        let editdayitem = parseInt(dayitem)
        if (editdayitem>=1 && editdayitem<=8) {
            editdayitem  = editdayitem +31
        }

        console.log(day)
        console.log(month)
        console.log(endday)
        console.log(endmonth)
        console.log(editmonthitem)
        console.log(editdayitem)
        if (editmonthitem === month+1 || editmonthitem === endmonth + 1) {
            if (editmonthitem === endmonth + 1) {
                if (editdayitem>31 && editdayitem<38) {
                    if (editdayitem >= day && editdayitem<=endday) {
                        tododate.push(todo[index])
                        console.log(tododate)
                    }
                }
            }
            else
            {
                if (editdayitem >= day && editdayitem<=endday) {
                    tododate.push(todo[index])
                    console.log(tododate)
                }
            }
            
        }
    }
    getList(tododate)
}





function handlmonthly() {
    const d = new Date();
    let month = d.getMonth();
    const items = itemList.querySelectorAll('.item');
    items.forEach(function (item) {
        itemList.removeChild(item)
    })

    let tododate = [] ;
    for (let index = 0; index < todo.length; index++) {
        let editdate = todo[index].time
        let editmonth =editdate.slice(6,7)
        let editmonthitem = parseInt(editmonth)
        if (editmonthitem === month+1) {
            tododate.push(todo[index])
        }
    }
    getList(tododate)
}
























