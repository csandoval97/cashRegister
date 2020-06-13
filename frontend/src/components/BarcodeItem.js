import React, { Component } from 'react';
import './barItem.css'

class BarcodeItem extends React.Component{
    constructor(props){
        super(props)
        var store = JSON.parse(localStorage.getItem('store'))
        //var totalTax = store.cityTax + store.countyTax + store.districtTax + store.stateTax
        this.state = {
            itms:[],
            store:store,
            time:Date.now(),

            subtotal:0,
            tax:store.totalTax,
            total:0,
            payment:0,
            change:0,

            chColor:'black'
        }
    }
    //updates change
    handleChange = event => {
        var value = event.target.value
        var prevState = this.state

        if(event.target.name == 'payment'){
            if(value == ''){
                //do nothing
            }
            else if(value < 0){
                value = 0
            }
        }

        prevState[event.target.name] = value

        this.updateCash(prevState)
        this.setState(prevState)
    }

    //based on item index, will update count
    handleCount = (index, event) =>{
        // console.log(event.target, index)
        var prevState = this.state

        if(event.target.value > 0 || event.target.value == "")
            prevState.itms[index].count = event.target.value
        else
            prevState.itms[index].count = 1


        this.updateCash(prevState)
        this.setState(prevState)
    }

    //checks if item is in list then increments, else aggregates to list
    updateBarcode = () =>{
        var prevState = this.state
        var itm = this.props.item

        if(!this.checkExisting(prevState) ){
            itm.count = 1
            prevState.itms = [...prevState.itms, itm]
        }
        this.updateCash(prevState)
        this.setState(prevState)
    }
    //given barcode, removes item
    removeItem = index => {
        var prevState = this.state

        prevState.itms = prevState.itms.filter(itm => itm.barcode != index)
        this.updateCash(prevState)

        this.setState(prevState)
    }

    //returns true and increment if item in list
    checkExisting(prevState){
        var itms = prevState.itms;
        var itm = this.props.item;
        
        for(var i=0;i<itms.length;i++){
            //console.log(itms[i], itm)
            if(itms[i].barcode==itm.barcode){
                itms[i].count++
                return true
            }
        }
        return false
    }

    //update cash info subtotal, tax, total, payment, change
    updateCash(prevState){
        var itms = prevState.itms;
        var sttl = 0;
        var ttl = 0;
        var pay = prevState.payment;
        var chn;

        for(var i=0;i<itms.length;i++){
            sttl += (itms[i].count * itms[i].price)
        }

        ttl = (sttl * (prevState.tax/100 + 1));

        if(pay == ''){
            chn = ''
        }
        else{
            chn = (pay - ttl).toFixed(2)
            if(chn == 0){
                prevState.chColor = 'black'
            }
            else if(chn > 0){
                prevState.chColor = 'green'
            }
            else{
                prevState.chColor = 'red'
            }
        }

        //console.log(sttl,ttl, chn)
        prevState.subtotal = sttl.toFixed(2)
        prevState.total = ttl.toFixed(2)
        prevState.change = chn
    }

    componentDidMount(){
        this.intervalID = setInterval(()=>{this.setState({time:Date.now()})},1000)
    }

    render(){
        return(
            <div>
                {/* {JSON.stringify(this.state.store)} */}
                {/* <ul>
                {Object.keys(this.state.store).map((key,value) => {
                    return (<li>{key}:{value}</li>)
                })}
                </ul> */}
                {/* {JSON.stringify(this.state.itms)} */}
                <table class="table table-sm d-print-none">
                    <thead>
                        <th>name</th>
                        <th>barcode</th>
                        <th>qnt</th>
                        <th>price</th>
                        <th>rm</th>
                    </thead>
                    <tbody>
                        {this.state.itms.map( (itm,index) =>
                            <tr>
                                <td>{itm.barname}</td>
                                <td>{itm.barcode}</td>
                                {/* <td>{itm.count}</td> */}
                                <td><input type="number" class="form-control" name="barcode" value={itm.count} onChange={this.handleCount.bind(this,index) }/></td>
                                <td>{itm.price}</td>
                                <td><a style={{color:'blue'}} onClick={()=>this.removeItem(itm.barcode)} >rm</a></td>
                            </tr>
                         )}
                    </tbody> 
                </table>

                <table class="table table-sm d-print-none" style={{width:'14rem'}}>
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td>
                                <div class="input-group my-0">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input type="text" value={this.state.subtotal} class="form-control" readOnly/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <td>
                                <div class="input-group my-0">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">%</span>
                                    </div>
                                    <input type="text" value={this.state.tax} class="form-control" readOnly/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td >
                                <div class="input-group my-0">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input type="text" value={this.state.total} class="form-control"  readOnly/>
                                </div>
                            </td>
                        </tr>
                        {/* <tr style={{height:'1rem'}}></tr> */}
                        <tr>
                            <td>Payment</td>
                            <td>
                                <div class="input-group my-0">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input type="text" name="payment" value={this.state.payment} onChange={this.handleChange} class="form-control" />
                                </div>
                            </td>
                        </tr>
                        {/* <tr style={{height:'1rem'}}></tr> */}
                        <tr>
                            <td>Change</td>
                            <td>
                                <div class="input-group my-0">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input type="text" name="change" value={this.state.change}  class="form-control" style={{color:this.state.chColor}}readOnly/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* <div className="receipt"> */}
                <div class="receipt d-none d-print-block">
                    {/* <p>{JSON.stringify(this.state)}</p> */}
                    <p>{this.state.store.storeName}</p>
                    <p>{this.state.store.manager}</p>
                    <p>{this.state.store.phone}</p>
                    <p>{this.state.store.street}</p>
                    <table className="item">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Qnt</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.itms.map(itm =>{
                                return(
                                <>
                                    <tr>
                                        <td>{itm.barname}</td>
                                        <td>{itm.count}</td>
                                        <td>{itm.price}</td>
                                    </tr>
                                    <tr>
                                        <td>{itm.barcode}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr height="4px"></tr>
                                </>)
                            })}
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                {/* <td style="width: 5rem;"></td> */}
                                <td>Sub $</td>
                                <td>{this.state.subtotal}</td>
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td>Tax %</td>
                                <td>{this.state.store.totalTax}</td>
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td>Total $</td>
                                <td>{this.state.total}</td>
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td>Tend $</td>
                                <td>{this.state.payment}</td>
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td>Change $</td>
                                <td>{this.state.change}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>

                    <p>{new Date(this.state.time).toLocaleString()}</p>
                    <p>Have a great day! 😊</p>
                </div>
            </div>
        )
    }
    
}

export default BarcodeItem