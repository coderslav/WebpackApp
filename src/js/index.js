import Post from "models/post.js";
import 'styles/index.css';
import testJSON from 'assets/json/json_Test.json';
import image from 'assets/images/Telegram_black.png';

const post = new Post('New Post', image);

function getJson(){
    fetch('http://localhost:3000/post').then(response => response.json()).then(data => {
        backendJsonContainer.textContent = JSON.stringify(data, null, '\t');
        jsonBackendTitle.parentNode.insertBefore(backendJsonContainer, jsonBackendTitle.nextSibling);
        window.scrollTo(0, document.body.scrollHeight);
    }).catch(ev => window.alert(`${ev}. Кажется, вы не запустили JSON-сервер :)`));
}

const jsonClassTitle = document.getElementById('jsonClass');
const jsonFileTitle = document.getElementById('jsonFile');
const jsonBackendTitle = document.getElementById('jsonBackend');

let classJsonContainer = document.createElement('pre');
let fileJsonContainer = document.createElement('pre');
let backendJsonContainer = document.createElement('pre');

classJsonContainer.textContent = post.customToString();
fileJsonContainer.textContent = JSON.stringify(testJSON, null, '\t');
jsonBackendTitle.addEventListener('click', getJson);

jsonFileTitle.parentNode.insertBefore(fileJsonContainer, jsonFileTitle.nextSibling);
jsonClassTitle.parentNode.insertBefore(classJsonContainer, jsonClassTitle.nextSibling);