var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')


router.post('/newuser',function(req,res){
    pool.query("insert into user (mobile, email, firstname,  password ,address_status) values(?,?,?,?,?) ",[req.body.mobile, req.body.email, req.body.firstname,  req.body.password, req.body.address_status],function(err,result){
        if(err)
        {
            console.log(err)
          return res.status(500).json({result:false})
      
        }
        else   
        {
            return res.status(200).json({result:true})
        }
  
    })
});

router.post('/chkloginative',function(req,res){
    pool.query("select * from user where email=? and password=? ",[req.body.emailid, req.body.password],function(err,result){
    if(err)
    {
     res.status(500).json({result:false ,data:[]})
     console.log(err)
    }
    else
    {   if(result.length==1)
        {
            res.status(200).json({result:true, data:result[0]})
        }
        else
        {
            //console.log(result)
            res.status(200).json({result:false ,data:[]})
        }
       
       //console.log(result[0])
    }
    })
});

router.post('/saveaddress', function(req,res){
   console.log(req.body.mobile)
    pool.query("update user set  address_status=? , address1=? , address2=?, landmark=? , firstname=? , zipcode=? where mobile=? ", [ req.body.address_status, req.body.address1 ,req.body.address2, req.body.landmark, req.body.name, req.body.zipcode, req.body.mobile] ,
     function(err, result){

        if(err)
        {
            console.log(err)
            res.status(500).json({result:false})   
        }
        else
        {
            console.log(result.affectedRows)
            if(result.affectedRows!=0)
            {
                res.status(200).json({result:true})
            }
            else
            {
                res.status(200).json({result:false})
            }
            
           
        }
    });
    
})


 router.post('/editprofile', function(req,res){
    console.log(req.body.mobile)
     pool.query("update user set  firstname=? , mobile=? , email=?, address1=? , address2=? , landmark=? , zipcode=?  where mobile=? ", [ req.body.name, req.body.mobile ,req.body.email, req.body.address1, req.body.address2, req.body.landmark, req.body.zipcode, req.body.mobile0] ,
      function(err, result){
        if(err)
         {
            console.log(err)
            res.status(500).json({result:false})   
         }
        else
        {
            res.status(200).json({result:true})
        }
     });
     
 })


module.exports=router;