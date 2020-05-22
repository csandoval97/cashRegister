var express = require('express');
var multer = require('multer')
var router = express.Router();
var Item = require('../models/items')
var items = {};

var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function(req,file,cb){
        cb(null, Date.now()+'-'+file.originalname)
    }
})
var upload = multer({storage:storage})

/* GET users listing. */
router.get('/', (req, res)=>{
    // res.send("hello");
    //Item.create()
    res.render('items',{})
})

router.post('/additem',upload.single('image'),async (req,res,next)=>{
    var {barcode,barcodeRe,barname,category} = req.body
    var image ='';
    var err = null
    
    if(req.file != undefined){
        console.log(req.file.filename)
        image = req.file.filename
    }
    
    if(barcode == '' || barname == '' || category == ''){
        res.render('items',{err:'field is empty'})
        return;
    }
    if(barcode != barcodeRe){
        res.render('items',{err:'barcode do not match'})
        return;
    }
    try{
        items = await Item.findOne({barcode},(err,itm)=>{
            return itm
        })
    }catch(err){
        err = "err with db"
    }

    if(err != null || items != null){
        if(err != null){
            res.render('items',{err})
        }
        else{
            res.render('items',{items,err:"item is already stored"})
        }
        return;
    }
    try{
        items =await new Item({barcode,barname,category,image}).save()
    }
    catch(err){
        items=''
        err="could not save item in db"
    }
    
    // console.log(items)
    res.render('items',{items,msg:"item was saved"})
    return;
})

router.post('/finditem',async(req,res)=>{
    console.log('query',req.query)
    console.log('body',req.body)
    if(req.body.search == 'barcode'){
        try{
            items = await Item.findOne({'barcode':req.body.barcode},(err, itm)=>{return itm})
            console.log(items)
            res.render('items',{items,msg:"item found"})
            return;
        }
        catch(err){
            res.render('items',{items,err:"item could not be found"})
            return;
        }
    }
    else{
        try{
            items = await Item.find({'barname':req.body.barcode})
            console.log(items)
            res.render('items',{items,msg:"item found"})
            return;
        }
        catch(err){
            res.render('items',{items,err:"item could not be found"})
            return;
        }
    }
})

router.get('/getitem/:id',async(req,res)=>{
    var itm = await Item.findOne({'barcode':req.params.id},(err,it)=>{return itm})
    console.log(itm)
    res.render('items',{items,itm})
    return;
})

router.post('/edititem',async(re,res)=>{
    
})

module.exports = router;