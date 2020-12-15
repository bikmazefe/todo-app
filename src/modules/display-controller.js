const todoWrapper = document.querySelector('.todo-wrapper');

// fills the form fields with the related to-do's information
const  populateEditForm = (index, item) => {
    let form = document.querySelector('.edit-todo form');

    let hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.value = index;

    form.appendChild(hidden);

    form.querySelector('[name=title]').value = item.title;
    form.querySelector('[name=description]').value = item.description
    form.querySelector('[name=date]').value = item.dueDate;
    form.querySelector('select').value = item.project;
}


// populates the view
const populateTodos = (arr) => {
    todoWrapper.innerHTML = arr.map((item, index) => {
        return `
                <div class = "todo">
                    <li class = "item${index} ${item.completed ? 'completed' : '' }">
                        <input type = "checkbox" data-index = ${index} id = "item${index}"  ${item.completed ? "checked" : ""}/>
                        <label for = "item${index}"></label>
                    </li>
                    <button value = ${index}>edit</button>
                </div>
                `
    }).join("");
}

const loadPage = (title, arr) => {
    let pageTitle = document.getElementById('page-title');
    pageTitle.textContent = title;
    todoWrapper.innerHTML = "";
    populateTodos(arr);
}


const loadProjects = (projects) => {
   let projectList = document.querySelector('.project-list');

    projectList.innerHTML = projects.map(item => {
        return `
            <li class = "side-link project-link">${item}</li>
        `
    }).join("");
}




export { loadPage, loadProjects, populateEditForm }


