import React from 'react'
import { useLocation } from "react-router-dom";

import CheckoutForm from '../components/form/Checkout'
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"
import Header from '../components/headers/light.js'

import tw from 'twin.macro'
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51KfsT9HhUWcUfuFhqOTfnSwhJ681e7y3U4XJrDKeBYFmVTB5I5SgxnpPFmjfzFGOx7C8m50SDUTpXqvgdQbB43a100jmRPXpfk");

const appearance = {
    theme: 'stripe',
  };

const Wrapper = tw.section`flex w-full`
const Column = tw.div`w-1/3`


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
            <Wrapper>
            <Column></Column>
            <Column>
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
            </Elements></Column>
            <Column></Column>
            </Wrapper>      
        </AnimationRevealPage>
        )}
      </div>
  )
}
