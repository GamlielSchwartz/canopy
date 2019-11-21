import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function SeedPopup(props) {
    const [currText, updateText] = useState("");

    const handleAcceptSuggestion = () => {
        props.setSeedArgument(currText);
    }

    const handleChangeText = (event) => {
        updateText(event.target.value);
    }

    return (
        <div>
            <Dialog open={true} aria-labelledby="form-dialog-title" onClose={()=> props.close()}>
                <DialogTitle id="form-dialog-title" >Type a starting position for any argument:</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        In asdasdasd
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newArgument"
                        label="Type argument 'seed' here..."
                        type="text"
                        text={currText}
                        fullWidth
                        onChange={event => handleChangeText(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> props.close()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAcceptSuggestion} color="primary">
                        Start
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
