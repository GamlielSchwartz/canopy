import React, { useState } from 'react';
import Tree from 'react-tree-graph'
import SuggestionForm from './SuggestionForm';
import SnackPopup from './SnackPopup';
import axios from 'axios';
import addNode from '../utils/addNode';

function FriendTree(props) {

    const [showSuggestionForm, setShowSuggestionForm] = useState(false);
    const [clickedNode, setClickedNode] = useState("no node selected")
    const [suggestionSent, setSuggestionSent] = useState(false)

    function makeNodesClickable(propsData) {
        if (!propsData) return { name: "hello" };
        //NOTE: assuming nothing yet clickable in gProps and that gProps exists:
        //nothing should be clickable b/c coming from mini tree where nodes shouldn't be clickable
        //and gProps should exist because classnames which dictate node color should be present in mini tree
        propsData.gProps.onClick =
            (event, node) => {
                setClickedNode(node);
                setShowSuggestionForm(true);
            }

        const children = propsData.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++) {
            const child = children[i];
            makeNodesClickable(child);
        }
        return propsData;
    }

    

    function saveSuggestedTreeInBackend(suggestion, parent, tabIndex){
        console.log(props.data);
        var newTree = addNode(parent, suggestion, tabIndex, [props.data.name], props.data, this, ()=> console.log("worked!"));
        console.log(newTree);
        axios.post('http://localhost:4000/saveData', {suggestion: newTree})
        .then(response => response.data)
        .then(data => {
            console.log(data);
        });
    }

    function sendSuggestion(suggestion, parent, tabIndex) {
        saveSuggestedTreeInBackend(suggestion, parent, tabIndex);
        props.addNotification({suggestion: suggestion, parent: parent, tabIndex: tabIndex});
        setSuggestionSent(true);
    }

    function handleCloseSnackbar() {
        setSuggestionSent(false);
    }

    return (

        <div>
            {showSuggestionForm ?
                <SuggestionForm
                    setSuggestionForm={setShowSuggestionForm}
                    sendSuggestion={sendSuggestion}
                    clickedNode={clickedNode}
                />
                : null}

            {suggestionSent ?
                <SnackPopup
                    close={handleCloseSnackbar}
                    message="Suggested modification sent!"
                />
                : null}

            <Tree
                margins={{ bottom: 50, left: 100, right: 100, top: 20 }}
                nodeRadius={15}
                data={makeNodesClickable(props.data)}
                height={678}
                width={678}
                svgProps={{
                    transform: 'rotate(270)',
                    className: 'custom'
                }}
                textProps={{
                    transform: 'rotate(90)',
                }}
                circleProps={{
                    className: 'ball',
                }}
            />
        </div>
    );
}

export default FriendTree;
