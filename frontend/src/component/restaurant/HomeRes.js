import React,{useState,useEffect} from "react"
import { makeStyles,Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {ServerURL,getData,postData} from "../../fetchnodedata"
import {useDispatch, useSelector} from "react-redux"
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css';
import'mdbreact/dist/css/mdb.css';

const useStyles = makeStyles((theme) => ({
    root: {  width: '100%',  maxWidth: '36ch',  backgroundColor: theme.palette.background.paper,},
    inline: {  display: 'inline',}, 
    paperstyle: {  justifyContent: "flex-start",  display: "flex",  padding: 1,
        //paddingLeft:'5%',// width:'98%',
        paddingTop:30,   margin: 1,  borderRadius: 0,  flexDirection: "column",      },
          //for mobile desktop
    grow:{ flexGrow:1, },
    sectionDesktop: {
        display: "none",
      [theme.breakpoints.up("sm")]: {
          display: "flex",
    },
  },
    sectionMobile: {
      display: "flex",
      justifyContent: "center",  alignItems: "center", marginLeft:'1%',
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    slide: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  
  }));

  export default function HomeRes (props){
    const classes = useStyles();
    const [foodType,setFoodType]=useState([])
    //const [foodtypeId, setfoodtypeId]=useState("")
    //const [foodItem, setFoodItem]=useState("")
    const [foodItemList, setFoodItemList]=useState([])
    const [resInfo,setResInfo]=useState([])
    //const [FoodItembyOffer,setFoodItembyOffer] = useState([])

    var dispatch = useDispatch();   //for redux

   useEffect(function(){
       
         },[])

    

 

  return(
  <div style={{width:'99%' , overflowX:'hidden'}}> 
 
    Hello Welcome 

    
      
      
  </div>)

  }