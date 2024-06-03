import { useState } from "react"
import useSocketContext from "../../context/websocket/useSocketContext"

export default function Chat() {
  const { sendMessage } = useSocketContext()
  const [message, setMessage] = useState("")
  const handleSubmit = (event: any) => {
    event.preventDefault()
    sendMessage(message)
  }
  return (
    <div>
      <h1>Chat</h1>
      <form action="">
        <textarea name="" id="" onChange={(event) => setMessage(event.target.value)}></textarea>
        <button onClick={handleSubmit}>Send chat</button>
      </form>
    </div>
  )
}
