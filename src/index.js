import '@fortawesome/fontawesome-free/js/all.js';
import { loadPage, loadProjects, populateEditForm } from './modules/display-controller';
import { todoFactory, getProjects, toggleCompleted, filterTodos } from './modules/todos'


// form elements and buttons
const newTodoButton = document.getElementById('new-todo-button');
const newTodoForm = document.querySelector('.new-todo form');
const editTodoForm = document.querySelector('.edit-todo form');
const closeNewForm = document.querySelector('.new-todo span');
const closeEditForm = document.querySelector('.edit-todo span');

// sidebar navigation links
const homeLink = document.getElementById('home');
const uncategorizedLink = document.getElementById('uncategorized');
// sidebar project inks
const projectsLink = document.getElementById('projects');
const projectList = document.querySelector('.project-list');

const todoWrapper = document.querySelector('.todo-wrapper');

// checks for any available data in the local storage
// otherwise assigns it to an empty object to prevent any rendering errors
const todos = JSON.parse(localStorage.getItem('todos')) || [];
let projects = getProjects(todos);


function addTodo (e) {
    e.preventDefault();
    
    let title = this.querySelector('[name=title]').value;
    let description = this.querySelector('[name=description]').value;
    let date = this.querySelector('[name=date]').value;
    let project = this.querySelector('select').value;

    let todo = todoFactory(title, description, date, project);
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    toggleNewModal();

    // checks if new to-do has an assigned project
    // then renders the project view or the home page
    if (project.length > 0) {
        loadPage(project, filterTodos(todos));
        projects = getProjects(todos);
        loadProjects(projects);
        setSidebarListeners(); 
    } else {
        loadPage('Home', todos)
    }

    this.reset();
}

function editTodo (e) {
    e.preventDefault();
    
    let title = this.querySelector('[name=title]').value;
    let description = this.querySelector('[name=description]').value;
    let date = this.querySelector('[name=date]').value;
    let project = this.querySelector('select').value;

    let index = this.querySelector('input[type = "hidden"]').value;

    let todo = todoFactory(title, description, date, project);
    todos[index] = todo;
    localStorage.setItem('todos', JSON.stringify(todos));
    toggleEditModal();

    // checks if edited to-do has an assigned project
    // then renders the project view or the home page
    if(project.length > 0){
        loadPage(project, filterTodos(todos));
        projects = getProjects(todos);
        loadProjects(projects);
        setSidebarListeners(); 
    }else{
        loadPage('Home', todos)
    }
    this.reset();
}


function toggleNewModal() {
    let modal = document.querySelector('.new-todo');
    modal.classList.toggle('modal-active');
}

function toggleEditModal(){
    let modal = document.querySelector('.edit-todo');
    modal.classList.toggle('modal-active');
}



// handle clicks for individual to-do items
function handleClick (e) {
    if (e.target.matches('input')) {
        let index = e.target.dataset.index;
        this.querySelector(`.item${index}`).classList.toggle('completed');
        toggleCompleted(todos, index);
        localStorage.setItem('todos', JSON.stringify(todos));
    } else if (e.target.matches('button')){
        let index = e.target.value;
        let item = todos[index];
        toggleEditModal();
        populateEditForm(index, item);
    }
}

// sets listeners for the navigation and the project links
const setSidebarListeners = () => {
    const sideLinks = document.querySelectorAll('.side-link');
    sideLinks.forEach(link => {
        link.addEventListener('click', () => {
            let current = document.querySelector('.active-link');
            if(current){
                current.classList.remove('active-link');
            }
            link.classList.add('active-link');
        })
    })
}

// submit listeners for forms
newTodoForm.addEventListener('submit', addTodo);
editTodoForm.addEventListener('submit', editTodo);

homeLink.addEventListener('click', () => loadPage('Home', todos));
uncategorizedLink.addEventListener('click', () => loadPage('Uncategorized', filterTodos(todos)));

newTodoButton.addEventListener('click', toggleNewModal);
closeNewForm.addEventListener('click', toggleNewModal);
closeEditForm.addEventListener('click', toggleEditModal);

todoWrapper.addEventListener('click', handleClick);

projectList.addEventListener('click', (e) => {
    if(e.target.matches('li')){
        let project = e.target.textContent;
        loadPage(project, filterTodos(todos, project));
    }
})

projectsLink.addEventListener('click',  () => {
    projectList.classList.toggle('expand');
});






// initializes the app with rendering the 'home' view
loadPage('Home', todos);
loadProjects(projects);
setSidebarListeners();



