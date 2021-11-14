import React, { useEffect, useState, useRef } from 'react'
import AgGrid from '../AgGrid/AgGrid'
import axios from 'axios';
import baseApiReq from '../../api';
import { Grid } from '@material-ui/core';

const Arbitrage = () => {
    const [rowData, setRowData] = useState([]);
    const colDefs = [
        {
            headerName: "symbol", field: "symbol", sortable: true, filter: true
        },
        {
            headerName: "bpsBasis", field: "bpsBasis", sortable: true, filter: true
        },
        {
            headerName: "change 1Hr", field: "change1h", sortable: true, filter: true
        },
        {
            headerName: "change 24Hr", field: "change24h", sortable: true, filter: true
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
            headerName: "bidPrice", field: "bidPrice", sortable: true, filter: true
        },
        {
            headerName: "bidSize", field: "bidSize", sortable: true, filter: true
        },
        {
            headerName: "midPrice", field: "midPrice", sortable: true, filter: true
        },
    ]

    useEffect(() => {

        initialAxiosCalls()
        // baseApiReq.get('https://www.ag-grid.com/example-assets/row-data.json').then(res => {
        //     console.log(res.data);
        //     setRowData(res.data)
        // }).catch(err => {
        //     console.log(err)
        // })
    }, []);
    const initialAxiosCalls = async () => {
        const body = {
            depth: 1,
            baseName: [
                "TONCOIN", "LINA", "SOL", "SRM", "GRT", "BNB", "SUSHI", "UNI", "ROOK", "LTC", "RAY", "FIDA", "ENJ", "SLP", "RAMP", "ETH","MANA", "MATIC"]
        }
        await baseApiReq.post("/latestBasisByBaseName", body).then(res => {
            //  console.log(res.data);
            const result = []
            if (res.data.length !== 0) {
                res.data.map(item => {
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
                        change24h:item.change24hPercentage.toFixed(3)
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
            <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
                <AgGrid
                    row={rowData}
                    column={colDefs}
                />
            </Grid>
        </Grid>
    )
}

export default Arbitrage
