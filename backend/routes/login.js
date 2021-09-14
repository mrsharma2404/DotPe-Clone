var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')
var jwt = require("jsonwebtoken")
var localstorage = require("node-localstorage").LocalStorage;
const { LocalStorage } = require('node-localstorage');
localstorage = new LocalStorage("./scratch")

router.post('/chkadmlogin',function(req,res){
    pool.query("select * from adminlogin where emailid=? and password=? ",[req.body.emailid, req.body.password],function(err,result){
    if(err)
    {
     res.status(500).json({result:false})
     console.log(err)
    }
    else
    {
        if(result.length==0)
        {
            res.status(200).json({result:false})
            //console.log("false", result)
            //console.log(result.length)
        }
        else
        {
            //console.log("true ", result)
            //console.log(result.length)
            res.status(200).json({result:true})
        }
      
    }
    })
});

router.post('/chkreslogin',function(req,res){
    pool.query("select * from restaurant where emailaddress=? and password=? ",[req.body.emailid, req.body.password],function(err,result){
    if(err)
    {
     res.status(500).json({result:false ,data:[]})
     //console.log(err)
    }
    else
    {   if(result.length==1)
        {
            res.status(200).json({result:true, data:result[0]})
        }
        else
        {
            res.status(200).json({result:false ,data:[]})
        }
       
       //console.log(result[0])
    }
    })
});

router.post('/chkuserlogin',function(req,res){
   
    pool.query("select * from user where mobile=?",[req.body.mobile],function(err,result){
        if(err)
        {
          console.log(err)
          return res.status(500).json({result:false})
        }
        else
        {
         if(result.length==0)
            { 
                pool.query("insert into user (mobile) values(?)",[req.body.mobile],function(err,result){
                    if(err)
                    {
                        console.log(err)
                        return res.status(500).json({result:false})
                    }
                    else
                    {
                        pool.query("select * from user where mobile=?",[req.body.mobile],function(err,result){
                            if(err)
                            {
                                console.log(err)
                                return res.status(500).json({result:false})
                            }
                            else
                            {
                                return res.status(200).json({result:true,data:result[0]})
                            }
                        })
                    }
                })
                //return res.status(200).json({result:false})  
            }
         else
            {  //console.log(result[0])
                return res.status(200).json({result:true,data:result[0]})
            }
        }
    })
});

router.get('/gettoken', function(req, res, next){
    try{
        var token = jwt.sign({id:100}, 'thenumericinfosystempvtltdgwlmp', {expiresIn:'20s'})
        //console.log(token)
        //localstorage.setItem('token',token)
        res.status(200).json({access_token:token})

    }
    catch(e){
        console.log('get token error' , e)
        res.status(500).json({access_token:null})
    }
})




module.exports=router;