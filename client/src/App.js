import './App.css';
import { useRef } from 'react';
import { useEffect, useState} from 'react';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")
function App() {

  const msgRef = useRef('')
  const roomRef = useRef('')
  const nameRef = useRef('')
  const [chatMessages, setChatMessages] = useState([])

  const sendMessage = (event)=>{
    const messageData = {message:msgRef.current.value,room:roomRef.current.value,name:nameRef.current.value}
    socket.emit('message',messageData)
    setChatMessages([...chatMessages, messageData])

  }
  const joinRoom = (event)=>{
    socket.emit('join_room',{room:roomRef.current.value,name:nameRef.current.value})
  }

  useEffect(()=>{

    socket.on('recieve_message',(data)=>{
      setChatMessages([...chatMessages, data])
    })
    socket.on('joined_room',(data)=>{
      setChatMessages([{ name: data.name, message: 'Joined the room' }])
    })
  },[socket,chatMessages])
  return (
    <div className="App">
      <input ref={nameRef} type="text" placeholder="Username..." />

      <input ref={msgRef} type="text" placeholder="Message..." />
      <input ref={roomRef} type="text" placeholder="Join Room..." />
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={joinRoom}>Join Room</button>
      <div>{chatMessages.map((message, index) => (
          <div key={index}>{message.name}: {message.message}</div>
        ))}</div>
    </div>
  )
}

export default App;
