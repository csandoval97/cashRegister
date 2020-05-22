var express = require('express');
var router = express.Router();
var moment = require('moment')
var Stocks = require('../models/stocks')
var Items = require('../models/items')
var mongoose = require('mongoose')

var currDate = moment().format().toString().slice(0,10)
var nextMonth = moment().add(1,"month").format().toString().slice(0,10)
var itemList = [];
var barcode = '';

//currDate:current date
//nextMonth: todays date + month
//itemList: list of items
//barcode: save barcode throught app

/* GET users listing. */
router.get('/', function(req, res, next) {
  var err = ""
  var temp = {a:'a'}
  temp.b = 'b'
  console.log(typeof(temp))
  console.log(temp)
  // console.log(moment(1592006400000).format().toString().slice(0,10) )
  res.render('stocks',{err,currDate,nextMonth,barcode})
});

router.post('/addstock',(req,res,next)=>{
  var creDate = Date.now()
  var {barcode,quantity,purDate,expDate,purPrice,retPrice} = req.body
  purDate = Date.parse(purDate)
  expDate = Date.parse(expDate)
  var stock = new Stocks({barcode,quantity,purDate,expDate,creDate,purPrice,retPrice})
  // console.log('form',req.body )

  Items.findOneAndUpdate({barcode},{creDate},{new:true,upsert:true},(err, itm)=>{
    console.log('itm',itm)
  })
  // .catch(err=>console.log('err with /addstock itemsdb'))
  
  stock.save((err,stc)=>{
    console.log('stc',stc)
  })
  // .catch(err=>console.log('err with /addstock, stockdb'))

  //itemList = []
  res.render('stocks',{})
})

router.get('/additem',async(req,res,next)=>{
  // if bc != null and cd != null
    //add previous stock to data
  //else
    //create new stock with todays date
  //console.log(req.query)
  try{
    var item = await Items.findOne({'barcode':req.query.bc},(err,item)=>{
      return item;} )
  }
  catch{
    var item = ''
  }

  if(req.query.bc != '' && req.query.cd == '' ){
    console.log("bc!=null,cd==null")
    res.render('stocks',{currDate,nextMonth,itemList,item})
    return;
  }
  else{
    var stock = await Stocks.findOne({'barcode':item.barcode,'creDate':req.query.cd},(err, stck)=>{
      return stck
    }).catch(err=>console.log("err in /additem/stockfindOne"))
    console.log('item',typeof(item))
    
    item = JSON.parse(JSON.stringify(item))
    item.quantity =  stock.quantity
    item.purDate = moment(stock.purDate).format().toString().slice(0,10)
    item.expDate = moment(stock.expDate).format().toString().slice(0,10)
    item.purPrice = stock.purPrice
    item.retPrice = stock.retPrice
    console.log('post',item,stock)

    res.render('stocks',{currDate,nextMonth,itemList,item})
    return;
  }
})

router.post('/finditem',async (req,res,next)=>{
  itemList = []
  //finds items with barcode, then attaches stocks to it
  if(req.body.search == 'barcode'){
    barcode = req.body.barcode;

    var elems = await Items.findOne({barcode},(err,elm)=>{
      return elm})
    .catch(err => console.log(err) )

    //could not find item in the database
    if(elems == null){
      res.render('stocks',{currDate,nextMonth,itemList,barcode,err:'could not find item'})
      return;
    }
    
    var stock = await Stocks.find({barcode:req.body.barcode},(err,stc)=>{
      return stc
    })

    if(stock.length == 0){
      elems.creDate = ''
      itemList.push(elems)
    }
    else{
      for(var i=0;i<stock.length;i++){
        var temp = {barcode:elems.barcode, 
                    barname:elems.barname,
                    category:elems.category,
                    image:elems.image,
                    quantity:stock[i].quantity,
                    purDate:moment(stock[i].purDate).format().toString().slice(0,10), 
                    expDate:moment(stock[i].expDate).format().toString().slice(0,10),
                    creDate:stock[i].creDate,
                    purPrice:stock[i].purPrice, 
                    retPrice:stock[i].retPrice
                  }
        itemList.push(temp)
      }         
    }
  }
  else if(req.body.search == 'prodname'){
    
  }
  else{

  }

  console.log(itemList)
  res.render('stocks',{currDate,nextMonth,itemList,barcode})
})

module.exports = router;