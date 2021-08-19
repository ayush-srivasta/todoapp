var activeItem=null;

function list() {
    var wrapper=document.getElementById('list-wrapper')
    wrapper.innerHTML="";
     var url='http://127.0.0.1:8000/api/list/';
    if(activeItem != null)
    {
        url=`http://127.0.0.1:8000/api/update/${activeItem.id}`;
        activeItem=null;
    }

     fetch(url).then(resp=>
        resp.json()).then(data=>{
                console.log(data);
                var list =data;
                for(var i in list)
                {
                    var abc=`<span class="title">${list[i].title}</span>`;
                    if(list[i].active==true)
                    abc=`<strike class="title">${list[i].title}</strike>`
                    var item=`
                    <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                    <div style="flex:7">
                    ${abc}
                    </div>
                    <div style="flex:1">
                   <button class="btn btn-sm btn-outline-info edit">Edit</buttton>
                    </div>
                    <div style="flex:1">
                    <button class="btn btn-sm btn-outline-dark delete">-</buttton>
                    </div>
                    `
                    wrapper.innerHTML+=item;
                    
                } 
                for (var i in list)
                {
                    var editButton=document.getElementsByClassName('edit')[i];
                    var deleteButton=document.getElementsByClassName('delete')[i];
                    var title=document.getElementsByClassName('title')[i];
                    //console.log(editButton)
                    
                    editButton.addEventListener('click',(function(item){
                        return function () {
                            editItem(item)
                        }
                    })(list[i]))

                    deleteButton.addEventListener('click',(function(item){
                        return function () {
                            deleteItem(item)
                        }
                    })(list[i]))

                    title.addEventListener('click',(function(item){
                        return function () {
                            strikeItem(item)
                        }
                    })(list[i]))
                }
            }
        );
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
var form=document.getElementById('form-wrapper');   
form.addEventListener('submit',e=>{
    e.preventDefault()
    console.log('form submit');
    var url='http://127.0.0.1:8000/api/create/';
    if(activeItem != null)
    {
        url=`http://127.0.0.1:8000/api/update/${activeItem.id}`;
        activeItem=null;
    }

    var title=document.getElementById('title').value;
    fetch(url,{
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'title':title})
    }).then(()=>
        list())
        document.getElementById('form').reset()
});
 function editItem(item) {
     console.log(item)
     activeItem=item;
     document.getElementById('title').value=activeItem.title 
 }
 
 function deleteItem(item) {
     console.log("Delete clicked")
     console.log(item)
      var url=`http://127.0.0.1:8000/api/delete/${item.id}`;
        fetch(url,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },
        }).then( ()=>{
            list();
        })
 }
function strikeItem(item) {
    var url=`http://127.0.0.1:8000/api/update/${item.id}`;
    item.active=!item.active
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },body :JSON.stringify({
                'title':item.title,
                'active':item.active
            })
        }).then( ()=>{
            list();
        })
}
list()
