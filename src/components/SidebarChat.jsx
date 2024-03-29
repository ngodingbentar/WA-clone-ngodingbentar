import React, {useEffect, useState} from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import firebase from 'firebase'
import db from '../firebaseConfig'
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider'

export default function SidebarChat({id, name, addNewChat}) {
  const [avatar, setAvatar] = useState('')
  const [messages, setMessages] = useState('')
  const [{user, activeTab}, dispatch] = useStateValue()

  useEffect(() => {
    if(id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        )
    }
  }, [id])

  useEffect(() => {
    setAvatar( Math.floor(Math.random() * 1000 ))
  }, [])

  const createChat = () => {
    const roomName = prompt("please enter name for chat")
    console.log('user', user)

    if(roomName) {
      db.collection('rooms').add({
        name: roomName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        description: 'room description',
        owner: {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
      })
    }
  }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className={`sidebarChat ${activeTab === id ? 'active' : ''}`}>
        <Avatar src={`https://avatars.dicebear.com/api/male/${avatar}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ): (
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add New Chat</h2>
    </div>
  )
}
