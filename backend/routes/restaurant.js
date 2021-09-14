var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')
var jwt = require("jsonwebtoken")
/* GET home page. */
router.post('/addnewrestaurant',upload.any(), function(req, res, next) {
pool.query("insert into restaurant (restaurant_name, owner_name, address, state, city, zipcode, location, emailaddress, mobilenumber, type, idproof, idproofimage, shopact, shopactimage, fssai, fssaiimage, gst, status, logo, password) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.restaurantName, req.body.ownerName, req.body.address, req.body.state, req.body.city, req.body.zipcode, req.body.location, req.body.emailAddress, req.body.mobileNumber, req.body.type, req.body.id, req.files[0].originalname, req.body.shopAct, req.files[1].originalname, req.body.fssai, req.files[2].originalname, req.body.gst, req.body.status, req.files[3].originalname, req.body.password],function(err,result){
 if(err)
 {
  res.status(500).json({result:'false'})
  console.log(err)
 }
 else
 {
    res.status(200).json({result:'true'})
 }
})});

router.post("/editrestaurant",function(req, res){
   pool.query("update restaurant set restaurant_name=?, owner_name=?, address=?, state=?, city=?, zipcode=?, location=?, emailaddress=?, type=?, mobilenumber=?, idproof=?,  shopact=?, fssai=?,  gst=?, status=? where restaurant_id=?",[req.body.restaurant_name, req.body.owner_name, req.body.address, req.body.state, req.body.city, req.body.zipcode, req.body.location, req.body.emailaddress, req.body.type, req.body.mobilenumber, req.body.id, req.body.shopact,  req.body.fssai,  req.body.gst, req.body.status, req.body.restaurant_id],function(error,result){
      if(error)
      {
         res.status(500).json({result:false})
      }
      else
      {
         res.status(200).json({result:true})
      }
   })
})

router.get("/listrestaurant", function(req,res){
   try{
      var token = jwt.verify(req.headers.authorization,'thenumericinfosystempvtltdgwlmp');
      pool.query(
         //"select * from restaurant ",   
         "select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
         //we are using second for showing city name and stae te name 
         function(error, result){
         if(error)
         {res.status(500).json([])
         console.log(error)}
         else
         {res.status(200).json(result)}
   })
   }
   catch(e)
   {
      res.status(200).json("expire")
   }
})

//in database i made a speeling mistake (restaurant)
router.post('/editlogo',upload.single('logo'), function(req, res, next) {
   pool.query("update restaurant set logo=? where restaurant_id=?",[req.file.originalname, req.body.restaurant_id],function(err,result){
    if(err)
    {
     res.status(500).json({result:'false'})
     console.log(err)
    }
    else
    {
       res.status(200).json({result:'true'})
    }
   })});

router.post('/editidproofimage',upload.single('idproof'), function(req, res, next) {
   pool.query("update restaurant set idproofimage=? where restaurant_id=?",[req.file.originalname, req.body.restaurant_id],function(err,result){
    if(err)
    {
     res.status(500).json({result:'false'})
     console.log(err)
    }
    else
    {
       res.status(200).json({result:'true'})
    }
   })});

router.post('/editshopactimage',upload.single('shopact'), function(req, res, next) {
   pool.query("update restaurant set shopactimage=? where restaurant_id=?",[req.file.originalname, req.body.restaurant_id],function(err,result){
    if(err)
    {
     res.status(500).json({result:'false'})
     console.log(err)
    }
    else
    {
       res.status(200).json({result:'true'})
    }
   })});

router.post('/editfssaiimage',upload.single('fssai'), function(req, res, next) {
   pool.query("update restaurant set fssaiimage=? where restaurant_id=?",[req.file.originalname, req.body.restaurant_id],function(err,result){
    if(err)
    {
     res.status(500).json({result:'false'})
     console.log(err)
    }
    else
    {
       res.status(200).json({result:'true'})
    }
   })});


router.post('/delete', function(req, res, next) {
   pool.query("delete from restaurant where restaurant_id=?",[req.body.restaurant_id],function(err,result){
    if(err)
    {
     res.status(500).json({result:'false'})
     console.log(err)
    }
    else
    {
       res.status(200).json({result:'true'})
    }
   })});


router.post("/resdetail", function(req,res){
   pool.query(
      //"select * from restaurant ",   
      "select * from restaurant where restaurant_id = ?",[req.body.restaurantId],function(error, result){
      if(error)
      {res.status(500).json([])
      console.log(error)}
      else
      {
         res.status(200).json(result[0])
         //console.log(result[0])
      }
   })
})
module.exports = router;
//here in oue pool. query while sending image remember the sequece of react data