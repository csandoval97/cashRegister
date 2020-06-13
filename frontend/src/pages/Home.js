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
            itm:{},
            msg:'',
            err:''
        }
        this.upBarcode = React.createRef()
    }

    callbackFunction = event =>{
        this.setState({
            itm:event.item,
            err:event.err
        })

        if(this.state.err == null)
            this.upBarcode.current.updateBarcode()
    }

    render(){
        return(
            <div class="row">
                <div class="col-4 d-print-none">
                    <Tabs>
                        <TabList>
                            <Tab>barcode</Tab>
                            <Tab>Product</Tab>
                        </TabList>
                    
                        <TabPanel>
                            <h5 style={{color:'red'}} >{this.state.err}</h5>
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