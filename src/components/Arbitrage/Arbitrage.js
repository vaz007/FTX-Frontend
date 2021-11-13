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
            headerName: "absBasis", field: "absBasis", sortable: true, filter: true
        },
        {
            headerName: "spotPrice", field: "spotPrice", sortable: true, filter: true
        },
        {
            headerName: "futurePrice", field: "futurePrice", sortable: true, filter: true
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
                "TONCOIN","LINA", "SOL", "SRM", "GRT", "BNB", "SUSHI", "UNI", "ROOK", "LTC", "RAY", "FIDA", "ENJ", "SLP", "RAMP",
            ]
        }
        await baseApiReq.post("/latestBasisByBaseName", body).then(res => {
            //  console.log(res.data);
            const result = []
            if (res.data.length !== 0) {
                res.data.map(item => {
                    result.push({
                        symbol: item.data[0].symbol,
                        bpsBasis: item.data[0].absPrice.toFixed(3),
                        futurePrice: item.data[0].futurePrice.toFixed(3),
                        bidPrice: item.data[0].bidPrice.toFixed(3),
                        askPrice: item.data[0].askPrice.toFixed(3),
                        askSize: item.data[0].askSize.toFixed(3),
                        bidSize: item.data[0].bidSize.toFixed(3),
                        midPrice: item.data[0].midPrice.toFixed(3),
                        spotPrice: item.data[0].spotPrice.toFixed(3),
                        absBasis : (item.data[0].futurePrice - item.data[0].spotPrice).toFixed(3),
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
            <Grid item xs={12} sm={12} md={12} lg={10} xl={9}>
                <AgGrid
                    row={rowData}
                    column={colDefs}
                />
            </Grid>
        </Grid>
    )
}

export default Arbitrage
