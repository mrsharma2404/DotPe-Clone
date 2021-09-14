import React, { useState, useEffect } from "react";
import { Button, makeStyles ,Link } from "@material-ui/core";
import {postData} from "../../fetchnodedata"
import {useDispatch} from "react-redux"
import Header from "./Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Avatar from '@material-ui/core/Avatar';



import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';





var otpGenerator = require('otp-generator')

const useStyles = makeStyles((theme) => ({
  grow: {  flexGrow: 1,},
  root: {  width: "100%",  maxWidth: "36ch",  backgroundColor: theme.palette.background.paper,},
  inline: {  display: "inline",},
  sectionDesktop: {  display: "none",  [theme.breakpoints.up("sm")]: {    display: "flex",  },},
  sectionMobile: {  display: "flex",  [theme.breakpoints.up("sm")]: {    display: "none",  },},
  root: {  "& > *": {    margin: theme.spacing(1),    width: "25ch",  },},
  grow: {  flexGrow: 1,},
  margin: {  margin: theme.spacing(1),},
  textField: {  width: "25ch",},
  sectionDesktop: {  display: "none",  [theme.breakpoints.up("sm")]: {    display: "flex",  },},
  sectionMobile: {  display: "flex",  [theme.breakpoints.up("sm")]: {    display: "none",  },},
  paper: {   marginTop: theme.spacing(8),   display: 'flex',   flexDirection: 'column',   alignItems: 'center', },
  avatar: {  margin: theme.spacing(1),  backgroundColor: theme.palette.secondary.main,},
  form: {  width: '100%', // Fix IE 11 issue. 
   marginTop: theme.spacing(1),},
  submit: {  margin: theme.spacing(3, 0, 2),},
}));

export default function Signin(props) {
  const classes = useStyles();
  const [mobile, setMobile] = useState(" ");

  //-----for otp ----  
  const [otp, setOtp] = useState(0);
  const [otp2, setotp2] = useState(0);
  const [chkotp, setchkotp] = useState(" ");

  var otp1 =otpGenerator.generate(4, { upperCase: false, alphabets: false, specialChars: false });

  //--- this is for sms otp----
  //setGOtp(temp);
  //var body={otp:`Pls input otp ${temp}`,mob:mobileno}
  //var smsresult=postData('sms/sendotp',body)
  
  var dispatch = useDispatch(); //for redux

  const chkmob=async()=>{
    var body={mobile:mobile}  
    var result = await postData("login/chkuserlogin",body)
    if(result.result)
    {
      setOtp(1)
      //alert(result.data.firstname)
      dispatch({type:"ADD_CLIENT" , payload:[result.data.mobile, result.data] } )
      alert(otp1)
      setotp2(otp1)
    }
    else
    {
      alert('server error')
      //props.history.push({ pathname: "/signup" }, { mobileno: mobile, otp1:otp1 });
    }
  }

  const handleverify=(event)=>{
    if(chkotp == otp2){
      props.history.push({ pathname: "/showcart" });
    }
    else
    {
      alert("wrong otp")
    }
  }


  return (
    <div >
      <Header />
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>  <LockOutlinedIcon /></Avatar>
        <h2>Sign in \ Sign Up</h2>
        <h6 style={{textAlign:'center'}}>Sign in to access your Orders, Offers and Wishlist. </h6>
        <form className={classes.form} noValidate>
        <TextField
                  id="standard-start-adornment" variant="outlined" style={{width:"95%"}} 
                  className={clsx(classes.margin, classes.textField)}                
                  InputProps={{ startAdornment: ( <InputAdornment position="start">+91</InputAdornment> ),}}
                  onChange={(event)=>setMobile(event.target.value)}
                />
       
                <div style={{width:"55%",textAlign:'center',marginTop:25, marginLeft:'40%'}}>
                <IconButton aria-label="right" style={{background:"#2e86de", color:"#FFF"}}
                  onClick={()=>chkmob() } >
                  <KeyboardArrowRightIcon size="large" />
                </IconButton>
                </div>

                {otp==1?
                <div style={{display:'flex',flexDirection:'column',  margin:20, marginTop:50}}>
                <h3>Enter OTP </h3>
                <p>This is Just to Verify Your No. </p>
                <TextField
                  id="otp" variant="outlined" 
                  className={clsx(classes.margin, classes.textField)}                
                  //InputProps={{ startAdornment: ( <InputAdornment position="start">+91</InputAdornment> ),}}
                  onChange={(event)=>setchkotp(event.target.value)}
                />
                <Button variant="outlined" color="secondary" style={{width:100 , marginTop:20, marginLeft:'10%'}} 
                onClick={(event)=>handleverify(event)} >Verify</Button>
                </div>:<div></div>}
        </form>
      </div>
    </Container>
      

   
      
    
      </div>
  );
}
