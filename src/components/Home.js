import React from 'react';
import { Paper, List, ListItem, Divider } from '@material-ui/core';
import MiniTree from './MiniTree';
function Home(props) {
    const handleClickedTree = (data, canSuggest) => {
        props.setClickedTree(data, canSuggest);
    }

    function getRandomName(index) {
        var list = ['PuppyLover123', 'KittyLover321', 'ElvisPresley', 'SupermanRules!', 'CutieKat2', 'RandoJack']
        var choice = list[index % list.length];
        return choice;
    }

    return (

        <div>
            <Paper style={{ maxHeight: window.innerHeight * 1, overflow: 'auto' }}>
                <List component="nav" aria-label="main mailbox folders">
                    {props.treesToDisplay.map((item, index) => {
                        return (
                            <div>
                                <ListItem key={index}>
                                    <MiniTree
                                        setClickedTree={handleClickedTree}
                                        treeData={item}
                                        backToHome={props.backToHome}
                                        isStumped={index % 2 === 0}
                                        author={getRandomName(index)}
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}
                </List>
            </Paper>
        </div>
    );
}

export default Home;
