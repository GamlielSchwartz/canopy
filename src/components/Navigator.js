import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Navigator(props) {
    const [value, setValue] = React.useState(0);
    const tabs = ["Forest", "New Tree", "Your Profile"];
    const tabToRoute = { "Forest" : '/home', "New Tree": "/buildTree", "Your Profile": "/profile"}
    const handleChange = (event, newValue) => {
        props.changeRoute(tabToRoute[tabs[newValue]]);
        setValue(newValue);
    };
    return (

        <Paper square>
            <Tabs
                // style={{ height: '100px' }}
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                {tabs.map((item, index) => {
                    return <Tab label={item} key={index} />
                })}
            </Tabs>
        </Paper>
    );
}

export default Navigator;
