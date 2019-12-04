import React from 'react';
import { Paper, List, ListItem, Divider } from '@material-ui/core';
import MiniTree from './MiniTree';
import { first, second, third, unbalanced, unbalanced2 } from './dummyTrees';
function Home(props) {

    const handleClickedTree = (data) => {
        props.setClickedTree(data);
    }

    const treesToDisplay = [first, second, third, unbalanced, unbalanced2];
    const [currDisplayed, setCurrDisplayed] = React.useState(treesToDisplay)
    return (

        <div>
            <Paper style={{ maxHeight: window.innerHeight * 1, overflow: 'auto' }}>
                <List component="nav" aria-label="main mailbox folders">
                    {currDisplayed.map((item, index) => {
                        return (
                            <ListItem key={index}>
                                <MiniTree
                                    setClickedTree={handleClickedTree}
                                    treeData={item}
                                    backToHome={props.backToHome}
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
