import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import ChatRoom from './components/ChatRoom'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Lato';
  }
  a {
    color: #00b4ff;
  }
`


const ChatWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.8)),url(http://blogs.helsinki.fi/neurodynamics2014/files/2014/01/HELSINKI_kesa.jpg);
  background-position: 30% 30%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const WelcomeBox = styled.div`
  width: 85%;
  height: 80%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  border-radius: 5px;
  background:  rgba(255,255,255,0.25);
  box-shadow: 0 0 20px 5px #00000069;
  align-items: center;
`

class App extends Component {
  render() {
    return (
      <ChatWrapper>
        <WelcomeBox>
          <h1 style={{ color: 'floralwhite' }}>Welcome to Helpsinki!</h1>
          <ChatRoom />
        </WelcomeBox>
      </ChatWrapper>
    )
  }
}

export default App
