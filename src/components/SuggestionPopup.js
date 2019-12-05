import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { topbarBrown } from './constants';

export default function SuggestionPopup(props) {
    const data = props.suggestionData;
    const handleReject = () => {
        props.handleReject();
    };

    const handleAcceptSuggestion = () => {
        props.handleAccept(data);
    }


    return (
        <div>
            <Dialog open={true} onClose={() => console.log("closing suggestion accept/reject")} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', backgroundColor: topbarBrown, color: 'white' }}>
                    <span>PuppyLover123 has a suggestion for you related to the argument</span>
                    <strong> {data.argument}</strong>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ textAlign: 'center' }}>
                        <br />
                        In {data.tabIndex === 0 ? 'support of' : 'opposition to'}
                        <br /><br />
                        <Typography variant="h5" component="h5">
                            '{data.immediateParent}'
                        </Typography>
                        <br /><br />
                        consider: <br /><br />
                        {/* <strong>'{data.suggestion}'</strong> */}
                        <Typography variant="h5" component="h5">
                            '{data.suggestion}'
                        </Typography>
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
