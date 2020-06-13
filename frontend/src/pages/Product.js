import React from 'react'
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import ProductSearch from '../components/ProductSearch'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'


class Products extends React.Component{
    constructor(props){
        super(props)
        this.state={
            product:[]
        }
    }

    callbackFunction = product => {
        console.log(product)
        this.setState({
            product:product
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
                            <ProductForm />
                        </TabPanel>
                    </Tabs>
                    
                </div>
                <div class="col-8">
                    <ProductList product={this.state.product}/>
                </div>
            </div>
        )
    }
}

export default Products