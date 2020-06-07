import React from 'react';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Home.css';
import BarcodeScan from '../components/BarcodeScan'
import BarcodeItem from '../components/BarcodeItem'
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg:{},
            itm:{},
            err:'',
        }
        this.upBarcode = React.createRef()
    }

    callbackFunction = event =>{
        // console.log(event)
        this.setState({
            itm:event
        })
        this.upBarcode.current.updateBarcode()
        //console.log(this.state.itm)
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
                            <BarcodeScan parentCallback = {this.callbackFunction}/>
                        </TabPanel>
                        <TabPanel>
                            need to implemet table
                        </TabPanel>
                    </Tabs>
                </div>
                <div class="col-8">
                    <BarcodeItem item={this.state.itm} ref={this.upBarcode}/>
                </div>
            </div>
        )
    } 
}

export default Home;