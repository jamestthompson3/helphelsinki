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
  Button,
  Suggestion,
  Message
} from "./styledComponents"

const commands = ["@bikes", "@help"]

class ChatRoom extends Component {
  state = {
    messages: [],
    messageText: "",
    status: "LOADING",
    popup: false,
    args: { lat: 5 }
  }

  componentDidMount() {
    socket.on("message", message =>
      this.setState(prevState => ({
        messages: [...prevState.messages, message],
        status: "SUCCESS"
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
        this.setState({ messageText: "", popup: false, status: "LOADING" }))
      : (socket.emit("message", { text: messageText, origin: "user" }),
        this.setState({ messageText: "", popup: false, status: "LOADING" }))
  }
  render() {
    const { messages, messageText, popup, status } = this.state
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
          {status === "LOADING" && (
            <div>
              <svg
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                width="24px"
                height="30px"
                viewBox="0 0 24 30"
              >
                <rect x="0" y="0" width="4" height="10" fill="#333">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 20; 0 0"
                    begin="0"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="10" y="0" width="4" height="10" fill="#333">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 20; 0 0"
                    begin="0.2s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="20" y="0" width="4" height="10" fill="#333">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 20; 0 0"
                    begin="0.4s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </div>
          )}
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
        {messageText.length < 2 && (
          <Suggestion>
            <p>
              Try commands like{" "}
              <Button onClick={() => this.sendMessage("@bikes")}>@bikes</Button>{" "}
              for city bike information.
            </p>
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
