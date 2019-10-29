import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function SuggestionForm(props) {
    const [currText, updateText] = useState("");
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleClose = () => {
        props.setSuggestionForm(false);
    };

    const handleSubmit = () => {
        handleClose();
        props.sendSuggestion(currText, props.clickedNode, tabValue);
    }

    const handleChangeText = (event) => {
        updateText(event.target.value);
    }

    return (
        <div>
            <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Suggestion</DialogTitle>
                <DialogContent>
                    <Paper square>
                        <Tabs
                            value={tabValue}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleTabChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab label="Supporting... " />
                            <Tab label="Opposing... " />
                        </Tabs>
                    </Paper>
                    <DialogContentText>
                        <br/>
                        {props.clickedNode}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newArgument"
                        label="Type suggested argument here..."
                        type="text"
                        text={currText}
                        fullWidth
                        onChange={event => handleChangeText(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add New Argument
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
