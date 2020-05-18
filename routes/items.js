var express = require('express');
var router = express.Router();
var Item = require('../models/items')

/* GET users listing. */
router.get('/', (req, res)=>{
    // res.send("hello");
    //Item.create()
    res.render('items',{})
})

router.post('/additem',async (req,res,next)=>{
    var {barcode,barcodeRe,barname,category} = req.body
    var err = null
    if(barcode == '' || barname == '' || category == ''){
        res.render('items',{err:'field is empty'})
        return;
    }
    if(barcode != barcodeRe){
        res.render('items',{err:'barcode do not match'})
        return;
    }

    var item = await Item.findOne({barcode},(err,itm)=>{
        return itm
    })
    .catch(err=>err="error with db")

    if(err != null || item != null){
        if(err != null){
            res.render('items',{err:"errow with db"})
        }
        else{
            res.render('items',{item,err:"item is already stored"})
        }
        return;
    }

    item =await new Item({barcode,barname,category}).save()
    .catch(err=>err="problem with itemdb")
    
    res.render('items',{item,msg:"item was saved"})
    return;
})

module.exports = router;