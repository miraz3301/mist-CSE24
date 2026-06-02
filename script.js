import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
getFirestore,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
}
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

fetch("students.json")
    .then(res => res.json())
    .then(students => {

        const grid = document.querySelector(".grid");
        students.forEach(s => {
            const card = document.createElement("div");
            card.classList.add("card");

            let socials = "";

            if (s.facebook) {
                socials += `
        <a href="${s.facebook}" class="fb" target="_blank">
            <i class="fab fa-facebook-f"></i>
        </a>
    `;
            }

            if (s.linkedin) {
                socials += `
        <a href="${s.linkedin}" class="linkedin" target="_blank">
            <i class="fab fa-linkedin-in"></i>
        </a>
    `;
            }

            if (s.phone) {
                socials += `
        <button onclick="copyPhone('${s.phone}')">
            <i class="fas fa-phone"></i>
        </button>
    `;
            }

            card.innerHTML = `
    <div class="avatar">
        <img src="${s.image}" alt="${s.name}">
    </div>

    <div class="name">${s.name}</div>
    <div class="role">${s.role}</div>
    <div class="tag">${s.section}</div>

    <div class="socials">
        ${socials}
    </div>
`;

            grid.appendChild(card);
        });


        const searchInput = document.querySelector(".search-bar input");

        searchInput.addEventListener("input", function () {
            const value = this.value.toLowerCase();
            const cards = document.querySelectorAll(".card");

            cards.forEach(card => {
                const name = card.querySelector(".name").textContent.toLowerCase();
                card.style.display = name.includes(value) ? "block" : "none";
            });
        });

    });


const firebaseConfig = {
    apiKey: "AIzaSyDLidcr-mjQc067GXByR624kAxwsEkZsv4",
    authDomain: "cse24-message.firebaseapp.com",
    projectId: "cse24-message",
    storageBucket: "cse24-message.firebasestorage.app",
    messagingSenderId: "486721044271",
    appId: "1:486721044271:web:0dd35ff2ec64d7ad4a2bda",
    measurementId: "G-6HFEBEZ3L0"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const popup =
    document.getElementById("messagePopup");

const container =
    document.getElementById("messagesContainer");


window.openMessages = function () {

    popup.style.display = "flex";
}


window.closeMessages = function () {

    popup.style.display = "none";
}


window.sendMessage = async function () {

    const username =
        document.getElementById("username");

    const messageText =
        document.getElementById("messageText");


    const name =
        username.value.trim();

    const text =
        messageText.value.trim();


    if (!name || !text) {

        alert("Please enter name and message.");

        return;
    }


    try {

        await addDoc(
            collection(db, "messages"),
            {

                name: name,

                text: text,

                createdAt: serverTimestamp()
            }
        );


        messageText.value = "";

    }

    catch (err) {

        alert("Failed to send message.");

        console.error(err);
    }
}


const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "desc")
);


onSnapshot(q, (snapshot) => {

    container.innerHTML = "";


    if (snapshot.empty) {

        container.innerHTML = `
            <div class="message">
                No messages yet.
            </div>
        `;

        return;
    }


    snapshot.forEach((doc) => {

        const msg = doc.data();

        let time = "Just now";


        if (msg.createdAt) {

            time =
                msg.createdAt
                    .toDate()
                    .toLocaleString();
        }


        const div =
            document.createElement("div");

        div.className = "message";


        div.innerHTML = `

            <div class="message-name">
                ${msg.name}
            </div>

            <div class="message-text">
                ${msg.text}
            </div>

            <div class="message-time">
                ${time}
            </div>

        `;


        container.appendChild(div);

    });

});
