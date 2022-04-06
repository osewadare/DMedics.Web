import React from 'react'
import Header from '../components/headers/admin_header.js'
import AnimationRevealPage from "../helpers/AnimationRevealPage.js"
import DataTable from '../components/dataTable/dataTable.js'
import { useHistory } from 'react-router-dom';



export default function AdminViewAppointments() {

    const [appointments, setAppointments] = React.useState([])

    function getAppointments() {
        fetch(`https://localhost:5001/api/Appointment/get-appointments`).
            then(res => res.json()).
            then(data => setAppointments(data.appointments));
    }

    const columns = [
        { label: 'Id', name: 'appointmentId' },
        { label: 'Time', name: 'appointmentTime' },
        { label: 'Customer', name: 'customerName' },
        { label: 'Status', name: 'appointmentStatus' },
        { label: 'Ref', name: 'appointmentReference' },
        { label: 'Clinic', name: 'clinicName' },
        { label: 'Type', name: 'appointmentType' }
    ];

    const title = "View Appointments"


    const history = useHistory();


    const handleRowClick = (rowData) => {
        history.push({
            pathname: `/update-appointment/${rowData[0]}`,
            state: { appointmentId: rowData[0] }

        })
    };

    const options = {
        onRowClick: handleRowClick,
    }

    React.useEffect(getAppointments, [])

    return (
        <AnimationRevealPage>
            <Header />
            <DataTable data={appointments} columns={columns} title={title} options=
                {options} rowClick={handleRowClick}
            />
        </AnimationRevealPage>
    )
}
