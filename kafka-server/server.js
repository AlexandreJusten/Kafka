const express = require('express');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');
const cors = require('cors'); // Importe o middleware cors

const app = express();
const port = 3000;

const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });
const producer = new kafka.Producer(kafkaClient);
const consumer = new kafka.Consumer(kafkaClient, [{ topic: 'mensagens-recebidas' }]);

app.use(bodyParser.json());

// Middleware cors configurado apenas para a rota /enviar-mensagem
app.use('/enviar-mensagem', cors());

// Endpoint para enviar mensagens
app.post('/enviar-mensagem', (req, res) => {
  const mensagem = req.body.messages;
  const group = req.body.group;

  const payloads = [{ topic: 'mensagens-enviadas', messages: mensagem, value: 2, key: group }];

  producer.send(payloads, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao enviar mensagem' });
    } else {
      res.json({ message: 'Mensagem enviada com sucesso', data });
    }
  });
});

// Endpoint para receber mensagens
app.get('/receber-mensagem', (req, res) => {
  // A resposta aqui será a mensagem recebida do tópico "mensagens-recebidas"
  // Você pode personalizar o comportamento de acordo com suas necessidades.

  res.json({ message: 'Mensagem recebida com sucesso' });
});

// Listener para mensagens recebidas do Kafka
consumer.on('message', (message) => {
  console.log('Mensagem recebida:', message.value);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
