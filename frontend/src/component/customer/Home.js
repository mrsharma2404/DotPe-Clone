import React,{useState,useEffect} from "react"
import { makeStyles,Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"
import Header from "./Header"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {ServerURL,getData,postData} from "../../fetchnodedata"
import QtySpinner from "./QtySpinner";
import {useDispatch, useSelector} from "react-redux"
import SimplePaper from "./Slider";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css';
import'mdbreact/dist/css/mdb.css';
import Slider from "react-slick";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {width: '100%',maxWidth: '36ch',backgroundColor: theme.palette.background.paper,},

    inline: {  display: 'inline',}, 

    paperstyle: { justifyContent: "flex-start", display: "flex", padding: 1, 
          paddingTop:30, margin: 1, borderRadius: 0, flexDirection: "column",},

    paperstyle1: { justifyContent: "flex-start", display: "flex", padding: 1, width:'100%',},

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

  export default function Home (props){
    const classes = useStyles();
    const [foodType,setFoodType]=useState([])
    const [foodItemList, setFoodItemList]=useState([])
    const [resInfo,setResInfo]=useState([])

    const [refresh, setRefresh]=useState(false); //for redux

    var dispatch = useDispatch();   //for redux

    var params=useParams() //for url

    var itemsettings1 = {
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      arrows: true,
    }; //this is for crousel

   useEffect(function(){
        fetchresdetail(params.rid)
        fetchFoodTypes(params.rid)
        //fetchfooditem(2)
        fetchfooditembyoffer(params.rid)
        setfoodtypename('Trending')
         },[])

    const fetchFoodTypes = async (resid) => {
        var body={restaurantId:resid}
        var list = await postData("food/listfoodtype",body);
        setFoodType(list);
      };

      const fetchresdetail = async (resid) => {
        var body={restaurantId:resid}
        var list1 = await postData("restaurant/resdetail",body);
        setResInfo(list1);
        //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + list1.address)
        dispatch(  { type:'ADD_RES',  payload:[list1.restaurant_id, list1 ] } )
      };

      

      //console.log("res info" + resInfo)
//-------for Redux------
      const handleChange= async (value,item)=>{
        if(value==0)
        {
          dispatch({type:'REMOVE_ITEM',payload:item.fooditem_id})
          setRefresh(!refresh) 
        }
        else
        {         
          item['qtydemand']=value
          dispatch(  { type:'ADD_ITEM',  payload: [item.fooditem_id, item ] } )
          setRefresh(!refresh)
        }
      }
      //----till here----

  const showFoodtype=()=>{
      return foodType.map((item, index) => {
      return (     
     
      <List className={classes.root}>
        <ListItem alignItems="flex-start" button>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={`${ServerURL}/images/${item.foodtype_image}`}/>
          </ListItemAvatar>
          <ListItemText
            primary={item.foodtype_name}
            secondary={''}
            onClick={()=>fetchfooditem(item.foodtype_id)}                              
          /></ListItem>
        <Divider variant="inset" component="li" style={{width:'60%'}}/>         
      </List>
     
    );})}
      
    
  const showFoodtypeMobile=()=>{
    return foodType.map((item, index) => {
    return( 
      <Paper elevation={0} className={classes.paperstyle1}>                
          <div  onClick={()=>fetchfooditem(item.foodtype_id, item.foodtype_name)} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:125}}>
           
          <img   src={`${ServerURL}/images/${item.foodtype_image}`}  width='80' height='80'  style={{borderRadius:50}}  />            
          <Typography style={{margin:5, fontSize:22, color:'black', fontFamily:'cursive' }} >   {item.foodtype_name}</Typography> 
       </div>
          </Paper>
           );})}

      //-----------------for food type--------------------------------------

      const [foodtypename ,setfoodtypename] = useState('Trending')
     
      const fetchfooditem=async(foodtypeId, foodtype_name)=>{
        setfoodtypename(foodtype_name)
        var body = {foodTypeId:foodtypeId}
        var list = await postData("food/fooditembytype",body);
        setFoodItemList(list);
        //console.log("fooditem" + list)    
      }

      const fetchfooditembyoffer = async (resid) => {
        var body={restaurantId:resid, offertype:"wed"}
        var list = await postData("food/listfooditembyoffer",body);
        setFoodItemList(list);
      };

      const showfooditems=()=>{
        return foodItemList.map((item, index) => {
          
          return(        
            <div style={{display:'flex',flexDirection:'row', marginLeft:'2%'}}>  
            <div style={{border:'0.5px solid #dfe6e9',borderRadius:5,display:'flex',flexDirection:'column',marginTop:15}}>
            <div style={{marginBottom:5}}>
            <img src={`${ServerURL}/images/${item.fooditem_image}`} width="160" height='160' style={{borderRadius:5}}/>
            </div>
            <div  style={{padding:5,fontSize:16,fontWeight:800,letterSpacing:1}}>
              {item.fooditem} 
            </div> 
            {/*<div  style={{fontSize:12,padding:5,fontWeight:600,letterSpacing:1, whiteSpace:'nowrap', width:'120px' , overflow:'hidden', textOverflow:'ellipsis'}}>
              {item.ingredients}
          </div> */}
            <div style={{fontSize:10,padding:5,fontWeight:600}}>
              {item.offer==0?<div style={{height:43}}>Price &#8377; {item.price}</div>:
              <span><div><span>Price <s> &#8377; {item.price}</s></span><span> &#8377; {item.offer}</span></div>
              <div style={{fontSize:10,fontWeight:600 , color:'green'}}> You Saved  &#8377; {item.price - item.offer} </div>
              <span> {item.offertype}</span></span> }
              </div>

              <div style={{fontSize:10,padding:5,fontWeight:600}}>
             <span>Rating </span>
              </div>
              <div style={{textAlign:'centre'}} >
                <QtySpinner  key={item.fooditem_id} value={0} onChange={(value)=>handleChange(value, item)}/>
              </div>
                      
            </div> 
            </div>        
          )
         
        })
    }

  return(
  <div style={{width:'99%' , overflowX:'hidden'}}> 
 
      <Header history={props.history} resid={params.rid}/> 
    
     
      <SimplePaper history={props.history} resid={params.rid} />
     
     <div style={{marginBottom:25}}>
     </div>
      <div className={classes.grow}>
      <div className={classes.sectionDesktop} > 
      <div style={{  display: "flex",  justifyContent: "center",  alignItems: "center",  marginTop: 10,  width: "100%", }}>    
      <Grid container spacing={1}>
         <Grid style={{marginLeft:'4%'}} item xs="12" sm={3}>
         <Paper elevation={1} className={classes.paperstyle}>
           <Typography style={{margin:5, marginLeft:'10%', fontSize:25, color:'black', fontFamily:'cursive' }} > Select a Food Type</Typography> 
          {showFoodtype()}
          </Paper>     
         </Grid>
         <Grid style={{marginLeft:'3%'}} item xs="12" sm={8} >
         <Paper elevation={1} className={classes.paperstyle} style={{paddingTop:10, paddingLeft:45, paddingBottom:150}}>
           <Typography style={{margin:5, fontSize:25, color:'black', fontFamily:'cursive' }} ></Typography> 
             <div style={{display:'flex', flexDirection:'row' , flexWrap:'wrap' }}>
             {showfooditems()}
             </div>  
             </Paper>          
         </Grid>
      </Grid>
      </div>
      </div>

      <div className={classes.sectionMobile} > 
      <div style={{  display: "flex",  justifyContent: "center",  alignItems: "center",  marginTop: 10,  width: "100%", }}>    
      <Grid container spacing={1}>
         <Grid item xs="12" sm={6}>
           <div style={{width:'100%' ,  padding:10}} >
           <Paper elevation={1} > 
           <Typography style={{margin:5, marginLeft:'10%', fontSize:18, color:'black', fontFamily:'cursive' }} > Select a Food Type</Typography> 
          <Slider {...itemsettings1}>    {showFoodtypeMobile()}</Slider>
          </Paper>
          </div>
         </Grid>
        
         <Typography style={{marginTop:45, marginBottom:1,  marginLeft:'10%', fontSize:22, color:'blue', fontFamily:'cursive' }} > {foodtypename} </Typography> 
        
         <Grid item xs="12" sm={6}>
             <div style={{display:'flex', flexDirection:'row' , flexWrap:'wrap' }}>
             {showfooditems()}
             </div>            
         </Grid>
      </Grid>
      </div>
      </div>

      </div>


  {/** below there is footer i did not did any thing in that is just copy paste from mdb bootstrap */}
      <MDBFooter color="unique-color-dark" className="page-footer font-small pt-0">
       <MDBContainer className="mt-5 mb-4 text-center text-md-left" style={{paddingTop:50}}>
        <MDBRow className="mt-3">
          <MDBCol md="3" lg="4" xl="4" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong>Company name</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
            <p>
              Here you can use rows and columns here to organize your footer
              content. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </p>
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong>Products</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
            <p>
              <a href="#!">MDBootstrap</a>
            </p>
            <p>
              <a href="#!">MDWordPress</a>
            </p>
            <p>
              <a href="#!">BrandFlow</a>
            </p>
            <p>
              <a href="#!">Bootstrap Angular</a>
            </p>
          </MDBCol>
          <MDBCol md="3" lg="2" xl="3" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong>Useful links</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
            <p>
              <a href="#!">Your Account</a>
            </p>
            <p>
              <a href="#!">Become an Affiliate</a>
            </p>
            <p>
              <a href="#!">Shipping Rates</a>
            </p>
            <p>
              <a href="#!">Help</a>
            </p>
          </MDBCol>
          <MDBCol md="5" lg="4" xl="3" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong>Contact</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
            <p>
              <i className="fa fa-home mr-3" /> New York, NY 10012, US
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> info@example.com
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> + 01 234 567 88
            </p>
            <p>
              <i className="fa fa-print mr-3" /> + 01 234 567 89
            </p>
          </MDBCol>
        </MDBRow>
        <hr />
      <div className="text-center">
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-fb mx-1">
              <i className="fab fa-facebook-f"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-tw mx-1">
              <i className="fab fa-twitter"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-gplus mx-1">
              <i className="fab fa-google-plus"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-li mx-1">
              <i className="fab fa-linkedin-in"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-dribbble mx-1">
              <i className="fab fa-dribbble"> </i>
            </a>
          </li>
        </ul>
      </div>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
      
      
  </div>)

  }