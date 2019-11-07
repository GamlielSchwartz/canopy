import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function ArgumentList(props) {
    const classes = useStyles();

    var children = ["firstfirstfirstfirstfirst", "secondsecondsecondsecond", "thirdthirdthirdthird", "fourthfourthfourthfourth"];
    return (
        <div className={classes.root}>
            {/* <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List> */}
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem>
                    <ListItemText primary={props.side} />
                </ListItem>
                <Divider />
                {props.listItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <ListItem button>
                                <ListItemText
                                    disableTypography
                                    primary={<Typography type="body2" style={{ color: 'black' }}>{item.name}</Typography>}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    )
                })}
                <ListItem button onClick={() => props.addToTree(props.side)}>
                    <ListItemIcon>
                        <AddCircleIcon/>
                    </ListItemIcon>
                </ListItem>
            </List>
        </div>
    );
}
