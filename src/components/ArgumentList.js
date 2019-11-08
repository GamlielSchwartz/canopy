import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function ArgumentList(props) {
    const classes = useStyles();

    return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <List component="nav" aria-label="secondary mailbox folders">
                <Grid item xs={6}>

                    <ListItem>
                        <ListItemText primary={props.side} />
                    </ListItem>
                    </Grid>

                    <Divider />
                    {props.listItems.map((item, index) => {
                        return (
                            <div key={index}>
                                <ListItem button>
                                <Grid item xs={6}>

                                    <ListItemText
                                        disableTypography
                                        primary={<Typography type="body2" style={{ color: 'black' }}>{item.name}</Typography>}
                                    />
                                                    </Grid>

                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}
                    <ListItem button onClick={() => props.addToTree(props.side)}>
                    <Grid item xs={6}>

                        <ListItemIcon>

                            <AddCircleIcon
                                htmlColor={props.side === 'Con' ? 'red' : 'green'}
                            />

                        </ListItemIcon>
                        </Grid>

                    </ListItem>
                </List>
            </Grid>
    );
}
