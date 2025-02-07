const nameInput = document.getElementById("my-name-input");
const messgeInput = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function formatMessage(messageObj, myNameInput){
  let chatboxHTML = "";
  const text = messageObj.text;
  const sender = messageObj.sender;
  const timestamp = messageObj.timestamp;
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString('en-us');

  if (messageObj.sender === myNameInput){
    chatboxHTML = `<div class="mine messages">
                    <div class="message">
                      ${text}
                    </div>
                  </div>
                  <div class="sender-info">
                    ${time}
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

function fetchMessage(){
  const arrMsg = [{
    'id': 1,
    'text': "What up?",
    'sender': "Krish Sah",
    'timestamp': 1537410673072
  },
{
  'id': 2,
    'text': "good",
    'sender': "Jonny Boi",
    'timestamp': 1537410673072*100
},
{
  'id': 3,
    'text': "Kill Them!",
    'sender': "Thomas Shelby",
    'timestamp': 1537410673072*1000
}];
  return arrMsg;
};

function updateMessageInChatBox(){
  const messages = fetchMessage()
  let formatedMessage = "";
  messages.forEach(messages => {
    formatedMessage += formatMessage(messages,nameInput.value);
  });
chatBox.innerHTML = formatedMessage;
};

updateMessageInChatBox();