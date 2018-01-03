import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #5AAA95;
`

const Wrapper = styled.div`
  max-width: 540px;
  margin: 0 auto;
  background: white;
  height: 100%;
  box-shadow: 0 2px 5px 0 #403f3f;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  background-color: #1B61C7;
  height: 70px;
  padding: 20px;
  color: white;
  text-align: center;
`

const Content = styled.main`
  position: relative;
  flex: 1;
  overflow-y: auto;
`

const Logo = styled.div`
  display: flex;
`

const LogoWrapper = styled.div`
  padding: 10px;
  background: white;
  border-radius: 10px;
  border-top-right-radius: 0;
`

const LogoImg = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  background-image: url(HKI.png);
  background-size: contain;
  background-position: center;
`

const LogoText = styled.h1`
  padding: 10px;
  margin: 0;
  line-height: 50px;
  font-size: 1.5rem;
  font-weight: 700;
`

const PageWrapper = ({ children }) => (
  <Background>
    <Wrapper>
      <Header>
        <Logo>
          <LogoWrapper><LogoImg /></LogoWrapper>
          <LogoText>Helpsinki</LogoText>
        </Logo>
      </Header>
      <Content>
        {children}
      </Content>
    </Wrapper>
  </Background>
)

export default PageWrapper
