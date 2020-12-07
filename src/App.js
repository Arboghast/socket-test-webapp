import React from 'react';
import socket from './socket.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.num = 0;
    console.log("hit");
  }

  componentDidMount = () =>{
    socket.on('createLobbyResponse', ({lobbyCode})=>{
      console.log(lobbyCode);
    });

    socket.on('lobbyUpdate', ({users, error})=>{
      console.log(users,error);
        for(let i = 0; i < users.length; i++)
        {
          console.log(users[i]);
        }
    });

    socket.on('raceInit', ({prompt, error})=>{
      console.log(prompt,error);
    });

    socket.on('updateText', ({playerName, percentage, placement, error})=>{
      console.log(playerName, percentage, placement, error);
    });

  };


  render() {return (
      <div className="App">
        <button onClick={()=>{socket.emit('createLobby', { username: "mela"});}}>CREATE</button>

        <button onClick={()=>{socket.emit('joinLobby', {lobbyCode: "arceux", username: "monkeies"});}}>JOIN</button>

        <button onClick={()=>{socket.emit('leaveLobby', {lobbyCode: "arceux"});}}>LEAVE</button>

        <button onClick={()=>{socket.emit('toggleReady', {lobbyCode: "arceux"});}}>TOGGLE</button>

        <button onClick={()=>{socket.emit('startGame', {lobbyCode: "arceux"});}}>START</button>

        <button onClick={()=>{socket.emit('letterTyped', {lobbyCode: "arceux", percentage: ++this.num });}}>START</button>

        <button onClick={()=>{socket.emit('returnLobby', {lobbyCode: "arceux"});}}>RETURN</button>
      </div>
    );
  }
}

export default App;
