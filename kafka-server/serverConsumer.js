const express = require('express');
const kafka = require('kafka-node');
const cors = require('cors'); // Importe o middleware cors

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });
const consumer = new Consumer(client, [{ topic: 'mensagens-enviadas', partition: 0 }], { autoCommit: false });

const app = express();
const port = 4000;

// Configure o CORS
app.use(cors());

const messages = [];

app.get('/mensagens', (req, res) => {
  res.json({ mensagens: messages });
});

consumer.on('message', (message) => {
  console.log('Mensagem recebida:', message);

  messages.push(message);

  if (messages.length > 100) {
    messages.shift();
  }
});

consumer.on('error', (err) => {
  console.error('Erro no Consumer:', err);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
