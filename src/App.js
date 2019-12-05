import React, { useState } from 'react';
import './App.css';
import BuildTree from './components/BuildTree';
import SnackPopup from './components/SnackPopup';
import Home from './components/Home';
import Navigator from './components/Navigator';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import FriendTree from './components/FriendTree';
import Profile from './components/Profile';
import SuggestionPopup from './components/SuggestionPopup';
import { Grid } from '@material-ui/core';
import { NUM_SECONDS_UNTIL_ALERT } from './components/constants';
import Button from '@material-ui/core/Button';
import { first, second, third, unbalanced, unbalanced2, complex } from './components/dummyTrees';


function App() {
    const startingTabVal = 3
    const [currentRoute, setCurrentRoute] = useState('/home');
    const [clickedFriendTree, setClickedFriendTree] = useState();
    const [clickedTreeCanSuggest, setClickedTreeCanSuggest] = useState(false);
    const [shouldShowAlerts, setShouldShowAlerts] = useState(false);
    const [tabValue, setTabValue] = React.useState(startingTabVal);
    const [showGotAlert, setShowGotAlert] = React.useState(0);
    const [alertToggle, setAlertToggle] = React.useState(true);
    React.useEffect(() => {
        function showNotif() {
            setShowGotAlert(showGotAlert + 1);
        }
        setTimeout(showNotif, NUM_SECONDS_UNTIL_ALERT);
    });

    function changeTabVal(newVal) {
        setTabValue(newVal);
    }

    const changeRoute = (route) => {
        setCurrentRoute(route);
        if (route !== '/home') setShowButton(false);
        if (route === '/home') {
            setTabValue(startingTabVal);
            setShowButton(true);
        }
    };

    const handleClickedFriendTree = (data, canSuggest) => {
        setShowButton(false);
        setClickedTreeCanSuggest(canSuggest)
        setClickedFriendTree(data);
        console.log(canSuggest);
        setCurrentRoute('/friendTree')
    }

    function backToHome() {
        setShowButton(true);
        setCurrentRoute('/home')
    }

    function backToProfile() {
        setCurrentRoute('/profile')
    }

    function showAlerts(shouldShow) {
        setShouldShowAlerts(shouldShow);
    }

    const [numNotifications, setNumNotification] = useState(0);
    const [suggestionData, setSuggestionData] = useState({});

    function addNotification(data) {
        console.log(data);
        setSuggestionData(data);
        setNumNotification(numNotifications + 1);
    }

    function acceptSuggestion(data) {
        console.log(data);
    }

    const [existingTree, setExistingTree] = useState({});

    function setClickedExistingTree(tree) {
        setExistingTree(tree);
    }

    function closeSnackbar() {
        setShowGotAlert(false);
        setAlertToggle(false);
    }
    const allTreesToDisplay = [first, complex, second, third, unbalanced, unbalanced2];
    const [displayTrees, setDisplayTrees] = React.useState(allTreesToDisplay);
    const [filterToggle, setFilterToggle] = React.useState(true);
    const [showButton, setShowButton] = React.useState(true);
    function filterTrees(shouldFilter) {
        setFilterToggle(!shouldFilter);
        if (shouldFilter) {
            setDisplayTrees([unbalanced, unbalanced2])
        } else {
            setDisplayTrees(allTreesToDisplay)
        }
    }

    return (
        <div style={{ height: window.innerHeight, overflow: 'auto' }}>
            {showGotAlert === 1 && alertToggle ?
                <SnackPopup
                    type={"info"}
                    close={closeSnackbar}
                    message={"You have a suggestion for one of your trees! Check your notifications!"}
                />
                :
                null
            }
            {shouldShowAlerts ?
                <SuggestionPopup
                    acceptSuggestion={acceptSuggestion}
                    showAlerts={showAlerts}
                    suggestionData={suggestionData}
                />
                : null}
            {/* <AppBar
                numNotifications={numNotifications}
                showAlerts={showAlerts}
            /> */}
            <Navigator
                changeRoute={changeRoute}
                tabValue={tabValue}
                changeTabVal={changeTabVal}
            />
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                {
                    showButton ? 
                    filterToggle ?
                            <Button
                                variant="contained"
                                // color="primary"
                                onClick={() => filterTrees(true)}
                            >
                                Show Only Unbalanced Trees
                            </Button>
                            :
                            <Button
                                variant="contained"
                                // color="primary"
                                onClick={() => filterTrees(false)}
                            >
                                Show All Trees
                            </Button>
                    : null
                }
                
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {/* <Grid item> */}
                <Router>
                    {/* For some reason history not being pushed so can't move forward/back w/ browser arrows */}
                    <Route path="/home" render={
                        () => <Home
                            treesToDisplay={displayTrees}
                            setClickedTree={handleClickedFriendTree}
                        />}
                    />
                    <Route path="/buildTree" render={
                        () => <BuildTree
                            // shouldShowAlerts={shouldShowAlerts}
                            // showAlerts={showAlerts}
                            changeRoute={changeRoute}
                        />}
                    />
                    <Route path="/friendTree" render={
                        () =>
                            <FriendTree
                                backToHome={backToHome}
                                fullTree={clickedFriendTree}
                                canSuggest={clickedTreeCanSuggest}
                                addNotification={addNotification}
                            />}
                    />
                    <Route path="/existingTree" render={
                        () =>
                            <BuildTree
                                existingData={existingTree}
                                backToProfile={backToProfile}
                            />
                    }
                    />
                    <Route path="/profile" render={
                        () => <Profile
                            setClickedExistingTree={setClickedExistingTree}
                            changeRoute={changeRoute}
                        />}
                    />
                    <Redirect to={currentRoute} />
                </Router>
                {/* </Grid> */}
            </Grid>
        </div>
    );
}

export default App;
