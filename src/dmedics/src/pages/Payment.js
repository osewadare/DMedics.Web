import React from 'react'
import { useLocation } from "react-router-dom";

//Custom components
import CheckoutForm from '../components/form/Checkout'
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"
import Header from '../components/headers/light.js'
import styled from "styled-components";

//Layouts
import { Container as ContainerBase } from "../components/misc/Layouts";

//Images
import logo from "../assets/images/logo.svg";
import illustration from "../assets/images/bookappointment.jpg";

import tw from 'twin.macro'

//Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51KfsT9HhUWcUfuFhqOTfnSwhJ681e7y3U4XJrDKeBYFmVTB5I5SgxnpPFmjfzFGOx7C8m50SDUTpXqvgdQbB43a100jmRPXpfk");
const appearance = {
    theme: 'stripe',
  };

//Twin macro styling 
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

const headingText= "Checkout"
const logoLinkUrl = "#"
const illustrationImageSrc = illustration

export default function () {
    const location = useLocation();
    const clientSecret = location.state.clientSecret; 
    const options = {
        clientSecret,
        appearance,
      };
  return (
    <div className="App">
        {clientSecret && (


<AnimationRevealPage>
    <Container>
      <Content> 
        <MainContainer>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
            </Elements> 
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
        )}
      </div>
  )
}


