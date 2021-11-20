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

const Arbitrage = () => {
    const classes = useStyles();
    const [rowData, setRowData] = useState([]);
    const colDefs = [
        {
            headerName: "symbol", field: "symbol", 
            sortable: true, 
            filter: true,
            // headerCheckboxSelection: true,
            // headerCheckboxSelectionFilteredOnly: true,
            // checkboxSelection: true,
        },
        {
            headerName: "bpsBasis", field: "bpsBasis", sortable: true, filter: true
        },
        {
            headerName: "absBasis", field: "absBasis", sortable: true, filter: true
        },
        {
            headerName: "spotPrice", field: "spotPrice", sortable: true, filter: true
        },
        {
            headerName: "futPrice", field: "futurePrice", sortable: true, filter: true
        },
        {
            headerName: "absSpread", field: "absSpread", sortable: true, filter: true
        },
        {
            headerName: "bpsSpread", field: "bpsSpread", sortable: true, filter: true
        },
        {
            headerName: "chg1Hr", field: "change1h", sortable: true, filter: true
        },
        {
            headerName: "chg4Hr", field: "change24h", sortable: true, filter: true
        },
        {
            headerName: "bidPrice", field: "bidPrice", sortable: true, filter: true
        },
        {
            headerName: "bidSize", field: "bidSize", sortable: true, filter: true
        },
        {
            headerName: "midPrice", field: "midPrice", sortable: true, filter: true
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
        await baseApiReq.post("/latestBasisByBaseName", body).then(res => {
            //  console.log(res.data);
            const result = []
            if (res.data.data.length !== 0) {
                res.data.data.map(item => {
                    result.push({
                        symbol: item.symbol,
                        bpsBasis: item.absPrice.toFixed(3),
                        futurePrice: item.futurePrice.toFixed(3),
                        bidPrice: item.bidPrice.toFixed(3),
                        askPrice: item.askPrice.toFixed(3),
                        askSize: item.askSize.toFixed(3),
                        bidSize: item.bidSize.toFixed(3),
                        midPrice: item.midPrice.toFixed(3),
                        spotPrice: item.spotPrice.toFixed(3),
                        absBasis: item.absBasis.toFixed(3),
                        absSpread: item.absSpread.toFixed(3),
                        bpsSpread: item.bpsSpread.toFixed(3),
                        change1h: item.change1hPercentage.toFixed(3),
                        change24h: item.change24hPercentage.toFixed(3)
                    })
                })
                setRowData([...result])
                toast.success("Succesfully fetched all the markets.")
            }
        }).catch(err => {
            // console.log(err)
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
