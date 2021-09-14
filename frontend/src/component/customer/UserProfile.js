import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {Typography,Paper,Avatar,Divider, AppBar, Toolbar, IconButton,TextField, Slide  } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Header from "./Header";
import {useHistory} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import { getData,postDataImage,postData, ServerURL } from "../../fetchnodedata";
var otpGenerator = require('otp-generator')

const useStyles = makeStyles({
  root: {    display:'flex',    flexDirection:'column',       marginTop:100,},
subdiv:{width: 550,  padding: 20,  marginTop: 20,  display: "flex",  justifyContent: "center",  alignItems: "center",},
card: {  border:'1px solid #bdc3c7',},
cardactionarea: {  borderBottom: '1px solid #bdc3c7',  borderTop: '2px solid #bdc3c7'},
cardmedia: {  borderBottom: '1px solid #bdc3c7'},
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); //for dialoge box

function UserProfile(props) {
  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];
  var history=useHistory()

  var dispatch = useDispatch()
  
  const logout=()=>{
    dispatch({type:'REMOVE_USER', payload:user.mobile})
    history.push({pathname:'/home'}) 
  }
  var history = useHistory();
  const showorder=()=>{
    history.push({pathname:'/orders'}) 
  }
  //for drwaer------------------------------
  const [name,     setName      ] = useState('')
  const [mobile,   setMobile   ] = useState('')
  const [email,    setEmail    ] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [landmark, setLandmark] = useState('')
  const [zipcode,  setZipcode   ] = useState('')

  var otp = otpGenerator.generate(4, { upperCase: false, alphabets: false, specialChars: false });
  const [otp0, setotp0] = useState('')

const [dopen, setdOpen] = React.useState(false);
const handleDOpen = () => { 
  setName(user.firstname)    
  setMobile(user.mobile)
  setEmail(user.email)   
  setAddress1(user.address1)
  setAddress2(user.address2)
  setLandmark(user.landmark)
  setZipcode(user.zipcode)
  setdOpen(true);

};
const handledClose = () => {
 
  setdOpen(false);
 // fetchfoodType();       

};

  const handleSubmit=async()=>{
      if(user.mobile==mobile)
      {
        var body = { name:name, mobile:mobile, email:email,address1:address1,address2:address2,landmark:landmark,zipcode:zipcode, mobile0:mobile}
        var res=await postData("userdetail/editprofile", body)
          if(res.result)
          {  
            chkmob(mobile)
            swal({title: " Edit Successfully", icon: "success", dangerMode: true,}) }
          else
          { swal({ title: "", text: "Fail to edit", icon: "warning", dangerMode: true,}) }
     
      }
      else
      {
        alert(otp)
        setotp0(otp)
        handleClickOpenOtp()
        
      } 
    }//this is the end of handle submit
  
    const chkmob=async(mobile)=>{
      var body={mobile:mobile}  
      var result = await postData("login/chkuserlogin",body)
      if(result.result){
        dispatch({type:"ADD_CLIENT" , payload:[result.data.mobile, result.data] } )
      }
      else 
      {
        alert('not okay')
      }
    }
const showEditDialog=()=>{
    return(
      <div >       
         <Dialog fullScreen open={dopen} onClose={handledClose} TransitionComponent={Transition}>
           <AppBar className={classes.appBar}>
             <Toolbar>
            
               <IconButton edge="start" color="inherit" onClick={handledClose} aria-label="close">
                 <CloseIcon />
               </IconButton>
               <label  style={{ display: "flex",paddingBottom:1, marginTop:19, marginLeft:'20%' }}  ><h2>Edit User Profile</h2></label>
             </Toolbar>
           </AppBar>
           
           {/* this is a comment */}
           {/* now we are editing this below we are adding our submit form */}
           <div className={classes.root1}>
      <div className={classes.subdiv2}style={{width:'60%', marginLeft:'20%', marginTop:120}} >
        <Grid container spacing={2}>
            <Grid item xs={12} >
                
            </Grid>
            <Grid item xs={12} >
                
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField label="Full Name" fullWidth variant="outlined" value={name}
                onChange={(event)=>setName(event.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Mobile No." fullWidth variant="outlined" value={mobile}
                onChange={(event)=>setMobile(event.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email ID" fullWidth variant="outlined" value={email}
                onChange={(event)=>setEmail(event.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="House No. , Bulding Name" fullWidth variant="outlined" value={address1}
                onChange={(event)=>setAddress1(event.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Street, Colony" fullWidth variant="outlined" value={address2}
                onChange={(event)=>setAddress2(event.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Landmark" fullWidth variant="outlined" value={landmark}
                onChange={(event)=>setLandmark(event.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Zipcode" fullWidth variant="outlined" value={zipcode}
                onChange={(event)=>setZipcode(event.target.value)}/>
            </Grid>
            {/*  
            <Grid item xs={12} sm={6}>
              <div style={{ display: "flex", flexDirection: "row", }}>
                <input accept="image/*" className={classes.input} id="icon-button-userdp" type="file"  multiple
                  onChange={(event)=>handleimage1(event)}
                />
                <label htmlFor="icon-button-userdp">
                  <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                </label>
                <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={foodtypeImage.file} className={classes.large}/>
                {btnimage1?<Button color="primary" onClick={()=>editfoodtypeImage()} >save</Button>:<></>}  
              </div>
            </Grid>
            */}
            
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} style={{ height:30}}></Grid>

            <Grid item xs={12} sm={4}  >
              <Button variant="contained" color="primary" onClick={()=>handleSubmit()} >Submit</Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button variant="contained" onClick={handledClose} color="primary">Cancel</Button>
            </Grid>

            <Grid item xs={12} style={{ height:150}}></Grid>
           
        </Grid>
      </div>
    </div>
          
         </Dialog>
       </div>
    );
}

const [openotp, setOpenotp] = React.useState(false);

  const handleClickOpenOtp = () => {
    setOpenotp(true);
  };

  const handleCloseotp = () => {
    setOpenotp(false);
  };
  const [otp2, setotp2] = useState('')

  const handlesubmit2 = async()=>{
    if(otp2 == otp0)
    {
      var body = { name:name, mobile:mobile, email:email,address1:address1,address2:address2,landmark:landmark,zipcode:zipcode, mobile0:user.mobile}
      var res=await postData("userdetail/editprofile", body)
        if(res.result)
        { 
          chkmob(mobile)
          swal({title: " Food Type Edit Successfully", icon: "success", dangerMode: true,}) 
        }
        else
        { swal({ title: "Add New Restaurant?", text: "Fail to Add New Restaurant", icon: "warning", dangerMode: true,}) }
    }
    else
    {
      alert('inavalid otp')
    }
  }

const showotpDialog=()=>{
  return(
    <Dialog open={openotp} onClose={handleCloseotp} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
    <DialogContent>
      <DialogContentText>
        We Send a OTP on this no. {mobile} <br/>
        if it's not your please cancel
      </DialogContentText>
      <TextField  autoFocus  margin="dense"  id="otp2"  label="Enter OTP"   onChange={(event)=>setotp2(event.target.value)}  style={{width:110}}/>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseotp} color="primary">
        Cancel
      </Button>
      <Button onClick={handlesubmit2} color="primary">
        submit
      </Button>
    </DialogActions>
  </Dialog>
  )
}
  
  const classes = useStyles();
  return (
<div>
    <Header history={props.history} />
  <div className={classes.root} style={{alignContent:'center', alignItems:'center', }}> 
  <Paper elevation={1} className={classes.paperstyle} style={{paddingTop:10, paddingLeft:5, paddingBottom:150, width:350, height:600}}>
    <div style={{ alignContent:'center', alignItems:'center', textAlign:'center'}}>
    <Avatar alt="Remy Sharp" src=""  style={{marginLeft:'45%'}}/>
    <Typography style={{ fontSize:25, color:'black', fontFamily:'cursive' }} > {user.firstname}  </Typography> 
    </div>
    <Divider style={{margin:15}}/> 
    <div style={{display:'flex', flexDirection:'row', marginLeft:10, marginBottom:10 , }} >
      <Typography style={{fontSize:25, color:'black', fontFamily:'cursive' }} > Mobile No. : </Typography>
      <Typography style={{fontSize:20, color:'black', marginLeft:15 , marginTop:5}} >  {user.mobile}</Typography>       
    </div>
    <div style={{display:'flex', flexDirection:'row', marginLeft:10, marginBottom:10 , }} >
      <Typography style={{fontSize:25, color:'black', fontFamily:'cursive' }} >Email ID :   </Typography>
      <Typography style={{fontSize:20, color:'black', marginLeft:15 , marginTop:5}} >  {user.email}</Typography>       
    </div>
    <div style={{display:'flex', flexDirection:'row', marginLeft:10, marginBottom:10 , }} >
      <Typography style={{fontSize:25, color:'black', fontFamily:'cursive' }} >Address :   </Typography>
      <Typography style={{fontSize:16, color:'black', marginLeft:15 , marginTop:5, width:170}} > {user.address1}, {user.address2}, {user.landmark}, {user.zipcode}  </Typography>  
    </div>
    <div style={{marginTop:50, marginLeft:100}}>
      <Button variant='outlined' color='primary' onClick={()=>handleDOpen()}>Edit Profile</Button>
    </div>
    <div style={{marginTop:30, marginLeft:100}}>
      <Button variant='outlined' color='primary' onClick={()=>showorder()}>View Orders</Button>
    </div>
    <div style={{marginTop:30, marginLeft:116}}>
      <Button variant='outlined' color='secondary' onClick={()=>logout()}>Log Out</Button>
    </div>
  </Paper>
  </div>
  {showEditDialog()}
  {showotpDialog()}
</div>
  );
}

export default UserProfile;
