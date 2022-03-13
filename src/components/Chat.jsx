import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import './Chat.css'

export default function Chat() {
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    setAvatar( Math.floor(Math.random() * 1000 ))
  }, [])
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

      </div>

      <div className="chat__footer">
        
      </div>
    </div>
  )
}
