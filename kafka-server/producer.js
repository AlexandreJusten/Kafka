const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' }); // Substitua KAFKA_SERVER pelo endereço do seu servidor Kafka

const producer = new Producer(client);

producer.on('ready', () => {
  console.log('Producer está pronto');
});

producer.on('error', (err) => {
  console.error('Erro no Producer:', err);
});

// Enviar uma mensagem para um tópico
producer.send([{ topic: 'chat', messages: 'Olá, mundo!' }], (err, data) => {
  if (err) {
    console.error('Erro ao enviar mensagem:', err);
  } else {
    console.log('Mensagem enviada:', data);
  }
});
