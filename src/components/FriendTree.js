import React from 'react';
import Tree from 'react-tree-graph'

function FriendTree(props) {

    return (

        <div>
            <Tree
                margins={{ bottom: 50, left: 100, right: 100, top: 20 }}
                nodeRadius={15}
                data={props.data}
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
