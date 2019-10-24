import React from 'react';
import Tree from 'react-tree-graph'
import './App.css';
import BuildTree from './components/BuildTree';

function App() {
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

        <div className="custom-container">
            {/* <Tree
                data={data}
                height={800}
                width={800}
                svgProps={{
                    transform: 'rotate(270)',
                    className: 'custom'
                }}
                textProps={{
                    transform: 'rotate(90)',
                }}
            /> */}
            <BuildTree startingPosition="Cats are better than dogs" proOrCon='con-node'/>
        </div>
    );
}

export default App;
