import React from 'react';
import { Grid } from '@material-ui/core';
import ArgumentList from './ArgumentList';

function ProCon(props) {
    function addToTree(side) {
        props.addToTree(side);
    }
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            <Grid item>
                {props.parentNode}
                </Grid>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <ArgumentList
                        listItems={props.pros}
                        side="Pro"
                        addToTree={addToTree}
                    />
                </Grid>
                <Grid item>
                    <ArgumentList
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
