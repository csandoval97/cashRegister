import React from 'react';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Home.css';
import BarcodeScan from '../components/BarcodeScan'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:null,
        }
    }

    render(){
        return(
            <div class="row">
                <div class="col-4">
                    <Tabs>
                        <TabList>
                            <Tab>barcode</Tab>
                            <Tab>Product</Tab>
                        </TabList>
                    
                        <TabPanel>
                            <BarcodeScan/>
                        </TabPanel>
                        <TabPanel>
                            <p>You are awesome</p>
                        </TabPanel>
                    </Tabs>
                </div>
                <div class="col-8">
                    <h1>Hello You</h1>
                </div>
            </div>
        )
    } 
}

export default Home;