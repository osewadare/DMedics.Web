import React from 'react'

export default function Payment() 

{
    //React Use State Hook - for managing state in a function component
    const [clientSecret, setClientSecret] = useState("");

    //React UseEffect Hook for executing side effects after DOM update(render) in a function component
    useEffect(
      () => {
      // Create PaymentIntent as soon as the page loads
      fetch("/create-appointment-booking-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items:  }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  return ( 
    <div>  
    </div>
  )
}

{
  firstName: "string",
  "lastName": "string",
  "emailAddress": "string",
  "dob": "string",
  "phoneNumber": "string",
  "gender": 0,
  "clinicId": "string",
  "appointmentId": "string",
  "appointmentTypeId": "string"
}