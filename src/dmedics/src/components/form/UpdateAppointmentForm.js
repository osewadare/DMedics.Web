import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import BookAppointmentSrc from "../../assets/images/bookappointment.jpg";
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
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Select = tw.select`border-2 px-5 py-3 rounded focus:outline-none font-medium transition duration-300 hocus:border-primary-500 mb-4`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`

//Module
export default ({
    heading = <> Update Medical <span tw="text-primary-500">Appointment</span><wbr /></>,
    textOnLeft = true,
}) => {



    //Data
    const [clinics, setClinics] = React.useState([]);
    const [doctors, setDoctors] = React.useState([]);
    const [formData, setFormData] = React.useState(
        {
            userId: "",
            clinicId: "",
            appointmentId: ""
        });


    const location = useLocation();
    formData.appointmentId = location.state.appointmentId.toString();

    const [responseMessage, setResponseMessage] = React.useState("");

    function getClinics() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/Appointment/get-clinics`).
            then(res => res.json()).
            then(data => setClinics(data.clinicsResponse));
    }

    function getDoctors() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/Authentication/get-users`).
            then(res => res.json()).
            then(data => setDoctors(data.users));
    }

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
    const history = useHistory()

    //Executes side effect 
    React.useEffect(getDoctors, [])
    React.useEffect(getClinics, [])

    async function updateAppointment(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/Appointment/update-appointment`, requestOptions)
        const responseData = await response.json();
        setResponseMessage(responseData.message)
    }

    return (
        <Container>
            <TwoColumn>
                <ImageColumn>
                    <Image imageSrc={BookAppointmentSrc} />
                </ImageColumn>
                <TextColumn textOnLeft={textOnLeft}>

                    <TextContent>
                        <Heading>{heading}</Heading>
                        <Form onSubmit={updateAppointment}>

                            <Select required name="clinicId" onChange={handleChange}>
                                <option value="⬇️ Select a Clinic ⬇️"> -- Select a Clinic -- </option>
                                {clinics.map((clinic) => <option key={clinic.clinicId} value={clinic.clinicId}>{clinic.clinic}</option>)}
                            </Select>

                            <Select required name="userId" onChange={handleChange}>
                                <option value="⬇️ Select a Doctor ⬇️"> -- Select a Doctor -- </option>
                                {doctors.map((doctor) => <option key={doctor.userId} value={doctor.userId}>{doctor.name}</option>)}
                            </Select>

                            <Input type="submit" value="Submit" />

                            <TextContent>{responseMessage}</TextContent>


                        </Form>

                    </TextContent>
                </TextColumn>

            </TwoColumn>
        </Container>
    );
};
