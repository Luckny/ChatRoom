import './App.css';
import Socket from './Socket';


export default function App() {
  const socket = new Socket()
  socket.connect()

  const handleClick = () => {
    socket.sendMessage("Hello, World!");
  }

  return <div>
    <p>We made it</p>
    <button onClick={handleClick}>Send Message</button>
  </div>
}
