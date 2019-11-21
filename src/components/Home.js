import React from 'react';
import { Paper, List, ListItem } from '@material-ui/core';
import MiniTree from './MiniTree';
import {first, second, third} from './dummyTrees';
function Home(props) {

    const handleClickedTree = (data) => {
        props.setClickedTree(data);
    }

    return (

        <div>
            <Paper style={{ maxHeight: window.innerHeight * 1, overflow: 'auto' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree} treeData={second}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree} isStumped={true} treeData={first}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree} treeData={third}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree} treeData={second}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree} treeData={first}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree} treeData={third}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                    <ListItem>
                        <MiniTree setClickedTree={handleClickedTree}/>
                    </ListItem>
                </List>
            </Paper>
        </div>
    );
}

export default Home;
