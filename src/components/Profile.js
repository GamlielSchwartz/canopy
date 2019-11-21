import React, { useState } from 'react';
import { Paper, List, ListItem } from '@material-ui/core';
import MiniTree from './MiniTree';
import { first, second, third } from './dummyTrees';
import BuildTree from './BuildTree';

function Profile() {

    const [clickedTree, setClickedTree] = useState(null);

    const handleClickedTree = (data) => {
        console.log(data);
        setClickedTree(data);
    }

    return (
        <div>
            {
                clickedTree
                    ?
                    <div>
                        <BuildTree
                            startingPosition="Cats are better than dogs"
                            proOrCon='pro-node'
                            existingData={clickedTree}
                        />
                    </div>
                    :
                    <Paper style={{ maxHeight: window.innerHeight * 1, overflow: 'auto' }}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <MiniTree setClickedTree={handleClickedTree} treeData={first} />
                            </ListItem>
                            <ListItem>
                                <MiniTree setClickedTree={handleClickedTree} treeData={second} />
                            </ListItem>
                            <ListItem>
                                <MiniTree setClickedTree={handleClickedTree} treeData={third} />
                            </ListItem>
                        </List>
                    </Paper>
            }
        </div>
    );
}

export default Profile;
