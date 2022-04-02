import React, { useEffect, useState } from 'react'
import Status from '../components/confirmation/Status'

import { useLocation } from 'react-router-dom';


export default function BookingStatus() {
  const search = useLocation().search;
  const payment_intent = new URLSearchParams(search).get('payment_intent_client_secret');
  const redirect_status = new URLSearchParams(search).get('redirect_status');
  const [bookingRef, setBookingReferenceNumber] = useState("");

  function updatePaymentStatus() {
    fetch(`https://localhost:5001/api/Appointment/update-appointment-payment-status?paymentSecret=${payment_intent}&status=${redirect_status}`).
      then(res => res.json()).
      then(data => setBookingReferenceNumber(data.message));
  }

  const StatusData = {
    subheading: `Booking Ref: ${bookingRef}`,
    heading: { redirect_status },
    description: <>Feel free to <span tw="text-primary-500">get in touch</span><wbr /> with us.</>,
    textOnLeft: true,
  };

  React.useEffect(updatePaymentStatus, [])

  return (
    <Status statusInformation={StatusData} />
  )
}
