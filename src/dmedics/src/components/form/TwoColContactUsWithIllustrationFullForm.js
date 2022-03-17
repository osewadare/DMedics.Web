import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../../components/misc/Buttons.js";
import BookAppointmentSrc from "../../assets/images/bookappointment.jpg";


//Timeslot component
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar-k';
import Select from 'react-select'
import reactSelect from "react-select";


//Stripe 
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


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
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`




//React Select
let medicalTypes = [
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something two"
  },

]

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


//React Calendar
let timeSlots = [
  ['1', '2'],
  ['2', '3'],
]

let ignoreWeekends = {
  'saturdays': false,
  'sundays': false,
};

//Stripe
const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

 
//Module
export default ({
  subheading = "",
  heading = <> Book Medical <span tw="text-primary-500">Instantly</span><wbr/></>,
  description = <> All driver medicals are completed in accordance with DVLA Group 2 guidelines. <wbr/> Fill in your details below to get an appointment </>,
  submitButtonText = "Send",
  formAction = "creatappointmentbookingintent",
  formMethod = "get",
  textOnLeft = true,
}) => {


  fetch("https://localhost:5001/api/Appointment/GetAvailableAppointmentTypes").
  then(res => res.json()).
  then(data => console.log(data));
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

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

            <Form action={formAction} method={formMethod}>

            <Select options={options} />

              <Input type="text" name="firstName" placeholder="First Name" />
              <Input type="text" name="lastName" placeholder="Last Name" />
              <Input type="email" name="email" placeholder="Email Address" />

              <Subheading>Date of Birth </Subheading>
              <Input type="date" name="DOB" />

              <Input type="phone" name="phoneNumber" placeholder="Phone Number"/>
              <Input type="date" name="Appointment Date" />

              <ReactTimeslotCalendar initialDate={moment().format()} timeslots={timeSlots} renderDays={ignoreWeekends}
            />

    
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>

            </Form>
  </TextContent>
        </TextColumn>

      </TwoColumn>
    </Container>
  );
};
