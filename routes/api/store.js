var express = require('express');
var router = express.Router();
var Stores = require('../../models/stores')


router.get('/', async(req,res)=>{
    var err = []

    try{
        var store = await Stores.findOne({'id':1},(error,str)=>{
            return //console.log(str)
        })
    }
    catch(e){
        err.push("could not connect to db")
    }
    
    store = JSON.parse(JSON.stringify(store))
    delete store._id 
    delete store.id
    delete store.__v

    res.send({err,store})
})

router.post('/update',async (req,res)=>{
    var err=[]
    if(!req.body.manager){
        err.push("Manager cannot be empty")
    }
    if(!req.body.storeName){
        err.push("Store Name cannot be empty")
    }
    if(!req.body.street){
        err.push("Street cannot be empty")
    }
    if(!req.body.phone){
        err.push("phone cannot be empty")
    }
    if(!req.body.countyTax){
        err.push("County Tax cannot be empty")
    }
    if(!req.body.districtTax){
        err.push("District Tax cannot be empty")
    }
    if(!req.body.stateTax){
        err.push("State Tax cannot be empty")
    }
    if(!req.body.cityTax){
        err.push("City Tax cannot be empty")
    }
    

    try{
        var store = await Stores.findOneAndUpdate({'id':1},req.body,{new:true,upsert:true})
    }
    catch(e){
        err.push("could not connect to server")
        res.send(err)
        return;
    }
    store = JSON.parse(JSON.stringify(store))
    delete store._id 
    delete store.id
    delete store.__v

    res.send({msg:store})
    return
})

module.exports = router;