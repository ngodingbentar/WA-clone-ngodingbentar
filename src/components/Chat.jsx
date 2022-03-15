import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, DonutLarge, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import './Chat.css'
import { useParams } from 'react-router-dom'
import db from '../firebaseConfig'
import firebase from 'firebase'
import { useStateValue } from '../StateProvider'

export default function Chat() {
  const [avatar, setAvatar] = useState('')
  const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState()
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
    if(roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ))

      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc => doc.data()))
      ))
    }
  },[roomId])

  useEffect(() => {
    setAvatar( Math.floor(Math.random() * 1000 ))
  }, [roomId])

  useEffect(() => {
    function getUniqueListBy(messages, key) {
      return [...new Map(messages.map(item => [item[key], item])).values()]
    }
    
    // const arr1 = getUniqueListBy(messages, 'uid')
    setUsers(getUniqueListBy(messages, 'uid').length)
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
    })

    setInput('')
  }
  const cek = () => {
    function getUniqueListBy(messages, key) {
        return [...new Map(messages.map(item => [item[key], item])).values()]
    }
    
    const arr1 = getUniqueListBy(messages, 'uid')
    
    console.log("Unique by place", arr1.length)
  }
  return (
    <div className='chat'>

      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/male/${avatar}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>{users} participants</p>
          {/* <p>
            Last seen{' '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p> */}
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
        {messages.map((message) => (
          <p key={message.timestamp} className={`chat__message ${message.uid === user.uid && 'chat__receiver'}`}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <button onClick={cek}>cek</button>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Message'
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
