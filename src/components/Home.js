import React from 'react';
import { Paper, List, ListItem, Divider } from '@material-ui/core';
import MiniTree from './MiniTree';
function Home(props) {
    console.log(props.treesToDisplay)
    const handleClickedTree = (data, canSuggest) => {
        props.setClickedTree(data, canSuggest);
    }

    return (

        <div>
            <Paper style={{ maxHeight: window.innerHeight * 1, overflow: 'auto' }}>
                <List component="nav" aria-label="main mailbox folders">
                    {props.treesToDisplay.map((item, index) => {
                        return (
                            <ListItem key={index}>
                                <MiniTree
                                    setClickedTree={handleClickedTree}
                                    treeData={item}
                                    backToHome={props.backToHome}
                                    isStumped={index % 2 === 0 }
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        </div>
    );
}

export default Home;
