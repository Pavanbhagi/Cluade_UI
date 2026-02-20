async function sendMessage() {
  let input = document.getElementById("userInput");
  let userText = input.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");
  input.value = "";

  let msg = document.createElement("div");
  msg.className = "message bot";
  chatBox.appendChild(msg);

  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    let chunk = decoder.decode(value);
    fullText += chunk;

    msg.innerHTML = formatMarkdown(fullText);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  currentChat.push({ text: fullText, type: "bot" });
}
