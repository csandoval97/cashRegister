import React from "react"
// import { response } from "express"

class ProductForm extends React.Component{
    constructor(props){
        super(props)

        var prod = this.props.prodAdd
        if(prod && prod.purDate && prod.expDate){
            prod.purDate = new Date(prod.purDate).toISOString().substring(0, 10)
            prod.expDate = new Date(prod.expDate).toISOString().substring(0, 10)
        }
        this.state = {
            product:prod,
            err:[]
        }
    }

    componentDidUpdate(){
        var prevState = this.state

        if(this.props.prodAdd === prevState.product){
            return
        }
        var prod = this.props.prodAdd

        prod.purDate = new Date(prod.purDate).toISOString().substring(0, 10)
        prod.expDate = new Date(prod.expDate).toISOString().substring(0, 10)
        prevState.product = prod
        
        this.setState(prevState)
    }

    handleChange = event =>{
        var prevState = this.state
        prevState.product[event.target.name] = event.target.value

        this.setState(prevState)
    }

    handleSubmit = event => {
        event.preventDefault()
        var prevState = this.state
        console.log(JSON.stringify(this.state.product))
        fetch('http://localhost:3000/api/product/addstock',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.product)
        })
        .then(response => console.log(response))
        // .then(data => console.log(data))

        console.log(event)

    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                {this.state.err.map(er =>{
                    return <h5 style={{color:'red'}}>{er}</h5>
                })}
                <div class="row">
                    <div class="form-group col-4">
                        <img class="img-fluid" src={this.state.product.image}></img>
                    </div>
                    <div class="form-group col-8">
                        <label for="barname">Product Name</label>
                        <input type="text" class="form-control" id="barname" name="barname" value={this.state.product.barname} readOnly/>
                        
                        <label for="category">Category</label>
                        <input type="text" class="form-control" id="category" name="category" value={this.state.product.category} readOnly/>

                        <label for="barcode">Barcode</label>
                        <input type="text" class="form-control" id="barcode" name="barcode" value={this.state.product.barcode} readOnly/>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-6">
                        <label for="purDate">Purchase Date</label>
                        <input type="date" class="form-control" id="purDate" name="purDate" onChange={this.handleChange} value={this.state.product.purDate} />

                        <label for="purPrice">Purchase Price</label>
                        <input type="text" class="form-control" id="purPrice" name="purPrice" onChange={this.handleChange} value={this.state.product.purPrice} />
                    </div>
                    <div class="form-group col-6">
                        <label for="expDate">Experation Date</label>
                        <input type="date" class="form-control" id="expDate" name="expDate" onChange={this.handleChange} value={this.state.product.expDate} />

                        <label for="retPrice">Retail Price</label>
                        <input type="text" class="form-control" id="retPrice" name="retPrice" onChange={this.handleChange} value={this.state.product.retPrice} />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-6">
                        <label for="count">Qnt</label>
                        <input type="text" class="form-control" id="count" name="quantity" onChange={this.handleChange} value={this.state.product.quantity} />
                    </div>
                </div>
                <button class="btn btn-success">Submit</button>
            </form>
        )
    }
}

export default ProductForm