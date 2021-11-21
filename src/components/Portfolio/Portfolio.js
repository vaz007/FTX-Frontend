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
            headerName: "future", field: "future", sortable: true, filter: true, width: 100
        },
        {
            headerName: "size", field: "size", sortable: true, filter: true, width: 90
        },
        {
            headerName: "side", field: "side", sortable: true, filter: true, width: 90
        },
        {
            headerName: "netSize", field: "netSize", sortable: true, filter: true, width: 90
        },
        {
            headerName: "longOrderSize", field: "longOrderSize", sortable: true, filter: true, width: 90
        },
        {
            headerName: "shortOrderSize", field: "shortOrderSize", sortable: true, filter: true, width: 90
        },
        {
            headerName: "cost", field: "cost", sortable: true, filter: true, width: 90
        },
        {
            headerName: "unrealizedPnl", field: "unrealizedPnl", sortable: true, filter: true, width: 90
        },
        {
            headerName: "realizedPnl", field: "realizedPnl", sortable: true, filter: true, width: 120
        },
        {
            headerName: "initialMarginRequirement", field: "initialMarginRequirement", sortable: true, filter: true, width: 120
        },
        {
            headerName: "maintenanceMarginRequirement", field: "maintenanceMarginRequirement", sortable: true, filter: true, width: 120
        },
        {
            headerName: "openSize", field: "openSize", sortable: true, filter: true, width: 90
        },
        {
            headerName: "collateralUsed", field: "collateralUsed", sortable: true, filter: true, width: 90
        },
        {
            headerName: "estimatedLiquidationPrice", field: "estimatedLiquidationPrice", sortable: true, filter: true, width: 90
        },
        {
            headerName: "recentAverageOpenPrice", field: "recentAverageOpenPrice", sortable: true, filter: true, width: 90
        },
        {
            headerName: "recentPnl", field: "recentPnl", sortable: true, filter: true, width: 90
        },
        {
            headerName: "recentBreakEvenPrice", field: "recentBreakEvenPrice", sortable: true, filter: true, width: 90
        },
        {
            headerName: "cumulativeBuySize", field: "cumulativeBuySize", sortable: true, filter: true, width: 90
        },
        {
            headerName: "cumulativeSellSize", field: "cumulativeSellSize", sortable: true, filter: true, width: 90
        },
    ]

    const onGridReady = (event) => {
        // event.api.sizeColumnsToFit()
    };
    useEffect(() => {
        initialAxiosCalls()
    }, []);
    const initialAxiosCalls = async () => {
        await baseApiReq.get(`/positions?showAveragePrice=${true}`).then(res => {
            // console.log(res.data);
            const result = []
            if (res.data.data.length !== 0) {
                res.data.data.map(({
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
                    recentAverageOpenPrice,
                    recentPnl,
                    recentBreakEvenPrice,
                    cumulativeBuySize,
                    cumulativeSellSize,

                }) => {
                    result.push({
                        future,
                        size,
                        side,
                        netSize,
                        longOrderSize,
                        shortOrderSize,
                        cost,
                        entryPrice,
                        unrealizedPnl: unrealizedPnl !== null ? unrealizedPnl.toFixed(3) : 0,
                        realizedPnl: realizedPnl !== null ? realizedPnl.toFixed(3) : 0,
                        initialMarginRequirement: initialMarginRequirement !== null ? initialMarginRequirement.toFixed(3) : 0,
                        maintenanceMarginRequirement: maintenanceMarginRequirement !== null ? maintenanceMarginRequirement.toFixed(3) : 0,
                        openSize: openSize !== null ? openSize.toFixed(3) : null,
                        collateralUsed: collateralUsed !== null ? collateralUsed.toFixed(3) : 0,
                        estimatedLiquidationPrice: estimatedLiquidationPrice !== null ? estimatedLiquidationPrice.toFixed(3) : 0,
                        recentAverageOpenPrice: recentAverageOpenPrice !== null ? recentAverageOpenPrice.toFixed(3) : 0,
                        recentPnl: recentPnl !== null ? recentPnl.toFixed(3) : 0,
                        recentBreakEvenPrice: recentBreakEvenPrice !== null ? recentBreakEvenPrice.toFixed(3) : 0,
                        cumulativeBuySize: cumulativeBuySize !== null ? cumulativeBuySize.toFixed(3) : 0,
                        cumulativeSellSize: cumulativeSellSize !== null ? cumulativeSellSize.toFixed(3) : 0,

                    })
                })
                setRowData([...result])
            }
        }).catch(err => {
           // console.log(err)
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
