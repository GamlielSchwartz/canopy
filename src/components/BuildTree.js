import React, { useState, useEffect } from 'react';
import Tree from 'react-tree-graph'
import { Paper, Grid, Button, Tooltip } from '@material-ui/core';
// import NewNodeForm from './NewNodeForm';
import addNode from '../utils/addNode';
import SnackPopup from './SnackPopup';
import SeedPopup from './SeedPopup';
import ProCon from './ProCon';
import getNode from '../utils/getChildren';
import { makeStyles } from '@material-ui/core/styles';
import removeNode from '../utils/removeNode';
import editNode2 from '../utils/editNode';
import DemoProCon from './DemoProCon';
import { imageDefs } from './constants';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export default function BuildTree(props) {

    // const [showNewNodeForm, setNewNodeFormOpen] = useState(false);
    // const [clickedNode, setClickedNode] = useState(props.startingPosition)
    const [clickedProChildren, setClickedProChildren] = useState([]);
    const [clickedConChildren, setClickedConChildren] = useState([]);
    const [data, setData] = useState(props.existingData ? makeNodesClickable(props.existingData) : null);
    // const [newNodeFormSide, setNewNodeFormSide] = useState('Pro');
    const classes = useStyles();
    const [toggleNode, setToggleNode] = useState(props.existingData ? props.existingData.name : null);
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
            setClickedProChildren([]);
            setClickedConChildren([]);
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
            setClickedProChildren([]);
            setClickedConChildren([]);
            return;

        }
        var proChildren = clickedNode.children.filter(child => child.gProps.className === 'pro-node');
        var conChildren = clickedNode.children.filter(child => child.gProps.className === 'con-node');
        setClickedProChildren(proChildren);
        setClickedConChildren(conChildren)
        // console.log(proChildren);
        // console.log(conChildren);
    }, [data, toggleNode, deletingNode, editingNode]);

    function addToTree(parent, newChild, tabValue) {
        console.log(JSON.stringify(data));
        addNode2(parent, newChild, tabValue)
    }
    function onNodeClick(node) {
        highlightNode(node, "HELLO")
        setHasClickedNode(true);
        setToggleNode(node);
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

    async function highlightNode(nodeToHighlight, newClassName) {
        console.log("highlighting")
        var newD = editNode2(nodeToHighlight, data, newClassName);
        console.log(newD);
        // setData(makeNodesClickable(newD));
        // setEditingNode(true);
        //// setToggleNode(newNode);
       
        // await setData(newD);
    }

    const [isStumped, setIsStumped] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [nodeUnderMouse, setNodeUnderMouse] = useState('');
    const [haveCLickedNode, setHasClickedNode] = useState(false);
    function toggleStumpedStatus() {
        // if (!isStumped) setShowSnackBar(true);
        setShowSnackBar(true);
        setStumpedTTHeader(isStumped ? "Ask for input from other users!"
            : "Unstump yourself!");
        setStumpedTTBody(isStumped ? "Click this button to let others know you want input and allow them to sent you suggestions."
            : "Click this button if you want to stop receiving suggestions for this tree.");
        setIsStumped(!isStumped);
    }
    function closeSnackbar() {
        setShowSnackBar(false);
    }

    function displayMouseOver(node) {
        // console.log(node)
        setHasClickedNode(false);
        setNodeUnderMouse(node);
    }

    function setSeedArgument(argument) {
        const newData = {
            "name": argument,
            "gProps": {
                "className": 'seed',
                "onClick": (event, node) => {
                    onNodeClick(node);
                },
                "onMouseOver": (e, node) => displayMouseOver(node),
                "onMouseOut": () => displayMouseOver('')
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

    const HtmlTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(15),
            fontFamily: 'Lato',
            border: '1px solid #dadde9',
        },
    }))(Tooltip);


    const [stumpedTTHeader, setStumpedTTHeader] = React.useState("Ask for input from other users!");
    const [stumpedTTBody, setStumpedTTBody] = React.useState("Click this button to let others know you want input and allow them to send you suggestions.");

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
        propsData.gProps.onMouseOut = () => displayMouseOver('')
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
            {showSnackBar ?
                <SnackPopup
                    type={isStumped ? null : "info"}
                    close={closeSnackbar}
                    message={isStumped ? "Letting other users know you are 'stumped'!" : "No longer 'stumped'!"}
                />
                :
                null
            }

            <Grid item xs={6}>
                <Paper className={classes.root}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                    >

                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            {props.backToProfile ?
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        onClick={props.backToProfile}>
                                        Back To Profile
                                </Button>
                                </Grid>
                                : null}
                            <Grid item>
                            <span style={{ fontFamily: 'Lato', fontSize: 24, marginLeft: 10, textAlign: 'center', verticalAlign: 'middle' }}> <strong>{data.name}</strong></span>
                            
                                {/* Hover over a leaf to display argument...
                                </span> */}
                                </Grid>
                            <Grid item>
                                <HtmlTooltip
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">{"Start Building Your Tree!"}</Typography>
                                            <hr />
                                            {`Start adding supporting and opposing arguments to your "Seed" argument in the list on the right. Then navigate to new nodes either by clicking the text in the list or by clicking a node in the tree!`}
                                        </React.Fragment>
                                    }
                                >
                                    <HelpOutlineOutlinedIcon />
                                </HtmlTooltip>

                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
                <Paper style={{ height: window.innerHeight * .85, overflow: 'auto' }}>

                    <Tree
                        margins={{ bottom: 50, left: 100, right: 100, top: 20 }}
                        nodeRadius={25}
                        data={data}
                        height={550}
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
                            transform: 'rotate(90)',
                            // fill: "url(#image1)",
                        }}
                    >
                        {imageDefs}
                    </Tree>
                    <HtmlTooltip
                        title=
                        {
                            <React.Fragment>
                                <Typography color="inherit">{stumpedTTHeader}</Typography>
                                <hr />
                                {stumpedTTBody}
                            </React.Fragment>
                        }
                    >
                        <img
                            onClick={toggleStumpedStatus}
                            src={isStumped ? require('../stump.png') : require('../gray_stump.gif')}
                            alt="alt"
                            style={
                                {
                                    width: 100,
                                    height: 50,
                                    position: "absolute",
                                    bottom: 50,
                                    right: 50,
                                    'MozBorderRadius': '100px', /* or 50% */
                                    'borderRadius': '100px', /* or 50% */
                                    'backgroundColor': 'green',
                                    border: '2px solid black'
                                }
                            }
                        />
                    </HtmlTooltip>
                    <span
                        style={
                            {
                                position: "relative",
                                bottom: -60,
                                left: 50,
                                fontFamily: 'Lato'
                            }
                        }
                        > Hover over a leaf to view </span>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper style={{ height: window.innerHeight, overflow: 'auto' }}>
                    {nodeUnderMouse && !haveCLickedNode ? <DemoProCon potentialNode={nodeUnderMouse} /> :
                        <ProCon
                            isRoot={toggleNode === data.name}
                            editNode={editNode}
                            deleteNode={deleteNode}
                            onNodeClick={onNodeClick}
                            parentNode={toggleNode}
                            addToTree={addToTree}
                            pros={clickedProChildren}
                            cons={clickedConChildren}
                        />}
                </Paper>
            </Grid>
        </Grid>
    );
}