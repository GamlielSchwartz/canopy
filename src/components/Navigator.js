import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { IconButton, Grid, Tooltip } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SuggestionPopup from './SuggestionPopup';
import { NUM_SECONDS_UNTIL_ALERT, topbarBrown } from './constants';
import SnackPopup from './SnackPopup';
import Typography from '@material-ui/core/Typography';

function Navigator(props) {
    // const [value, setValue] = React.useState(props.startingTab);
    const [numNotifications, setNumNotifications] = React.useState(0);
    const tabs = ["Forest", "New Tree", "Your Profile"];
    const tabToRoute = { "Forest": '/home', "New Tree": "/buildTree", "Your Profile": "/profile" }
    const [hasClickedReject, setHasClickedReject] = React.useState(false);
    const handleChange = (event, newValue) => {
        props.changeRoute(tabToRoute[tabs[newValue - 3]]);
        props.changeTabVal(newValue);
    };
    useEffect(() => {
        function showNotif() {
            setNumNotifications(1);
        }
        if (!hasClickedReject) {
            setTimeout(showNotif, NUM_SECONDS_UNTIL_ALERT);
        }
    }, [hasClickedReject]);

    const [showSuggestion, setShowSuggestion] = React.useState(false);

    function showAllSuggestions() {
        if (numNotifications !== 0) {
            setShowSuggestion(true);
        }
    }
    const [showRejectAcceptSuggestion, setShowRejectAcceptSuggestion] = React.useState(false);
    const [didRejectSuggestion, setDidRejectSuggestion] = React.useState(true);

    function rejectSuggestion() {
        setShowSuggestion(false);
        setNumNotifications(0);
        setHasClickedReject(true);
        setDidRejectSuggestion(true);
        setShowRejectAcceptSuggestion(true);
    }

    function acceptSuggestion() {
        setShowSuggestion(false);
        setNumNotifications(0);
        setHasClickedReject(true);
        setDidRejectSuggestion(false);
        setShowRejectAcceptSuggestion(true);
    }

    function closeSnackbar() {
        setShowRejectAcceptSuggestion(false);
    }

    function TabContainer(props) {
        return (
            <Typography component="div" style={{ padding: 8 * 3 }}>
                {props.children}
            </Typography>
        );
    }


    return (

        <Paper square style={{ color: 'white', fontWeight: 'bold' }}>
            {showRejectAcceptSuggestion ?
                <SnackPopup
                    type={didRejectSuggestion ? "error" : "success"}
                    close={closeSnackbar}
                    message={didRejectSuggestion ? "Suggestion rejected" : "Suggestion Accepted"}
                />
                :
                null
            }
            {showSuggestion ?
                <SuggestionPopup
                    handleAccept={acceptSuggestion}
                    handleReject={rejectSuggestion}
                    suggestionData={
                        {
                            tabIndex: 0,
                            suggestion: 'He worked really hard and he deserves credit',
                            immediateParent: 'he does everything without super powers',
                            argument: 'Batman is better than superman'
                        }
                    }
                />
                :
                null
            }
            <Tabs
                TabIndicatorProps={{ style: { background: topbarBrown, height: '100%', zIndex: 5, borderRadius: 10, transition: '0ms' } }}
                style={{ backgroundColor: 'rgb(112,65,22)', fontFamily: 'Acme', fontWeight: 'bold' }}
                value={props.tabValue}
                indicatorColor="primary"
                textColor="inherit"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                {/* <span style={{fontWeight:'bold', color:'dark-green', fontSize: 30}}>Canopy</span> */}
                <Tab style={{ opacity: .9 }} label={<span className="test" style={{ fontWeight: 'bold', fontSize: 30, fontFamily: 'Arvo', textTransform: 'capitalize' }}>Canopy</span>} disabled />
                <Tab label={<span style={{ fontWeight: 'bold', color: '#005000', fontSize: 30, fontFamily: 'Arvo' }}></span>} disabled />
                <Tab label={<span style={{ fontWeight: 'bold', color: '#005000', fontSize: 30, fontFamily: 'Arvo' }}></span>} disabled />

                {tabs.map((item, index) => {
                    return <Tab label={<span style={{ fontWeight: 'bold', zIndex: 6 }}>{item}</span>} key={index} />
                })}
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Grid item>
                        <Tooltip title={numNotifications === 0 ? "no notifications right now" : "Click to see suggestions"}>

                            <IconButton color="inherit"
                                style={{ marginRight: 18 }}
                                onClick={showAllSuggestions}
                            >
                                <Badge badgeContent={numNotifications} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Tabs>
        </Paper>
    );
}

export default Navigator;
