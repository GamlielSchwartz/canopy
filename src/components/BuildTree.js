import React, { useState } from 'react';
import Tree from 'react-tree-graph'
import NewNodeForm from './NewNodeForm';
export default function BuildTree(props) {
    const [showNewNodeForm, setNewNodeFormOpen] = useState(false);
    const [clickedNode, setClickedNode] = useState(props.startingPosition)
    function initiatePopup(shouldOpenForm, node) {
        setNewNodeFormOpen(shouldOpenForm);
        setClickedNode(node);
    }
    const startingData = {
        "name": props.startingPosition,
        "gProps": {
            "className": props.proOrCon,
            "onClick": (event, node) => {
                initiatePopup(true, node);
            }
        }
    };

    function recursiveGetPath(match, pathOfNodes, data) {
        if (data['name'] === match) {
            return pathOfNodes;
        }
        const children = data.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++) {
            const child = children[i];
            const copyOfPath = [...pathOfNodes];
            copyOfPath.push(child.name)
            const path = recursiveGetPath(match, copyOfPath, child);
            if (path) return path;
        }
    }
    function addWithPathToNode(pathToNodeArray, newData, childText, tabValue) {
        // if (pathToNodeArray.length === 1) return data;
        var cursor = newData;
        while (pathToNodeArray.length !== 1) {
            pathToNodeArray.shift();
            cursor = cursor.children.filter(child => child.name === pathToNodeArray[0])[0];
            if (pathToNodeArray.length === 1) break;
        }
        const proOrConClass = tabValue === 0 ? 'pro-node' : 'con-node';
        if (cursor.children) {
            cursor.children.push({
                "name": childText,
                "gProps": {
                    "className": proOrConClass,
                    "onClick": (event, node) => {
                        initiatePopup(true, node);
                    }
                }
            })
        } else {
            cursor.children = [
                {
                    "name": childText,
                    "gProps": {
                        "className": proOrConClass,
                        "onClick": (event, node) => {
                            initiatePopup(true, node);
                        }
                    }
                }];
        }
        setData(newData);
    }

    const [data, setData] = useState(startingData)
    function addNode(parent, childText, tabValue) {
        var pathToNode = recursiveGetPath(parent, [props.startingPosition], data);
        const newData = Object.assign({}, data);
        addWithPathToNode(pathToNode, newData, childText, tabValue);
    }

    return (

        <div className="custom-container">
            {showNewNodeForm ?
                <NewNodeForm
                    setNewNodeFormOpen={setNewNodeFormOpen}
                    addNode={addNode}
                    clickedNode={clickedNode}
                />
                : null}
            <Tree
                nodeRadius={15}
                margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
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
                circleProps={{
                    className: 'ball'
                }}
            />
        </div>
    );
}