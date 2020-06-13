import React from 'react'
import axios from 'axios'

class ItemForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            imgObj:null,
            barname:'',
            category:'',
            subcat:'',
            barcode:'',

            rebarcode:'',
            barmsg:'',
            image:'',

            err:[]
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        var prevState = this.state
        var formData = new FormData()

        if(prevState.imgObj != null){
            formData.append('image',prevState.imgObj)
        }
        formData.append('barname',prevState.barname)
        formData.append('barcode',prevState.barcode)
        formData.append('category',prevState.category)
        formData.append('subcat',prevState.subcat)
        
        await axios.post('http://localhost:3000/api/item/additem',formData,)
        .then(res =>  {
            if(res.data.err){
                prevState.err = res.data.err
            }
            else{
                this.reset(prevState)
            }   })
        .catch(err => console.log('err',err) )

        this.setState(prevState)
    }

    reset = prevState =>{
        prevState.err=[]
        prevState.barcode=""
        prevState.rebarcode=""
        prevState.barname=""
        prevState.category=""
        prevState.subcat=""
        prevState.barmsg=""
        prevState.imgObj=null
        prevState.image=""

        return prevState;
    }
    
    handleChange = event => {
        var prevState = this.state
        prevState[event.target.name] = event.target.value
        if(event.target.name == 'barcode' || event.target.name == 'rebarcode'){
            if(prevState.barcode !== prevState.rebarcode ){
                prevState.barmsg = "Barcode need to match"
            }
            else{
                prevState.barmsg = ""
            }
        }
        // console.log(event.target.name, event.target.value)
        this.setState(prevState)
    }

    handleImage = event => {
        var prevState = this.state
        // console.log(event.target.files)

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            prevState.imgObj = event.target.files[0]
            // prevState.msg[index] = "Submit to save changes"
            reader.onload = (e) => {
                prevState.image = e.target.result
                this.setState(prevState);
            };
            reader.readAsDataURL(event.target.files[0]);
            //this.setState(prevState)
            
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                {this.state.err.map(er =>{
                    return <h5 style={{color:'red'}}>{er}</h5>
                })}
                <div class="row">
                    <div class="form-group col-4">
                        <img class="img-fluid" src={this.state.image}></img>
                        <input type="file" class="form-control" id="image" onChange={this.handleImage}/>
                    </div>
                    <div class="form-group col-8">
                        <label for="barname">Product Name</label>
                        <input type="text" class="form-control" id="barname" name="barname" onChange={this.handleChange} value={this.state.barname}/>
                        
                        <label for="category">Category</label>
                        <input type="text" class="form-control" id="category" name="category" onChange={this.handleChange} value={this.state.category}/>

                        <label for="subcat">Sub-Category</label>
                        <input type="text" class="form-control" id="subcat" name="subcat" onChange={this.handleChange} value={this.state.subcat}/>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-12">
                        <h5 style={{color:'red'}}>{this.state.barmsg}</h5>
                        <label for="barcode">Barcode</label>
                        <input type="text" class="form-control" id="barcode" name="barcode" onChange={this.handleChange} value={this.state.barcode} />

                        <label for="rebarcode">ReEnter Barcode</label>
                        <input type="text" class="form-control" id="rebarcode" name="rebarcode" onChange={this.handleChange} value={this.state.rebarcode} />
                    </div>
                </div>
                <button class="btn btn-success">Submit</button>
            </form>
        )
    }

}

export default ItemForm