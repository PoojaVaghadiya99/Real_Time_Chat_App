const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

var audio = new Audio('1.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left' || position == 'center')
    {
        audio.play();
    }
}

const name = prompt("Enter Your Name to Join");
socket.emit('new-user-joined',name);

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`,'right');
    socket.emit('send',message);
    messageInput.value =  "";
})

socket.on('user-joined', name => {
    append(`${name} Joined`,'center');  
})

socket.on('receive', data => {
    append(`${data.name} \n ${data.message}`,'left');  
})

socket.on('left', name => {
    append(`${name} Left The Chat`,'center');  
})