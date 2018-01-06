import styled from 'styled-components'

export const RoomWrapper = styled.div`
  width: 100%;
  height: 100%;
  align-self: flex-end;
  border-bottom-radius: 5px;
  overflow: hidden;
  background: transparent;
  color: rgb(192,192,192);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
`
export const EnterMessage = styled.input.attrs({
  type: 'text'
}) `
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
  type: 'submit'
}) `
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
  background: rgba(255,255,255,0.15);
  border: 1px solid rgb(192,192,192);
  border-radius: 5px;
`
export const Message = styled.li`
  color: ${p => p.origin === 'user' ? '#fff' : '#ffcc00'};
  align-self: ${p => p.origin === 'user' ? 'flex-end' : 'flex-start'};
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
