var courseApi = 'http://localhost:3000/course'

function start(){
    getCourse(renderCourse)  // read data from database
    handleForm()
}

start()

// function 
function getCourse(callback){
    fetch(courseApi)
        .then(function(response){
            return response.json()    
        })
        .then(callback)

}

function postCourse(data,callback){
    var options={
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi,options)
            .then(function(response){
                return response.json()
            })
            .then(callback)
}

function handleDeleteCourse(id){
    var options={
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    fetch(courseApi+'/'+id,options)
                .then(function(response){
                    return response.json()
                })
                .then(function(){
                    // getCourse(renderCourse)
                    var courseNeedleDelete = document.querySelector('.course-item-'+id)
                    courseNeedleDelete.remove()
                })
}
// ------------------------------------------------------------------XEM CHỖ NÀY GIÚP EM----------------------
function updateCourse(data,id){
    var options={
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi+'/'+id,options)
            .then(function(response){
                return response.json()
            })
            .then(function(){
                getCourse(renderCourse)
            })
            .then(start)
}

function handleUpdateCourse(id){
    var createBtn = document.querySelector('#create')
    createBtn.classList.add('hide')
    var updateBtn = document.querySelector('#update')
    updateBtn.classList.remove('hide')
    var name_course =  document.querySelector('.name-course-'+id).textContent;
    var description_course =  document.querySelector('.description-course-'+id).textContent;
    document.querySelector('input[name="name"]').value = name_course;    
    document.querySelector('input[name="description"]').value = description_course;
    updateBtn.onclick =function(){

        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var formData = {
            name: name,
            description: description
        }
        updateCourse(formData,id)
    }
    updateBtn.onmouseup = function(){
        updateBtn.classList.add('hide')
        createBtn.classList.remove('hide')
    }
    
}

// ------------------------------------------------------------------------------------------------------

function renderCourse(courses){
    var listCourse = document.querySelector('#list-course')
    var html = courses.map(function(course){
        return `<li class="course-item-${course.id}">
            <h2 class="name-course-${course.id}">${course.name}</h2>
            <p class="description-course-${course.id}">${course.description}</p>
            <button onclick ="handleDeleteCourse(${course.id})">Xóa</button>
            <button onclick="handleUpdateCourse(${course.id})">Sửa</button>
        </li>`
    })
    listCourse.innerHTML = html
}

function handleForm(){
    var createBtn = document.querySelector('#create')
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var formData = {
            name: name,
            description: description
        }
        postCourse(formData,function(){
            getCourse(renderCourse)
        })
    }
}

// function logger(log='deo co gia tri'){
//     console.log(log);
// }
// Cach 2:
// logger=(log='deo co gia tri')=>{
//     console.log(log);
// }

// Class:
// class Course{
//     constructor(name,price){
//         this.name = name;
//         this.price = price;
//     }
//     getName(){
//         return this.name;
//     }
// };

// var course = new Course('JS',1000)

// console.log(course.getName())


// Object constructor

// var user = function(name, id){
//     this.name = name;
//     this.id = id;
// };

// var customer = new user('Khai',123);
// var admin = new user('Phuong',124)

// customer.getId = function(){  // Them method cho customer
//     return customer.id;
// }

// admin.block = 'kakaka'; // them property cho admin


// console.log(customer.getId())

// Destructuring

// var array = ['JS','PHP','Ruby']
// var obj = {
//     name: 'Khai',
//     sex: 'Male',
//     handsome:true, 
// }

// var [a,... newArray ] = array;
// console.log(a)
// console.log(newArray)

// var {sex,handsome} =obj

// console.log(sex,handsome)

// Spread 
// var obj1 = {
//     name: 'Khai',
// }
// var obj2 ={
//     age: 19,
// }

// var obj3 = {
//     ...obj1,
//     ...obj2,
//     name: 'Duyen'
// }
// console.log(obj3)

// export default handleForm

// var obj1 = {
//     name:'Khai1',
//     obj2: {
//         name: 'Khai2',
//         obj3: {
//             name: 'Khai3'
//         }
//     }
// }
// if(obj1?.obj2?.obj3?.name){
//     console.log(obj1.obj2.obj3.name)

// }else{
//     alert('Nhu loz');
// }