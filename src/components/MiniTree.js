import React from 'react';
import Tree from 'react-tree-graph'
import { Grid } from '@material-ui/core';
import { imageDefs } from './constants';

function MiniTree(props) {
    const data = {
        "name": "Eve",
        "gProps": {
            "className": 'pro-node',
        },
        "children": [
            {
                "name": "Cain",
                "gProps": {
                    "className": 'con-node',
                }
            },
            {
                "name": "Seth",
                "gProps": {
                    "className": 'con-node',
                },
                "children": [
                    {
                        "name": "Enos",
                        "gProps": {
                            "className": 'con-node',
                        }
                    },
                    {
                        "name": "Noam",
                        "gProps": {
                            "className": 'pro-node',
                        }
                    },
                    {
                        "name": "Other guy",
                        "gProps": {
                            "className": 'con-node',
                        }
                    }
                ]
            },
            {
                "name": "Abel",
                "gProps": {
                    "className": 'con-node',
                }
            },
            {
                "name": "Awan",
                "gProps": {
                    "className": 'pro-node',
                },
                "children": [
                    {
                        "name": "Enoch",
                        "gProps": {
                            "className": 'con-node',
                        }
                    }
                ]
            },
            {
                "name": "Azura",
                "gProps": {
                    "className": 'pro-node',
                }
            }
        ]
    };

    var myData = props.treeData ? props.treeData : data;
    myData.gProps.className = 'seed';

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            onClick={(event) => {
                // if (!props.isStumped) return;
                return props.setClickedTree(myData, props.isStumped)
            }}
        >

            {/* <div onClick={(event) => {
            return props.setClickedTree(data)
        }}> */}
            <Grid item>
                {props.isStumped ?
                    <div style={{ position: "absolute", bottom: 0, left: 0, zIndex: 1000 }}>
                        <img src={require('../stump.png')} alt="alt" style={{ width: 100, height: 50 }} />
                        {/* <div>They are Stumped! Suggest a Leaf!</div> */}
                    </div>
                    : null}

                <Tree
                    nodeRadius={14}
                    margins={{ top: 30, bottom: 30, left: 50, right: 50 }}
                    data={myData}
                    height={300}
                    width={300}
                    svgProps={{
                        className: props.custom2 ? 'custom2' : 'custom',
                        transform: 'rotate(270)',
                        // className: 'mini-tree'
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
            </Grid>
            <Grid item>
                {props.author ? <div style={{ marginLeft: 15 }}>authored by: <strong>{props.author}</strong></div> : 
                <div style={{ marginLeft: 15 }}>authored by: <strong>you</strong></div>}
                    <br/>
                <div style={{ marginLeft: 15 }}><i>{myData.name}</i></div>
            </Grid>
        </Grid>
    );
}

export default MiniTree;
