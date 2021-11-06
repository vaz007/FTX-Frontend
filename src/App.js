import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@material-ui/core";

import Routes from './routes/index';
import baseApiReq from './api';
import history from './history';



const theme = createTheme({
  palette: {
     type: "dark",
    primary: {
    //  main: "#f57c00",
    main:"rgb(104, 142, 255)" 
    },
  background: {
    default: "rgb(34, 43, 54)",
    paper: "rgb(34, 43, 54)",
  },
  text: {
    primary: '#fff',
    secondary: grey[500],
  },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor:"rgb(34, 43, 54)",
        color:"white"
      },
    },
    MuiButton: {
      root: {
        borderRadius: 8,
      },
    },
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
          },
        '*::-webkit-scrollbar': {
          width: '3px',
          height: '2px',
          borderRadius:"10px"
        },
        '*::-webkit-scrollbar-thumb':{
          backgroundColor:"grey",
          paddingTop:"25rem"
          
        },
        '*::-webkit-scrollbar-thumb:hover':{
          backgroundColor:"#f57c00"
        }
      },
   },   
  },

});

function App() {
  useEffect(() => {
    initialAxiosCalls()
  }, [])
  const initialAxiosCalls = () => {
    baseApiReq.get('/healthcheck').then(res => {
      console.log("RES : ", res)
    }).catch(err => {
      console.log(err);
    })
  }
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App'>
          <Router history={history}>
            <Routes />
          </Router>

        </div>
      </ThemeProvider>
   
  );
}

export default App;
