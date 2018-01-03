import React, { Component } from 'react'
import styled from 'styled-components'
import Markdown from 'react-remarkable'
import { socket } from '../../socketUtils'

const RoomWrapper = styled.div`
  width: 100%;
  height: 100%;
  align-self: flex-end;
  border-bottom-radius: 5px;
  background: transparent;
  color: rgb(192,192,192);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  padding-bottom: 5px;
`
const EnterMessage = styled.input.attrs({
  type: 'text'
})`
  border-radius: 5px;
  border: none;
  background: transparent;
  flex: 1;
  color: #fff;
  padding: 5px;
  font-size: 18px;
  line-height: 18px;
  padding: 8px;
`
const MessageContent = styled.div`
  background: transparent;
  border-radius: 5px;
  width: 95%;
  height: 95%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
const SendButton = styled.button.attrs({
  type: 'submit'
})`
  line-height: 18px;
  background: transparent;
  border: none;
  font-size: 18px;
  border-radius: 5px;
  outline: none;
  color: #fff;
  cursor: pointer;
`
const FormContainer = styled.form`
  width: 100%;
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-around;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgb(192,192,192);
  border-radius: 5px;
`
const Message = styled.li`
  color: ${p => p.origin === 'user' ? '#fff' : '#46e4d1'};
  align-self: ${p => p.origin === 'user' ? 'flex-end' : 'flex-start'};
  font-size: 1.5rem;
  list-style-type: none;
`

class ChatRoom extends Component {
  state  = {
    messages: [],
    messageText: ''
  }
  componentDidMount() {
    socket.on('message', message => this.setState(prevState =>({ messages: [...prevState.messages, message] })))
  }
  handleChat = event => this.setState({ messageText: event.target.value })
  handleSubmit = e => {
    e.preventDefault()
    const { messageText } = this.state
    messageText.length > 5
      ? this.sendMessage(messageText)
      : null
  }
  sendMessage = ( messageText ) => {
    socket.emit('message', { text: messageText, origin: 'user' })
    this.setState({ messageText: '' })
  }
  render() {
    const { messages, messageText } = this.state
    return (
      <RoomWrapper>
        <MessageContent>
          {messages.map((message, i) =>
            <Message key={i} origin={message.origin}>
              <Markdown source={message.text} />
            </Message>
          )}
        </MessageContent>
        <FormContainer onSubmit={this.handleSubmit}>
          <EnterMessage placeholder='enter your message here' onChange={this.handleChat} value={messageText}/>
          <SendButton><i className='material-icons'>send</i></SendButton>
        </FormContainer>
      </RoomWrapper>
    )
  }
}

export default ChatRoom
