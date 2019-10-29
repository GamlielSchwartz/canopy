import React, { useState } from 'react';
import { Paper, List, ListItem } from '@material-ui/core';
import MiniTree from './MiniTree';
import Tree from 'react-tree-graph'
import BuildTree from './BuildTree';
import axios from 'axios';

function Profile() {

    const [clickedTree, setClickedTree] = useState(null);

    const handleClickedTree = (data) => {
        setClickedTree(data);
    }

    const startingData = {
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
                        },
                        "children": [
                            {
                                "name": "YOUR SUGGESTION",
                                "gProps": {
                                    "className": 'con-node',
                                }
                            },
                        ]
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


    React.useEffect(() => {
        axios.get('http://localhost:4000/getSuggestion')
            .then(response => response.data)
            .then(data => {
                console.log(data);
            });
    });

    return (
        <div>
            {/* {
                clickedTree
                    ?
                    <div>
                        <BuildTree
                            startingPosition="Cats are better than dogs"
                            proOrCon='pro-node'
                            fullData={startingData}
                        />
                    </div>
                    : */}
                    <Paper style={{ maxHeight: window.innerHeight * 1, overflow: 'auto' }}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <MiniTree setClickedTree={handleClickedTree} />
                            </ListItem>
                        </List>
                    </Paper>
            {/* } */}
        </div>
    );
}

export default Profile;
