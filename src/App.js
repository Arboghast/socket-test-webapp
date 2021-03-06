import React from 'react';
import socket from './socket.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.num = 0;
    console.log("hit");
  }

  componentDidMount = () => {
    socket.on('createLobbyResponse', ({ lobbyCode }) => {
      console.log(lobbyCode);
    });

    socket.on('lobbyUpdate', ({ users, error }) => {
      console.log(users, error);
      for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
      }
    });

    socket.on('raceInit', ({ prompt, error }) => {
      console.log(prompt, error);
    });

    socket.on('updateText', ({ users }) => {
      console.log(users);
      for(let i = 0; i < users.legnth; i++)
      {
        let {percentage, placement, wpm} = users[i];
        console.log(percentage, placement, wpm);
      }
    });

  };


  render() {
    return (
      <div className="App">
        <button onClick={() => { socket.emit('newUser', { username: "lima" }); }}>INIT</button>

        <button onClick={() => { socket.emit('newUser', { username: "monkeies" }); }}>INIT</button>

        <button onClick={() => { socket.emit('createLobby', {}); }}>CREATE</button>

        <button onClick={() => { socket.emit('joinLobby', { lobbyCode: "arceux" }); }}>JOIN</button>

        <button onClick={() => { socket.emit('leaveLobby', { lobbyCode: "arceux" }); }}>LEAVE</button>

        <button onClick={() => { socket.emit('toggleReady', { lobbyCode: "arceux" }); }}>TOGGLE</button>

        <button onClick={() => { socket.emit('startGame', { lobbyCode: "arceux" }); }}>START</button>

        <button onClick={() => { socket.emit('letterTyped', { lobbyCode: "arceux", percentage: ++this.num, wpm: Math.floor(Math.random() * 100) + 1   }); }}>INC</button>

        <button onClick={() => { socket.emit('kickPlayer', { lobbyCode: "arceux", playerName: "monkeies" }); }}>KICK</button>
      </div>
    );
  }
}

export default App;
