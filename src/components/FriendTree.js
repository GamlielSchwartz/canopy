import React from 'react';
import Tree from 'react-tree-graph'

function FriendTree(props) {

    return (

        <div>
                <Tree
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
                        className: 'ball'
                    }}
                />
        </div>
    );
}

export default FriendTree;
