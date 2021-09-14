import React, { Component, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
// import { postData } from '../../FetchService';
import Header from "./Header";
const styles = (theme) => ({
  root: {  width: "100%",  marginTop: theme.spacing.unit * 3,  overflowX: "auto",},
  table: {  minWidth: 700,},
  icon: {  margin: theme.spacing.unit,  fontSize: 32,},
  margin: {  marginRight: "80%",  paddingLeft: "",},
  button: {  margin: theme.spacing.unit,},
  rightIcon: {  marginLeft: theme.spacing.unit,},
});

const OrderSubmitted = (props) => {
  var dispatch = useDispatch();
  var cart = useSelector((state) => state.cart);
  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];
  var keys = Object.keys(cart);
  var values = Object.values(cart);
  var totalamt = values.reduce(calculate, 0);

  function calculate(prev, item) {
    var price = item.offer == 0? item.qtydemand * item.price: item.qtydemand * item.offer;
    return prev + price;
  }
 
  const [getUserData, setUserData] = useState(user);
  
  const gotohome=()=>{
    props.history.push({ pathname: "/home" } )
  }
  const vieworder=()=>{
    props.history.push({ pathname: "/orders" } )
  }



  return (
    <>
    <Header history={props.history} />
      <center>
        <h1>Your Order Is Submited</h1>
        <div style={{margin:40 }}>
          <Button variant='contained' color='secondary'  onClick={ ()=>gotohome() } >Order More Food</Button></div>
        <Button variant='contained' color='secondary' onClick={()=>vieworder()}>View Orders</Button>
      </center>
    </>
  );
};
export default withStyles(styles)(OrderSubmitted);