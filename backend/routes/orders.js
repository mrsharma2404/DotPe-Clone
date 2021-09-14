var express = require('express');
const pool = require('./pool');
var router = express.Router();

/* GET home page. */
router.post('/generateorder', function(req, res, next) {
  pool.query("insert into ordergeneration (orderdate,ordertime,mobile,address,restaurantid, totalamount, ordertype, secretkey , userid)values(?,?,?,?,?,?,?,?,?)",
  [req.body.orderdate, req.body.ordertime, req.body.mobileno, req.body.address, req.body.restaurantid, req.body.totalamount,req.body.ordertype, req.body.secretkey, req.body.userid, ],function(error,result){
   if(error)
   {  console.log(error)
       res.status(500).json({result:false})}
  else
  {  
    
    res.status(200).json({result:true,orderid:result.insertId})
  }

  })



});

router.post('/submitorder', function(req, res, next) {
    //console.log(req.body)
    q =
    "insert into orders(orderid,restaurant_id, fooditem_id, orderdate, ordertime, mobile, email ,fooditem, qtydemand, price, offer,amount, deliverystatus, paymentstatus,paymentmode, deliverat, totalamount) values ?";
  
    pool.query(
    q,
    [
      req.body.cart.map((item) => [
        req.body.orderid,
        req.body.restaurantid,
        item.fooditem_id,
        req.body.orderdate,
        req.body.ordertime,
        req.body.mobileno,
        req.body.emailid,
        item.fooditem,
        item.qtydemand,
        item.price,
        item.offer,
        item.amount,
        req.body.deliverystatus,
        req.body.paymentstatus,
        req.body.paymentmode, 
        req.body.deliverat,
        req.body.totalamt
      ]),
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ result: false });
      } else {
        return res.status(200).json({ result: true });
      }
    }
  );



  });

  router.post('/fetchorderuser', function(req, res, next) {
      //console.log("a " + req.body.restaurantid)

      pool.query("select * from ordergeneration where mobile = ? and restaurantid = ?",[req.body.mobile, req.body.restaurantid],function(error,result){
        if(error)
        {  console.log(error)
            res.status(500).json([])
             }
       else
       {  
         //console.log(result)
         res.status(200).json(result)
       }
       })
  });

 


  router.post('/orderlistrest', function(req, res, next) {
    //console.log("a" + req.body.restaurantid)
    pool.query("select * from ordergeneration where restaurantid = ?",[req.body.restaurantid],function(error,result){
     if(error)
     {  console.log(error)
         res.status(500).json([])
          }
    else
    {  
      //console.log(result)
      res.status(200).json(result)
    }
    })
  });

  router.post('/orderlistrest0', function(req, res, next) {
    //console.log("a" + req.body.restaurantid)
    pool.query("select R.*, (select C.* from orders C where C.orderid IN (R.orderid)) as history from ordergeneration R where restaurantid = ?",
    //"select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
    [req.body.restaurantid],function(error,result){
     if(error)
     {  console.log(error)
         res.status(500).json([])
          }
    else
    {  
      console.log(result)
      res.status(200).json(result)
    }
    }) });

  router.post('/foodOrderlist', function(req, res, next) {
    //console.log("a" + req.body.restaurantid)
    pool.query("select * from orders where orderid = ?",[req.body.orderid],function(error,result){
     if(error)
     {  console.log(error)
         res.status(500).json([])
          }
    else
    {  
      //console.log(result)
      res.status(200).json(result)
    }
  
    })
  
  
  
  });
var status = ''
  router.post('/updatefoodstatus', function(req, res, next) {
    console.log("a" + req.body.status)

    pool.query("update ordergeneration set deliverystatus = ? where orderid = ?",[ req.body.status, req.body.orderid],function(error,result){
     if(error)
     {    console.log(error)
         res.status(500).json({result:false})
          }
    else
    {  
      //console.log(result)
      res.status(200).json({result:true})
    }
  
    })
  
  
  
  });
  




module.exports = router;
