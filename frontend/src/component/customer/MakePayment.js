import React, { useState, useEffect } from "react";
import { makeStyles , Menu, Divider, Button, TextField} from "@material-ui/core";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
//for drwaer
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
//for redux
import { useSelector, useDispatch } from "react-redux";
import {postData, ServerURL} from "../../fetchnodedata"
import DeleteOutline from "@material-ui/icons/DeleteOutline";
//
//import swal from 'sweetalert';
//import Swal2 from 'sweetalert2'
//const Swal2 = require('sweetalert2')


const useStyles = makeStyles((theme) => ({
    grow: {  flexGrow: 1,},
    list: {  width: 310,},
    fullList: {  width: 'auto',},
  }))

export default function MakePayment(props){

    const classes = useStyles();
    var cart = useSelector((state) => state.cart);
    var client = useSelector((state) => state.client);
    var keys = Object.keys(cart);
    var values = Object.values(cart);
    var clientinfo = Object.values(client)[0];

    if(clientinfo==undefined)
    {
      var clientinfo = [] 
    }
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

  //------fro drawer adress -------
  const [name, setname]= useState("")
  const [address1, setAddress1]= useState("")
  const [address2, setAddress2]= useState("")
  const [landmark, setLandmark]= useState("")
  const [zipcode, setZipcode]= useState("")
  var mobile =  clientinfo.mobile ;
  
  const saveaddress = async ()=>{
      var body = {name:name,  address1:address1, address2:address2, landmark:landmark, zipcode:zipcode, address_status:"true", mobile:mobile, };
      var result = await postData("userdetail/saveaddress" , body)

      {chkmob(mobile)}
     
    
    //alert(address1, address2)
  }


  //------for saving the data in redux again with new address -----
  var dispatch = useDispatch(); //for redux

  const chkmob=async(mobile)=>{
    var body={mobile:mobile}  
    var result = await postData("login/chkuserlogin",body)
    if(result.result){
      dispatch({type:"ADD_CLIENT" , payload:[result.data.mobile, result.data] } )
      alert(result.result)
      {toggleDrawer("right", false)}
    }
    else 
    {
      alert('not okay')
    }
  }

  var address_status = clientinfo.address_status
  //-----till here--------
  
    

    const showFoodCart=() => {
      //alert(clientinfo);
        return values.map((items) => {
          return (
            <div style={{  marginLeft:"1%" , display:"flex" , flexDirection:"row", paddingTop:35, width:"40%" }}>
              <div style={{   marginRight:"1%", display:"flex" , flexDirection:"row" }}>
                <img  src={`${ServerURL}/images/${items.fooditem_image}`}  style={{ borderRadius: 5}}  width="60" height='60'/>
              </div>
              
              <div item  style={{ justifyContent: "space-around", marginLeft:15 , marginRight:5, width:140}} >
                <div style={{ fontWeight: 600   }}>{items.fooditem} </div>
                <div style={{ width:140}}>
                  {items.offer > 0 ? 
                  (<span><s>&#8377; {items.price}</s> &#8377;{" "}  {items.offer}</span>):(<></>)}
                  x {items.qtydemand}
                </div>
                <div style={{textAlign:'centre'}} >
                </div> 
              </div>
              <div item  style={{display: "flex", flexDirection: "column" }}>
                <div style={{width:100, textAlign:'right'}}>
                  <DeleteOutline />
                </div>
                {items.offer==0 ? 
                (<div style={{width:100, textAlign:'right'}} >&#8377; {items.price*items.qtydemand}</div>) : 
                (<div style={{width:100, textAlign:'right'}}>&#8377; {items.offer*items.qtydemand}</div>)}
              </div>
              <div item xs={12}>  <Divider />  </div> 
            </div>      ); });  };

//----------for Drawer-------
     const [state, setState] = React.useState({
       top: false,
       left: false,
       bottom: false,
       right: false,
     });
  
     const toggleDrawer = (anchor, open) => (event) => {
       if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
       }
  
       setState({ ...state, [anchor]: open });
     };
  
     const list = (anchor) => (
       <div
         className={clsx(classes.list, {
           [classes.fullList]: anchor === 'top' || anchor === 'bottom',
         })}
         role="presentation"
         //onClick={toggleDrawer(anchor, false)}
         //onKeyDown={toggleDrawer(anchor, false)}
       >
         <List>
           <div style={{width:300}}>
         <Grid container spacing={1} style={{padding:10}}>
        <Grid item xs={12}>
          <h4>{clientinfo.firstname}</h4> 
          <h5>Add your address..</h5>
        </Grid>
        <Grid item xs={12}>
            <TextField  fullWidth variant="outlined" onChange={(event)=>setname(event.target.value)} label=" Name"/>
        </Grid>
        
        <Grid item xs={12}>
            <TextField  fullWidth variant="outlined" onChange={(event)=>setAddress1(event.target.value)} label="Address Line One"/>
        </Grid>

        <Grid item xs={12}>
            <TextField  fullWidth variant="outlined" onChange={(event)=>setAddress2(event.target.value)} label="Address Line Two"/>
        </Grid>

        <Grid item xs={12}>
            <TextField  fullWidth variant="outlined" onChange={(event)=>setLandmark(event.target.value)} label="LandMark"/>
        </Grid>
        <Grid item xs={12}>
            <TextField  fullWidth variant="outlined" onChange={(event)=>setZipcode(event.target.value)} label="Zipcode"/>
        </Grid>
        <Grid item xs={12}>
            <Button  fullWidth variant="contained" onClick={()=>saveaddress()} color="primary">Add Address</Button>
        </Grid>
        <Grid item xs={12}>
            <Button  fullWidth variant="outlined" color='secondary' onClick={toggleDrawer("right", false)} color="primary">Cancel</Button>
        </Grid>

         </Grid>  
         </div>
         </List>
         <Divider />
         <List>
          
         </List>
       </div>
     );

     const handlemakepayement=()=>{
        props.history.push({'pathname':'/page1'})
     }
  
       
  
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
            <div style={{padding:15,background:'#FFF',display:'flex',flexDirection:'column' ,margin:20 }}>
                <div style={{fontSize:20,fontWeight:'bold',marginBottom:10}}> Name : { clientinfo.firstname} </div>

                {address_status == "true" ?
                <div style={{fontWeight:200,marginBottom:10 ,}} >
                Address:<div> {clientinfo.address1} , </div> <div> {clientinfo.address2},</div> <div> {clientinfo.city},{clientinfo.zipcode}</div>
              </div>:<></> } 
              {clientinfo.address_status != 'true' ? <div style={{fontWeight:200,marginBottom:10}}>
              <Button color="secondary" variant="outlined" onClick={toggleDrawer("right", true)} >  Add Address</Button> 
              </div>  : <div style={{fontWeight:200,marginBottom:10}}>
                <Button color="secondary" variant="outlined" onClick={toggleDrawer("right", true)} > Change Address </Button> </div>  }
                     
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
                <Button style={{marginTop:30 , marginLeft:'5%', width:'45%'}} color="primary" variant="contained" onClick={()=>handlemakepayement() } >Make Payment</Button>
                
            </Grid>     
        </Grid>
        </div>

         {/* this is for drwaer */}
      <div>
      
      <React.Fragment key={"right"}>
       
        <Drawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)}>
          {list("right")}
        </Drawer>
      </React.Fragment>
    )
  </div>
    </div>)
}