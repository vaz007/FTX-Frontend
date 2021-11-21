import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react';
import { Button, Grid, Paper, makeStyles, useTheme } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import { Send } from '@material-ui/icons';

import { latestBasisByBaseName } from '../redux-helpers/Actions/arbitrageAction'
import { clearErrors } from "../redux-helpers/Actions/errorAction";
import { toast } from 'react-toastify';
import baseApiReq from '../api';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 500,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    submitButton: {
        marginTop: theme.spacing(3),
        color: "rgb(16, 185, 129)"
    }

}));



const names = [
    "LINA", "SOL", "SRM", "GRT", "BNB", "SUSHI", "UNI", "ROOK", "LTC", "RAY", "FIDA", "ENJ", "SLP", "RAMP",
];
function getStyles(name, baseName, theme) {
    return {
        fontWeight:
            baseName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const Sample = ({ latestBasisByBaseName, arbitrage, error, status }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [baseName, setbaseName] = useState([]);
    const [latestBasisByFuture, setlatestBasisByFuture] = useState([]);
    const [latestBasisByFutureSymbol, setlatestBasisByFutureSymbol] = useState([]);
    const [arbitrageResult, setarbitrageResult] = useState([]);
    let barGraph = {
        xAxis: {
            type: 'category',
            data: names,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar'
            }
        ],
        barWidth: 40,
        barCategoryGap: '10%'
    }
    useEffect(() => {
        initialAxiosCall();
    }, [])
    useEffect(() => {
        if (error.id === 'LATEST_BASIS_BY_NAME_FAIL') {
            toast.error("Unable to complete the action.")
            clearErrors();
        } else {
           // console.log("STATUS : ", status)
            const arr = []
            const arr1 = [];
            arbitrage.map(item => {
                arr.push(item.symbol);
                arr1.push(item.futurePrice);
            })
            setlatestBasisByFutureSymbol([...arr]);
            setlatestBasisByFuture([...arr1]);
           //  console.log(latestBasisByFutureSymbol);
            // console.log(latestBasisByFuture)
        }
    }, [error, status, arbitrage])
    const initialAxiosCall = () => {
        // baseApiReq.get('/markets').then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err)
        // })
    }
    barGraph = {
        ...barGraph, xAxis: {
            type: 'category',
            data: latestBasisByFutureSymbol,
        },
        series: [
            {
                data: latestBasisByFuture,
                type: 'bar'
            }
        ]

    }
    const handleChange = (event) => {
        setbaseName(event.target.value);
        // console.log(baseName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(baseName);
        const body = {
            depth: 1,
            baseName
        }
        latestBasisByBaseName(body);
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    <Grid container>
                        <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple
                                    value={baseName}
                                    onChange={handleChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} className={classes.chip} />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name} style={getStyles(name, baseName, theme)}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} lg={2} xl={2}>

                            <Button
                                variant="outlined" endIcon={<Send />}
                                className={classes.submitButton}
                                onClick={handleSubmit}
                            >
                                Sumbit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
                    <ReactECharts
                        option={barGraph}
                    />
                </Grid>
            </Grid>

        </div>
    )
}


const mapStateToProps = (state) => {
   // console.log("STATE : ", state)
    return {
        arbitrage: state.arbitrage.arbitrage,
        error: state.error,
        status: state.arbitrage.status,
        message: state.arbitrage.message,
    };
};

export default connect(mapStateToProps, { latestBasisByBaseName })(Sample)