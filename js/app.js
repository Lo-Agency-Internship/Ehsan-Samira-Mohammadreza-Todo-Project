//add an eventListener to the from
const form = document.querySelector('#itemForm'); // select form
const itemtaskInput = document.querySelector('#itemInput'); // select input box from form --> task 
const itemtimeinput = document.querySelector('#itemtime'); // select input box from form --> time 
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback'); // a section that has feedback massage
const clearButton = document.querySelector('#clear-list');//a button that when we click on remove all list 



let todo;
// const handleItem = function(itemName){
function handleItem(todoitemsssss) {
    const items = itemList.querySelectorAll('.item');
    // console.log (todo);

    items.forEach(function(item) {
        // if(item.querySelector('.item-name').textContent === todoitemsssss.title)
        // {
                item.querySelector('.complete-item').addEventListener('click', function(){
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
                todoitemsssss.iscm = true
            });

            
            //edit event listener
            // item.querySelector('.edit-item').addEventListener('click', function(){
            //     itemInput.value = itemName;
            //     itemList.removeChild(item);

            //     todoItems = todoItems.filter(function(item){
            //         return item !== itemName;

            //     });
            // });



        // }

        
    })
}
   
//     console.log(items)
//     items.forEach(function(item){

  
//             // delete event listener
//             item.querySelector('.delete-item').addEventListener('click', function(){
//                 itemList.removeChild(item);
//                 timeItems = timeItems.filter(function(item){
//                     return item !== itemName ;
//                 });
//                 todoItems = todoItems.filter(function(item){
//                     return item !== itemName;
//                 });

//             })
//         }
//     })
// }




// const removeItem = function (item) {
//     // console.log(item);
//     const removeIndex = (todoItems.indexOf(item));
//     // const removeTime = (timeItems.indexOf(item));

//     // console.log(removeIndex);

//     todoItems.splice(removeIndex, 1);
//     // timeItems.splice(removeTime, 1);


// }








//get data from getlocalstorage and show in client
const getList = function (todoItems) {
    itemList.innerHTML = '';
    todoItems.forEach(task => {
     
        itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><div class="right-part"><h5 class="item-name text-capitalize" style="fony-size=30px">${task.title}</h5> <h6 class="item-name text-capitalize">${task.time}</h6></div><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>`);
        
    });

    handleItem(todoItems)
}










//get our data from local storage and send into getline function 

const getLocalStorage = function () {
    const allitems = localStorage.getItem('alltodoItems')

    if (allitems === 'undefined' || allitems === null) {
        todo = [];

    } else {
        // console.log(allitems)
        getList(JSON.parse(allitems));
         todo = JSON.parse(allitems)
    }
}







// set our data in local storage 
const setLocalStorage = function (todoItems) {
    localStorage.setItem('alltodoItems', JSON.stringify(todoItems));
}

// get local storage from page
 getLocalStorage();










//add an item to the List, including to local storage
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const itemTask = itemtaskInput.value;
    const itemTime = itemtimeinput.value;
  


    getLocalStorage();
    // console.log(todo)
    let id = todo.length > 0 ? todo[todo.length-1].taskId : 0
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

    else{

        todo.push(
            {
                title: itemTask,
                time : itemTime,
                taskId : id, 
                iscm : false
            }
        )
        // console.log(todo)
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

