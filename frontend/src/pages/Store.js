import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

class Store extends React.Component{
    constructor(props){
        super(props)
        var store = JSON.parse(localStorage.getItem('store'))
        var storeOrig = JSON.parse(localStorage.getItem('store'))
        this.state = {
            store:store,
            storeOrig:storeOrig,
            err:''
        }
    }

    handleChange = event =>{
        var prevState = this.state
        prevState.store[event.target.name] = event.target.value

        if(prevState.store[event.target.name] != prevState.storeOrig[event.target.name]){
            prevState.err="Need to submit to save changes"
        }
        else{
            prevState.err=""
        }

        this.setState(prevState)
    }

    handleSubmit = event =>{
        event.preventDefault()
        var prevState = this.state
        fetch('http://localhost:3000/api/store/update',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.store)
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('store', JSON.stringify(data.msg))
            prevState.store = JSON.parse(JSON.stringify(data.msg))
            prevState.storeOrig = JSON.parse(JSON.stringify(data.msg))
            prevState.err = ""
            this.setState(prevState)
        })
        // .then(data => localStorage.setItem('store',JSON.stringify(data.store)) )
    }

    render(){
        return(
            <Accordion allowZeroExpanded='true'>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div class="row" style={{display:'inline-grid', textAlign:'center', width:'100%'}}>
                                <p>Manager: {this.state.store.manager}</p>
                                <p>Store: {this.state.store.storeName}</p>
                                <p>Phone: {this.state.store.phone}</p>
                                <p>Street: {this.state.store.street}</p>
                                <p>County Tax: {this.state.store.countyTax}</p>
                                <p>District Tax: {this.state.store.districtTax}</p>
                                <p>City Tax: {this.state.store.cityTax}</p>
                                <p>State Tax: {this.state.store.stateTax}</p>
                                <p>Total Tax: {this.state.store.totalTax}</p>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <h3 style={{color:'red'}}>{this.state.err}</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div class="row">
                                <div class="col-8">
                                    <div class="row">
                                        <div class="form-group col-4">
                                            <label for="store">StoreName</label>
                                            <input type="text" id="store" class="form-control" name="storeName" value={this.state.store.storeName} onChange={this.handleChange}/>
                                        </div>
                                        <div class="form-group col-4">
                                            <label for="manager">Manager</label>
                                            <input type="text" id="manager" class="form-control" name="manager" value={this.state.store.manager} onChange={this.handleChange}/>
                                        </div>
                                        <div class="form-group col-4">
                                            <label for="phone">PhoneNumber</label>
                                            <input type="text" id="phone" class="form-control" name="phone" value={this.state.store.phone} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-12">
                                            <label for="street">StreetName</label>
                                            <input type="text" id="street" class="form-control" name="street" value={this.state.store.street} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row">
                                        <div class="form-group col-12">
                                            <label for="state">StateTax</label>
                                            <input type="text" id="state" class="form-control" name="stateTax" value={this.state.store.stateTax} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-12">
                                            <label for="county">CountyTax</label>
                                            <input type="text" id="county"class="form-control" name="countyTax" value={this.state.store.countyTax} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-12">
                                            <label for="city">CityTax</label>
                                            <input type="text" id="city" class="form-control" name="cityTax" value={this.state.store.cityTax} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-12">
                                            <label for="district">DistrictTax</label>
                                            <input type="text" id="district" class="form-control" name="districtTax" value={this.state.store.districtTax} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-12">
                                            <label for="district">DistrictTax</label>
                                            <input type="text" id="district" class="form-control" name="districtTax" value={this.state.store.totalTax} readOnly/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button class="btn btn-success" type="submit">Submit</button>
                        </form>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        )
    }
}

export default Store