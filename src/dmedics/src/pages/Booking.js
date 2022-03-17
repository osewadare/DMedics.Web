import React from 'react'
import Header from '../components/headers/light.js'
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"
import BookingForm from "../components/form/TwoColContactUsWithIllustrationFullForm.js"



export default function Booking() {
  return (
    <AnimationRevealPage>
    <Header/>
    <BookingForm />
  </AnimationRevealPage>
  )
}
