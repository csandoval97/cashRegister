var express = require('express');
var router = express.Router();
var Stores = require('../models/stores')

var store = {}

/* GET users listing. */
router.get('/', async(req, res)=>{
  var err=''

  store = await Stores.findOne({'id':1},(error,str)=>{
    console.log(str)
  })
  .catch(err=>err = error)

  res.render('store',{err,store})
});

router.post('/update',async (req,res)=>{
  var err=''
  console.log(req.body)
  var {street,storeName,manager,phone,stateTax,countyTax, cityTax, districtTax} = req.body
  var totalTax = Number(stateTax)+Number(countyTax)+Number(cityTax)+Number(districtTax);
  console.log(totalTax)
  console.log(phone)
  store = Stores.findOneAndUpdate({'id':1},{street,storeName,manager,phone,stateTax,countyTax, cityTax, districtTax,totalTax},{new:true,upsert:true},(err,str)=>{   
    console.log(str)
    return str;
  })
  .catch(err => err=err)

  res.render('store',{err,store})
})

module.exports = router;