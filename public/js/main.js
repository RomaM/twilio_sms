const numberInput = document.getElementById('number'),
      textInput = document.getElementById('msg'),
      button = document.getElementById('button'),
      response = document.querySelector('.response');

const send = () => {
  const number = numberInput.value;
  const text = textInput.value;
  const url = 'https://www.domain.com/?coc=asd123';

  const message = text.concat(' - ').concat(url.toString());

  fetch('/',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({number: number, text: message})
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

button.addEventListener('click', send, false);

const socket = io();
socket.on('status', (data) => {
  console.log(data);
  response.innerHTML = JSON.stringify(data);
});