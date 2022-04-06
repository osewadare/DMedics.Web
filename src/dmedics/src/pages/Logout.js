import React from 'react'
import { Redirect } from "react-router-dom";


export default function Logout() {

    sessionStorage.removeItem('token');
    return (<Redirect to="/login" />)
}
