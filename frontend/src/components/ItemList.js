import React from 'react'
import axios from 'axios'
// import {Accordion, Icon} from 'semantic-ui-react'
// import { Accordion, Card } from 'react-bootstrap';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Axios from 'axios';



class ItemList extends React.Component{
    
    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            itms:this.props.itm,

            items:[],
            itemsOrig:[],
            msg:[]
        }
    }

    handleSubmit = (index,event) => {
        var prevState = this.state
        var formData = new FormData()

        formData.append('barcode',prevState.items[index].barcode)
        if(prevState.items[index].barname != prevState.itemsOrig[index].barname){
            formData.append('barname',prevState.items[index].barname)
        }
        if(prevState.items[index].category != prevState.itemsOrig[index].category){
            formData.append('category',prevState.items[index].category)
        }
        if(prevState.items[index].image != prevState.itemsOrig[index].image){
            formData.append('image',prevState.items[index].imageObj)
        }
        
        axios.post('http://localhost:3000/api/item/edititem',formData,)
        .then(res =>  console.log(res))

        prevState.msg[index]=""
        this.setState(prevState)
        event.preventDefault();
    }

    handleItem = (index,event)=>{
        // console.log(event.target)
        var prevState = this.state

        prevState.items[index][event.target.name] = event.target.value 

        if(prevState.items[index].barname !== prevState.itemsOrig[index].barname || 
            prevState.items[index].category !== prevState.itemsOrig[index].category ||
            prevState.items[index].image !== prevState.itemsOrig[index].image){
            //prevState.items[index].msg = "Submit to save changes"
            prevState.msg[index] = "Submit to save changes"
        }
        else{
            // prevState.items[index].msg = ""
            prevState.msg[index]=''
        }

        this.setState(prevState)
    }

    onImageChange = (index,event) => {
        var prevState = this.state
        // console.log(event.target.files)

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            prevState.items[index].imageObj = event.target.files[0]
            prevState.msg[index] = "Submit to save changes"
            reader.onload = (e) => {
                prevState.items[index].image = e.target.result
                this.setState(prevState);
            };
            reader.readAsDataURL(event.target.files[0]);
            //this.setState(prevState)
            
        }
    }

    componentDidUpdate(){
        var prevState = this.state

        if(this.props.item === prevState.itms){
            return
        }
        prevState.itms = this.props.item

        if(this.props.item === undefined || this.props.item === null){
            prevState.items=[]
            prevState.itemsOrig = []
            prevState.msg = []
        }
        else{
            prevState.items = this.props.item
            prevState.itemsOrig = JSON.parse(JSON.stringify(this.props.item)) //this.props.item
            prevState.msg = new Array(this.props.item.length)
        }

        this.setState(prevState)
    }

    render(){
        return(
            <Accordion allowZeroExpanded='true'>
                {this.state.items.map((itm,index) => { return (
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton >
                                <span>
                                    <img src={itm.image} width="50rem" style={{flex:'in-line'}}/>
                                    <span style={{marginLeft:'1rem'}}>Barcode: {itm.barcode}</span>
                                    <span style={{marginLeft:'1rem'}}>Name: {itm.barname}</span>

                                </span>
                                <span style={{float:'right'}}>{new Date(itm.creDate).toLocaleString()}</span>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <h4 style={{color:'red'}}>{this.state.msg[index]}</h4>
                            <form onSubmit={this.handleSubmit.bind(this,index)}  enctype="multipart/form-data">
                                <div class="form-row">
                                    <div class="col-4">
                                        <div class="form-group">
                                            <img class="img-fluid" src={itm.image} />
                                            <input type="file" name="image" id="barcode" class="form-control" onChange={this.onImageChange.bind(this,index) } />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="barcode">Barcode:</label>
                                            <input type="text" name="barcode"id="barcode" class="form-control" value={itm.barcode} readOnly />
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-6">
                                                <label for="barname">Product Name:</label>
                                                <input type="text" name="barname" id="barname" class="form-control" onChange={this.handleItem.bind(this,index)} value={itm.barname} />
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="barcode">Category:</label>
                                                <input type="text" name="category" id="barcode" class="form-control" onChange={this.handleItem.bind(this,index)} value={itm.category} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <button class="btn btn-success">Submit</button>
                            </form>
                        </AccordionItemPanel>
                    </AccordionItem>
                
                )})}
            </Accordion>
        )
    }
}

export default ItemList