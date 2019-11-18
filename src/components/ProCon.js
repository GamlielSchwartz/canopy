import React from 'react';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import ArgumentList from './ArgumentList';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

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
                <Grid item xs={12}>
                    {/* <Button
                        color="primary"
                        onClick={() => props.deleteNode(props.parentNode)}
                    >Delete Node (and children)</Button> */}
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
                                <SaveAltIcon />
                            </Button>
                        </span>
                        : <span><span>{props.parentNode}</span>
                            {
                                props.isRoot ? null :
                                    <span>
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
                                    </span>
                            }

                        </span>
                    }

                    {/* <TextField
                        placeholder="Edit node..."
                        // onMouseDown={()=> setToEdit(props.parentNode)}
                        onChange={(event) => handleInputChange(event.target.value)}
                        value={toEdit}
                    /> */}


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
