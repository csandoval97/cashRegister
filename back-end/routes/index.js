var express = require('express');
var router = express.Router();
var Items = require('../models/items')
var Stocks = require('../models/stocks')
var Stores = require('../models/stores')

var items = []
var store = {}
var total = 0
var payment = 0

//get total

function getTotal(){
  var ttl=0
  for(var i=0;i<items.length;i++){
    var quant = items[i].quantity
    var price = items[i].price
    ttl +=  (quant * price)
  }
  ttl = ttl.toFixed(2)

  return ttl
}
/* GET home page. */
router.get('/', async (req, res)=>{
  var err = ''
  store = await Stores.findOne({'id':1},(error,str)=>{
    console.log(str)
  })
  .catch(err=>err=err)
  items = []
  total=0
  res.render('home', {items,total,payment,store,err});
});


router.post('/addbar',async (req,res,next)=>{
  var err = ''

  //increment quant
  for(var i=0;i<items.length;i++){
    if(items[i].barcode == req.body.barcode){
      items[i].quantity ++;
      total = getTotal()

      res.render('home', {items,total,payment,store});
      return;
    }
  }

  var itemQuery = await Items.findOne({barcode:req.body.barcode},(err,itm)=>{
    return itm
  })
  .catch(err => err = "error with itemdb")

  if(err != '' || itemQuery == null){
    if(err!=null)
      res.render('home', {items,total,store,err:err})
    else
      res.render('home', {items,total,store,err:"item db error"})
    return;
  }
  
  var stockQuery = await Stocks.findOne({barcode:req.body.barcode, creDate:itemQuery.creDate},(error,stck)=>{
      return stck;
  })
  .catch(err => err="error with stockdb" )

  if(err != '' || stockQuery == null){
    if(err!=null)
      res.render('home', {items,total,store,err:"error with stockdb"})
    else
      res.render('home', {items,total,store,err:"item does not exist im stock"})
    return;
  }
  //console.log(itemQuery)
  //console.log(stockQuery)

  var item = {id:items.length,barcode:req.body.barcode,item:itemQuery.barname,quantity:1 ,price:stockQuery.retPrice}
  items.push(item)
  //counter++;

  total = getTotal()
  res.render('home', {items,total,payment,store});
})

router.get('/removebar:id', (req,res, next)=>{
  var numID = parseInt(req.params.id)
  var temps = []
  var index = 0

  counter = 0
  for(var i=0;i<items.length;i++){
    if(i != numID ){
      items[i].id = index
      temps.push(items[i])
      index++
    }
  }
  items = temps
  
  total = getTotal()
  res.render('home', {items,total,store});
})

router.post('/addquant',(req,res)=>{
  for(var i=0;i<items.length;i++){
    if(items[i].barcode == req.body.quantBar){
      items[i].quantity = req.body.quantNum
    }
  }

  total = getTotal()
  res.render('home', {items,total,store,payment,store});
})

router.post('/addpay',(req,res)=>{
  console.log(req.body)
  payment = req.body.payment
  res.render('home', {items,total,payment,store});
})

module.exports = router;
