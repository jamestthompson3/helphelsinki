import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'

import ChatRoom from './components/ChatRoom'
import { PageWrapper } from './components/common'

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
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.8)),url(hkiMap.jpg);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

class App extends Component {
  render() {
    return (
      <PageWrapper>
        <ChatWrapper>
          <ChatRoom />
        </ChatWrapper>
      </PageWrapper>
    )
  }
}

export default App
