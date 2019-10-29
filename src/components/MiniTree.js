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

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            onClick={(event) => {
                return props.setClickedTree(data)
            }}
        >

            {/* <div onClick={(event) => {
            return props.setClickedTree(data)
        }}> */}
            <Grid item>
                <Tree
                    nodeRadius={8}
                    margins={{ top: 30, bottom: 30, left: 50, right: 50 }}
                    data={data}
                    height={300}
                    width={300}
                    svgProps={{
                        transform: 'rotate(270)',
                        className: 'mini-tree'
                    }}
                    textProps={{
                        transform: 'rotate(90)',
                        display: 'none',
                    }}
                    circleProps={{
                        className: 'ball'
                    }}
                />
            </Grid>
            {props.isStumped
                ?
                <Grid
                    item
                >
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            Suggest a leaf!
                        </Grid>
                        <Grid item>
                            <img src={require('../stump.png')} alt="alt" style={{ width: 100, height: 50, position: "absolute" }} />
                        </Grid>
                    </Grid>
                </Grid>
                : null}

        </Grid>
    );
}

export default MiniTree;
