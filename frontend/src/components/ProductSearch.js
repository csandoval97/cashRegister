import React from 'react';


class ProductSearch extends React.Component{
    constructor(props){
        super(props)
        this.state={
            search:'barcode',
            value:'',

            err:[],
            msg:[]
        }
    }
    handleChange = event => {
        // console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault();
        var prevState = this.state

        if(prevState.search !== '' && prevState.value !== ''){
            fetch('http://localhost:3000/api/product/find',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({'search':prevState.search, 'value':prevState.value}) })
            .then(response => response.json() )
            .then(data => {
                if(data.err)
                    prevState.err = data.err;
                else
                    prevState.err = []
                if(data.msg)
                    this.props.parentCallback(data.msg)
                    // prevState.msg=data.msg;

                this.setState(prevState)}
            )
            .catch(err => console.log(err) )
        }
        else{
            prevState.err=['search cannot be empty']
            this.setState(prevState)
        }
    }

    render(){
        return(
        <form onSubmit={this.handleSubmit}>
            {this.state.err.map(e =>{
                return <p style={{color:'red'}}>{e}</p>
            })}
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <select class="custom-select" name="search" value={this.state.search} onChange={this.handleChange}>
                    <option value="barcode">Barcode</option>
                    <option value="barname">ProdName</option>
                    <option value="category">ProdCat</option>
                </select>
                </div>
                <input type="text" class="form-control" name="value" value={this.state.value} onChange={this.handleChange}/>
            </div>
            <button input="sbumit" class="btn btn-primary">find</button>
        </form>
        )
    }
}

export default ProductSearch