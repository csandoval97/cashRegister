import React from 'react';
// import { response } from 'express';

class BarcodeScan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode:'hello',
    }
  }

  handleChange= event =>{
    this.setState({
      barcode: event.target.value
    })
  }

  handleSubmit= event =>{
    fetch('http://localhost:3000/api/addbar',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({barcode:this.state.barcode}) })
    .then(response => response.json() )
    .then(data => this.props.parentCallback(data))
    .catch(err => console.log(err))
    
    event.preventDefault();
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label for="barcode">Barcode</label>
          <input type="text" name="barcode" value={this.state.barcode} onChange={this.handleChange} class="form-control" id="barcode"/>
        </div>
      </form>
    )
  }
}

export default BarcodeScan