import React, { Component } from 'react'
import Markdown from 'react-remarkable'
import { socket } from '../../socketUtils'
import {
  RoomWrapper,
  MessageContent,
  EnterMessage,
  SendButton,
  FormContainer,
  CommandPopup,
  Message
} from './styledComponents'

const commands = ['@bikes','@eat','@help']

class ChatRoom extends Component {
  state  = {
    messages: [],
    messageText: '',
    popup: false
  }
  componentDidMount() {
    socket.on('message', message => this.setState(prevState =>({ messages: [...prevState.messages, message] })))
  }
  componentDidUpdate = () => this.message ? this.scrollToBottom() : null
  scrollToBottom = () => this.message.scrollIntoView({ behaviour: 'smooth' })
  handleChat = event => this.setState({ messageText: event.target.value, popup: event.target.value.split('').filter(item => item === '@').length > 0 ? true : false })
  handleSubmit = e => {
    e.preventDefault()
    const { messageText } = this.state
    messageText.length > 5
      ? this.sendMessage(messageText)
      : null
  }
  sendMessage = ( messageText ) => {
    socket.emit('message', { text: messageText, origin: 'user' })
    this.setState({ messageText: '', popup: false })
  }
  render() {
    const { messages, messageText, popup } = this.state
    return (
      <RoomWrapper>
        <MessageContent>
          {messages.length > 0 ?
            messages.map((message, i) =>
              <Message key={i} origin={message.origin} innerRef={div => this.message = div}>
                <Markdown source={message.text} />
              </Message>
            )
            : null
          }
        </MessageContent>
        {popup
          ? <CommandPopup>
            { commands.map((command, i) =>
              <li key={i} onClick={() => this.sendMessage(`${command}`)}>{command}</li>
            )}
          </CommandPopup>
          : null
        }
        <FormContainer onSubmit={this.handleSubmit}>
          <EnterMessage  placeholder='enter your message here' onChange={this.handleChat} value={messageText}/>
          <SendButton><i className='material-icons'>send</i></SendButton>
        </FormContainer>
      </RoomWrapper>
    )
  }
}

export default ChatRoom
