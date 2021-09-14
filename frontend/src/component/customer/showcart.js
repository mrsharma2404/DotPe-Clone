import React, { useState, useEffect } from "react";
import { makeStyles , Menu, Divider, Button} from "@material-ui/core";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
//for redux
import { useSelector, useDispatch } from "react-redux";
import {ServerURL} from "../../fetchnodedata"

import DeleteOutline from "@material-ui/icons/DeleteOutline";
import QtySpinner from "./QtySpinner";

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
  }))

export default function Showcart(props){

    const classes = useStyles();
    var cart = useSelector((state) => state.cart);
    var keys = Object.keys(cart);
    var values = Object.values(cart);
    var totalamt0 = values.reduce(calculate, 0);
    var totalamt1 = values.reduce(caloffer, 0);
    var saving = (totalamt0 - totalamt1)
    var netamt = (totalamt0 - saving)
    function calculate(prev, item){
      return(prev+(item.qtydemand*item.price))
    }
    function caloffer(prev, item){
      return(prev+(item.qtydemand*item.offer))
    }

    const [refresh, setRefresh]=useState(false); //for redux - spinner

    var dispatch = useDispatch();   //for redux - spinner 

    //-------for Redux------ spinner
    const handleChange= async (value,item)=>{
        if(value==0)
        {
          dispatch({type:'REMOVE_ITEM',payload:item.fooditem_id})
          setRefresh(!refresh) 
        }
        else
        {         
          item['qtydemand']=value
          dispatch(  { type:'ADD_ITEM',  payload: [item.fooditem_id, item ] } )
          setRefresh(!refresh)
        }
      }
      //----till here----

      //for going on makepayment page
      const handleproceed=()=>{
        props.history.push({ pathname: "/makepayment" } )
      }

    const showFoodCart=() => {
        return values.map((items) => {
          return (
            <div style={{  marginLeft:'1%' , display:"flex" , flexDirection:"row", paddingTop:35, width:'40%' }}>
              <div style={{  marginLeft:'1%' , marginRight:'1%', display:"flex" , flexDirection:"row" }}>
                <img  src={`${ServerURL}/images/${items.fooditem_image}`}  style={{ borderRadius: 5,  marginLeft:5}}  width="60" height='60'/>
              </div>
              
              <div item  style={{ justifyContent: "space-around", marginLeft:15 , marginRight:15, width:200}} >
                <div style={{ fontWeight: 600   }}>{items.fooditem} </div>
                <div >
                  {items.offer > 0 ? 
                  (<span><s>&#8377; {items.price}</s> &#8377;{" "}  {items.offer}</span>):(<></>)}
                  x {items.qtydemand}
                </div>
                <div style={{textAlign:'centre'}} >
                <QtySpinner value={items.qtydemand} onChange={(value)=>handleChange(value, items)}/>
                </div>
              </div>
                    
              <div item  style={{display: "flex", flexDirection: "column" }}>
                <div style={{width:100, textAlign:'right'}}>
                  <DeleteOutline />
                </div>
                {items.offer==0 ? (<div style={{width:100, textAlign:'right'}} >&#8377; {items.price*items.qtydemand}</div>) : (<div style={{width:100, textAlign:'right'}}>&#8377; {items.offer*items.qtydemand}</div>)}
              </div>
              <div item xs={12}>  <Divider />  </div> 
            </div>      ); });  };
  
return(
    <div>
        <Header history={props.history} />

        <div style={{padding:25 , display:"flex" , flexDirection:"row", marginTop:70}}>

        <Grid container spacing={1}>

            <Grid items xs={12} sm={6}>
             <h4>My Cart({keys.length})</h4>
            </Grid>    
            <Grid items xs={12} sm={6}>
             <h4></h4>
            </Grid>    

            

            <Grid items xs={12} sm={6}>
                <h3>Order Summary</h3>
                {showFoodCart()}
            </Grid>

            <Grid items xs={12} sm={6}>
            <div style={{padding:15,background:'#FFF',display:'flex',flexDirection:'column' ,marginBottom:20 }}>
                <div style={{fontSize:20,fontWeight:'bold',marginBottom:10}}>Apply Coupon</div>
               
                <div style={{fontSize:14,fontWeight:'bold',marginBottom:10}}>Currently this feature is not available</div>
           </div>
                <div>
                    <h2>Payment details</h2>
                    <div style={{  marginLeft:"1%" , display:"flex" , flexDirection:"row", paddingTop:15, width:"90%" }}>
                  <div item  style={{ justifyContent: "space-around", marginLeft:15 , marginRight:5, width:180}} > Total Amount :</div>  
                  <div style={{width:100, textAlign:'right'}} >{totalamt0}  </div>
                  </div>

                  <div style={{  marginLeft:"1%" , display:"flex" , flexDirection:"row", paddingTop:15, width:"90%" }}>
                  <div item  style={{ justifyContent: "space-around", marginLeft:15 , marginRight:5, width:180}} >  Total Savings : </div>
                  <div style={{width:100, textAlign:'right'}} >{saving}  </div>
                  </div>

                  <div style={{  marginLeft:"1%" , display:"flex" , flexDirection:"row", paddingTop:15, width:"90%" }}>
                  <div item  style={{ justifyContent: "space-around", marginLeft:15 , marginRight:5, width:180}} >  Delievery Charges : </div>
                  <div style={{width:100, textAlign:'right'}} >0  </div>
                  </div>

                  <Grid item xs={12}>  <Divider />  </Grid> 
                  <div style={{  marginLeft:"1%" , display:"flex" , flexDirection:"row", paddingTop:15,  width:"90%" }}>
                  <div item  style={{ justifyContent: "space-around", marginLeft:15 , marginRight:5, width:180}} >  Net Amount : </div>
                  <div style={{width:100, textAlign:'right'}} >{netamt} </div>
                  </div>
 
                </div>
                  
               
                <Button style={{marginTop:30 , marginLeft:'10%'}} color="secondary" variant="outlined" onClick={()=>handleproceed()} >Proceed</Button>
                
            </Grid>     
        </Grid>
        </div>
    </div>)
}