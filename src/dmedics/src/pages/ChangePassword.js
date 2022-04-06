import React from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie"

//Custom components
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"
import Header from '../components/headers/light.js'
import styled from "styled-components";

//Layouts
import { Container as ContainerBase } from "../components/misc/Layouts";

//Images
import logo from "../assets/images/logo.svg";
import illustration from "../assets/images/bookappointment.jpg";

import tw from 'twin.macro'



//Twin macro styling 

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`

const Wrapper = tw.section`flex w-full`
const Column = tw.div`w-1/3`
const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${illustrationImageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const headingText = "Change Password"
const logoLinkUrl = "#"
const illustrationImageSrc = illustration

export default function () {

  const [password, setPassword] = React.useState({
    passsword: ""
  })

  const [errorMessage, setErrorMessage] = React.useState("")

  const history = useHistory();
  function handleChange(event) {
    setPassword(
      prevFormData => {
        return {
          ...prevFormData,
          [event.target.name]: event.target.value
        }
      }
    )
  }

  async function changePassword(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(password)
    };
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/Authentication/change-password`, requestOptions)
    const responseData = await response.json();

    if (responseData.isSuccessful) {
      history.push({
        pathname: '/dashboard',
      })
    }
    else {
      setErrorMessage(responseData.message);
    }
  }

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <a>{errorMessage}</a>
              <Form onSubmit={changePassword}>
                <Input type="password" required placeholder="New Password" name="password" onChange={handleChange} />
                <Input type="submit" value="Change Password" />
              </Form>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  )
}


