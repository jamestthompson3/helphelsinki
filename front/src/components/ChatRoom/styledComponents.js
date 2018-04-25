import styled from "styled-components"

export const RoomWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  align-self: flex-end;
  border-bottom-radius: 5px;
  overflow: hidden;
  background: transparent;
  color: rgb(192, 192, 192);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
`
export const EnterMessage = styled.input.attrs({
  type: "text"
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
export const MessageContent = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
export const SendButton = styled.button.attrs({
  type: "submit"
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
export const FormContainer = styled.form`
  width: 100%;
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgb(192, 192, 192);
  border-radius: 5px;
`

export const Suggestion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10px;
`
export const Message = styled.li`
  color: #fff;
  align-self: ${p => (p.origin === "user" ? "flex-end" : "flex-start")};
  background: ${p =>
    p.origin == "user" ? "rgb(27, 97, 199, 0.65)" : "rgba(2, 3, 8, 0.39)"};
  padding: 10px;
  box-shadow: 4px 1px 13px 2px rgba(43, 42, 42, 0.82);
  border-radius: 3px;
  margin-top: 10px;
  display: inline;
  font-size: 110%;
  list-style-type: none;
`
export const CommandPopup = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  color: rgb(192,192,192);
  background #191919;
  align-self: flex-start;
  border-radius: 5px;
  box-shadow: 0 0 11px #73768473;
  text-align: center;
  list-style-type: none;
  position: absolute;
  bottom: 3rem;
  >li {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    &:hover {
      background: #325ab3;
      border-radius: 5px;
    }
  }
`
