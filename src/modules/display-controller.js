import {formatDistanceToNow, format} from 'date-fns';

const todoWrapper = document.querySelector('.todo-wrapper');


const truncate = (text) => {
    if(text.length > 15){
        text.slice(0,14);
        return text +=  '...';
    }else{
        return text;
    }
}

// populates the project select options in the given form
const populateProjectOptions = (element, projects, item = {}) => {
    let select = element.querySelector('select');

    let options = select.querySelectorAll('option');
    options.forEach(option => option.remove());

    let projectOptions = [...projects]

    projectOptions.unshift('---')
    
    projectOptions.map(project => {
        let option = document.createElement('option');
        option.text = project;
        if(item.project && item.project === project){
            option.selected = true;
        }
        select.add(option);
    })
}

// fills the form fields with the related to-do's information
const  populateEditForm = (index, item, projects) => {
    let form = document.querySelector('.edit-todo form');

    let hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.value = index;

    form.appendChild(hidden);

    form.querySelector('[name=title]').value = item.title;
    form.querySelector('[name=description]').value = item.description;
    form.querySelector('[name=date]').value = item.dueDate;
    form.querySelector('select').value = item.project;

    populateProjectOptions(form, projects, item);
}


// loads projects into the sidebar
const loadProjects = (projects) => {
    let projectList = document.querySelector('.project-list');
 
     projectList.innerHTML = projects.map(item => {
         return `
             <li class = "side-link project-link">${item}</li>
         `
     }).join("");
 }


// populates the view
const populateTodos = (arr) => {
    todoWrapper.innerHTML = arr.map((item, index) => {
        return `
                <div class = "todo">
                    <li class = "item${index} ${item.completed ? 'completed' : '' }">
                        <input type = "checkbox" data-index = ${index} id = "item${index}"  ${item.completed ? "checked" : ""}/>
                        <label for = "item${index}"></label>
                        <span class = "todo-title">${truncate(item.title)}</span>
                        <span class = "todo-date">${formatDistanceToNow(new Date(item.dueDate), { addSuffix: true })}</span>
                        <img class = "expand-button" src = "./images/chevron-down.svg">
                    </li>
                    <div class = "details">
                            <p><strong>Due Date:</strong> <br> ${format(new Date(item.dueDate), 'dd/MM/yyyy')}</p>
                            <p><strong>Project:</strong> <br> ${item.project.length > 0 ? item.project : "Uncategorized"}</p>
                            <p class = "todo-description"><strong>Details:</strong> <br> ${item.description}</p>
                        <img class = "edit-button" data-index = ${index} src = "./images/edit.svg"/>
                    </div>

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






export { loadPage, loadProjects, populateEditForm, populateProjectOptions }


