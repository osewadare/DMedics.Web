import React from 'react'
import Header from '../components/headers/light.js'
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"
import CreateAppointmentForm from "../components/form/CreateAppointmentForm.js"




export default function Booking() {
    return (
        <AnimationRevealPage>
            <Header />
            <CreateAppointmentForm />
        </AnimationRevealPage>
    )
}
