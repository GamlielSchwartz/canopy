import React from 'react';
import Tree from 'react-tree-graph'

function MiniTree(props) {
    const data = {
        "name": "Eve",
        "children": [
            {
                "name": "Cain"
            },
            {
                "name": "Seth",
                "children": [
                    {
                        "name": "Enos",
                        "gProps": {
                            "className": 'red-node',
                            "onClick": (event, node) =>
                                alert(`Clicked ${node}!`)
                        }
                    },
                    {
                        "name": "Noam"
                    },
                    {
                        "name": "Other guy"
                    }
                ]
            },
            {
                "name": "Abel"
            },
            {
                "name": "Awan",
                "children": [
                    {
                        "name": "Enoch"
                    }
                ]
            },
            {
                "name": "Azura"
            }
        ]
    };

    return (
        <div onClick={() => props.setClickedTree(data)}>
            <Tree
                nodeRadius={8}
                margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
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
