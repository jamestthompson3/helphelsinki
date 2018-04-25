import React, { Component } from "react"
import Markdown from "react-remarkable"
import { socket } from "../../socketUtils"
import {
  RoomWrapper,
  MessageContent,
  EnterMessage,
  SendButton,
  FormContainer,
  CommandPopup,
  Suggestion,
  Message
} from "./styledComponents"

const commands = ["@bikes", "@help"]

class ChatRoom extends Component {
  state = {
    messages: [],
    messageText: "",
    popup: false,
    args: { lat: 5 }
  }

  componentDidMount() {
    socket.on("message", message =>
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }))
    )
    this.text.focus()
  }

  componentDidUpdate = () => this.message && this.scrollToBottom()

  getUserLocation = () =>
    "geolocation" in navigator &&
    navigator.geolocation.getCurrentPosition(position =>
      this.setState({ args: position.coords })
    ) // this.setState({ args: position.coords })
  scrollToBottom = () => this.message.scrollIntoView({ behaviour: "smooth" })
  handleChat = event =>
    this.setState({
      messageText: event.target.value,
      popup:
        event.target.value.split("").filter(item => item === "@").length > 0
          ? true
          : false
    })

  handleSubmit = e => {
    e.preventDefault()
    const { messageText } = this.state
    messageText.length > 5 && this.sendMessage(messageText)
  }

  sendMessage = messageText => {
    messageText.includes("bikes", "eat")
      ? ("geolocation" in navigator &&
          navigator.geolocation.getCurrentPosition(position => {
            return socket.emit("message", {
              text: messageText,
              origin: "user",
              lat: position.coords.latitude,
              lon: position.coords.longitude
            })
          }),
        this.setState({ messageText: "", popup: false }))
      : (socket.emit("message", { text: messageText, origin: "user" }),
        this.setState({ messageText: "", popup: false }))
  }
  render() {
    const { messages, messageText, popup } = this.state
    const showSuggestion = messageText.length < 2 || messages.length > 1
    return (
      <RoomWrapper>
        <MessageContent>
          {messages.length > 0 &&
            messages.map((message, i) => (
              <Message
                key={i}
                origin={message.origin}
                innerRef={div => (this.message = div)}
              >
                <Markdown source={message.text} />
              </Message>
            ))}
        </MessageContent>
        {popup && (
          <CommandPopup>
            {commands.map((command, i) => (
              <li key={i} onClick={() => this.sendMessage(`${command}`)}>
                {command}
              </li>
            ))}
          </CommandPopup>
        )}
        {showSuggestion && (
          <Suggestion>
            <p>Try commands like @bikes for city bike information.</p>
            <p>
              If you have suggestions to make me better, please send a tweet
              @helpsinkibot
            </p>
          </Suggestion>
        )}
        <FormContainer onSubmit={this.handleSubmit}>
          <EnterMessage
            innerRef={input => (this.text = input)}
            placeholder="enter your message here"
            onChange={this.handleChat}
            value={messageText}
          />
          <SendButton>
            <i className="material-icons">send</i>
          </SendButton>
        </FormContainer>
      </RoomWrapper>
    )
  }
}

export default ChatRoom
