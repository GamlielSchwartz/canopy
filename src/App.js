import React, { useState } from 'react';
import './App.css';
import BuildTree from './components/BuildTree';
import AppBar from './components/AppBar';
import Home from './components/Home';
import Navigator from './components/Navigator';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import FriendTree from './components/FriendTree';
import Profile from './components/Profile';
import SuggestionPopup from './components/SuggestionPopup';


function App() {
    const [currentRoute, setCurrentRoute] = useState('/home');
    const [clickedFriendTree, setClickedFriendTree] = useState();
    const [shouldShowAlerts, setShouldShowAlerts] = useState(false);

    const changeRoute = (route) => {
        setCurrentRoute(route);
    };

    const handleClickedFriendTree = (data) => {
        setClickedFriendTree(data);
        setCurrentRoute('/friendTree')
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


    return (

        <div style={{ height: window.innerHeight, overflow: 'auto' }}>
            {shouldShowAlerts ?
                <SuggestionPopup
                    acceptSuggestion={acceptSuggestion}
                    showAlerts={showAlerts}
                    suggestionData={suggestionData}
                />
                : null}
            <AppBar
                numNotifications={numNotifications}
                showAlerts={showAlerts}
            />
            <Navigator changeRoute={changeRoute} />
            <Router>
                {/* For some reason history not being pushed so can't move forward/back w/ browser arrows */}
                <Switch>
                    <Route path="/home" render={
                        () => <Home
                            setClickedTree={handleClickedFriendTree}
                        />}
                    />
                    <Route path="/buildTree" render={
                        () => <BuildTree
                            shouldShowAlerts={shouldShowAlerts}
                            showAlerts={showAlerts}
                        />}
                    />
                    <Route path="/friendTree" render={
                        () =>
                            <FriendTree
                                data={clickedFriendTree}
                                addNotification={addNotification}
                            />}
                    />
                    <Route path="/profile" render={
                        () => <Profile />}
                    />
                </Switch>
                <Redirect to={currentRoute} />
            </Router>
        </div>
    );
}

export default App;
