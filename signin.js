// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, query, getDocs, doc, setDoc, addDoc, deleteDoc, where, orderBy, onSnapshot, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
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
const db = getFirestore(app);

const formr = document.getElementById('register_form')
const forml = document.getElementById('login_form')
const lisu = []
const re_username = document.getElementById('re_username')

//login
forml.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (lisu.includes(forml.username.value)) {
        const username = forml.username.value
        const password = forml.password.value
        console.log('username', username)

        //where user
        const users = collection(db, "users");
        const q = query(users, where("username", '==', username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (password == doc.data().password) {
                // alert('ผ่าน')
                var queryString = "?para1=" + username;
                window.location.href = "chat.html" + queryString;
            } else {
                alert('password wrong!')
                forml.password.value = ''
            }
        });
    } else {
        alert('username wrong!')
        forml.username.value = ''
        forml.password.value = ''
    }
})

//check user is used
re_username.addEventListener('input', async (e) => {
    if (lisu.includes(e.target.value)) {
        $(document).ready(function () {
            $("#used").show(300);
            $("#register_form_btn").hide(300);
        });
    } else {
        $(document).ready(function () {
            $("#used").hide(300);
            $("#register_form_btn").show(300);
        });
    }
})

//add new user // regis
formr.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (lisu.includes(formr.username.value)) {
        console.log('no')
    } else {
        await addDoc(collection(db, "users"), {
            username: formr.username.value,
            password: formr.password.value
        })
        lisu.push(formr.username.value)
        $(document).ready(function () {
            $(".register").hide();
            $(".login").show(300);
            document.getElementById('login').classList.remove('opacity')
            document.getElementById('regis').classList.add('opacity')
            formr.username.value = ''
            formr.password.value = ''
        });
    }
})

//read all user for username
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    lisu.push(doc.data().username)
});
console.log(lisu)