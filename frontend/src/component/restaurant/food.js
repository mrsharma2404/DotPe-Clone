import React,{useState, useEffect} from "react"
import {makeStyles, Grid, TextField, FormControl, Select, InputLabel, Button, IconButton, Avatar, MenuItem} from '@material-ui/core'
import {PhotoCamera} from '@material-ui/icons';
import {getData, postData, postDataImage} from "../../fetchnodedata"
import swal from 'sweetalert';
var otpGenerator = require('otp-generator')


const useStyles = makeStyles((theme)=>({
    root1:{ display:'flex', justifyContent:'center', marginTop:20,padding:10 },
    subdiv:{ width:500,},
    root: {'& > *': {  margin: theme.spacing(1),},},
    input: {  display: 'none'},
    formControl: {  minWidth: 242,},
    
    large: {  width: theme.spacing(7),  height: theme.spacing(7),},
    formControlselect: {  minWidth: 240,},
}));
export default function Foodtype1(props){
    const classes = useStyles();
    
    const [foodType,setfoodType]=useState("")
    const [foodtypeImage,setfoodtypeImage]=useState({bytes:'', file:'/noimage.png'})
    const [foodtypeadvImage,setfoodtypeadvImage]=useState({bytes:'', file:'/noimage.png'})

    const [advStatus,setadvStatus]=useState("")
    const [list,setlist]=useState("")
  
    var Restaurant = props.restaurant;
    var restaurantId = Restaurant.restaurant_id;
    

      const handleSubmit=async()=>{
        var msg = "";
        var err = false;
        // if(isEmpty(ownerName)){
        //   err = true;
        //   msg += "<b>Owner Name Should Not Be Empty...<b><br>";
        // }
        // if(!isAlphabet(ownerName)){
        //   err = true;
        //   msg += "<b>Owner Name  Must Contains Alphabets Only...<b><br>";
        // }
        if(err){
          //setErrorMessage(msg);
          //setOpen(true);
        }
        if(!err)
        {
          
          var formData =new FormData()
            formData.append('restaurantId',restaurantId)
            formData.append('foodType',foodType)           
            formData.append('foodtypeImage',foodtypeImage.bytes) //here while we send images to node we have to remember the sequence for indexing         
                
            formData.append('adv_status',advStatus)
            formData.append('foodtypeadvImage',foodtypeadvImage.bytes)
            console.log("imagee bytessssssss",foodtypeadvImage )
            console.log("imagee ",foodtypeadvImage.bytes )
             
            var config={headers:{"content-type":"multipart/form-data"}}
            var res=await postDataImage("food/addfoodtype",formData,config)
            if(res.result)
            { swal({title: "New Food Type Added Successfully", icon: "success", dangerMode: true,}) }
            else
            { swal({ title: "Add New Restaurant?", text: "Fail to Add New Restaurant", icon: "warning", dangerMode: true,}) }
      }//this is the end of (!err)
      }//this is the end of handle submit
      
    return(
        <div className={classes.root1}>
          <div className={classes.subdiv} >
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <label  style={{ display: "flex", }}  ><h2>Type of Food</h2></label>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Food Type" fullWidth variant="outlined"  onChange={(event)=>setfoodType(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <input accept="image/*" className={classes.input} id="icon-button-foodtype" type="file"  multiple
                      onChange={(event)=>setfoodtypeImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
                    />
                    <label htmlFor="icon-button-foodtype">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={foodtypeImage.file} className={classes.large}/>
                  </div>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">Food Type Adv.</InputLabel>
                    <Select native label="Food Type Adv." fullWidth 
                    onChange={(event)=>setadvStatus(event.target.value)}
                    >
                      <option aria-label="None" value="" />
                      <option value={'Yes'}>Yes</option>
                      <option value={'No'}>No</option>
                      
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <input accept="image/*" className={classes.input} id="icon-button-foodtypeadv" type="file"  multiple
                      onChange={(event)=>setfoodtypeadvImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
                    />
                    <label htmlFor="icon-button-foodtypeadv">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={foodtypeadvImage.file} className={classes.large}/>
                  </div>
                </Grid>
                

                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} style={{ height:30}}></Grid>

                <Grid item xs={12} sm={4}  >
                  <Button variant="contained" color="primary" onClick={()=>handleSubmit()} >Submit</Button>
                </Grid>

                

                <Grid item xs={12} style={{ height:150}}></Grid>
               
            </Grid>
          </div>
        </div>
  )}