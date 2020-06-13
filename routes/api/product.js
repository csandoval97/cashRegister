var express = require('express');
var router = express.Router();
var moment = require('moment')
var Stocks = require('../../models/stocks')
var Items = require('../../models/items')

var currDate = moment().format().toString().slice(0,10)
var nextMonth = moment().add(1,"month").format().toString().slice(0,10)
var itemList = [];
var barcode = '';

//currDate:current date
//nextMonth: todays date + month
//itemList: list of items
//barcode: save barcode throught app

/* GET users listing. */
router.post('/', function(req, res) {
  
  res.send({'msg':'hello from API'})
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
        var obj = {}

        obj.barcode = item[i].barcode
        obj.barname = item[i].barname
        obj.category = item[i].category
        obj.image = item[i].image
        if(product.length <= 0){
            list.push(obj)
        }
        else{
            for(var j=0; j<product.length; j++){
                obj.quant = product[j].quantity
                obj.purDate = product[j].quantity
                obj.expDate = product[j].expDate
                obj.creDate = product[j].creDate
                obj.purPrice = product[j].purPrice
                obj.retPrice = product[j].retPrice
                list.push(obj)
            }
        } 
    }

    // console.log('final',list)
    // console.log('final list',list)
    res.send({msg:list})
})

module.exports = router;