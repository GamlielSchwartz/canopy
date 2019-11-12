import React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import ArgumentList from './ArgumentList';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

function ProCon(props) {
    function addToTree(side) {
        props.addToTree(side);
    }
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
                    {props.parentNode}
                    <Button 
                    color="primary"
                    onClick={()=> props.deleteNode(props.parentNode)}
                    >Delete Node (and children)</Button>
                </Grid>
            </Paper>

            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={6}>
                    <ArgumentList xs={6}
                        onNodeClick={props.onNodeClick}
                        listItems={props.pros}
                        side="Pro"
                        addToTree={addToTree}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ArgumentList xs={6}
                        onNodeClick={props.onNodeClick}
                        listItems={props.cons}
                        side="Con"
                        addToTree={addToTree}
                    />

                </Grid>

            </Grid>

        </Grid>

    );
}

export default ProCon;
