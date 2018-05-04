import React from "react"
import styled from "styled-components"

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #333;
`

const Wrapper = styled.div`
  max-width: 540px;
  margin: 0 auto;
  background: url(helsinki.jpg);
  background-position: 45%, 60%;
  background-size: cover;
  height: calc(100% - 50px);
  box-shadow: 0 2px 5px 0 #403f3f;
  display: flex;
  flex-direction: column;
`

const Content = styled.main`
  position: relative;
  flex: 1;
  overflow-y: auto;
  font-family: "Nunito", sans-serif;
`

const Logo = styled.div`
  display: flex;
  background: #000;
  height: 70px;
  align-items: center;
  width: 100%;
`

const LogoWrapper = styled.div`
  padding: 10px;
  background: transparent;
  border-radius: 10px;
  border-top-right-radius: 0;
`

const LogoImg = styled.div`
  width: 50px;
  height: 50px;
  background-color: transparent;
  background-image: url(HKI.png);
  opacity: 0.8;
  background-size: contain;
  background-position: center;
`

const LogoText = styled.h1`
  padding: 10px;
  margin: 0;
  line-height: 50px;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffe200;
`

const PageWrapper = ({ children }) => (
  <Background>
    <Wrapper>
      <Logo>
        <LogoWrapper>
          <LogoImg />
        </LogoWrapper>
        <LogoText>Helpsinki</LogoText>
        <p style={{ color: "#fff", justifySelf: "flex-end" }}>
          What can I do for you today?
        </p>
      </Logo>
      <Content>{children}</Content>
    </Wrapper>
  </Background>
)

export default PageWrapper
