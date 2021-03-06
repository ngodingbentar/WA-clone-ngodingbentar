import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebaseConfig'
import { actionTypes } from '../reducer';
import './Login.css'
import { useStateValue } from '../StateProvider';

function Login() {
  const [{}, dispatch] = useStateValue()
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        })
      })
      .catch((error) => alert(error.message))
  }
  return (
    <div className='login'>
      <div className="login__container">
        {/* <img src="" alt="myimage" /> */}
        <div className="login__text">
          <h1>Sign to whatsApp</h1>
        </div>

        <Button onClick={signIn}>
          Sign in with google
        </Button>
      </div>
    </div>
  )
}

export default Login