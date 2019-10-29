import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function SuggestionPopup(props) {
    const data = props.suggestionData;
    const handleReject = () => {
        props.showAlerts(false);
    };

    const handleAcceptSuggestion = () => {
        props.acceptSuggestion(data);
        props.showAlerts(false);
    }


    return (
        <div>
            <Dialog open={true} onClose={() => props.showAlerts(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Someone has a suggestion for you:</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        In {data.tabIndex === 0 ? 'support of' : 'opposition to'} '{data.parent}', consider: {data.suggestion}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReject} color="primary">
                        Reject
                    </Button>
                    <Button onClick={handleAcceptSuggestion} color="primary">
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
