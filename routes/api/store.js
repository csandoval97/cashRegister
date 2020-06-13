var express = require('express');
var router = express.Router();
var Stores = require('../../models/stores')


router.get('/', async(req,res)=>{
    var err = null
    var store

    try{
        store = await Stores.findOne({'id':1},(error,str)=>{
            return //console.log(str)
        })
    }
    catch(e){
        err = "could not connect to db"
    }
    
    //if(err)
        store = JSON.parse(JSON.stringify(store))
        delete store._id 
        delete store.id
        delete store.__v
        console.log(store) 

    res.send({err,store})
})

module.exports = router;