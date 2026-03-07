async function sendMessage(){

const input = document.getElementById("userInput");
const apiKey = document.getElementById("apiKey").value;

const text = input.value;

if(!text) return;

const chatBox = document.getElementById("chatBox");


// user message

const userMsg = document.createElement("div");
userMsg.className = "message user";
userMsg.innerText = text;

chatBox.appendChild(userMsg);

input.value = "";


// bot placeholder

const botMsg = document.createElement("div");
botMsg.className = "message bot";

chatBox.appendChild(botMsg);


const res = await fetch("/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text,
apiKey:apiKey
})

});

const reply = await res.text();


// typing animation

let i = 0;

function type(){

if(i < reply.length){

botMsg.innerText += reply[i];

i++;

setTimeout(type, 10);

}

}

type();

chatBox.scrollTop = chatBox.scrollHeight;

}


function newChat(){

document.getElementById("chatBox").innerHTML="";

}