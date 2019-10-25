import React, { useState } from 'react';
import './App.css';
import BuildTree from './components/BuildTree';
import AppBar from './components/AppBar';
import Home from './components/Home';
import Navigator from './components/Navigator';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import FriendTree from './components/FriendTree';
import Profile from './components/Profile';

function App() {
    const [currentRoute, setCurrentRoute] = useState('/home');
    const [clickedFriendTree, setClickedFriendTree] = useState({ "name": "empty tree (error)" });

    const changeRoute = (route) => {
        setCurrentRoute(route);
    };

    const handleClickedFriendTree = (data) => {
        console.log(data)
        setClickedFriendTree(data);
        setCurrentRoute('/friendTree')
    }

    return (

        <div style={{ height: window.innerHeight, overflow: 'auto' }}>
            {/* <AppBar /> */}
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
                            startingPosition="Cats are better than dogs"
                            proOrCon='pro-node'
                        />}
                    />
                    <Route path="/friendTree" render={
                        () => <FriendTree data={clickedFriendTree} />}
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
