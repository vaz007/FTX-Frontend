import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    // position: 'relative',
    // height:"100%",
    // width: "100%"
  },
  text: {
    marginTop: '6%',
    justifyContent: 'center',
    position: 'fixed',

  }
}));

export default function Spinner({ message }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12}> 
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
          <span className={classes.text}>{message}</span>
        </Backdrop>
      </Grid>
    </Grid>
  );
}

Spinner.defaultProps = {
  message: 'Loading...'
};