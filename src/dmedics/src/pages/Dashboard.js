import React from 'react'
import Header from '../components/headers/admin_header.js'
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"
import DashboardMain from '../components/dashboard/DashboardMain.js'




export default function Dashboard() {
    return (
        <AnimationRevealPage>
            <Header />
            <DashboardMain />
        </AnimationRevealPage>
    )
}
