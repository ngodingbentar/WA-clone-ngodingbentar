import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, DonutLarge, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import './Chat.css'

export default function Chat() {
  const [avatar, setAvatar] = useState('')
  const [input, setInput] = useState('')

  useEffect(() => {
    setAvatar( Math.floor(Math.random() * 1000 ))
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    console.log('your type =>', input)

    setInput('')
  }
  return (
    <div className='chat'>

      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/male/${avatar}.svg`} />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
        <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className={`chat__message ${true && 'chat__receiver'}`}>
          <span className='chat__name'>Dew</span>
          hey
          <span className='chat__timestamp'>3:45pm</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text' />
          <button
            onClick={sendMessage}
            type='submit'>
              Send message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  )
}
