var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')
/* GET home page. */
router.post('/addfoodtype',upload.any(), function(req, res, next) {
pool.query("insert into foodtype (restaurant_id, foodtype_name, foodtype_image, adv_status, adv_image) values(?,?,?,?,?)",[req.body.restaurantId, req.body.foodType,  req.files[0].originalname,  req.body.adv_status, req.files[1].originalname],function(err,result){
 if(err)
 {
  res.status(500).json({result:false})
  console.log(err)
 }
 else
 {
    res.status(200).json({result:true})
 }
})});



router.post("/listfoodtype", function(req,res){
   //console.log(req.body.restaurantId)
   pool.query( "select * from foodtype where restaurant_id = ? ",[req.body.restaurantId],  function(error, result){
      if(error)
      {res.status(500).json([])
      console.log(error)}
      else
      {res.status(200).json(result)
      //console.log(result)
      //"select R.*,(select S.restaurant_name from restaurant S where S.restaurant_id=R.restaurant_id) as restaurantname  from foodtype R where restaurant_id = ?",[req.body.restaurantId],
      //we are using second for showing city name and stae te name 
     
   }
})
})

router.post("/editfoodtype", function(req,res){
   //console.log(req.body.restaurantId)
   pool.query( "update foodtype set foodtype_name=? , adv_status=? where foodtype_id = ? ",[req.body.foodType,req.body.adv_status,req.body.foodTypeId],  function(error, result){
      if(error)
      {res.status(500).json({result:false})
      console.log(error)}
      else
      {res.status(200).json({result:true})
      //console.log(result)
      //"select R.*,(select S.restaurant_name from restaurant S where S.restaurant_id=R.restaurant_id) as restaurantname  from foodtype R where restaurant_id = ?",[req.body.restaurantId],
      //we are using second for showing city name and stae te name 
     
   }
})
})

router.post("/editfoodtypeimage", upload.single('foodtype_image'), function(req,res){
   //console.log(req.body.restaurantId)
   pool.query( "update foodtype set foodtype_image=?  where foodtype_id = ? ",[req.file.originalname, req.body.foodtypeId],  function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json({result:false})
         
      }
      else
      {res.status(200).json({result:true})
      //console.log(result)
      //"select R.*,(select S.restaurant_name from restaurant S where S.restaurant_id=R.restaurant_id) as restaurantname  from foodtype R where restaurant_id = ?",[req.body.restaurantId],
      //we are using second for showing city name and stae te name 
     
   }
})
})

router.post("/editfoodtypeadvimage", upload.single('adv_image'), function(req,res){
   //console.log(req.body.restaurantId)
   pool.query( "update foodtype set adv_image=?  where foodtype_id = ? ",[req.file.originalname, req.body.foodtypeId],  function(error, result){
      if(error)
      {
         res.status(500).json({result:false})
         console.log(error)
      }
      else
      {res.status(200).json({result:true})
      //console.log(result)
      //"select R.*,(select S.restaurant_name from restaurant S where S.restaurant_id=R.restaurant_id) as restaurantname  from foodtype R where restaurant_id = ?",[req.body.restaurantId],
      //we are using second for showing city name and stae te name 
     
   }
})
})







router.post('/addfooditem',upload.single('foodItemImage'), function(req, res, next) {
   pool.query("insert into fooditem (restaurant_id, foodtype_id, fooditem, fooditem_image, price, offer, offertype, ingredients) values(?,?,?,?,?,?,?,?)",[req.body.restaurantId, req.body.foodTypeId, req.body.foodItem,  req.file.originalname,  req.body.price, req.body.offer, req.body.offertype, req.body.ingredients],function(err,result){
    
   if(err)
    {
      console.log(err)
     res.status(500).json({result:'false'})
     
    }
    else
    {
       res.status(200).json({result:'true'})
    }
   })});


   router.post("/listfooditem", function(req,res){
      pool.query(
         //"select * from foodtype ",   
         "select R.*, (select C.foodtype_name from foodtype C where C.foodtype_id=R.foodtype_id) as foodtype  from fooditem R  where restaurant_id = ?",[req.body.restaurantId],
         //we are using second for showing city name and stae te name 
         function(error, result){
         if(error)
         {res.status(500).json([])
         console.log(error)}
         else
         {res.status(200).json(result)
         //console.log(result)
      }
   })
   })

   router.post("/editfooditem", function(req,res){
      //console.log(req.body.restaurantId)
      pool.query( "update fooditem set foodtype_id=?, fooditem=?, price=?, offer=?, offertype=?, ingredients=? where fooditem_id = ? ",[req.body.foodTypeId, req.body.foodItem,  req.body.price, req.body.offer, req.body.offertype, req.body.ingredients, req.body.fooditemId],  function(error, result){
         if(error)
         {res.status(500).json({result:false})
         console.log(error)}
         else
         {res.status(200).json({result:true})
         //console.log(result)
         //"select R.*,(select S.restaurant_name from restaurant S where S.restaurant_id=R.restaurant_id) as restaurantname  from foodtype R where restaurant_id = ?",[req.body.restaurantId],
         //we are using second for showing city name and stae te name 
        
      }
   })
   })
   router.post("/editfooditemimage", upload.single('fooditem_image'), function(req,res){
      //console.log(req.body.restaurantId)
      pool.query( "update fooditem set fooditem_image=?  where fooditem_id = ? ",[req.file.originalname, req.body.fooditemId],  function(error, result){
         if(error)
         {
            console.log(error)
            res.status(500).json({result:false})
            
         }
         else
         {res.status(200).json({result:true})
         //console.log(result)
         //"select R.*,(select S.restaurant_name from restaurant S where S.restaurant_id=R.restaurant_id) as restaurantname  from foodtype R where restaurant_id = ?",[req.body.restaurantId],
         //we are using second for showing city name and stae te name 
        
      }
   })
   })

   router.post("/fooditembytype", function(req,res){
      //console.log(req.body.foodTypeId)
      pool.query(
         //"select * from foodtype ",   
         "select * from fooditem  where foodtype_id = ?",[req.body.foodTypeId],
         
         
         function(error, result){
         if(error)
         {res.status(500).json([])
         console.log(error)}
         else
         {res.status(200).json(result)
         //console.log(result)
      }
   })
   })

   router.post("/listfooditembyoffer", function(req,res){
      //console.log(req.body.foodTypeId)
      pool.query(
         //"select * from foodtype ",   
         "select * from fooditem  where restaurant_id = ? and offertype = ?",[req.body.restaurantId, req.body.offertype ],
         
         
         function(error, result){
         if(error)
         {res.status(500).json([])
         console.log(error)}
         else
         {res.status(200).json(result)
         //console.log(result)
      }
   })
   })



module.exports = router;
//here in oue pool. query while sending image remember the sequece of react data