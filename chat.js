// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, push, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwf8ybAtDISLJUTZUSQaLhLAd9AGr2P-s",
  authDomain: "chat-rt-db.firebaseapp.com",
  databaseURL: "https://chat-rt-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-rt-db",
  storageBucket: "chat-rt-db.appspot.com",
  messagingSenderId: "16787807366",
  appId: "1:16787807366:web:1ea40b7f9edc0f91724507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//รับค่า username
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
const username = (queryString.split('=')[1])

//กล่อง chat
const chat = document.getElementById('chat')

//read
const ul = document.getElementById('ul')
const starCountRef = ref(db, 'users');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  const obj = Object.entries(data).length
  // var lastKey = Object.keys(data).pop()
  // console.log('lastkey',lastKey)
  const text = Object.entries(data)[obj - 1][1].text
  const user = Object.entries(data)[obj - 1][1].username
  console.log('text', text)
  console.log('user', user)

  const div = document.createElement('div')
  const p = document.createElement('p')
  const div2 = document.createElement('div');
  p.innerText = text
  if (user == username) {
    div.className = 'right'
    div2.className = 'right'
  } else {
    div.className = 'left'
    div2.className = 'left'
  }
  if (user != Object.entries(data)[obj - 2][1].username) {
    const h4 = document.createElement('h4');
    h4.innerText = user
    div2.appendChild(h4)
    chat.appendChild(div2)
  }
  div.appendChild(p)
  chat.appendChild(div)

});

//add
const send = document.getElementById('send')
const text = document.getElementById('text')
send.addEventListener('click', async (e) => {
  if (text.value == null || text.value.trim() === '') {
    console.log('commy')
  } else {
    writeUserData(Date.now(), text.value, username)
  }
  text.value = ''

})

text.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    if (text.value == null || text.value.trim() === '') {
      console.log('commy')
    } else {
      writeUserData(Date.now(), text.value, username)
    }
    text.value = ''
  }
});

function writeUserData(userId, text, username) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    text: text,
    username: username
  });
}