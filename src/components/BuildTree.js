import React, { useState } from 'react';
import Tree from 'react-tree-graph'
import { Paper, Grid } from '@material-ui/core';

import NewNodeForm from './NewNodeForm';
import addNode from '../utils/addNode';
import SnackPopup from './SnackPopup';
import SeedPopup from './SeedPopup';

export default function BuildTree(props) {
    const [showNewNodeForm, setNewNodeFormOpen] = useState(false);
    const [clickedNode, setClickedNode] = useState(props.startingPosition)

    function initiatePopup(shouldOpenForm, node) {
        setNewNodeFormOpen(shouldOpenForm);
        setClickedNode(node);
    }
    const startingData = {
        "name": props.startingPosition,
        "gProps": {
            "className": props.proOrCon,
            "onClick": (event, node) => {
                initiatePopup(true, node);
            }
        }
    };

    // function recursiveGetPath(match, pathOfNodes, data) {
    //     if (data['name'] === match) {
    //         return pathOfNodes;
    //     }
    //     const children = data.children;
    //     if (!children) return;
    //     for (var i = 0; i < children.length; i++) {
    //         const child = children[i];
    //         const copyOfPath = [...pathOfNodes];
    //         copyOfPath.push(child.name)
    //         const path = recursiveGetPath(match, copyOfPath, child);
    //         if (path) return path;
    //     }
    // }

    // function addWithPathToNode(pathToNodeArray, newData, childText, tabValue) {
    //     // if (pathToNodeArray.length === 1) return data;
    //     var cursor = newData;
    //     while (pathToNodeArray.length !== 1) {
    //         pathToNodeArray.shift();
    //         cursor = cursor.children.filter(child => child.name === pathToNodeArray[0])[0];
    //         if (pathToNodeArray.length === 1) break;
    //     }
    //     const proOrConClass = tabValue === 0 ? 'pro-node' : 'con-node';
    //     if (cursor.children) {
    //         cursor.children.push({
    //             "name": childText,
    //             "gProps": {
    //                 "className": proOrConClass,
    //                 "onClick": (event, node) => {
    //                     initiatePopup(true, node);
    //                 }
    //             }
    //         })
    //     } else {
    //         cursor.children = [
    //             {
    //                 "name": childText,
    //                 "gProps": {
    //                     "className": proOrConClass,
    //                     "onClick": (event, node) => {
    //                         initiatePopup(true, node);
    //                     }
    //                 }
    //             }];
    //     }
    //     setData(newData);
    // }

    const [data, setData] = useState(startingData)

    function addNode2(parent, childText, tabValue) {
        var newTree = addNode(parent, childText, tabValue, [props.startingPosition], data, this, (event, node) => {
            initiatePopup(true, node);
        });
        console.log(newTree);
        setData(newTree)
        // var pathToNode = recursiveGetPath(parent, [props.startingPosition], data);
        // const newData = Object.assign({}, data);
        // addWithPathToNode(pathToNode, newData, childText, tabValue);
    }

    const [isStumped, setIsStumped] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [startingArgumentSelected, setStartingArgument] = useState('')

    function closeSnackbar() {
        setShowSnackBar(false);
    }

    function handleStumped() {
        setShowSnackBar(true);
        setIsStumped(true);
    }

    function closeSeedPopup(){
        setStartingArgument('Default Argument: God Exists')
        startingData.name = 'Default Argument: God Exists';
    }
    
    function setSeedArgument(argument){
        setStartingArgument(argument);
        startingData.name = argument;
    }

    if (!startingArgumentSelected){
        return (
            <SeedPopup 
            setSeedArgument={setSeedArgument}
            close={closeSeedPopup}
            />
        )
    } else return (
        <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="stretch"
        >
            {showSnackBar ?
                <SnackPopup
                    close={closeSnackbar}
                    message="Stumped: People may now suggest arguments for your tree!"
                />
                : null}
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="flex-end"
            >

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-end"
                >
                    <Grid
                        container
                        direction="column"
                        justify="flex-end"
                        alignItems="flex-end"
                    >

                        {/* <Grid item>
                            Stumped?
                        </Grid> */}
                        <Grid item>
                            {isStumped ?
                                <Grid item>
                                    Awaiting Suggestions...
                                                    </Grid>
                                :
                                <img
                                    onClick={handleStumped}
                                    src={require('../stump.png')}
                                    alt="alt"
                                    style={{ width: 100, height: 50 }}
                                />
                            }


                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid>
                <Paper style={{ height: window.innerHeight, overflow: 'auto' }}>
                    {showNewNodeForm ?
                        <NewNodeForm
                            setNewNodeFormOpen={setNewNodeFormOpen}
                            addNode={addNode2}
                            clickedNode={clickedNode}
                        />
                        : null}
                    <Tree
                        margins={{ bottom: 50, left: 100, right: 100, top: 20 }}
                        nodeRadius={15}
                        data={props.fullData ? props.fullData : data}
                        height={620}
                        width={620}
                        svgProps={{
                            transform: 'rotate(270)',
                            className: 'custom',
                        }}
                        textProps={{
                            transform: 'rotate(90)',
                        }}
                        circleProps={{
                            className: 'ball'
                        }}
                    >
                    </Tree>
                </Paper>
            </Grid>

        </Grid>




    );
}