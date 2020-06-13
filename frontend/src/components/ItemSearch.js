import React from 'react';


class ItemSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search:'barcode',
            value:'',
            err:[]
        }
    }

    handleChange = event => {
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    findItem = event =>{
        var prevState = this.state

        if(this.state.search !== '' && this.state.value !== ''){
            console.log(JSON.stringify({'search':this.state.search, 'value':this.state.value}))
            fetch('http://localhost:3000/api/item/find',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({'search':this.state.search, 'value':this.state.value}) })
            .then(response => response.json() )
            .then(data => this.props.parentCallback(data))
            .catch(err => console.log(err) )
        }
        else{
            prevState.err='search cannot be empty'
        }
        this.setState(prevState)
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.findItem}>
                {this.state.err}
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                    <select class="custom-select" name="search" value={this.state.search} onChange={this.handleChange}>
                        <option value="barcode">Barcode</option>
                        <option value="barname">ProdName</option>
                        <option value="category">ProdCat</option>
                    </select>
                    </div>
                    <input type="text" class="form-control" name="value" onChange={this.handleChange}/>
                </div>
                <button input="sbumit" class="btn btn-primary">find</button>
            </form>
        )
    }
}

export default ItemSearch