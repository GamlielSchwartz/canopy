import React from 'react';
import { Paper, List, ListItem } from '@material-ui/core';
import MiniTree from './MiniTree';

function Home(props) {

    const handleClickedTree = (data) => {
        props.setClickedTree(data);
    }
    return (

        <div className="custom-container">
            <Paper style={{ maxHeight: window.innerHeight * .85, overflow: 'auto' }}>
                <List component="nav" aria-label="main mailbox folders">
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
