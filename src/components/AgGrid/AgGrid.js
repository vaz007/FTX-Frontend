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

const AgGrid = ({ row, column }) => {
    const classes = useStyles()
    const [rowData, setrowData] = useState(row)
    const [columnData, setcolumnData] = useState(column)
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    useEffect(() => {
        console.log("ROW DATA ", rowData)
        if (row !== null) {
            setrowData(row)
        }
    }, [row])
    // const onGridReady = (params) => {
    //     setGridApi(params.api);
    //     setGridColumnApi(params.columnApi);
    //   //  gridApi.setDomLayout('autoHeight');

    //     params.api.sizeColumnsToFit();
    //     window.addEventListener('resize', function () {
    //         setTimeout(function () {
    //             params.api.sizeColumnsToFit();
    //         });
    //     });

    //     params.api.sizeColumnsToFit();
    // };
    const defaultColOptions = {
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        filter: true,
        resizable: true,

        //cellClass: "cell-border cell-vertical-align-text-right",
        // cellStyle: {textAlign: 'center'}
    }
    return (
        <div className={classes.root}>

            <div className="ag-theme-alpine-dark">
                <AgGridReact
                    defaultColDef={defaultColOptions}
                    enableRangeSelection="true"
                    domLayout='autoHeight'
                    animateRows="true"
                    rowData={rowData}
                    columnDefs={columnData}
                  //  onGridReady={onGridReady}
                    pagination={true}
                    paginationPageSize={8}
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
