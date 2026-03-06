async function sendMessage(){

const input=document.getElementById("userInput");
const apiKey=document.getElementById("apiKey").value;

const text=input.value;

if(!text) return;

const chatBox=document.getElementById("chatBox");

/* user message */

const userMsg=document.createElement("div");
userMsg.className="message user";
userMsg.innerText=text;
chatBox.appendChild(userMsg);

input.value="";

/* request */

const res=await fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:text,
apiKey:apiKey
})
});

const reply=await res.text();

/* bot message */

const botMsg=document.createElement("div");
botMsg.className="message bot";
botMsg.innerText=reply;

chatBox.appendChild(botMsg);

chatBox.scrollTop=chatBox.scrollHeight;

}

/* new chat */

function newChat(){
document.getElementById("chatBox").innerHTML="";
}