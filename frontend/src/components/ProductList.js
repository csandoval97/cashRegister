import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
// import 'react-accessible-accordion/dist/fancy-example.css';

class ProductList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            product:this.props.product,
            productCopy:[],
            productOrig:[],
            err:[]
        }
    }

    componentDidUpdate(){
        var prevState = this.state
        if(this.props.product === prevState.product){
            return
        }
        prevState.product = this.props.product

        prevState.productCopy = JSON.parse(JSON.stringify(this.props.product))
        prevState.productOrig = JSON.parse(JSON.stringify(this.props.product))
        prevState.err = new Array(this.props.product.length)
        this.setState(prevState)
    }

    handleAdd = (index,event) =>{
        this.props.parentCallback(this.state.productCopy[index])
    }

    handleSubmit = (index,event)=>{
        event.preventDefault()
        var prevState = this.state

        fetch('http://localhost:3000/api/product/addchange',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(prevState.productCopy[index])
        })
        .then(response => response.json())
        .then( data => {
            console.log(data)
            prevState.productOrig[index] = prevState.productCopy[index]
            prevState.err[index] = ""
            this.setState(prevState)
        })
        
    }

    handleChange = (index,event)=>{
        var prevState = this.state
        prevState.productCopy[index][event.target.name] = event.target.value

        console.log(prevState.productCopy[index][event.target.name],prevState.productOrig[index][event.target.name])
        if(prevState.productCopy[index][event.target.name] != prevState.productOrig[index][event.target.name] ){
            prevState.err[index] = "Submit to save changes"
        }
        else{
            prevState.err[index] = ""
        }

        this.setState(prevState)
    }

    render(){
        return(
            <Accordion allowZeroExpanded='true'>
                {this.state.productCopy.map((prod,index) => { 
                    if(!prod.creDate){
                        return(
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton >
                                        <img src={prod.image} width="100rem" />
                                        <table class="table table-sm" style={{display:'initial'}}>
                                            <tr>
                                                <td>Product: {prod.barname}</td>
                                                <td>Category: {prod.category}</td>
                                                <td>Pur Date: {prod.purDate}</td>
                                                <td>Pur Price: {prod.purPrice}</td>
                                            </tr>
                                            <tr>
                                                <td>Barcode: {prod.barcode}</td>
                                                <td>Qnt: {prod.quantity}</td>
                                                <td>Exp Date: {prod.expDate}</td>
                                                <td>Ret Price: {prod.retPrice}</td>
                                            </tr>
                                        </table>
                                        <button class="btn btn-success" style={{marginLeft:'5rem'}} onClick={this.handleAdd.bind(this,index) } >Add</button>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                            </AccordionItem>
                        )
                    }
                    else{
                        return (
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton >
                                        <img src={prod.image} width="100rem" />
                                        <table class="table table-sm" style={{display:'initial'}}>
                                            <tr>
                                                <td>Product: {prod.barname}</td>
                                                <td>Category: {prod.category}</td>
                                                <td>Pur Date: {prod.purDate}</td>
                                                <td>Pur Price: {prod.purPrice}</td>
                                            </tr>
                                            <tr>
                                                <td>Barcode: {prod.barcode}</td>
                                                <td>Qnt: {prod.quantity}</td>
                                                <td>Exp Date: {prod.expDate}</td>
                                                <td>Ret Price: {prod.retPrice}</td>
                                            </tr>
                                        </table>
                                        <button class="btn btn-success" style={{marginLeft:'5rem'}} onClick={this.handleAdd.bind(this,index) } >Add</button>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <form onSubmit={this.handleSubmit.bind(this,index)}>
                                        <h4 style={{color:'red'}}> {this.state.err[index]} </h4>
                                        <div class="form-row">
                                            <div class="col-6">
                                                <img src={prod.image} class="img-fluid" />
                                            </div>
                                            <div class="col">
                                                <label for="barname">Product Name:</label>
                                                <input class="form-control" id="barname" value={prod.barname} readOnly />
                                                <label for="category">Category:</label>
                                                <input class="form-control" id="category" value={prod.category} readOnly />
                                                <label for="barcode">Barcode:</label>
                                                <input class="form-control" id="barcode" value={prod.barcode} readOnly />
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col">
                                                <label for="purDate">Purchase Date:</label>
                                                <input type="text" name="purDate" class="form-control" id="purDate" value={prod.purDate} onChange={this.handleChange.bind(this, index)}/>
                                            </div>
                                            <div class="col">
                                                <label for="expDate">Experation Date:</label>
                                                <input type="text"  name="expDate" class="form-control" id="expDate" value={prod.expDate} onChange={this.handleChange.bind(this, index)}/>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col">
                                                <label for="purPrice">Purchase Price:</label>
                                                <input type="text" name="purPrice" class="form-control" id="purPrice" value={prod.purPrice} onChange={this.handleChange.bind(this, index)}/>
                                            </div>
                                            <div class="col">
                                                <label for="retPrice">Retail Price:</label>
                                                <input type="text" name="retPrice" class="form-control" id="retPrice" value={prod.retPrice} onChange={this.handleChange.bind(this, index)}/>
                                            </div>
                                        </div>
                                        <button>Submit</button>
                                    </form>
                                </AccordionItemPanel>
                            </AccordionItem>
                        )
                    }
                })}
            </Accordion>
        )
    }
}

export default ProductList