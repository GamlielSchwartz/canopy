// import React, { useState } from 'react';
// import Tree from 'react-tree-graph'
import SuggestionForm from './SuggestionForm';
// import SnackPopup from './SnackPopup';
// import axios from 'axios';
// import addNode from '../utils/addNode';
// import BuildTree from './BuildTree';

// function FriendTree(props) {

//     const [showSuggestionForm, setShowSuggestionForm] = useState(false);
//     const [clickedNode, setClickedNode] = useState("no node selected")
//     const [suggestionSent, setSuggestionSent] = useState(false)

//     function makeNodesClickable(propsData) {
//         if (!propsData) return { name: "hello" };
//         //NOTE: assuming nothing yet clickable in gProps and that gProps exists:
//         //nothing should be clickable b/c coming from mini tree where nodes shouldn't be clickable
//         //and gProps should exist because classnames which dictate node color should be present in mini tree
//         propsData.gProps.onClick =
//             (event, node) => {
//                 setClickedNode(node);
//                 setShowSuggestionForm(true);
//             }

//         const children = propsData.children;
//         if (!children) return;
//         for (var i = 0; i < children.length; i++) {
//             const child = children[i];
//             makeNodesClickable(child);
//         }
//         return propsData;
//     }



//     function saveSuggestedTreeInBackend(suggestion, parent, tabIndex) {
//         // console.log(props.data);
//         // var newTree = addNode(parent, suggestion, tabIndex, [props.data.name], props.data, this, ()=> console.log("worked!"));
//         // console.log(newTree);
//         // axios.post('http://localhost:4000/saveData', {suggestion: newTree})
//         // .then(response => response.data)
//         // .then(data => {
//         //     console.log(data);
//         // });
//     }

//     function sendSuggestion(suggestion, parent, tabIndex) {
//         saveSuggestedTreeInBackend(suggestion, parent, tabIndex);
//         props.addNotification({ suggestion: suggestion, parent: parent, tabIndex: tabIndex });
//         setSuggestionSent(true);
//     }

//     function handleCloseSnackbar() {
//         setSuggestionSent(false);
//     }

//     return (

//         <div>
//             {showSuggestionForm ?
//                 <SuggestionForm
//                     setSuggestionForm={setShowSuggestionForm}
//                     sendSuggestion={sendSuggestion}
//                     clickedNode={clickedNode}
//                 />
//                 : null}

//             {suggestionSent ?
//                 <SnackPopup
//                     close={handleCloseSnackbar}
//                     message="Suggested modification sent!"
//                 />
//                 : null}

//             {/* <Tree
//                 margins={{ bottom: 50, left: 100, right: 100, top: 20 }}
//                 nodeRadius={15}
//                 data={makeNodesClickable(props.data)}
//                 height={678}
//                 width={678}
//                 svgProps={{
//                     className: 'custom',
//                     transform: 'rotate(270)',
//                     // className: 'mini-tree'
//                 }}
//                 textProps={{
//                     transform: 'rotate(90)',
//                     className: 'hide-me'
//                 }}
//                 circleProps={{
//                     className: 'ball',
//                     transform: 'rotate(270)',
//                     fill: "url(#image1)",
//                 }}
//             >


//                 <defs>
//                     <pattern id="image1" x="0" y="0" patternContentUnits="objectBoundingBox" height="100%" width="100%">
//                     <image height=".7" weight="1" preserveAspectRatio="none" href={require('./leaf.jpg')}>
//                         </image>
//                     </pattern>
//                 </defs>
//             </Tree> */}
//             <BuildTree fullTree={props.data} />

//         </div>
//     );
// }

// export default FriendTree;

import React, { useState, useEffect } from 'react';
import Tree from 'react-tree-graph'
import { Paper, Grid, Button, Typography } from '@material-ui/core';
// import NewNodeForm from './NewNodeForm';
import addNode from '../utils/addNode';
import SnackPopup from './SnackPopup';
import SeedPopup from './SeedPopup';
import ProCon from './ProCon';
import getNode from '../utils/getChildren';
import { makeStyles } from '@material-ui/core/styles';
import removeNode from '../utils/removeNode';
import editNode2 from '../utils/editNode';
import { imageDefs } from './constants';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export default function FriendTree(props) {

    // const [showNewNodeForm, setNewNodeFormOpen] = useState(false);
    // const [clickedNode, setClickedNode] = useState(props.startingPosition)
    // const [clickedProChildren, setClickedProChildren] = useState([]);
    // const [clickedConChildren, setClickedConChildren] = useState([]);
    const [data, setData] = useState(props.fullTree);
    // const [newNodeFormSide, setNewNodeFormSide] = useState('Pro');
    const classes = useStyles();
    const [toggleNode, setToggleNode] = useState(null);
    const [deletingNode, setDeletingNode] = useState(false);
    const [editingNode, setEditingNode] = useState(false);
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize)

        }
    })


    useEffect(() => {
        // console.log("data from useEffect: ")
        // console.log(data)
        // console.log(deletingNode ? "deleting node on" : "deleting node not on")
        if (deletingNode) {
            // setClickedProChildren([]);
            // setClickedConChildren([]);
            setToggleNode(data.name);//reset procon list to root argument
            setDeletingNode(false);
            return;
        }
        if (editingNode) {
            // setToggleNode(data.name);
            setEditingNode(false);
            return;
        }
        if (!toggleNode) return;
        // console.log(toggleNode);
        var clickedNode = getNode(toggleNode, data, this);
        // console.log(clickedNode);
        if (!clickedNode.children) {
            // setClickedProChildren([]);
            // setClickedConChildren([]);
            return;

        }
        // var proChildren = clickedNode.children.filter(child => child.gProps.className === 'pro-node');
        // var conChildren = clickedNode.children.filter(child => child.gProps.className === 'con-node');
        // setClickedProChildren(proChildren);
        // setClickedConChildren(conChildren)
        // console.log(proChildren);
        // console.log(conChildren);
    }, [data, toggleNode, deletingNode, editingNode]);

    // function addToTree(parent, newChild, tabValue) {
    //     console.log(JSON.stringify(data));
    //     addNode2(parent, newChild, tabValue)
    //     // setNewNodeFormSide(side);
    //     // setNewNodeFormOpen(true);
    // }

    function onNodeClick(node) {
        if (!props.canSuggest) return;
        console.log(node);
        setShowSuggestionForm(true);
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
                onNodeClick(node);
            }
        );
        var clickable = makeNodesClickable(newTree);
        await setData(clickable);
    }

    const [isStumped, setIsStumped] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [nodeUnderMouse, setNodeUnderMouse] = useState('Hover over a leaf to display argument...');
    function toggleStumpedStatus() {
        if (!isStumped) setShowSnackBar(true);
        setIsStumped(!isStumped);
    }
    function closeSnackbar() {
        setShowSnackBar(false);
    }

    function displayMouseOver(node) {
        // console.log(node)
        setNodeUnderMouse(node);
    }

    function setSeedArgument(argument) {
        const newData = {
            "name": argument,
            "gProps": {
                "className": 'pro-node',
                "onClick": (event, node) => {
                    onNodeClick(node);
                },
                "onMouseOver": (e, node) => displayMouseOver(node),
                "onMouseOut": () => displayMouseOver('Hover over a leaf to display argument...')
            }
        };
        setData(newData);
        setToggleNode(argument);
    }

    function editNode(oldNode, newNode) {
        console.log(data);
        if (oldNode === data.name) {
            return;
        }
        var newD = editNode2(oldNode, data, newNode);
        setData(makeNodesClickable(newD));
        setEditingNode(true);
        setToggleNode(newNode);

        console.log(newD);
    }

    async function deleteNode(match) {
        if (match === data.name) return;//can't delete root
        var newTree = removeNode(match, data);
        setData(makeNodesClickable(newTree));
        setDeletingNode(true);
    }

    function getRealData() {
        return (!props.fullTree ? data : makeNodesClickable(props.fullTree));
    }

    function makeNodesClickable(propsData) {
        if (!propsData) return { name: "hello" };
        //NOTE: assuming nothing yet clickable in gProps and that gProps exists:
        //nothing should be clickable b/c coming from mini tree where nodes shouldn't be clickable
        //and gProps should exist because classnames which dictate node color should be present in mini tree
        propsData.gProps.onClick =
            (event, node) => {
                onNodeClick(node);
            }
        propsData.gProps.onMouseOver =
            (event, node) => displayMouseOver(node)
        propsData.gProps.onMouseOut = () => displayMouseOver('Hover over a leaf to display argument...')
        const children = propsData.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++) {
            const child = children[i];
            makeNodesClickable(child);
        }
        return propsData;
    }

    const [showSuggestionForm, setShowSuggestionForm] = useState(false);
    const [suggestionSent, setSuggestionSent] = useState(false)
    function toggleSuggestionBanner(toggle) {
        setSuggestionSent(false);
        setShowSuggestionForm(toggle);
    }
    function sendSuggestion(suggestion, parent, tabIndex) {
        setSuggestionSent(true);
    }
    if (!data && !props.fullTree) {
        return (
            <SeedPopup
                setSeedArgument={setSeedArgument}
                close={() => props.changeRoute('/home')}
            />
        )
    } else return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
        >
            {showSuggestionForm ?
                <SuggestionForm
                    setSuggestionForm={toggleSuggestionBanner}
                    sendSuggestion={sendSuggestion}
                    clickedNode={toggleNode}
                />
                : null}

            {suggestionSent ?
                <SnackPopup
                    close={toggleSuggestionBanner}
                    message="Suggested modification sent!"
                />
                : null}

            <Grid item xs={8}>
                <Paper className={classes.root}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                    >
                        <span>
                            <Button variant="contained" onClick={props.backToHome}>Back to Forest</Button>
                            {/* <span style={{ paddingLeft: 10 }}>{nodeUnderMouse}</span> */}
                        </span>
                    </Grid>
                </Paper>
                <Paper style={{ height: window.innerHeight * .85, overflow: 'auto' }}>
                    <Tree
                        margins={{ bottom: 50, left: 100, right: 100, top: 20 }}
                        nodeRadius={15}
                        data={getRealData()}
                        height={dimensions.height / 2}
                        width={dimensions.width / 2}
                        svgProps={{
                            transform: 'rotate(270)',
                            className: 'custom2'
                        }}
                        textProps={{
                            transform: 'rotate(90)',
                            className: 'hide-me'
                        }}
                        circleProps={{
                            className: 'ball',
                            transform: 'rotate(270)',
                            // fill: "url(#image1)",
                        }}
                    >

                        {imageDefs}
                    </Tree>
                    {props.fullTree ? null :
                        <img
                            onClick={toggleStumpedStatus}
                            src={isStumped ? require('../stump.png') : require('../gray_stump.gif')}
                            alt="alt"
                            style={
                                {
                                    width: 100,
                                    height: 50,
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0
                                }
                            }
                        />
                    }
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Paper className={classes.root}>
                            <Typography variant="h4" component="h4">
                                {nodeUnderMouse}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}
