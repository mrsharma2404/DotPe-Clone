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
export default function Foodtype2(props){

    var Restaurant = props.restaurant
    var restaurantId = Restaurant.restaurant_id; //this is for data from login 


    const classes = useStyles();
    
   
    
    const [getfoodType, setfoodType]=useState([]);
    const [foodTypeId, setfoodTypeId]=useState("");
    const [foodItem, setfoodItem]=useState("");
    const [foodItemImage,setfoodItemImage]=useState({bytes:'', file:'/noimage.png'})
    const [price, setprice]=useState("");
    const [offer, setoffer]=useState("");
    const [offertype, setoffertype]=useState("");
    const [ingredients, setingredients]=useState("");
      
   const handlefoodItemImage=(event)=>{
       setfoodItemImage({bytes:event.target.files[0], file:URL.createObjectURL(event.target.files[0])})
   }
   
    
    const fetchfoodtype=async(event)=>{
          var body={restaurantId:restaurantId}
         
          var list=await postData('food/listfoodtype',body)
          //console.log("foodtype",list)
          setfoodType(list);
        }

    const fillfoodType=()=>{
      return(   
           getfoodType.map((item,index)=>{  
             return(<MenuItem value={item.foodtype_id}>{item.foodtype_name}</MenuItem>)
           }))}


        useEffect(function(){
          fetchfoodtype();
          
         
      },[]);

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
            formData.append('foodTypeId',foodTypeId)    
            formData.append('foodItem',foodItem)           
            formData.append('foodItemImage',foodItemImage.bytes)  //here while we send images to node we have to remember the sequence for indexing           
            formData.append('price',price)
            formData.append('offer',offer)
            formData.append('offertype',offertype)
            formData.append('ingredients',ingredients)
            
             
            var config={headers:{"content-type":"multipart/form-data"}}
            var res=await postDataImage("food/addfooditem",formData,config)
            if(res.result)
            { swal({title: "New Food Item Added Successfully", icon: "success", dangerMode: true,}) }
            else
            { swal({ title: "Add New Restaurant?", text: "Fail to Add New Restaurant", icon: "warning", dangerMode: true,}) }
      }//this is the end of (!err)
      }//this is the end of handle submit
      
  

    return(
        <div className={classes.root1}>
          <div className={classes.subdiv} >
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <label  style={{ display: "flex",paddingBottom:5, }}  ><h2>Food Items</h2></label>
                </Grid>

               

                <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={classes.formControlselect}>
                    <InputLabel htmlFor="outlined-age-native-simple">Food Type</InputLabel>
                      <Select
                       onChange={(event)=>setfoodTypeId(event.target.value)}
                       label="Food Type" fullWidth >
                        {fillfoodType()}
                      </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                
                </Grid>
               
                
                
                <Grid item xs={12} sm={6}>
                  <TextField label="Food Item" fullWidth variant="outlined"  
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
                  </div>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField label="Price" fullWidth variant="outlined" 
                  onChange={(event)=>setprice(event.target.value)}
                  />
                </Grid>

                
                <Grid item xs={12} sm={4}>
                  <TextField label="offer" fullWidth variant="outlined" 
                  onChange={(event)=>setoffer(event.target.value)}
                  />
                </Grid>

                
                <Grid item xs={12} sm={4}>
                  <TextField label="offer Type" fullWidth variant="outlined" 
                  onChange={(event)=>setoffertype(event.target.value)}
                  />
                </Grid>

                
                <Grid item xs={12} sm={12}>
                  <TextField label="Ingredients.." fullWidth variant="outlined" 
                  onChange={(event)=>setingredients(event.target.value)}
                  />
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