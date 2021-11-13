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
            headerName: "absPrice", field: "absPrice", sortable: true, filter: true
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
        {
            headerName: "spotPrice", field: "spotPrice", sortable: true, filter: true
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
                "LINA", "SOL", "SRM", "GRT", "BNB", "SUSHI", "UNI", "ROOK", "LTC", "RAY", "FIDA", "ENJ", "SLP", "RAMP",
            ]
        }
        await baseApiReq.post("/latestBasisByBaseName", body).then(res => {
            //  console.log(res.data);
            const result = []
            if (res.data.length !== 0) {
                res.data.map(item => {
                    result.push({
                        symbol: item.data[0].symbol,
                        absPrice: Math.round((item.data[0].absPrice + Number.EPSILON) * 100) / 100,
                        futurePrice: Math.round((item.data[0].futurePrice + Number.EPSILON) * 100) / 100,
                        bidPrice: Math.round((item.data[0].bidPrice + Number.EPSILON) * 100) / 100,
                        askPrice: Math.round((item.data[0].askPrice + Number.EPSILON) * 100) / 100,
                        askSize: Math.round((item.data[0].askSize + Number.EPSILON) * 100) / 100,
                        bidSize: Math.round((item.data[0].bidSize + Number.EPSILON) * 100) / 100,
                        midPrice: Math.round((item.data[0].midPrice + Number.EPSILON) * 100) / 100,
                        spotPrice: Math.round((item.data[0].spotPrice + Number.EPSILON) * 100) / 100,
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
