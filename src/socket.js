import io from 'socket.io-client';
let socket = io.connect('localhost:8000');
export default socket;