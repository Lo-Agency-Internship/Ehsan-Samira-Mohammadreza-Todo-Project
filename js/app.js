//add an eventListener to the from
const form = document.querySelector('#itemForm'); // select form
const itemInput = document.querySelector('#itemInput'); // select input box from form
const itemtimeeee = document.querySelector('#itemtime');
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];
let timeItems = [];
const handleItem = function(itemName){

    const items = itemList.querySelectorAll('.item');
 
    items.forEach(function(item){
        
        if(item.querySelector('.item-name').textContent === itemName){
            //complete event listener
            item.querySelector('.complete-item').addEventListener('click', function(){
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            });
            //edit event listener
            item.querySelector('.edit-item').addEventListener('click', function(){
                itemInput.value = itemName;
                itemList.removeChild(item);

                todoItems = todoItems.filter(function(item){
                    return item !== itemName;
                   
                });
            });
            // delete event listener
            item.querySelector('.delete-item').addEventListener('click', function(){
                
                itemList.removeChild(item);
                timeItems = timeItems.filter(function(item){
                    return item !== itemName ;
                });
                todoItems = todoItems.filter(function(item){
                    return item !== itemName;
                });

            })
        }
    })
}

const removeItem = function(item){
    // console.log(item);
    const removeIndex = (todoItems.indexOf(item));
    // const removeTime = (timeItems.indexOf(item));
    
    // console.log(removeIndex);

   todoItems.splice(removeIndex, 1);
// timeItems.splice(removeTime, 1);
    console.log();
    console.log();  
    
}

const getList = function(todoItems, timeItems){
    itemList.innerHTML = '';


    for (let index = 0; index < todoItems.length; index++) {
        let task = todoItems[index]; 
        let timess =  timeItems[index];
        itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><div class="right-part"><h5 class="item-name text-capitalize" style="fony-size=30px">${task}</h5> <h6 class="item-name text-capitalize">${timess}</h6></div><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>` );
        handleItem(task);
        handleItem(timess);
    }
       
    } 

const getLocalStorage = function(){
    const timestorage = localStorage.getItem('timeItems')
    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage === 'undefined' || todoStorage === null ){
        todoItems = [];
      
    } else {
        timeItems = JSON.parse(timestorage);
        todoItems = JSON.parse(todoStorage);
        console.log(timeItems);
        console.log(todoItems);
        getList(todoItems,timeItems);
       
    }
}

const setLocalStorage = function(todoItems){
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    localStorage.setItem('timeItems',JSON.stringify(timeItems));
}

// get local storage from page
getLocalStorage();

//add an item to the List, including to local storage
form.addEventListener('submit', function(e){ 
    e.preventDefault();
    const itemName = itemInput.value;
    const itemTime1 = itemtimeeee.value;
    if (itemName.length === 0){
        feedback.innerHTML = 'Please Enter Valid Value';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(
            function(){
                feedback.classList.remove('showItem');
                }, 3000);
    } else {
        todoItems.push(itemName);
        timeItems.push(itemTime1);
        setLocalStorage(todoItems,timeItems);
        getList(todoItems,timeItems);
        //add event listeners to icons;
        //handleItem(itemName);
    }
    
    itemInput.value = '';
    timeItems.value = '';
    });

    //clear all items from the list
clearButton.addEventListener('click', function(){
    todoItems = [];
    timeItems = [];
    localStorage.clear();
    getList(todoItems,timeItems);
    
})

