const nameInput = document.getElementById("my-name-input");
const messageInput = document.getElementById("my-message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function formatMessage(messageObj, myNameInput){
  let chatboxHTML = "";
  const text = messageObj.text;
  const sender = messageObj.sender;
  const timestamp = messageObj.timestamp;
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString(`en-us`);
  if (messageObj.sender === myNameInput){
    chatboxHTML = `<div class="mine messages">
                    <div class="message">
                      ${text}
                    </div>
                    <div class="sender-info">
                      ${sender} ${time}
                    </div>
                  </div>`
  }else{
    chatboxHTML = `<div class="yours messages">
    <div class="message">
        ${text}
    </div>
    <div class="sender-info">
        ${sender} ${time}
    </div>
</div>`
  }
  return chatboxHTML;
};

async function fetchMessages(){
  try{
    const response = await fetch('https://it3049c-chat.fly.dev/messages');
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json()
    return data
  }catch(error){
    console.log(error)
  }
};

async function updateMessageInChatBox(){
  const messages = await fetchMessages()
  let formatedMessage = "";
  messages.forEach(messages => {
    formatedMessage += formatMessage(messages,nameInput.value);
  });
chatBox.innerHTML = formatedMessage;
};

async function send(sender, message){
  const timestamp = new Date()
  const messageObject = {
    "sender": sender,
    "text": message,
    "timestamp": timestamp
  }
  try{
    await fetch('https://it3049c-chat.fly.dev/messages', {
      method: "POST",
      body: JSON.stringify(messageObject),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    await updateMessageInChatBox();
  }catch(error){
    console.log(error)
  }
}

sendButton.addEventListener(`click`, function(e){
  e.preventDefault();
  const sender = nameInput.value
  const message = messageInput.value
  send(sender,message);
  messageInput.value = ""
});
setInterval(updateMessageInChatBox, 5000);
updateMessageInChatBox();