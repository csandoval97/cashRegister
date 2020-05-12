var express = require('express');
var router = express.Router();
var Item = require('../models/items')

/* GET users listing. */
router.get('/', (req, res)=>{
    // res.send("hello");
    //Item.create()
    res.render('items',{})
})

router.post('/additem',(req,res)=>{
    var {barcode,barname,category} = req.body
    // console.log(req.body)

    var item = new Item({barcode,barname,category})
    item.save((err)=>{
        // console.log(err)
    })
    
    res.render('items',{})
})

module.exports = router;