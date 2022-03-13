import React, {useEffect, useState} from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'

export default function SidebarChat({addNewChat}) {
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    setAvatar( Math.floor(Math.random() * 1000 ))
  }, [])

  const createChat = () => {
    const roomName = prompt("please enter name for chat")

    if(roomName) {
      
    }
  }
  return !addNewChat ? (
    <div className='sidebarChat'>
      <Avatar src={`https://avatars.dicebear.com/api/male/${avatar}.svg`} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  ): (
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add New Chat</h2>
    </div>
  )
}
