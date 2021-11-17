import React, { useEffect, useState, useRef } from 'react'
import AgGrid from '../AgGrid/AgGrid'
import baseApiReq from '../../api';
import { Grid, makeStyles, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    agGridItem: {
        height: "80%",
        maxHeight: "70%"
    }

}));

const Portfolio = () => {
    const classes = useStyles();
    const [rowData, setRowData] = useState([]);
    const colDefs = [
        {
            headerName: "future", field: "future", sortable: true, filter: true
        },
        {
            headerName: "size", field: "size", sortable: true, filter: true
        },
        {
            headerName: "side", field: "side", sortable: true, filter: true
        },
        {
            headerName: "netSize", field: "netSize", sortable: true, filter: true
        },
        {
            headerName: "longOrderSize", field: "longOrderSize", sortable: true, filter: true
        },
        {
            headerName: "shortOrderSize", field: "shortOrderSize", sortable: true, filter: true
        },
        {
            headerName: "cost", field: "cost", sortable: true, filter: true
        },
        {
            headerName: "unrealizedPnl", field: "unrealizedPnl", sortable: true, filter: true
        },
        {
            headerName: "realizedPnl", field: "realizedPnl", sortable: true, filter: true
        },
        {
            headerName: "initialMarginRequirement", field: "initialMarginRequirement", sortable: true, filter: true
        },
        {
            headerName: "maintenanceMarginRequirement", field: "maintenanceMarginRequirement", sortable: true, filter: true
        },
        {
            headerName: "openSize", field: "openSize", sortable: true, filter: true
        },
        {
            headerName: "collateralUsed", field: "collateralUsed", sortable: true, filter: true
        },
        {
            headerName: "estimatedLiquidationPrice", field: "estimatedLiquidationPrice", sortable: true, filter: true
        },
        {
            headerName: "recentAverageOpenPrice", field: "recentAverageOpenPrice", sortable: true, filter: true
        },
        {
            headerName: "recentPnl", field: "recentPnl", sortable: true, filter: true
        },
        {
            headerName: "recentBreakEvenPrice", field: "recentBreakEvenPrice", sortable: true, filter: true
        },
        {
            headerName: "cumulativeBuySize", field: "cumulativeBuySize", sortable: true, filter: true
        },
        {
            headerName: "cumulativeSellSize", field: "cumulativeSellSize", sortable: true, filter: true
        },
    ]

    useEffect(() => {
        initialAxiosCalls()
    }, []);
    const initialAxiosCalls = async () => {
        await baseApiReq.get(`/positions?showAveragePrice=${true}`).then(res => {
            console.log(res.data);
            const result = []
            if (res.data.data.length !== 0) {
                res.data.data.map((item) => {
                    result.push({ ...item })
                })
                setRowData([...result])
            }
        }).catch(err => {
            console.log(err)
        })

    }
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={11} xl={10} >
                <Paper elevation={3}
                    className={classes.agGridItem}>
                    <AgGrid
                        row={rowData}
                        column={colDefs}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Portfolio
