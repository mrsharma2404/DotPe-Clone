import React, { Component, useEffect, useState } from "react";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postData } from '../../fetchnodedata'
var otpGenerator = require('otp-generator')

const useStyles = makeStyles({
  root: {  display: "flex",  justifyContent: "center",  alignItems: "center",},
  subdiv: {  width: 700,  padding: 20,  marginTop: 20,  display: "flex",  justifyContent: "center",  alignItems: "center"},
  card: {  border: "1px solid #bdc3c7",  width:320},
  cardactionarea: {  borderBottom: "1px solid #bdc3c7",  borderTop: "2px solid #bdc3c7",},
  cardmedia: {  borderBottom: "1px solid #bdc3c7",   },
 // root: {  width: "100%",  marginTop: theme.spacing.unit * 3,  overflowX: "auto",},
  table: {  minWidth: 700,},
 // icon: {  margin: theme.spacing.unit,  fontSize: 32,},
  margin: {  marginRight: "80%",  paddingLeft: "",},
 // button: {  margin: theme.spacing.unit,},
 // rightIcon: {  marginLeft: theme.spacing.unit,},
});
function Page2(props) {
  const classes = useStyles();
  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];
  var res = useSelector(state=>state.res)
  var rest = Object.values(res)[0];
  var history = useHistory();
  //alert(rest.restaurant_name)

  if(user==undefined)
  {
    var user = [] 
  }
  //const [tempmobile, settempmobile] = useState(user.mobile)

  var dstatus = props.history.location.data  
  //alert(props.history.location.data)

  const handleorderspay = () => {
    if(dstatus == 'home delivery')
    {
      handleOrderSubmit("Cash On Delivery", "none", "none", 'Home Delivery');
      //alert('order okay')
    }
    if(dstatus=='takeaway')
    {
     
      handleOrderSubmit("Online Payment", "none", "none", 'Take Away');
    }
    if(dstatus=='dinein')
    {
      
      handleOrderSubmit("Online Payment", "none", "none", 'Dine In');
    }
    if(dstatus==undefined)
    {
      
      alert('some error', dstatus)
    }
   
  };

  

  var secretkey = otpGenerator.generate(4, { upperCase: false, alphabets: false, specialChars: false });

  ///--------------------for payment gateway-------------------------------

  var dispatch = useDispatch();
  var cart = useSelector((state) => state.cart);
  var keys = Object.keys(cart);
  var values = Object.values(cart);
  var totalamt = values.reduce(calculate, 0);
  function calculate(prev, item) {
    var price = item.offer == 0? item.qtydemand * item.price: item.qtydemand * item.offer;
    return prev + price;
  }
 
  const [getUserData, setUserData] = useState(user);
  
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: 1000, //  = INR 1
    name: rest.restaurant_name,
    description: 'some description',
    image: "/logo192.png",
    handler: function (response) {  alert(response.razorpay_payment_id); },
    prefill: {
      name:" ",
      contact: " ",
      email: "noemail@g.com",
    },
    notes: {  address: "some address",},
    theme: {  color: "black",  hide_topbar: false,},
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
//----------till here payment gateway---------------------------------

//-------------for orderdetail submit-----------
const handleOrderSubmit = async (paymentmode, paymentstatus, transationid, ordertype) => {
      var addressc =  user.firstname  + ' , ' + user.address1 + ', ' + user.address2 + ', ' + user.landmark + ', ' + user.zipcode
      var date = new Date();
      var cd = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      var ct = date.getHours() + ":" + date.getMinutes() ;
      var body = { orderdate: cd, ordertime: ct, mobileno: user.mobile, address: addressc, restaurantid: rest.restaurant_id, totalamount:totalamt, ordertype:ordertype, secretkey:secretkey, userid:user.userid };
      var result = await postData("orders/generateorder", body);
      if (result.result) {
        body = {  orderid: result.orderid,  orderdate: cd,  ordertime: ct,  mobileno: user.mobile,  emailid: user.email,  totalamt: totalamt, 
                 deliverystatus: "pending",  paymentstatus: paymentstatus,  paymentmode: paymentmode,  restaurantid: rest.restaurant_id,  deliverat: user.address1,    cart: values, };
        var orderstatus = await postData("orders/submitorder", body);
        if(orderstatus.result)
        { 
          values.map((item)=>{dispatch({type:'REMOVE_ITEM',payload:item.fooditem_id})} )
          history.push({ pathname: "/ordersubmitted" });
        }
       }
      
};
//---------till here-------------------------------------------

 
  return (
    <div>
      <Header history={props.history} />

      <div className={classes.root} style={{ marginTop:70}}>
        <div className={classes.subdiv}>
          <Grid container spacing={2}>
            {dstatus != 'home delivery' ? <></>:         //-------------------
               <Grid item xs={12} sm={6}>
               <Card className={classes.card}>
                 <CardActionArea className={classes.cardactionarea}>
                   <CardMedia
                     className={classes.cardmedia} style={{height:240}}
                     component="img"
                     alt="Cash on Delivery"
                     image="/cod.jpg"
                     title="Cash on Delivery"
                   />
                   <CardContent>
                     <Typography gutterBottom variant="h5" component="h2">
                       Cash on Delivery
                     </Typography>
                     <Typography
                       variant="body2"
                       color="textSecondary"
                       component="p"
                     >
                       Lizards are a widespread group of squamate reptiles, with
                       over 6,000 species, ranging across all continents except
                       Antarctica
                     </Typography>
                   </CardContent>
                 </CardActionArea>
                 <CardActions>
                   <Button
                     variant="contained"
                     color="primary"
                     fullWidth
                     onClick={() => handleorderspay()}
                   >
                     Cash on Delivery
                   </Button>
                 </CardActions>
               </Card>
             </Grid>
            }
         
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardactionarea}>
                  <CardMedia
                    className={classes.cardmedia} style={{height:240}}
                    component="img"
                    alt="Online Payment"
                    image="/online.jpg"
                    title="Online Payment"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Online Payment
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={openPayModal}
                  >
                    Online Payment
                  </Button>

                  
                </CardActions>
              </Card>
            </Grid>
          </Grid>
         
        </div>
      </div>
      {dstatus != 'home delivery' ? <><Button  variant="contained"  color="primary"    onClick={() => handleorderspay()}>  Payment Done</Button> <div>this is a temporary button</div> </>
      :<></>}
      
    </div>
  );
}

export default Page2;
