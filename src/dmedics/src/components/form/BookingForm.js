import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import BookAppointmentSrc from "../../assets/images/bookappointment.jpg";

//Timeslot component
import moment from 'moment';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';

//Stripe 
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Redirect } from 'react-router';
import { useHistory, useLocation } from "react-router-dom";


//Styles
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`

const Select = tw.select`border-2 px-5 py-3 rounded focus:outline-none font-medium transition duration-300 hocus:border-primary-500 mb-4`

const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`



//Module
export default ({
  subheading = "",
  heading = <> Book Medical <span tw="text-primary-500">Instantly</span><wbr /></>,
  description = <> All driver medicals are completed in accordance with DVLA Group 2 guidelines. <wbr /> Fill in your details below to get an appointment </>,
  submitButtonText = "Book",
  textOnLeft = true,
}) => {


  //Executes side effect 
  const [appointmentTypes, setAppointmentTypes] = React.useState([])
  const [clinics, setClinic] = React.useState([])


  const [appointmentDates, setAppointmentDates] = React.useState([])
  const [appointmentIds, setAppointmentIds] = React.useState([])
  const [appointmentDateTimeOnly, setAppointmentDateTimeOnly] = React.useState([])

  const [paymentClientSecret, setpaymentClientSecret] = React.useState("")
  const [formData, setFormData] = React.useState(
    {
      firstName: "",
      lastName: "",
      emailAddress: "",
      dob: "",
      phoneNumber: "",
      gender: "",
      appointmentTypeId: "",
      appointmentId: "",
      postCode: ""
    })

  function handleChange(event) {
    setFormData(
      prevFormData => {
        return {
          ...prevFormData,
          [event.target.name]: event.target.value
        }
      }
    )
  }

  function setSelectedTimeSlot(dateTime) {
    const selectedSlotIndex = appointmentDateTimeOnly.indexOf(dateTime.getTime());
    const appointmentId = appointmentIds[selectedSlotIndex];
    formData.appointmentId = appointmentId;
  }

  const history = useHistory()
  React.useEffect(getAppointmentTypes, [])
  React.useEffect(getClinics, [])

  function getAppointmentTypes() {
    fetch("https://localhost:5001/api/Appointment/get-available-appointment-types").
      then(res => res.json()).
      then(data => setAppointmentTypes(data.appointmentTypes));
  }

  function getClinics() {
    fetch("https://localhost:5001/api/Appointment/get-clinics").
      then(res => res.json()).
      then(data => setClinic(data.clinicsResponse));
  }

  function getCreatedAppointmentDatesForClinic(event) {
    const clinicId = event.target.value;
    fetch(`https://localhost:5001/api/Appointment/get-created-appointment-dates?clinicId=${clinicId}`).
      then(res => res.json()).
      then(data => setAndParseAppointmentDates(data.createdAppointmentResponseModel));
  }


  function setAndParseAppointmentDates(appointmentDates) {
    setAppointmentDates(appointmentDates)
    setAppointmentDateTimeOnly(appointmentDates.map(x => new Date(x.appointmentDateTime).getTime()));
    setAppointmentIds(appointmentDates.map(x => x.appointmentId));
  }

  async function createAppointmentBookingIntent(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    const response = await fetch("https://localhost:5001/api/Appointment/create-appointment-booking-intent", requestOptions)
    const responseData = await response.json();
    history.push({
      pathname: '/checkout',
      state: { clientSecret: responseData.message }
    })
  }

  function timeSlotValidator(slotTime) {

    const isValid = appointmentDateTimeOnly.includes(slotTime.getTime());
    return isValid;
  }

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={BookAppointmentSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>

          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <Form onSubmit={createAppointmentBookingIntent}>

              <Select required name="appointmentTypeId" onChange={handleChange}>
                <option value="⬇️ Select an Appointment Type ⬇️"> -- Select an Appointment Type -- </option>
                {appointmentTypes.map((appointmentType) => <option key={appointmentType.appointmentTypeId} value={appointmentType.appointmentTypeId}>{appointmentType.typeTitle}</option>)}
              </Select>

              <Select required name="clinicId" onChange={getCreatedAppointmentDatesForClinic}>
                <option value="⬇️ Select a Clinic ⬇️"> -- Select a Clinic -- </option>
                {clinics.map((clinic) => <option key={clinic.clinicId} value={clinic.clinicId}>{clinic.clinic}</option>)}
              </Select>

              <DayTimePicker timeSlotValidator={timeSlotValidator} isLoading={false} isDone={false} loadingText="Selected an appointment"
                timeSlotSizeMinutes={30}
                confirmText="Select Slot" onConfirm={setSelectedTimeSlot} />

              <Input type="text" required placeholder="First Name" name="firstName" onChange={handleChange} />
              <Input type="text" required placeholder="Last Name" name="lastName" onChange={handleChange} />
              <Input type="text" required placeholder="Email" name="emailAddress" onChange={handleChange} />
              <Input type="date" required name="dob" onChange={handleChange} />
              <Input type="phone" required placeholder="Phone Number" name="phoneNumber" onChange={handleChange} />
              <Input type="text" required placeholder="Post Code" name="postCode" onChange={handleChange} />

              <Select required name="gender" onChange={handleChange}>
                <option value="⬇️ Gender ⬇️"> -- Gender -- </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>




              <Input type="submit" value="Submit" />

            </Form>

          </TextContent>
        </TextColumn>

      </TwoColumn>
    </Container>
  );
};
