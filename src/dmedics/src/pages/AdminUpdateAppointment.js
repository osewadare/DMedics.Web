import React from 'react'
import Header from '../components/headers/admin_header.js'
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"
import UpdateAppointmentForm from '../components/form/UpdateAppointmentForm.js'




export default function AdminUpdateAppointment() {
    return (
        <AnimationRevealPage>
            <Header />
            <UpdateAppointmentForm />
        </AnimationRevealPage>
    )
}
