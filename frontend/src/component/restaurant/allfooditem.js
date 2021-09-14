import React, { useState,useEffect } from "react"
import MaterialTable from "material-table"
import { makeStyles } from "@material-ui/core/styles";
import { getData, postData , ServerURL, postDataImage} from "../../fetchnodedata";

import {Button, Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography, Slide  } from '@material-ui/core';
import {Grid, TextField, FormControl, Select, InputLabel, Avatar, MenuItem, Snackbar} from '@material-ui/core'
import {PhotoCamera} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20, padding: 10,},
  subdiv: {  width: '75%',  marginLeft:'6%',  background: "#ffeaa7",  padding: 10,},
  root1:{ display:'flex', justifyContent:'center', marginTop:20,padding:10 },
  subdiv2:{ width:500,},
  root2: {'& > *': {  margin: theme.spacing(1),},},
  input: {  display: 'none'},
  formControl: {  minWidth: 242,},
  
  large: {  width: theme.spacing(7),  height: theme.spacing(7),},
  formControlselect: {  minWidth: 240,},
  //for responsive------------------
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


export default  function AllfoodItem(props) {

    var Restaurant = props.restaurant
    var restaurantId = Restaurant.restaurant_id; //this is for data from login
    const classes = useStyles();
    const [list,setList]=useState([]);
     //for edit form
     const [foodType1, setfoodType1]=useState([]); //this is for fetchfoodtype
     const [foodType2, setfoodType2]=useState(""); //this is setting value
     const [foodTypeId, setfoodTypeId]=useState("");
     const [foodItemId, setfoodItemId]=useState("");
     const [foodItem, setfoodItem]=useState("");
     const [foodItemImage,setfoodItemImage]=useState({bytes:'', file:'/noimage.png'})
     const [price, setprice]=useState("");
     const [offer, setoffer]=useState("");
     const [offertype, setoffertype]=useState("");
     const [ingredients, setingredients]=useState("");
     const [btnimage1,setbtnimage1]=useState(false)
     //till here

    const fetchfoodItem=async()=>{
        var body = {restaurantId:restaurantId}
        var result = await postData("food/listfooditem", body);
        //console.log("fooditem",list)
        setList(result);
    }
    useEffect(function(){
        fetchfoodItem();
        fetchfoodtype();       
    },[]);

    //for diolog
    const [dopen, setdOpen] = React.useState(false);
    const [rowData, setrowData] = React.useState(false);
    const handleClickOpen = () => {
      setdOpen(true);
    }; 
    const handledClose = () => {
      setdOpen(false);
      fetchfoodItem();    

    };


    const handleDOpen = (data) => { 
      
      setfoodType2(data.foodtype)
     // console.log("new foooooood" + foodType2)
      setfoodItemImage({  bytes: "",  file: `${ServerURL}/images/${data.fooditem_image}`,});
      //setfoodtypeadvImage({  bytes: "",  file: `${ServerURL}/images/${data.adv_image}`,});
      setfoodTypeId(data.foodtype_id)
      setfoodItem(data.fooditem)
      setfoodItemId(data.fooditem_id)
      setprice(data.price)
      setoffer(data.offer)
      setoffertype(data.offertype)
      setingredients(data.ingredients)
      
      setrowData(data);
      setdOpen(true);
      
  };
 
      
   const handlefoodItemImage=(event)=>{
       setfoodItemImage({bytes:event.target.files[0], file:URL.createObjectURL(event.target.files[0])})
       setbtnimage1(true)
   }

   const editfoodItemImage=async()=>{
    var formData=new FormData()
    formData.append("fooditemId",foodItemId,)
    formData.append("fooditem_image", foodItemImage.bytes);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var res = await postDataImage( "food/editfooditemimage", formData, config)
    if (res.result) 
      {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
    else 
      {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
   setbtnimage1(false)
   }
   
    
    const fetchfoodtype=async(event)=>{
          var body={restaurantId:restaurantId}
         
          var list=await postData('food/listfoodtype',body)
          //console.log("foodtype",list)
          setfoodType1(list);
        }

    const fillfoodType=()=>{
      return(   
           foodType1.map((item,index)=>{  
             return(<MenuItem value={item.foodtype_id}>{item.foodtype_name}</MenuItem>)
           }))}
    
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
        var body ={       
          foodTypeId:foodTypeId,
          foodItem:foodItem,
          price:price,
          offer:offer,
          offertype:offertype,
          ingredients:ingredients,
          fooditemId:foodItemId
        }
            
          var res=await postData("food/editfooditem", body)
          if(res.result)
          { swal({title: " Food Type Edit Successfully", icon: "success", dangerMode: true,}) }
          else
          { swal({ title: "Add New Restaurant?", text: "Fail to Add New Restaurant", icon: "warning", dangerMode: true,}) }
      }//this is the end of (!err)
      }//this is the end of handle submit


    const showEditDialog=()=>{
      //console.log("in showdiologe Foooooooooooooooooooood " + foodType2)
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

             <div className={classes.root1}>
          <div className={classes.subdiv2} >
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <label  style={{ display: "flex",paddingBottom:5, }}  ><h2>Food Items</h2></label>
                </Grid>              

                <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={classes.formControlselect}>
                    <InputLabel htmlFor="outlined-age-native-simple">Food Type</InputLabel>
                      <Select  
                       onChange={(event)=>setfoodTypeId(event.target.value)}
                       label="Food Type" fullWidth   value={foodTypeId}
                      >                        
                        {fillfoodType()}
                      </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                             
                <Grid item xs={12} sm={6}>
                  <TextField label="Food Item" fullWidth variant="outlined"   value={foodItem}
                  onChange={(event)=>setfoodItem(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <input accept="image/*" className={classes.input} id="icon-button-foodItem" type="file"  multiple
                      onChange={(event)=>handlefoodItemImage(event)}
                    />
                    <label htmlFor="icon-button-foodItem">
                      <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                    </label>
                    <Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={foodItemImage.file} className={classes.large}/>
                    {btnimage1?<Button color="primary" onClick={()=>editfoodItemImage()} >save</Button>:<></>}  
                  </div>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField label="Price" fullWidth variant="outlined" value={price}
                  onChange={(event)=>setprice(event.target.value)}
                  />
                </Grid>
             
                <Grid item xs={12} sm={4}>
                  <TextField label="offer" fullWidth variant="outlined"  value={offer}
                  onChange={(event)=>setoffer(event.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <TextField label="offer Type" fullWidth variant="outlined"  value={offertype}
                  onChange={(event)=>setoffertype(event.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12} sm={12}>
                  <TextField label="Ingredients.." fullWidth variant="outlined" value={ingredients}
                  onChange={(event)=>setingredients(event.target.value)}
                  />
                </Grid>
                               
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} style={{ height:30}}></Grid>

                <Grid item xs={12} sm={4}  >
                  <Button variant="contained" color="primary" 
                  onClick={()=>handleSubmit()} 
                  >Submit</Button>
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

    return (
       <div className={classes.root} >

    <div className={classes.grow}>
    <div className={classes.sectionDesktop}>
    <div className={classes.subdiv}>        
        <MaterialTable
        title="All Food Item"
        columns={[
          { title: 'Food Type', field: 'foodtype' },
          { title: 'Food Item', field: 'fooditem' },
          { title: 'Price', field: 'price' },
          { title: 'offer price', field: 'offer' },  
          {  title: "Food Item", field: "Name",
          render: (rowData) => (
            <div style={{ borderRadius: 10 }}>
              <img src={`${ServerURL}/images/${rowData.fooditem_image}`}  width="50" height="50" />                 
            </div>
          ),}
        ]}
        data={list}        
        actions={[
          {   icon: 'edit',  tooltip: 'Save User',
            onClick: (event, rowData) =>  handleDOpen(rowData),
          }
        ]}
       /></div> </div> 
         <div className={classes.sectionMobile}>
    <div className={classes.subdivm} style={{marginLeft:210}}>        
        <MaterialTable
        title="All Food Item"
        columns={[
          { title: 'Food Type', field: 'foodtype' },
          { title: 'Food Item', field: 'fooditem' },
          { title: 'Price', field: 'price' },
          { title: 'offer price', field: 'offer' },  
          {  title: "Food Item", field: "Name",
          render: (rowData) => (
            <div style={{ borderRadius: 10 }}>
              <img src={`${ServerURL}/images/${rowData.fooditem_image}`}  width="50" height="50" />                 
            </div>
          ),}
        ]}
        data={list}        
        actions={[
          {  icon: 'edit',  tooltip: 'Save User',
            onClick: (event, rowData) =>  handleDOpen(rowData),
          }
        ]}
       /></div> </div> 
       
       </div>

       {showEditDialog()}</div>
    )
  }