import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';


export default function ArgumentList(props) {
    const [showAddOn, setShowAddOn] = React.useState(false);
    const [toEdit, setToEdit] = React.useState('');

    function showAddOnListItem(shouldShow) {
        setShowAddOn(shouldShow)
    }

    function handleInputChange(newVal) {
        setToEdit(newVal);
    }

    function handleSaveNewItem() {
        var child = toEdit;
        var tabVal = props.side === 'Supporting' ? 0 : 1;
        props.addToTree(child, tabVal);
        setToEdit('');
        setShowAddOn(false);
    }

    function editableListItem() {
        return (
            <div>
                <ListItem>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <span>
                                <TextField
                                    placeholder="Add node..."
                                    onChange={(event) => handleInputChange(event.target.value)}
                                />
                                <Button
                                    color="primary"
                                    onClick={(() => showAddOnListItem(false))}
                                >
                                    <ClearIcon />
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => handleSaveNewItem()}
                                >
                                    <DoneIcon />
                                </Button>
                            </span>
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider />
            </div>
        )
    }
    return (
        // <Grid
        // xs={12}
        //     container
        //     direction="column"
        //     justify="center"
        //     alignItems="center"
        // >
        <List component="nav" aria-label="secondary mailbox folders">

            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid>
                    <ListItem>
                        <ListItemText
                            disableTypography
                            primary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '22px', fontFamily:'Raleway' }}>{props.side}</Typography>}

                        // primary={props.side} 

                        />
                    </ListItem>
                </Grid>
            </Grid>

            <Divider />
            {props.listItems.map((item, index) => {
                return (
                    <div key={index}>
                        <ListItem button onClick={() => props.onNodeClick(item.name)}>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Typography
                                                type="body2"
                                                style={{ color: 'black', fontFamily: 'Lato' }}
                                            >
                                                {item.name}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider />
                    </div>
                )
            })}
            {showAddOn ? editableListItem() : null}
            {/* <ListItem button onClick={() => props.addToTree(props.side)}> */}

            <ListItem button onClick={() => showAddOnListItem(true)}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item >

                        <ListItemIcon>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <AddCircleIcon
                                    htmlColor={props.side === 'Opposing' ? 'red' : 'green'}
                                />
                            </Grid>

                        </ListItemIcon>
                    </Grid>
                </Grid>

            </ListItem>
        </List>
    );
}
