import React from 'react';
import Tree from 'react-tree-graph'
import { Grid } from '@material-ui/core';

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

    const myData = props.treeData ? props.treeData : data;

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            onClick={(event) => {
                return props.setClickedTree(myData)
            }}
        >

            {/* <div onClick={(event) => {
            return props.setClickedTree(data)
        }}> */}
            <Grid item>
            {props.isStumped ? 
            <img src={require('../stump.png')} alt="alt" style={{ width: 100, height: 50, position: "absolute", bottom: 0, left: 0 }} />
            : null}

                <Tree
                    nodeRadius={8}
                    margins={{ top: 30, bottom: 30, left: 50, right: 50 }}
                    data={myData}
                    height={300}
                    width={300}
                    svgProps={{
                        className: 'custom',
                        transform: 'rotate(270)',
                        // className: 'mini-tree'
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
                        <image height=".7" weight="1" preserveAspectRatio="none" href={require('./leaf.jpg')}>
                            </image>
                        </pattern>
                    </defs>
                    
                </Tree>
            </Grid>
            <Grid item>
                {myData.name}
            </Grid>
        </Grid>
    );
}

export default MiniTree;
