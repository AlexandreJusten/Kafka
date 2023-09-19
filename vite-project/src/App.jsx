import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newUser, setNewUser] = useState('');


  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:4000/mensagens');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.mensagens);
      } else {
        console.error('Erro ao buscar mensagens');
      }
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  const setupMessagePolling = () => {
    fetchMessages(); 

    setInterval(fetchMessages, 1000); 
  };

  useEffect(() => {
    setupMessagePolling(); 
  }, []);

  async function enviarMensagem() {
    try {
      const response = await fetch('http://localhost:3000/enviar-mensagem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newUser+" : "+ newMessage,
          group: "12",
        }),
      });

      if (response.ok) {
        setNewMessage('');
      } else {
        console.error('Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="vite logo" />
        <h1>Mensagens Kafka</h1>
        <input
          type="text"
          placeholder="nome"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
         <input
          type="text"
          placeholder="Digite uma nova mensagem"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={enviarMensagem}>Enviar</button>
        <ul>
         
          {messages.slice(-4).map((message, index) => (
            <li key={index}>{message.value}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
