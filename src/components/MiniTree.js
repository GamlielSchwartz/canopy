import React from 'react';
import Tree from 'react-tree-graph'

function MiniTree(props) {
    const data = {
        "name": "Eve",
        "gProps": {
            "className": 'pro-node',
            "onClick": (event, node) =>
                alert(`Clicked ${node}!`)
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
                            "onClick": (event, node) =>
                                alert(`Clicked ${node}!`)
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
        <div onClick={() => props.setClickedTree(data)}>
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
                }}
                circleProps={{
                    className: 'ball'
                }}
            />
        </div>
    );
}

export default MiniTree;
