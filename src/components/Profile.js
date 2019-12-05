import React, { useState } from 'react';
import { Paper, List, ListItem, Divider } from '@material-ui/core';
import MiniTree from './MiniTree';
import { first, second, third } from './dummyTrees';
import BuildTree from './BuildTree';

function Profile(props) {

    const [clickedTree, setClickedTree] = useState(null);

    const handleClickedTree = (data) => {
        console.log(data);
        setClickedTree(data);
        props.setClickedExistingTree(data);
        props.changeRoute('/existingTree');
    }





    return (
        <div>
            {
                // clickedTree
                //     ?
                //     <div>
                //         <BuildTree
                //             existingData={clickedTree}
                //             backToProfile={props.backToProfile}
                //         />
                //     </div>
                //     :
                <Paper style={{ maxHeight: window.innerHeight * 1, overflow: 'auto' }}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem>
                            <MiniTree
                                setClickedTree={handleClickedTree}
                                treeData={third}
                                custom2={true}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <MiniTree
                                setClickedTree={handleClickedTree}
                                treeData={second}
                                custom2={true}
                                isStumped={true}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <MiniTree
                                setClickedTree={handleClickedTree}
                                treeData={first}
                                custom2={true}
                            />
                        </ListItem>
                        <Divider/>
                    </List>
                </Paper>
            }
        </div>
    );
}

export default Profile;
