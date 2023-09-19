const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });
const consumer = new Consumer(client, [{ topic: 'mensagens-enviadas', partition: 0 }], { autoCommit: false });

consumer.on('message', (message) => {
  console.log('Mensagem recebida:', message);
});

consumer.on('error', (err) => {
  console.error('Erro no Consumer:', err);
});
