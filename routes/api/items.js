var express = require('express');
var multer = require('multer')
var router = express.Router();
var Item = require('../..//models/items')
var items = {};

var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function(req,file,cb){
        cb(null, Date.now()+'-'+file.originalname)
    }
})
var upload = multer({storage:storage})

router.post('/additem',upload.single("image"),async(req,res)=>{
    var err= []
    var msg= []
    var obj= {}
    //check if item exist in the database
    try{
        var item = await Item.findOne({'barcode':req.body.barcode})
        // console.log(item)
        if(item != null){
            err.push('Barcode already exist')
            msg.push(item)
            res.send({'err':err,'msg':msg})
            return;
        }
    }
    catch(e){
        err.push('Could not connect to server')
        res.send({'err':err})
        return
    }

    if(req.file != undefined ){
        console.log('file',(req.file.filename))
        obj.image = req.file.filename
    }

    obj.barname=req.body.barname
    obj.barcode=req.body.barcode
    obj.category=req.body.category
    obj.subcat =req.body.subcat
    
    try{
        items =await new Item(obj).save()
    }
    catch(err){
        err.push("could not save item in db")
        res.send({'err':err})
        return;
    }
    
    res.send({'msg':'success'})
    return;
})

router.post('/edititem',upload.single("image"),async(req,res)=>{
    var err=[]
    var result
    if(req.file != undefined){
        result = JSON.parse(JSON.stringify(req.body))
        delete result.barcode
        for(var elem in result){
            if(result.elem && result.elem != '')
                result[elem] =  result[elem].toLowerCase()
            else{
                err.push(`${elem} cannot be empty`)
                delete result.elem
            }
        }
        result.image = req.file.filename
        try{
            await Item.findOneAndUpdate({'barcode':req.body.barcode},{$set:result},(err)=>{
            })
        }
        catch(e){
            console.log(e)
        }
    }
    else{
        result = JSON.parse(JSON.stringify(req.body))
        delete result.barcode
        for(var elem in result){
            if(result[elem] && result[elem] != '')
                result[elem] =  result[elem].toLowerCase()
            else{
                err.push(`${elem} cannot be empty`)
                delete result.elem
            }
        }
        console.log('res0',result)
        try{
            await Item.findOneAndUpdate({'barcode':req.body.barcode},{$set:result},(err)=>{
            })
        }
        catch(e){
            console.log(e)
        }
    }
    console.log(err,result)
    res.send({'err':err,'msg':'nothing'})
    return;
})

router.post('/find',async(req,res)=>{

    // console.log('body',req.body)
    var items;
    var err=[]

    if(req.body.search == 'barcode'){
        try{
            items = await Item.findOne({'barcode':req.body.value},(err, itm)=>{})
            // console.log(items)
            if(items === null){
                console.log('empty')
                err.push('item does not exist')
                res.send({err})
                return;
            }
            else{
                items = JSON.parse(JSON.stringify(items))
                delete items.__v
                delete items._id
                items.image = `http://localhost:3000/images/${items.image}`
                res.send({'msg':[items]})
                return;
            }
        }
        catch(err){
            err.push("Could not connect to server")
            res.send({err})
            return;
        }
    }
    else{
        try{
            items = await Item.find({[req.body.search]:req.body.value})
        }
        catch(err){
            err.push("Could not connect to server")
            res.send({err})
            return;
        }

        if(items == null){
            items=[]
        }
        else{
            items = JSON.parse(JSON.stringify(items))
        }

        for(var i=0;i<items.length;i++){
            delete items[i].__v
            delete items[i]._id
            items[i].image = `http://localhost:3000/images/${items[i].image}`
        }
        res.send({'msg':items})
        return;
    }
})

module.exports = router