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


//read
const ul = document.getElementById('ul')
const starCountRef = ref(db, 'users');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  var lastKey = Object.keys(data).pop()
  console.log(lastKey)
  console.log(data)
  for (const [key, value] of Object.entries(data)) {
    if (key == lastKey) {
      console.log(value.text);
      const li = document.createElement('li')
      li.innerText = value.text
      ul.appendChild(li)
    }
  }

});

//add
const send = document.getElementById('send')
const text = document.getElementById('text')
send.addEventListener('click', async (e) => {
  console.log(Date.now())
  // writeUserData(Date.now(),'commy',"cookmeon")
  writeUserData(Date.now(),text.value)
  text.value = ''

})

text.addEventListener("keyup", function(event) {
  console.log(Date.now())
  // writeUserData(Date.now(),'commy',"cookmeon")
  if (event.key === 'Enter') {
    // code for enter
    writeUserData(Date.now(),text.value)
    text.value = ''
  }
});

function writeUserData(userId, text) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    text: text,
  });
}