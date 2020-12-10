import '@fortawesome/fontawesome-free/js/all.js';
import {todoFactory} from './modules/todos';






const sideLinks = document.querySelectorAll('.side-link');
console.log(sideLinks);
sideLinks.forEach(link => {
    link.addEventListener('click', () => {
        let current = document.querySelector('.active-link');
        if(current){
            current.classList.remove('active-link');
        }
        link.classList.add('active-link');
    })
})

const projects = document.getElementById('projects');
projects.onclick = () => {
    let icon = projects.querySelector('.chevron');
    let projectList = document.querySelector('.project-list');
    projectList.classList.toggle('expand');
    if(projectList.classList.contains('expand')){
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    }else{
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

todoFactory();