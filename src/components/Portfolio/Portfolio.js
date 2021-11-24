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
const colOptions = {
    sortable: true, filter: true, sortingOrder: ["desc"]
}
const Portfolio = () => {
    const classes = useStyles();
    const [rowData, setRowData] = useState([]);
    const colDefs = [
        {
            headerName: "future", field: "future", ...colOptions, width: 100
        },
        {
            headerName: "size", field: "size", ...colOptions, width: 90
        },
        {
            headerName: "side", field: "side", ...colOptions, width: 90
        },
        {
            headerName: "netSize", field: "netSize", ...colOptions, width: 90
        },
        {
            headerName: "longOrderSize", field: "longOrderSize", ...colOptions, width: 90
        },
        {
            headerName: "shortOrderSize", field: "shortOrderSize", ...colOptions, width: 90
        },
        {
            headerName: "cost", field: "cost", ...colOptions, width: 90
        },
        {
            headerName: "entryPrice", field: "entryPrice", ...colOptions, width: 90
        },
        {
            headerName: "unrealizedPnl", field: "unrealizedPnl", ...colOptions, width: 90
        },
        {
            headerName: "realizedPnl", field: "realizedPnl", ...colOptions, width: 120
        },
        {
            headerName: "initialMarginRequirement", field: "initialMarginRequirement", ...colOptions, width: 120
        },
        {
            headerName: "maintenanceMarginRequirement", field: "maintenanceMarginRequirement", ...colOptions, width: 120
        },
        {
            headerName: "openSize", field: "openSize", ...colOptions, width: 90
        },
        {
            headerName: "collateralUsed", field: "collateralUsed", ...colOptions, width: 90
        },
        {
            headerName: "estimatedLiquidationPrice", field: "estimatedLiquidationPrice", ...colOptions, width: 90
        },
        {
            headerName: "volume", field: "volume", ...colOptions, width: 90
        },
        {
            headerName: "nextFundingRate", field: "nextFundingRate", ...colOptions, width: 90
        },
        {
            headerName: "nextFundingTime", field: "nextFundingTime", ...colOptions, width: 90
        },
        {
            headerName: "openInterest", field: "openInterest", ...colOptions, width: 90
        },
    ]

    const onGridReady = (event) => {
        // event.api.sizeColumnsToFit()
    };
    useEffect(() => {
        initialAxiosCalls()
    }, []);
    const initialAxiosCalls = async () => {
        await baseApiReq.get(`/portfolio`).then(res => {
            console.log(res.data);
            const result = []
            if (res.data.data.length !== 0) {
                res.data.data.positions.map(({
                    future,
                    size,
                    side,
                    netSize,
                    longOrderSize,
                    shortOrderSize,
                    cost,
                    entryPrice,
                    unrealizedPnl,
                    realizedPnl,
                    initialMarginRequirement,
                    maintenanceMarginRequirement,
                    openSize,
                    collateralUsed,
                    estimatedLiquidationPrice,
                    futureStats,
                }) => {
                    result.push({
                        future,
                        size,
                        side,
                        netSize,
                        longOrderSize,
                        shortOrderSize,
                        cost,
                        entryPrice: entryPrice !== null ? parseFloat(entryPrice.toFixed(3)) : 0,
                        unrealizedPnl: unrealizedPnl !== null ? parseFloat(unrealizedPnl.toFixed(3)) : 0,
                        realizedPnl: realizedPnl !== null ? parseFloat(realizedPnl.toFixed(3)) : 0,
                        initialMarginRequirement,
                        maintenanceMarginRequirement,
                        openSize,
                        collateralUsed,
                        estimatedLiquidationPrice: estimatedLiquidationPrice !== null ? parseFloat(estimatedLiquidationPrice.toFixed(3)) : 0,
                        volume: futureStats.volume !== null ? parseFloat(futureStats.volume.toFixed(3)) : 0,
                        nextFundingRate: futureStats.nextFundingRate !== null ? parseFloat(futureStats.nextFundingRate.toFixed(3)) : 0,
                        nextFundingTime: futureStats.nextFundingTime,
                        openInterest: futureStats.openInterest !== null ? parseFloat(futureStats.openInterest.toFixed(3)) : 0,
                    })
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
                        onGridReady={onGridReady}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Portfolio
