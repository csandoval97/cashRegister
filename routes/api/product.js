var express = require('express');
var router = express.Router();
var moment = require('moment')
var Stocks = require('../../models/stocks')
var Items = require('../../models/items')

router.post('/addchange',async(req,res)=>{
  var err=[]
  console.log(req.body)
  var {barcode, creDate,purDate, expDate, purPrice, retPrice} = req.body

  if(!barcode){
    err.push("need valid barcode")
  }
  if(!creDate){
    err.push("need valid creation date")
  }
  if(!purDate){
    err.push("invalid purchase date")
  }
  if(!expDate){
    err.push("invalid experation date")
  }
  if(!purPrice){
    err.push("invalid purchase price")
  }
  if(!retPrice){
    err.push("invalid retail price")
  }

  if(err.length > 0){
    res.send(err)
    return
  }
  purDate = Date.parse(purDate)
  expDate = Date.parse(expDate)

  try{
    // console.log('creDate',creDate)
    // console.log('purDate',Date.parse(purDate))
    // await Stocks.findOne({barcode,creDate},(err,stk)=>{
    //   console.log("stk",stk)
    // })
    await Stocks.findOneAndUpdate({barcode,creDate},{purDate, expDate, purPrice, retPrice},{new:true},(err,stk)=>{
      console.log('stock',stk)
    })
  }
  catch(e){
    err.push('Couldnt connect to server')
    res.send(err)
    return
  }


  res.send({msg:'no errors'})
  return
})

router.post('/addstock',async(req,res)=>{
  var err = []
  var creDate = Date.now()
  var {barcode,quantity,purDate,expDate,purPrice,retPrice} = req.body
  purDate = Date.parse(purDate)
  expDate = Date.parse(expDate)

  if(!purDate){
    err.push('Purchase Date invalid')
  }
  if(!expDate){
    err.push('Experation Date invalid')
  }
  if(!barcode ){
    err.push('Barcode cannot be empty')
  }
  if(!quantity){
    err.push('Quantity cannot be empty')
  }
  if(!purPrice){
    err.push('Purchase Price cannot be empty')
  }
  if(!retPrice){
    err.push('Retail Price cannot be empty')
  }
  
  if(err.length > 0){
    res.send({'err':err})
    return
  }

  try{
    var stock = new Stocks({barcode,quantity,purDate,expDate,creDate,purPrice,retPrice})
  }
  catch(e){
    err.push('Couldnt connect to server 1')
    res.send({'err':err})
    return
  }

  try{
    await Items.findOneAndUpdate({barcode},{creDate})
  }
  catch(e){
    err.push('Couldnt connect to server 3')
    res.send(err)
    return
  }


  try{
    await stock.save()
  }
  catch(e){
    err.push('Couldnt connect to server 3')
    res.send(err)
    return
  }

  res.send({'msg':'added stock successfully'})
  return
})

router.post('/find',async(req,res)=>{
    var err = []
    var msg = []

    var item = []

    if(req.body.search == null){
        err.push('Search cannot be empty')
    }
    if(req.body.value == null){
        err.push('SearchValue cannot be empty')
    }
    if(err.length !== 0){
        res.send({'err':err})
        return;
    }

    // console.log(req.body.search, req.body.value)
    if(req.body.search == 'barcode'){
        barcode = req.body.value
        try{
            var elem = await Items.findOne({barcode})
            item.push(elem)
            // console.log('item',item)
            if(elem == null){
                err.push('Could not find Item')
                res.send({'err':err})
                return;
            }
        }
        catch(e){
            err.push('Could not connect to server')
            res.send({'err':err})
            return;
        }
    }
    else{
        search = req.body.search
        value = req.body.value
        try{
            console.log({[search]:value})
            var item = await Items.find({[search]:value})
            // console.log(item)

            if(item == null){
                err.push('Could not find Item')
                res.send({'err':err})
                return;
            }
        }
        catch(e){
            err.push('Could not connect to server')
            res.send({'err':err})
            return;
        }
    }
    // console.log('item',item)
    if(item.length == 0){
        res.send({err:'Item doesnot exist'})
        return;
    }
    var list = []

    for(var i=0; i<item.length; i++){
        var product = await Stocks.find({barcode:item[i].barcode})
        
        // console.log(item,product)
        if(product.length <= 0){
          var purDate = moment().format().toString().slice(0,10)
          var expDate = moment().add(1,"month").format().toString().slice(0,10)
          var obj = {}
          obj.barcode = item[i].barcode
          obj.barname = item[i].barname
          obj.category = item[i].category
          obj.purDate = purDate
          obj.expDate = expDate
          obj.purPrice = 0
          obj.retPrice =  0
          obj.creDate = null
          obj.image = `http://localhost:3000/images/${item[i].image}`
          list.push(obj)
        }
        else{
            for(var j=0; j<product.length; j++){
                var purDate = new Date(product[j].purDate).toISOString().slice(0,10)
                var expDate = new Date(product[j].expDate).toISOString().slice(0,10)
                var obj = {}
                obj.barcode = item[i].barcode
                obj.barname = item[i].barname
                obj.category = item[i].category
                obj.image = `http://localhost:3000/images/${item[i].image}`
                obj.quantity = product[j].quantity
                obj.purDate = purDate
                obj.expDate = expDate
                obj.creDate = product[j].creDate
                obj.purPrice = product[j].purPrice
                obj.retPrice = product[j].retPrice
                list.push(obj)
            }
        }
    }
    res.send({msg:list})
})

module.exports = router;