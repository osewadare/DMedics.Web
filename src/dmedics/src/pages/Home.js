import React from 'react'
import MiniCenteredFooter from '../components/footers/MiniCenteredFooter.js'
import Hero from "../components/hero/FullWidthWithImage.js"
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"

export default function Home() {
  return (

    <AnimationRevealPage>
      <Hero/>
      <MiniCenteredFooter/>
    </AnimationRevealPage>

  )
}
