import React, { useState,useEffect } from "react"
import MaterialTable from "material-table"
import { makeStyles } from "@material-ui/core/styles";
import { getData,postDataImage,postData, ServerURL } from "../../fetchnodedata";
import {Button, Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography, Slide  } from '@material-ui/core';
import {Grid, TextField, FormControl, Select, InputLabel, Avatar, MenuItem, Snackbar} from '@material-ui/core'
import {PhotoCamera} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    root: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20, padding: 10,},
    subdiv: {  width: '75%', marginLeft:'6%',  background: "#ffeaa7",  padding: 10,},
    root1:{ display:'flex', justifyContent:'center', marginTop:20,padding:10 },
    subdiv2:{ width:500,},
    root2: {'& > *': {  margin: theme.spacing(1),},},
    input: {  display: 'none'},
    formControl: {  minWidth: 242,},
    
    large: {  width: theme.spacing(7),  height: theme.spacing(7),},
    formControlselect: {  minWidth: 240,},

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
    subdivm: {    marginLeft:150, background: "#ffeaa7",},
   
}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }); //for dialoge box

export default  function AllfoodType(props) {
    const classes = useStyles();
    const [list,setList]=useState([]);

    var Restaurant = props.restaurant //this is our data from login page


    const fetchfoodType=async()=>{
        var body ={restaurantId:Restaurant.restaurant_id}

        var result = await postData("food/listfoodtype", body);
        //console.log("foodtype",list)
        setList(result);
    }
    useEffect(function(){
        fetchfoodType();       
       
    },[]);

    //for dialogue
    const [dopen, setdOpen] = React.useState(false);
    const [getrowData, setrowData] = React.useState(false);
    const handleClickOpen = () => {
      setdOpen(true);
    }; 
    const handledClose = () => {
      setdOpen(false);
      fetchfoodType();       

    };
    const handleDOpen = (data) => { 
        //setRestaurantName(data.restaurantname)
        setfoodType(data.foodtype_name)
        setfoodtypeImage({  bytes: "",  file: `${ServerURL}/images/${data.foodtype_image}`,});
        setfoodtypeadvImage({  bytes: "",  file: `${ServerURL}/images/${data.adv_image}`,});
        setfoodTypeId(data.foodtype_id)
        setadvStatus(data.adv_status)
        setrowData(data);
        setdOpen(true);
    };
    
    
    const [foodTypeId,setfoodTypeId]=useState("")
    const [foodType,setfoodType]=useState("")
    const [foodtypeImage,setfoodtypeImage]=useState({bytes:'', file:'/noimage.png'})
    const [foodtypeadvImage,setfoodtypeadvImage]=useState({bytes:'', file:'/noimage.png'})
    const [advStatus,setadvStatus]=useState("")
    const [btnimage1,setbtnimage1]=useState(false)
    const [btnimage2,setbtnimage2]=useState(false)

    const handleimage1=(event)=>{
      setfoodtypeImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
      setbtnimage1(true)
    }
    const handleimage2=(event)=>{
      setfoodtypeadvImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
      setbtnimage2(true)
    }

    const editfoodtypeImage=async()=>{
      var formData=new FormData()
      formData.append("foodtypeId",foodTypeId,)
      formData.append("foodtype_image", foodtypeImage.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "food/editfoodtypeimage", formData, config)
      if (res.result) 
        {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
     setbtnimage1(false)
    }

    const editfoodtypeadvImage=async()=>{
      var formData=new FormData()
      formData.append("foodtypeId",foodTypeId,)
      formData.append("adv_image", foodtypeadvImage.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "food/editfoodtypeadvimage", formData, config)
      if (res.result) 
        {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
     setbtnimage2(false)
    }

             
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
          
          var body = {
            foodType:foodType,
            adv_status:advStatus,
            foodTypeId:foodTypeId,

          }
            
              
            var res=await postData("food/editfoodtype", body)
            if(res.result)
            { swal({title: " Food Type Edit Successfully", icon: "success", dangerMode: true,}) }
            else
            { swal({ title: "Add New Restaurant?", text: "Fail to Add New Restaurant", icon: "warning", dangerMode: true,}) }
        }//this is the end of (!err)
        }//this is the end of handle submit

    const showEditDialog=()=>{
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
          <div className={classes.subdiv2} >
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    
                </Grid>
                <Grid item xs={12} >
                    <label  style={{ display: "flex",paddingBottom:5, }}  ><h2>Type of Food</h2></label>
                </Grid>

                
                
               
                <Grid item xs={12} sm={6}>
                  <TextField label="Food Type" fullWidth variant="outlined" value={foodType}
                    onChange={(event)=>setfoodType(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <input accept="image/*" className={classes.input} id="icon-button-foodtype" type="file"  multiple
                      onChange={(event)=>handleimage1(event)}
                    />
                    <label htmlFor="icon-button-foodtype">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={foodtypeImage.file} className={classes.large}/>
                    {btnimage1?<Button color="primary" onClick={()=>editfoodtypeImage()} >save</Button>:<></>}  
                  </div>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">Food Type Adv.</InputLabel>
                    <Select native label="Food Type Adv." fullWidth value={advStatus}
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
                      onChange={(event)=>handleimage2(event) }
                    />
                    <label htmlFor="icon-button-foodtypeadv">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={foodtypeadvImage.file} className={classes.large}/>
                    {btnimage2?<Button color="primary" onClick={()=>editfoodtypeadvImage()} >save</Button>:<></>}  
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} style={{ height:30}}></Grid>

                <Grid item xs={12} sm={4}  >
                  <Button variant="contained" color="primary" onClick={()=>handleSubmit()} >Submit</Button>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Button variant="contained" color="primary">Reset</Button>
                </Grid>

                <Grid item xs={12} style={{ height:150}}></Grid>
               
            </Grid>
          </div>
        </div>
              
             </Dialog>
           </div>
        );
   }


   //this is return of table
    return (
       <div className={classes.root} >
    <div className={classes.grow}>

    <div className={classes.sectionDesktop}>
    <div className={classes.subdiv}>        
        <MaterialTable
        title="All Food Type"
        columns={[
         
          { title: 'Food Type', field: 'foodtype_name' },
          { title: 'Adv. Status', field: 'adv_status',  },
          {  title: "Food Type Image", field: "Name",
          render: (rowData) => (
            <div style={{ borderRadius: 10 }}>
              <img src={`${ServerURL}/images/${rowData.foodtype_image}`}  width="50" height="50" />                 
            </div>
          ),},
          {  title: "Adv. Image", field: "Name",
          render: (rowData) => (
            <div style={{ borderRadius: 10 }}>
              <img src={`${ServerURL}/images/${rowData.adv_image}`}  width="50" height="50" />                 
            </div>
          ),}
         
        ]}
        data={list}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'edit food type',
            onClick: (event, rowData) => handleDOpen(rowData),
          }
        ]}
          />
        </div>
      </div>

    <div className={classes.sectionMobile}>
     <div className={classes.subdivm}>        
         <MaterialTable
         title="All Food Type"
         columns={[
          
           { title: 'Food Type', field: 'foodtype_name' },
           { title: 'Adv. Status', field: 'adv_status',  },
           {  title: "Food Type Image", field: "Name",
           render: (rowData) => (
             <div style={{ borderRadius: 10 }}>
               <img src={`${ServerURL}/images/${rowData.foodtype_image}`}  width="50" height="50" />                 
             </div>
           ),},
           {  title: "Adv. Image", field: "Name",
           render: (rowData) => (
             <div style={{ borderRadius: 10 }}>
               <img src={`${ServerURL}/images/${rowData.adv_image}`}  width="50" height="50" />                 
             </div>
           ),}
          
         ]}
         data={list}        
         actions={[
           {
             icon: 'edit',
             tooltip: 'edit food type',
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