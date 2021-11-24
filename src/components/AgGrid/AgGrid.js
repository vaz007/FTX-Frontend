import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';

import './AgGrid.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        justifyContent: "center", /* align horizontal */
        alignItems: "center"
    },

}));

const AgGrid = ({ row, column, onGridReady }) => {
    const classes = useStyles()
    const [rowData, setrowData] = useState(row)
    const [columnData, setcolumnData] = useState(column)
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    useEffect(() => {
       // console.log("ROW DATA ", rowData)
        if (row !== null) {
            setrowData(row)
        }
    }, [row])

    const defaultColOptions = {
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        filter: true,
        resizable: true,
        sizeColumnsToFit: true
    }
    return (
        <div className={classes.root}>

            <div className="ag-theme-alpine-dark">
                <AgGridReact
                    defaultColDef={defaultColOptions}
                    enableRangeSelection="true"
                    domLayout='autoHeight'
                    animateRows="true"
                    rowSelection={'multiple'}
                    rowMultiSelectWithClick={true}
                    rowData={rowData}
                    columnDefs={columnData}
                    onGridReady={(event) => onGridReady(event)}
                    // pagination={true}
                    // paginationPageSize={20}

                />
            </div>
        </div>
    )
}
AgGrid.defaultProps = {
    row: null,
    column: null,

}
export default AgGrid
