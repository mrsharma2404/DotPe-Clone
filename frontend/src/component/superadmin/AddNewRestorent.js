import React,{useState, useEffect} from "react"
import {makeStyles, Grid, TextField, FormControl, Select, InputLabel, Button, IconButton, Avatar, MenuItem, Snackbar} from '@material-ui/core'
import {PhotoCamera} from '@material-ui/icons';
import CloseIcon from "@material-ui/icons/Close";
import {getData, postData, postDataImage} from "../../fetchnodedata"
import { isEmpty, isMobile, isAlphabet, isEmail, isNumeric } from "../../Checks";
import renderHTML from 'react-render-html'
import swal from 'sweetalert';
var otpGenerator = require('otp-generator')


const useStyles = makeStyles((theme)=>({
    root1:{ display:'flex', justifyContent:'center', marginTop:20,padding:10 },
    subdiv:{ width:500,},
    root: {'& > *': {  margin: theme.spacing(1),},},
    input: {  display: 'none'},
    formControl: {  minWidth: 242,},
    large: {  width: theme.spacing(7),  height: theme.spacing(7),},
    formControlstatecity: {  minWidth: 160,},
}));
export default function Addnewres(){
    
  const classes = useStyles();
  const [logo,setLogo]=useState({bytes:'', file:'/noimage.jpg'})
  const [shopActImage,setShopActImage]=useState({bytes:'', file:'/noimage.png'})
  const [fssaiImage,setFssaiImage]=useState({bytes:'', file:'/noimage.jpg'})
  const [idProofImage,setIdProofImage]=useState({bytes:'', file:'/noimage.jpg'})

  const [getState, setState]=useState([]);
  const [getCity, setCity]=useState([]);

  const [restaurantName,setRestaurantName]=useState("")
  const [type,setType]=useState("")
  const [address,setAddress]=useState("")
  const [stateId,setStateId]=useState("")
  const [cityId,setCityId]=useState("")
  const [zipcode,setZipcode]=useState("")
  const [location,setLocation]=useState("")
  const [gst,setGst]=useState("")
  const [fssai,setfssai]=useState("")
  const [shopAct,setShopAct]=useState("")
  const [ownerName,setOwnerName]=useState("")
  const [emailAddress,setEmailAddress]=useState("")
  const [mobileNumber,setMobileNumber]=useState("")
  const [id,setId]=useState("")
  const [status,setStatus]=useState("")
  //const [password,setPassword]=useState("")

  const fetchStates=async()=>{
    var list=await getData("statecity/fetchstates")
    //console.log("States",list)
    setState(list); 
  };
 
  const fillStates=()=>{
    return(
         getState.map((item,index)=>{
           return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
         }))}
    
  const handleStateChange=async(event)=>{
        var body={stateid:event.target.value}
        setStateId(event.target.value)
        var list=await postData('statecity/fetchcities',body)
        //console.log("Cities",list)
        setCity(list);
      }
         
  const fillCities=()=>{
    return(   
         getCity.map((item,index)=>{  
           return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
         }))}

  const handleLogo=(event)=>{
    setLogo({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]),});
  }; //this is the second method for handle image

  const handleClose=()=>{
    setOpen(false);
  }; //this is for snackbar
  const [open, setOpen] = React.useState(false); //this is also for snackbar
  const [errorMessage, setErrorMessage] = useState(""); //this is also for snackbar

  const handleSubmit=async()=>{
    var msg = "";
    var err = false;
    if(isEmpty(restaurantName)){
      err = true;
      msg += "<b>Restaurant Name Should Not Be Empty...<b><br>";
    }
    if(isEmpty(ownerName)){
      err = true;
      msg += "<b>Owner Name Should Not Be Empty...<b><br>";
    }
    if(!isAlphabet(ownerName)){
      err = true;
      msg += "<b>Owner Name  Must Contains Alphabets Only...<b><br>";
    }
    if(err){
      setErrorMessage(msg);
      setOpen(true);
    }
    if(!err)
    {
      var password0=otpGenerator.generate(6, { upperCase: false, alphabets: false, specialChars: false });
      var password=(password0+ownerName)
      //alert(password)
      var formData =new FormData()
        formData.append('restaurantName',restaurantName)
        formData.append('type',type)
        formData.append('address',address)
        formData.append('state',stateId)
        formData.append('city',cityId)
        formData.append('zipcode',zipcode)
        formData.append('location',location)
        formData.append('gst',gst)
        formData.append('shopAct',shopAct)
        formData.append('fssai',fssai)

        formData.append('ownerName',ownerName)
        formData.append('emailAddress',emailAddress)
        formData.append('mobileNumber',mobileNumber)
        formData.append('id',id)

        formData.append('idProofImage',idProofImage.bytes)
        formData.append('shopActImage',shopActImage.bytes)
        formData.append('fssaiImage',fssaiImage.bytes)
        formData.append('logo',logo.bytes)  //here while we send images to node we have to remember the sequence for indexing
        
        formData.append('status',status)
        formData.append('password',password) 

        var config={headers:{"content-type":"multipart/form-data"}}
        var res=await postDataImage("restaurant/addnewrestaurant",formData,config)
        if(res.result)
        { swal({title: "New Restaurant Added Successfully", icon: "success", dangerMode: true,}) }
        else
        { swal({ title: "Add New Restaurant?", text: "Fail to Add New Restaurant", icon: "warning", dangerMode: true,}) }
  }//this is the end of (!err)
  }//this is the end of handle submit
  
  useEffect(function(){
    fetchStates() 
  },[])
  

    return(
        <div className={classes.root1}>
          <div className={classes.subdiv} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Restaurant Name" fullWidth variant="outlined" onChange={(event)=>setRestaurantName(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">Res. Type</InputLabel>
                    <Select native  label="Res. Type" fullWidth onChange={(event)=>setType(event.target.value)}>
                      <option aria-label="None" value="" />
                      <option value={10}>Cafe</option>
                      <option value={20}>Family Restaurant</option>
                      <option value={30}>Dhaba</option>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Address" fullWidth variant="outlined" onChange={(event)=>setAddress(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" className={classes.formControlstatecity}>
                  <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel>
                    <Select onChange={(event)=>handleStateChange(event)} label="State" fullWidth >
                      {fillStates()}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" className={classes.formControlstatecity} >
                  <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
                    <Select label="City" fullWidth onChange={(event)=>setCityId(event.target.value)}>
                      {fillCities()}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField label="Zip Code" fullWidth variant="outlined"  onChange={(event)=>setZipcode(event.target.value)} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Location" fullWidth variant="outlined" onChange={(event)=>setLocation(event.target.value)} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="GST No." fullWidth variant="outlined" onChange={(event)=>setGst(event.target.value)}/>
                </Grid>
                
                <Grid item xs={12} style={{ display: "flex", flexDirection: "row", }}>
                  <Grid item xs={12} sm={6}>
                    <label  style={{ display: "flex",paddingBottom:5, }}  ><h3>Restaurant Logo</h3></label>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div style={{ display: "flex", flexDirection: "row"}}>                 
                      <input accept="image/*" className={classes.input} id="icon-button-logo" type="file"  multiple 
                        onChange={(event) =>handleLogo(event)}  //this is second type of method to handleimages
                      />                   
                      <label htmlFor="icon-button-logo">
                        <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>                       
                      </label>
                      <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }} src={logo.file} className={classes.large}/>                    
                    </div>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Shop Act" fullWidth variant="outlined" onChange={(event)=>setShopAct(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <input accept="image/*" className={classes.input} id="icon-button-shopAct" type="file"  multiple
                      onChange={(event)=>setShopActImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
                    />
                    <label htmlFor="icon-button-shopAct">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={shopActImage.file} className={classes.large}/>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Fssai" fullWidth variant="outlined" onChange={(event)=>setfssai(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row"}}>
                    <input accept="image/*" className={classes.input} id="icon-button-fssai" type="file"  multiple
                      onChange={(event)=>setFssaiImage({bytes:event.target.files[0], file:URL.createObjectURL(event.target.files[0])})} 
                    />                    
                    <label htmlFor="icon-button-fssai">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>                      
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={fssaiImage.file} className={classes.large}/>
                  </div>
                </Grid>

                
                <Grid item xs={12} >
                  <TextField label="Owner Name" fullWidth variant="outlined" onChange={(event)=>setOwnerName(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Email Id"  fullWidth variant="outlined" onChange={(event)=>setEmailAddress(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Mobile Number" fullWidth variant="outlined" onChange={(event)=>setMobileNumber(event.target.value)}/>
                </Grid>
               
                <Grid item xs={12} sm={6}>
                  <TextField label="ID Proof" fullWidth variant="outlined" onChange={(event)=>setId(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row"}}>
                    <input accept="image/*" className={classes.input} id="icon-button-id" multiple type="file"
                      onChange={(event) =>setIdProofImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
                    />                    
                    <label htmlFor="icon-button-id">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={idProofImage.file} className={classes.large}/>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
                    <Select native label="Res. Type" fullWidth onChange={(event)=>setStatus(event.target.value)}>
                      <option aria-label="None" value="" />
                      <option value={10}>Activated</option>
                      <option value={30}>Waiting</option>
                      <option value={30}>Deactivated</option>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} style={{ height:30}}></Grid>

                <Grid item xs={12} sm={4}  >
                  <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>Submit</Button>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Button variant="contained" color="primary">Reset</Button>
                </Grid>
                <div>
                <Snackbar anchorOrigin={{   vertical: "bottom",   horizontal: "left", }} 
                  open={open} autoHideDuration={6000} onClose={handleClose} message={renderHTML(errorMessage)} 
                  action={
                        <React.Fragment>
                          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                          <CloseIcon fontSize="small"/>
                          </IconButton>
                        </React.Fragment>
                        } />
                </div>
                <Grid item xs={12} style={{ height:150}}></Grid>
               
            </Grid>
          </div>
        </div>
  )}