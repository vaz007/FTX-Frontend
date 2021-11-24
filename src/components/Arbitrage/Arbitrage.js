import React, { useEffect, useState, useRef } from 'react'
import AgGrid from '../AgGrid/AgGrid'
import baseApiReq from '../../api';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
    agGridItem: {
        height: "90%",
        maxHeight: "80%"
    }

}));
const colOptions = {
    sortable: true, filter: true, sortingOrder: ["desc"]
}
const Arbitrage = () => {
    const classes = useStyles();
    const [rowData, setRowData] = useState([]);
    const colDefs = [
        {
            headerName: "symbol", field: "symbol", ...colOptions,
        },
        {
            headerName: "bpsBasis", field: "bpsBasis", ...colOptions,
        },
        {
            headerName: "absBasis", field: "absBasis", ...colOptions,
        },
        {
            headerName: "spotPrice", field: "spotPrice", ...colOptions,
        },
        {
            headerName: "futPrice", field: "futurePrice", ...colOptions,
        },
        {
            headerName: "absSpread", field: "absSpread", ...colOptions,
        },
        {
            headerName: "bpsSpread", field: "bpsSpread", ...colOptions,
        },
        {
            headerName: "change1h", field: "change1h", ...colOptions,
        },
        {
            headerName: "chg4Hr", field: "change24h", ...colOptions,
        },
        {
            headerName: "bidPrice", field: "bidPrice", ...colOptions,
        },
        {
            headerName: "bidSize", field: "bidSize", ...colOptions,
        },
        {
            headerName: "midPrice", field: "midPrice", ...colOptions,
        },
    ]

    const onGridReady = (event) => {
        event.api.sizeColumnsToFit()
    };

    useEffect(() => {
        initialAxiosCalls()
    }, []);
    const initialAxiosCalls = async () => {
        const body = {}
        // console.log("TYPE OFF : ", typeof (rowData[1].bpsBasis), rowData[1].bpsBasis)

        await baseApiReq.post("/latestBasisByBaseName", body).then(res => {
            //  console.log(res.data);
            const result = []
            if (res.data.data.length !== 0) {
                res.data.data.map(item => {
                    result.push({
                        symbol: item.symbol,
                        bpsBasis: parseFloat(item.absPrice.toFixed(2)),
                        futurePrice: parseFloat(item.futurePrice.toFixed(2)),
                        bidPrice: parseFloat(item.bidPrice.toFixed(2)),
                        askPrice: parseFloat(item.askPrice.toFixed(2)),
                        askSize: parseFloat(item.askSize.toFixed(3)),
                        bidSize: parseFloat(item.bidSize.toFixed(3)),
                        midPrice: parseFloat(item.midPrice.toFixed(3)),
                        spotPrice: parseFloat(item.spotPrice.toFixed(3)),
                        absBasis: parseFloat(item.absBasis.toFixed(2)),
                        absSpread: parseFloat(item.absSpread.toFixed(2)),
                        bpsSpread: parseFloat(item.bpsSpread.toFixed(2)),
                        change1h: parseFloat(item.change1hPercentage.toFixed(2)),
                        change24h: parseFloat(item.change24hPercentage.toFixed(2)),
                    })
                })
                setRowData([...result])
                console.log(rowData)
                console.log("TYPE OFF : ", typeof (rowData[1].bpsBasis), rowData[1].bpsBasis)
                toast.success("Succesfully fetched all the markets.")
            }
        }).catch(err => {
            console.log(err)
            toast.error("Unable to fetch the data")
        })

    }
    return (
        <Grid container
            justifyContent="center"
        >
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

export default Arbitrage
