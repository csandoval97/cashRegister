import React, { Component } from 'react';


class BarcodeItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            itm: {},
            itms:[]
        }
        //console.log(this.props.item[1])
    }

    updateBarcode = () =>{

        var items = this.state.itms
        if(this.props.item['err'] == null){
            console.log(this.props.item)
            items = items.concat(this.props.item)
        }

        
        this.setState({
            itm:this.props.item,
            itms: items
        })
        // console.log(this.state.itm)
        // console.log(this.state.itms)
    }


    render(){
        return(
            <div>
                <h1>Hello Worlds</h1>
                {JSON.stringify(this.state.itms)}

            </div>
        )
    }
}

export default BarcodeItem