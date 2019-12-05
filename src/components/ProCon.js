import React from 'react';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import ArgumentList from './ArgumentList';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

function ProCon(props) {
    const [toEdit, setToEdit] = React.useState(props.parentNode);
    const [showEditable, setShowEditable] = React.useState(false);

    // React.useEffect(() => {
    //     //change value of toEdit field for textField when props change
    //     if (props.parentNode && props.parentNode !== toEdit){
    //         setToEdit('');
    //     }
    // }, [toEdit, props.parentNode]);
    function addToTree(newChild, side) {
        props.addToTree(props.parentNode, newChild, side);
    }
    const classes = useStyles();

    function handleInputChange(newVal) {
        setToEdit(newVal);
    }

    function toggleEditableNode(canEdit) {
        setToEdit(props.parentNode);
        setShowEditable(canEdit);
    }

    function saveEditedNode() {
        props.editNode(props.parentNode, toEdit);
        toggleEditableNode(false);
    }

    return (

        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Paper className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    {showEditable ?
                        <span>
                            <TextField
                                placeholder="Edit node..."
                                // onMouseDown={()=> setToEdit(props.parentNode)}
                                onChange={(event) => handleInputChange(event.target.value)}
                                value={toEdit}
                            />
                            <Button
                                color="primary"
                                onClick={() => toggleEditableNode(false)}
                            >
                                <ClearIcon />
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => saveEditedNode()}
                            >
                                <DoneIcon />
                            </Button>
                        </span>

                        : <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            {
                                props.isRoot ? null :
                                        <Grid item xs={2}>
                                            <Button
                                                color="primary"
                                                onClick={() => toggleEditableNode(true)}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={() => props.deleteNode(props.parentNode)}
                                            ><DeleteIcon />
                                            </Button>
                                        </Grid>
                            }
                            <Grid item xs={props.isRoot ? 12 : 10} style={{ fontWeight: 'bold', fontSize: '28px', fontFamily:'Raleway' }}>{props.parentNode}</Grid>
                        </Grid>
                    }
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
                        side="Supporting"
                        addToTree={addToTree}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ArgumentList xs={6}
                        onNodeClick={props.onNodeClick}
                        listItems={props.cons}
                        side="Opposing"
                        addToTree={addToTree}
                    />

                </Grid>

            </Grid>

        </Grid>

    );
}

export default ProCon;
