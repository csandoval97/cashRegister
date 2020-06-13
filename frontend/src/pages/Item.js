import React from 'react';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import ItemSearch from '../components/ItemSearch'
import ItemList from '../components/ItemList'
import ItemForm from '../components/ItemForm'

class Item extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // err:null,
            items:[]
        }
    }

    callbackFunction = event => {
        console.log(event.msg)
        console.log([].length)

        this.setState({
            // err:event.err,
            items:event.msg
        })
    }

    render(){
        return(
            <div class="row">
                <div class="col-4">
                    {/* <p style={{color:'red'}}>{this.state.err}</p> */}
                    <Tabs>
                        <TabList>
                            <Tab>Find</Tab>
                            <Tab>Add</Tab>
                        </TabList>
                        <TabPanel>
                            <ItemSearch parentCallback={this.callbackFunction} />
                        </TabPanel>
                        <TabPanel>
                            <ItemForm />
                        </TabPanel>
                    </Tabs>
                    
                </div>
                <div class="col-8">
                    <ItemList item={this.state.items} />
                </div>
            </div>
        )
    }

}


export default Item