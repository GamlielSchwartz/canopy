import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Navigator(props) {
    // const [value, setValue] = React.useState(props.startingTab);
    const tabs = ["Forest", "New Tree", "Your Profile"];
    const tabToRoute = { "Forest": '/home', "New Tree": "/buildTree", "Your Profile": "/profile" }

    const handleChange = (event, newValue) => {
        props.changeRoute(tabToRoute[tabs[newValue - 1]]);
        props.changeTabVal(newValue);
    };

    // useEffect(() => {
    //     console.log("starin tab")
    //     console.log(props.startingTab);
    //     console.log("val")
    //     console.log(value)
    //     if (props.startingTab !== value){
    //         setValue(props.startingTab);
    //     }
    // }, [props.startingTab, value]);

    return (

        <Paper square style={{color: 'white', fontWeight:'bold'}}>
            <Tabs
                TabIndicatorProps={{style: {background:'#965f1b', height: '100%', zIndex: 5, borderRadius: 10, transition: '0ms'}}}
                style={{ backgroundColor: '#B67D3A', fontFamily: 'Acme', fontWeight: 'bold' }}
                value={props.tabValue}
                indicatorColor="primary"
                textColor="inherit"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label={<span style={{fontWeight:'bold', color:'black'}}>Canopy</span>} disabled />
                {tabs.map((item, index) => {
                    return <Tab label={<span style={{fontWeight:'bold',zIndex: 6}}>{item}</span>} key={index} />
                })}
            </Tabs>
        </Paper>
    );
}

export default Navigator;
