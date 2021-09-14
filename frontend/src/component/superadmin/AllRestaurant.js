import React,{useState, useEffect} from "react"
import MaterialTable from "material-table"
import { makeStyles } from "@material-ui/core/styles";
import {getData, ServerURL, postData, postDataImage} from "../../fetchnodedata";
//for diologe box
import {Button, Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography, Slide  } from '@material-ui/core';
import {Grid, TextField, FormControl, Select, InputLabel, Avatar, MenuItem, Snackbar} from '@material-ui/core'
import {PhotoCamera} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import renderHTML from 'react-render-html'
import swal from 'sweetalert';
import { isEmpty, isMobile, isAlphabet, isEmail, isNumeric } from "../../Checks";
var otpGenerator = require('otp-generator')


const useStyles = makeStyles((theme) => ({
    root: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20, padding: 10,},
    subdiv: { width: 1000, background: "#ffeaa7", padding: 10, },
    //for dialoge box
    appBar: {  position: 'relative',},
    title: {  marginLeft: theme.spacing(2),  flex: 1,},
    //for edit form
    root1:{ display:'flex', justifyContent:'center', marginTop:20,padding:10 },
    subdivd:{ width:500,},
    rootd: {'& > *': {  margin: theme.spacing(1),},},
    input: {  display: 'none'},
    formControl: {  minWidth: 242,},
    large: {  width: theme.spacing(7),  height: theme.spacing(7),},
    formControlstatecity: {  minWidth: 160,},
    grow:{
      flexGrow:1,
      },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
     
      justifyContent: "center",  alignItems: "center", 
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    subdivm: {    marginLeft:450, background: "#ffeaa7",},
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); //for dialoge box

export default function Allrestaurant() {
    const classes = useStyles();

    const[list, setList]=useState([]);
    const fetchrestaurant=async()=>{
        var result = await getData("restaurant/listrestaurant")
        console.log(result);
        setList(result);
    };

    useEffect(function(){
        fetchrestaurant();
        fetchStates();
       
    },[]);
    
    //only these 3-4 functions are used for showing data
    //now i am making function for dialog box(edit delete record)
    const [dopen, setdOpen] = React.useState(false);
    const handleClickOpen = () => {
      setdOpen(true);
    }; 
    const handledClose = () => {
      setdOpen(false);
    };

    //now below functions are for edit form
    const [getRowData, setRowData] = useState([]);

    const [logo,setLogo]=useState({bytes:'', file:'/noimage.jpg'})
    const [shopActImage,setShopActImage]=useState({bytes:'', file:'/noimage.png'})
    const [fssaiImage,setFssaiImage]=useState({bytes:'', file:'/noimage.jpg'})
    const [idProofImage,setIdProofImage]=useState({bytes:'', file:'/noimage.jpg'})
    
    const [getState, setState]=useState([]);
    const [getCity, setCity]=useState([]);
    
    const [restaurantName,setRestaurantName]=useState("")
    const [restaurantId, setRestaurantId]=useState("") //this id we send to node
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
    //for edit image
    const [btnIdProof, setbtnIdProof]=useState(false)
    const [btnlogo, setbtnlogo]=useState(false)
    const [btnshopact, setbtnshopact]=useState(false)
    const [btnfssai, setbtnfssai]=useState(false)

    const editidproofimage=async()=>{
      var formData=new FormData()
      formData.append("restaurant_id",getRowData.restaurant_id,)
      formData.append("idproof", idProofImage.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "restaurant/editidproofimage", formData, config)
      if (res.result) 
        {swal({ title: "ID Proof Image Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
     setbtnIdProof(false)
    }

    const editlogo=async()=>{
      var formData=new FormData()
      formData.append("restaurant_id",getRowData.restaurant_id,)
      formData.append("logo", logo.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "restaurant/editlogo", formData, config)
      if (res.result) 
        {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
     setbtnlogo(false)
    }

    const editshopactimage=async()=>{
      var formData=new FormData()
      formData.append("restaurant_id",getRowData.restaurant_id,)
      formData.append("shopact", shopActImage.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "restaurant/editshopactimage", formData, config)
      if (res.result) 
        {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
     setbtnshopact(false)
    }

    const editfssaiimage=async()=>{
      var formData=new FormData()
      formData.append("restaurant_id",getRowData.restaurant_id,)
      formData.append("fssai", fssaiImage.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "restaurant/editfssaiimage", formData, config)
      if (res.result) 
        {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
     setbtnfssai(false)
    }
    

    const handleDOpen = (data) => {
      fetchCities(data.state);
      setRestaurantName(data.restaurant_name)
      setOwnerName(data.owner_name)
      setAddress(data.address)
      setZipcode(data.zipcode)
      setLocation(data.location)
      setMobileNumber(data.mobilenumber)
      setEmailAddress(data.emailaddress)
      setType(data.type)
      setStatus(data.status)
      setGst(data.gst)
      setId(data.idproof) 
      setfssai(data.fssai)
      setShopAct(data.shopact)
  
      setShopActImage({  bytes: "",  file: `${ServerURL}/images/${data.shopactimage}`,});
      setFssaiImage({  bytes: "",  file: `${ServerURL}/images/${data.fssaiimage}`,});
      setIdProofImage({  bytes: "",  file: `${ServerURL}/images/${data.idproofimage}`,});
      setLogo({ bytes: "", file: `${ServerURL}/images/${data.logo}` });

      setRowData(data);
      setdOpen(true);
    };
   
  
 

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
    

  const handleStateChange = async(event)=>{
    setStateId(event.target.value);
    fetchCities(event.target.value);
  };

  const fetchCities =async(stateid)=>{
    var body = { stateid: stateid };
    var list = await postData("statecity/fetchcities", body);
    setCity(list);
  };
         
  const fillCities=()=>{
    return(   
         getCity.map((item,index)=>{  
           return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
         }))}

  const handleLogo=(event)=>{
    setLogo({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]),});
    setbtnlogo(true) //this is for image edit
  }; //this is the second method for handle image

  const handleshopactimage=(event)=>{
    setShopActImage({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]),});
    setbtnshopact(true) //this is for image edit
  }; //this is the second method for handle image

  const handlefssaiimage=(event)=>{
    setFssaiImage({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]),});
    setbtnfssai(true) //this is for image edit
  }; //this is the second method for handle image

  const handleidproofimage=(event)=>{
    setIdProofImage({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]),});
    setbtnIdProof(true) //this is for image edit
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
      var body = {
        restaurant_id: getRowData.restaurant_id,
        restaurant_name: restaurantName,
        owner_name: ownerName,
        address: address,
        state: stateId,
        city: cityId,
        zipcode: zipcode,
        location: location,
        emailaddress: emailAddress,
        mobilenumber: mobileNumber,
        type: type,
        id: id,
        shopact: shopAct,
        fssai: fssai,
        gst: gst,
        status: status,
      }
      
        var res=await postData("restaurant/editrestaurant", body)
        if(res.result)
        { swal({title: "Restaurant Edit Successfully", icon: "success", dangerMode: true,}) }
        else
        { swal({ title: "Add New Restaurant?", text: "Fail to Add New Restaurant", icon: "warning", dangerMode: true,}) }
  }//this is the end of (!err)
  }//this is the end of handle submit

  const deleteres=async()=>{
    var body = { restaurant_id: getRowData.restaurant_id,}
    var res=await postData("restaurant/delete", body)
    if (res.result) 
      {swal({ title: "Record Deleted Successfully", icon: "success", dangerMode: true,});
      setdOpen(false)
      handleRefresh();}
    else 
      {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
  
  }
  const handleRefresh=()=>{
    fetchrestaurant()}

    const showEditDialog = () =>{
         return(
           <div>       
              <Dialog fullScreen open={dopen} onClose={handledClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handledClose} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Sound
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handledClose}>
                      save
                    </Button>
                  </Toolbar>
                </AppBar>
                
                {/* this is a comment */}
                {/* now we are editing this below we are adding our submit form */}
                <div className={classes.root1}>
          <div className={classes.subdivd} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Restaurant Name" fullWidth variant="outlined"  value={restaurantName}
                    onChange={(event)=>setRestaurantName(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">Res. Type</InputLabel>
                    <Select native  label="Res. Type" fullWidth value={type}
                     onChange={(event)=>setType(event.target.value)}>
                      <option aria-label="None" value="" />
                      <option value={10}>Cafe</option>
                      <option value={20}>Family Restaurant</option>
                      <option value={30}>Dhaba</option>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Address" fullWidth variant="outlined" value={address}
                  onChange={(event)=>setAddress(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" className={classes.formControlstatecity}>
                  <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel>
                    <Select value={getRowData.state}
                    onChange={(event)=>handleStateChange(event)} label="State" fullWidth >
                      {fillStates()}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" className={classes.formControlstatecity} >
                  <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
                    <Select value={getRowData.city}
                    label="City" fullWidth onChange={(event)=>setCityId(event.target.value)}>
                      {fillCities()}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField label="Zip Code" fullWidth variant="outlined" value={zipcode}
                    onChange={(event)=>setZipcode(event.target.value)} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Location" fullWidth variant="outlined" value={location}
                  onChange={(event)=>setLocation(event.target.value)} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="GST No." fullWidth variant="outlined" value={gst}
                   onChange={(event)=>setGst(event.target.value)}/>
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
                      {btnlogo?<Button color="primary" onClick={()=>editlogo()} >save</Button>:<></>}         
                    </div>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Shop Act" fullWidth variant="outlined" value={shopAct}
                   onChange={(event)=>setShopAct(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <input accept="image/*" className={classes.input} id="icon-button-shopAct" type="file"  multiple
                      //onChange={(event)=>setShopActImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}  //this is first method to handle images
                      //we have to change this bcz we have to activate btn so we make a function like handle logo 
                      onChange={(event) =>handleshopactimage(event)}  //this is second type of method to handleimages
                    />
                    <label htmlFor="icon-button-shopAct">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={shopActImage.file} className={classes.large}/>
                    {btnshopact?<Button color="primary" onClick={()=>editshopactimage()} >save</Button>:<></>}  
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Fssai" fullWidth variant="outlined" value={fssai}
                   onChange={(event)=>setfssai(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row"}}>
                    <input accept="image/*" className={classes.input} id="icon-button-fssai" type="file"  multiple
                      //onChange={(event)=>setFssaiImage({bytes:event.target.files[0], file:URL.createObjectURL(event.target.files[0])})} 
                      onChange={(event) =>handlefssaiimage(event)}  //this is second type of method to handleimages
                    />                    
                    <label htmlFor="icon-button-fssai">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>                      
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={fssaiImage.file} className={classes.large}/>
                    {btnfssai?<Button color="primary" onClick={()=>editfssaiimage()} >save</Button>:<></>}  
                  </div>
                </Grid>

                
                <Grid item xs={12} >
                  <TextField label="Owner Name" fullWidth variant="outlined" value={ownerName}
                  onChange={(event)=>setOwnerName(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Email Id"  fullWidth variant="outlined" value={emailAddress}
                   onChange={(event)=>setEmailAddress(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Mobile Number" fullWidth variant="outlined" value={mobileNumber}
                   onChange={(event)=>setMobileNumber(event.target.value)}/>
                </Grid>
               
                <Grid item xs={12} sm={6}>
                  <TextField label="ID Proof" fullWidth variant="outlined"  value={id}
                  onChange={(event)=>setId(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row"}}>
                    <input accept="image/*" className={classes.input} id="icon-button-id" multiple type="file"
                       onChange={(event) =>handleidproofimage(event)}  //this is second type of method to handleimages
                    />                    
                    <label htmlFor="icon-button-id">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={idProofImage.file} className={classes.large}/>
                    {btnIdProof?<Button color="primary" onClick={()=>editidproofimage()} >save</Button>:<></>}  
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
                    <Select native label="Res. Type" fullWidth  value={status} onChange={(event)=>setStatus(event.target.value)}>
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
                  <Button variant="contained" color="secondory" onClick={()=>deleteres()}>Delete</Button>
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
              {/* this is end of submit form  */}
              </Dialog>
            </div>
         );
    }

    return (
       <div className={classes.root} >

<div className={classes.grow}>
<div className={classes.sectionDesktop}>
    <div className={classes.subdiv}>        
        <MaterialTable
        title="Simple Action Preview"
        columns={[
          { title: 'Restaurant Name', field: 'restaurant_name' },

          { title: "Address", field: "Address",
          render: (rowData) => (
            <div style={{ flexDirection: "column" }}>
                  <div>{rowData.address},{rowData.zipcode}</div>
                  <div>{rowData.cityname},{rowData.statename}</div>
            </div>
          ),},
                    
          { title: "GST/Fssai", field: "GST/Fssai",
            render: (rowData) => (
              <div style={{ flexDirection: "column" }}>
                <div>{rowData.gst}</div>
                <div>{rowData.fssai}</div>
              </div>
            ),},
          
            {
              title: "Owner Name / Contact", field: "Name",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    <b>{rowData.owner_name}</b>
                  </div>
                  <div>{rowData.emailaddress},{rowData.mobilenumber}</div>
                </div>
              ),
            },
            {
              title: "Logo", field: "Name",
              render: (rowData) => (
                <div style={{ borderRadius: 10 }}>
                  <img src={`${ServerURL}/images/${rowData.logo}`}  width="50" height="50" />                 
                </div>
              ),
            },
          
        ]}
        data={list}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Details',
            onClick: (event, rowData) => handleDOpen(rowData),
          }
        ]}
      /></div>
      </div>
      <div className={classes.sectionMobile}>
    <div className={classes.subdivm}>        
        <MaterialTable 
        title="Simple Action Preview"
        columns={[
          { title: 'Restaurant Name', field: 'restaurant_name' },

          { title: "Address", field: "Address",
          render: (rowData) => (
            <div style={{ flexDirection: "column" }}>
                  <div>{rowData.address},{rowData.zipcode}</div>
                  <div>{rowData.cityname},{rowData.statename}</div>
            </div>
          ),},
                    
          { title: "GST/Fssai", field: "GST/Fssai",
            render: (rowData) => (
              <div style={{ flexDirection: "column" }}>
                <div>{rowData.gst}</div>
                <div>{rowData.fssai}</div>
              </div>
            ),},
          
            {
              title: "Owner Name / Contact", field: "Name", width:50,
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    <b>{rowData.owner_name}</b>
                  </div>
                  <div>{rowData.emailaddress},{rowData.mobilenumber}</div>
                </div>
              ),
            },
            {
              title: "Logo", field: "Name",
              render: (rowData) => (
                <div style={{ borderRadius: 10 }}>
                  <img src={`${ServerURL}/images/${rowData.logo}`}  width="50" height="50" />                 
                </div>
              ),
            },
          
        ]}
        data={list}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Details',
            onClick: (event, rowData) => handleDOpen(rowData),
          }
        ]}
      /></div>
      </div>

      </div>
      {showEditDialog()}
      </div>
    )
  }