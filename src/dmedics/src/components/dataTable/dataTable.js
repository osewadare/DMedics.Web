import React from 'react'
import MUIDataTable from 'mui-datatables';
import { useHistory } from 'react-router-dom';



export default function DataTable({ data, columns, title, options, rowClick }) {

    const handleRowClick = rowClick;

    return (
        <div>
            <MUIDataTable
                columns={columns}
                data={data}
                title={title}
                options={options}
            />
        </div>
    );
};

