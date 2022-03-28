import React, {useEffect, useState}  from 'react'
import Status from '../components/confirmation/Status'

import { useParams } from 'react-router-dom';






export default function BookingStatus() {

  const { payment_intent, redirect_status } = useParams();
  const [bookingRef, setBookingReferenceNumber] = useState("");

function updatePaymentStatus(){
  fetch(`https://localhost:5001/api/Appointment/get-created-appointment-dates?paymentSecret=${payment_intent}&status=${redirect_status}`).
  then(res => res.json()).
  then(data => setBookingReferenceNumber(data.message));
}

console.log(redirect_status);

const StatusData = {
  subheading : `Booking Ref: ${bookingRef}`, 
  //heading : {redirect_status},
  description : <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
  textOnLeft : true,
};

  useEffect(updatePaymentStatus);

  return (
    <Status statusInformation={StatusData}/>
  )
}
