import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

function DemoProCon(props) {

    const classes = useStyles();


    return (

        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Paper className={classes.root}>
                <Grid item xs={12}>
                <span style={{ fontWeight: 'bold', fontSize: '28px' }}>{props.potentialNode}</span>
                </Grid>
            </Paper>


        </Grid>

    );
}

export default DemoProCon;
