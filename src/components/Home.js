import React from 'react';
import { Paper, List, ListItem, Divider } from '@material-ui/core';
import MiniTree from './MiniTree';
import { first, second, third } from './dummyTrees';
function Home(props) {

    const handleClickedTree = (data) => {
        props.setClickedTree(data);
    }

    return (

        <div>
            <Paper style={{ maxHeight: window.innerHeight * 1, overflow: 'auto' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <MiniTree
                            setClickedTree={handleClickedTree}
                            treeData={first}
                            backToHome={props.backToHome}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <MiniTree
                            setClickedTree={handleClickedTree}
                            treeData={second}
                            backToHome={props.backToHome}
                            isStumped={true}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <MiniTree
                            setClickedTree={handleClickedTree}
                            treeData={third}
                            backToHome={props.backToHome}
                        />
                    </ListItem>
                    <Divider />
                </List>
            </Paper>
        </div>
    );
}

export default Home;
