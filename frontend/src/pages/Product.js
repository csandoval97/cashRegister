import React from 'react'
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import ProductSearch from '../components/ProductSearch'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'


class Products extends React.Component{
    constructor(props){
        super(props)
        this.state={
            product:[],
            prodAdd:[]
        }
    }

    callbackFunction = product => {
        this.setState({
            product:product
        })
    }

    addCallback = product => {
        console.log(product)
        this.setState({
            prodAdd:product
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
                            <ProductSearch parentCallback={this.callbackFunction} />
                        </TabPanel>
                        <TabPanel>
                            <ProductForm prodAdd={this.state.prodAdd} />
                        </TabPanel>
                    </Tabs>
                    
                </div>
                <div class="col-8">
                    <ProductList product={this.state.product} parentCallback={this.addCallback}/>
                </div>
            </div>
        )
    }
}

export default Products