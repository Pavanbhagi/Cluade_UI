let chatBox = document.getElementById("chatBox");
let historyBox = document.getElementById("history");

let chats = [];
let currentChat = [];

/* Markdown Support */
function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")   // Bold
    .replace(/`(.*?)`/g, "<code>$1</code>")  // Inline Code
    .replace(/\n/g, "<br>");                // Line breaks
}

/* Add Message */
function addMessage(text, type) {
  let msg = document.createElement("div");
  msg.className = "message " + type;
  msg.innerHTML = formatMarkdown(text);

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  currentChat.push({ text, type });
}

/* Send Message */
function sendMessage() {
  let input = document.getElementById("userInput");
  let userText = input.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");
  input.value = "";

  setTimeout(() => {
    addMessage("🤖 Claude reply with **Markdown**: \nYou said: `" + userText + "`", "bot");
  }, 800);
}

/* New Chat */
function newChat() {
  if (currentChat.length > 0) {
    chats.push(currentChat);
    updateHistory();
  }

  currentChat = [];
  chatBox.innerHTML = "";
  addMessage("New chat started 👋", "bot");
}

/* Update Sidebar History */
function updateHistory() {
  historyBox.innerHTML = "";

  chats.forEach((chat, index) => {
    let item = document.createElement("div");
    item.innerText = "Chat " + (index + 1);

    item.onclick = () => loadChat(index);
    historyBox.appendChild(item);
  });
}

/* Load Previous Chat */
function loadChat(index) {
  chatBox.innerHTML = "";
  currentChat = chats[index];

  currentChat.forEach(msg => {
    addMessage(msg.text, msg.type);
  });
}

/* Dark Mode Toggle */
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}