const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const socketio = require('socket.io');

const client = require('twilio')('ACb685e6611232412b8d4a9b969e49ada4', '66ffd7bd7f1f841703f5904b076f39e7');

const app = express();

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  // res.send(req.body);
  const text = req.body.text;
  const to = req.body.number;
  const from = '+12024105673';

  client.api.messages
    .create({
      body: text,
      to: to,
      from: from,
    })
      .then((data) => {
        console.log(`Message sent with data: `);
        console.log(data);

        io.emit('status', data);
      })
      .catch((err) => {
        console.error(`Message wasn\'t sent. `);
        console.error(err);

        io.emit('status', err);
      });
});

const port = 3000;

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Connected');
  io.on('disconnect', () => {
    console.log('Disconnect');
  })
});
