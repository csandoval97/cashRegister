import React from 'react'

class ProductList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            product:this.props.product,
            productCopy:[],
            productOrig:[]
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
        this.setState(prevState)
    }

    render(){
        return(
            <>
            {JSON.stringify(this.state.product)}
            <h1>Hello from productList</h1>
            </>
        )
    }
}

export default ProductList