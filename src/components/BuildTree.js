import React, { useState, useEffect } from 'react';
import Tree from 'react-tree-graph'
import { Paper, Grid } from '@material-ui/core';

import NewNodeForm from './NewNodeForm';
import addNode from '../utils/addNode';
import SnackPopup from './SnackPopup';
import SeedPopup from './SeedPopup';
import ProCon from './ProCon';
import getNode from '../utils/getChildren';

export default function BuildTree(props) {
    const [showNewNodeForm, setNewNodeFormOpen] = useState(false);
    // const [clickedNode, setClickedNode] = useState(props.startingPosition)
    const [clickedProChildren, setClickedProChildren] = useState([]);
    const [clickedConChildren, setClickedConChildren] = useState([]);
    const [data, setData] = useState(null);
    const [newNodeFormSide, setNewNodeFormSide] = useState('Pro');

    const [toggleNode, setToggleNode] = useState(null);
    var classname = document.getElementsByClassName("myNode");

    var myFunction = function () {
        console.log('!!!')
    };

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('hover', myFunction, false);
    }
    useEffect(() => {
        if (!toggleNode) return;
        var clickedNode = getNode(toggleNode, data, this);
        if (!clickedNode.children) {
            setClickedProChildren([]);
            setClickedConChildren([])
            return;

        }
        var proChildren = clickedNode.children.filter(child => child.gProps.className === 'pro-node');
        var conChildren = clickedNode.children.filter(child => child.gProps.className === 'con-node');
        setClickedProChildren(proChildren);
        setClickedConChildren(conChildren)
        console.log(proChildren);
        console.log(conChildren);
    }, [data, toggleNode]);

    function addToTree(side) {
        setNewNodeFormSide(side);
        setNewNodeFormOpen(true);
    }

    function onNodeClick(shouldOpenForm, node) {
        // setNewNodeFormOpen(shouldOpenForm);
        // setClickedNode(node);
        setToggleNode(node);
        // console.log("data on click2:");
        // console.log(data);
        // if (data){
        //     var clickedNode = getNode(node, data, this);
        //     console.log(clickedNode);
        // }

        // if (!data) {
        //     console.log("no data");
        //     return;
        // }
        // var wholeNode = getNode(node, data, this);
        // console.log(wholeNode);
        // var myNode = getNode(node, data, this);
        // console.log(myNode)
        // var children = myNode.children;
        // setClickedProChildren(children ? children : []);
        // setShowProCon(true);
    }

    async function addNode2(parent, childText, tabValue) {
        var newTree = addNode(
            parent,
            childText,
            tabValue,
            [parent],
            data,
            null,
            (event, node) => {
                console.log("data on click1:");
                console.log(data);
                onNodeClick(true, node);
            }
        );
        // console.log(newTree);
        var clickable = makeNodesClickable(newTree);
        // console.log("clickable:");
        // console.log(clickable)
        await setData(clickable);
        // console.log(data);


        // setData(newTree);
        // var pathToNode = recursiveGetPath(parent, [props.startingPosition], data);
        // const newData = Object.assign({}, data);
        // addWithPathToNode(pathToNode, newData, childText, tabValue);
    }

    const [isStumped, setIsStumped] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);

    function closeSnackbar() {
        setShowSnackBar(false);
    }

    function handleStumped() {
        setShowSnackBar(true);
        setIsStumped(true);
    }

    function closeSeedPopup() {
    }

    function setSeedArgument(argument) {
        const newData = {
            "name": argument,
            "gProps": {
                "className": 'pro-node',
                "onClick": (event, node) => {
                    onNodeClick(true, node);
                },
                "onMouseOver": (e, node) => console.log(node)
            }
        };
        setData(newData);
        setToggleNode(argument);
    }

    function makeNodesClickable(propsData) {
        if (!propsData) return { name: "hello" };
        //NOTE: assuming nothing yet clickable in gProps and that gProps exists:
        //nothing should be clickable b/c coming from mini tree where nodes shouldn't be clickable
        //and gProps should exist because classnames which dictate node color should be present in mini tree
        propsData.gProps.onClick =
            (event, node) => {
                onNodeClick(true, node);
            }
        propsData.gProps.onMouseOver =
            (event, node) => console.log(node)
        const children = propsData.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++) {
            const child = children[i];
            makeNodesClickable(child);
        }
        return propsData;
    }

    if (!data) {
        return (
            <SeedPopup
                setSeedArgument={setSeedArgument}
                close={closeSeedPopup}
            />
        )
    } else return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
        >
            {showSnackBar ?
                <SnackPopup
                    close={closeSnackbar}
                    message="Stumped: People may now suggest arguments for your tree!"
                />
                : null}
            {/* <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="flex-end"
            >
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
            </Grid> */}
            <Grid item xs={6}>
                <Paper style={{ height: window.innerHeight, overflow: 'auto' }}>
                    {showNewNodeForm ?
                        <NewNodeForm
                            side={newNodeFormSide}
                            setNewNodeFormOpen={setNewNodeFormOpen}
                            addNode={addNode2}
                            clickedNode={toggleNode}
                        />
                        : null}
                    <Tree
                        margins={{ bottom: 50, left: 100, right: 100, top: 20 }}
                        nodeRadius={15}
                        data={data}
                        height={620}
                        width={620}
                        svgProps={{
                            transform: 'rotate(270)',
                            className: 'custom'
                        }}
                        textProps={{
                            transform: 'rotate(90)',
                            className: 'hide-me'
                        }}
                        circleProps={{
                            className: 'ball',
                            transform: 'rotate(270)',
                            fill: "url(#image1)",
                        }}
                    >


                        <defs>
                            <pattern id="image1" x="0" y="0" patternContentUnits="objectBoundingBox" height="100%" width="100%">
                                <image height=".7" weight="1" preserveAspectRatio="none" href='https://cdn.pixabay.com/photo/2014/04/02/11/11/leaf-305495_960_720.png'>
                                </image>
                            </pattern>
                        </defs>
                    </Tree>
                </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper style={{ height: window.innerHeight, overflow: 'auto' }}>
                <ProCon
                    parentNode={toggleNode}
                    addToTree={addToTree}
                    pros={clickedProChildren}
                    cons={clickedConChildren}
                />
                </Paper>
            </Grid>
        </Grid>




    );
}