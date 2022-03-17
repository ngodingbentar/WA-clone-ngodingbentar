import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, Close, DonutLarge, InsertEmoticon, Link, Mic, MoreVert, Notifications, PersonAddDisabledRounded, PersonAddOutlined, PersonAddRounded, SearchOutlined, Star } from '@material-ui/icons'
import './Chat.css'
import './Chat.scss'
import { useParams } from 'react-router-dom'
import db from '../firebaseConfig'
import firebase from 'firebase'
import { useStateValue } from '../StateProvider'

export default function Chat() {
  const [avatar, setAvatar] = useState('')
  const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [room, setRoom] = useState({})
  const [messages, setMessages] = useState([])
  const [datas, setDatas] = useState([])
  const [users, setUsers] = useState()
  const [{user}, dispatch] = useStateValue()
  const [createdRoom, setCreatedRoom] = useState('')

  useEffect(() => {
    if(roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
        setRoom(snapshot.data())
      ))

      var day = new Date(room.timestamp?.toDate()).getDate();
      var month = new Date(room.timestamp?.toDate()).getMonth() + 1;
      var year = new Date(room.timestamp?.toDate()).getFullYear();
      setCreatedRoom(`${month}/${day}/${year}`)

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
    
    setUsers(getUniqueListBy(messages, 'uid').length)
    setDatas(getUniqueListBy(messages, 'uid'))
    console.log('datas', datas)
    console.log('users', getUniqueListBy(messages, 'uid'))
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      photoUrl: user.photoURL,
    })

    setInput('')
  }
  const cek = () => {
    console.log('room', user)
  }

  const [detail, setDetail] = useState(false)

  const openDetail = () => {
    setDetail(!detail)
  }
  return (
    <div className='chat'>
      <div className='chat__left'>
        <div className="chat__header" onClick={openDetail}>
          <Avatar src={`https://avatars.dicebear.com/api/male/${avatar}.svg`} />

          <div className="chat__headerInfo">
            <h3>{room.name}</h3>
            <p>{users} participants</p>
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
      {detail && (
        <div className='chat__right'>
          <div className="chat__header">
            <IconButton>
              <Close onClick={openDetail} />
            </IconButton>
            <h3>Group info</h3>
          </div>

        <div className="chat__body">
          <div className="avatar">
            <img src={`https://avatars.dicebear.com/api/male/${avatar}.svg`} />
            <div>
              <h3>{room.name}</h3>
              <p>Group - {users} participants</p>
            </div>
          </div>
          <div className="card">
            {room.description ? (
              <div>
                <p style={{color:'#00a884'}}>{room.description}</p>
                <p className='text-xs text-gray-1'>Created by {room.owner.name}, {createdRoom}</p>
              </div>
            ) : (
              <div>
                <p>Add group description</p>
              </div>
            )}
          </div>
          <div className="card">
            <p className='text-gray-1'>Media, links, and docs</p>
          </div>

          <div className="card flex-row">
            <Star/>
            <p className=''>Starred messages</p>
          </div>

          <div className="card">
            <div className='item flex-row'>
              <Notifications/>
              <p className=''>Mute notifications</p>
            </div>
            <div className='item flex-row'>
              <Notifications/>
              <p className=''>Disappearing messages</p>
            </div>
            <div className='item flex-row'>
              <Notifications/>
              <p className=''>Group setting</p>
            </div>
          </div>

          <div className="card participants">
            <div className='flex-row search'>
              <p className='text-sm'>{users} participants</p>
              <SearchOutlined />
            </div>

            <div className='icon-fill mt-4'>
              <PersonAddRounded/>
              <p>Add participant</p>
            </div>

            <div className='icon-fill mt-4'>
              <Link/>
              <p>Invite to group via link</p>
            </div>

            {datas.map((user) => (
              <div className='flex-row icon-fill mt-4'>
                <img className='photo' src={user.photoUrl} />
                <p>{user.name}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
      )}
    </div>
  )
}
