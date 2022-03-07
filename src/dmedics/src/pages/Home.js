import React from 'react'
import MiniCenteredFooter from '../components/footers/MiniCenteredFooter.js'
import Hero from "../components/hero/FullWidthWithImage.js"
import MedicalTypes from "../components/medicaltypes/ThreeColSimple.js"
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"

export default function Home() {
  return (

    <AnimationRevealPage>
      <Hero/>
      <MedicalTypes/>
      <MiniCenteredFooter/>
    </AnimationRevealPage>

  )
}
