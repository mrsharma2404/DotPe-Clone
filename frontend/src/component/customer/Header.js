import React,{useState,useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, Grid, Button} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import {Menu, Divider} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Paper from "@material-ui/core/Paper";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {ServerURL } from "../../fetchnodedata"
import {useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import FaceIcon from '@material-ui/icons/Face';

//import state from 'sweetalert/typings/modules/state';

const useStyles = makeStyles((theme) => ({
  
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    marginBottom:20,
    marginTop:20,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      width: '50%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '50%',
    marginTop:10,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  grow1: {
    flexGrow: 1,
  },
  sectionDesktop1: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile1: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  //for drawer
  list: {
    width: 305,
    overFlowX:'hidden'
  },
  
  fullList: {
    width: 300,
    overFlowX:'hidden'
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //redux
  var res = useSelector(state=>state.res)
  var resInfo = Object.values(res)[0];
  //console.log("abcduchalvhk.jnvk.ans." + resInfo.restaurant_name)

  var cart = useSelector(state=>state.cart)
  var keys = Object.keys(cart);
  var values = Object.values(cart);
  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];

  

  var totalamt0 = values.reduce(calculate, 0);
  var totalamt1 = values.reduce(caloffer, 0);
  var saving = (totalamt0 - totalamt1)
  var netamt = (totalamt0 - saving)
  function calculate(prev, item){
    return(prev+(item.qtydemand*item.price))
  }
  function caloffer(prev, item){
    return(prev+(item.qtydemand*item.offer))
  }
  

  useEffect(function(){
    fetchcolor()
     },[])

  //till here

  //this below function is to change header color
  var resid = props.resid
     const [appbarcolor, setappbarcolor] = useState('')
     const fetchcolor=()=>{
       if(resid==8)
       {
         setappbarcolor('#7BDCB5')
       }
       else if(resid==9)
       {
         setappbarcolor('#FAD0C3')
       }
       else if(resid==10)
       {
         setappbarcolor('#D9E3F0')
       }
       else
       {
        setappbarcolor('#FAD0C3')
       }
     }
  
  //fororder--------------------
  
var history = useHistory();
  const showorder=()=>{
    //alert('hii')
    history.push({pathname:'/orders'}) 
  }

  const gotohome=()=>{
    var resid = resInfo.restaurant_id
   history.push({pathname: ('/home/'+resid) }) 
  }

  const gotoprofile=()=>{
    if(user)
    {
      history.push({pathname:'/userprofile'}) 
    }
    else
    {
      history.push({pathname:'/signin'}) 
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //----for the proceed button
  const handleprocced=()=>{
    //alert("hello");
    if(user)
    {
      history.push({pathname:'/showcart'}) 
    }
    else
    {
      history.push({pathname:'/signin'}) 
    }
  }
  

  //----for items in drawer
const showFoodCart=() => {
  return values.map((items) => {
    return (
     
         <div style={{  marginLeft:"3%" , display:"flex" , flexDirection:"row", paddingTop:35 ,overflowX:'hidden' }}>
              <div style={{   marginRight:"1%", display:"flex" , flexDirection:"row" }}>
                <img  src={`${ServerURL}/images/${items.fooditem_image}`}  style={{ borderRadius: 5}}  width="60" height='60'/>
              </div>
              
              <div item  style={{ justifyContent: "space-around", marginLeft:5 , marginRight:5, width:110, overflow:'hidden'}} >
                <div style={{ fontWeight: 600   }}>{items.fooditem} </div>
                <div style={{ width:110}}>
                  {items.offer > 0 ? 
                  (<span><s>&#8377; {items.price}</s> &#8377;{" "}  {items.offer}</span>):(<></>)}
                  x {items.qtydemand}
                </div>
                <div style={{textAlign:'centre'}} >
                </div> 
              </div>
              <div item  style={{display: "flex", flexDirection: "column" }}>
                <div style={{width:80, textAlign:'right'}}>
                  <DeleteOutline />
                </div>
                {items.offer==0 ? (<div style={{width:80, textAlign:'right'}} >&#8377; {items.price*items.qtydemand}</div>) : (<div style={{width:80, textAlign:'right'}}>&#8377; {items.offer*items.qtydemand}</div>)}
              </div>
              <div item xs={12}>  <Divider />  </div> 
            </div> 
            ); });  };

  //------For Drawer  -----------
    
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        //onClick={toggleDrawer(anchor, false)}
        //onKeyDown={toggleDrawer(anchor, false)}
        style={{overflowX:'hidden'}}
      >
         <Button style={{width:215, margin:20}} variant='contained' onClick={()=>handleprocced()}  color='primary'  >Proceed</Button>
       <Paper style={{display: "flex",justifyContent: "center", alignItems: "center", padding: 15, fontSize: 16,
        fontWeight: 600, letterSpacing: 1,   marginBottom: 5, width:285}} >  Food Selected({keys.length}) </Paper>

        <Grid container spacing={1} style={{ marginBottom: 25 , marginTop:10, paddingRight:3}}>
          {showFoodCart()}
         </Grid>

      <Paper style={{ background: "#f5f6fa", display: "flex", justifyContent: "center", alignItems: "center",   
      padding: 15, fontSize: 16, fontWeight: 600, letterSpacing: 1, marginBottom: 5, width:285 }}>  Payment Details</Paper>
      <div style={{padding:10 , paddingRight:3, width:285}}>
      <Grid container spacing={1}>

      <Grid item xs={6} style={{padding:3}}> Total Amount :  </Grid>
      <Grid item xs={6} style={{textAlign:'right'}}> {totalamt0}  </Grid>

      <Grid item xs={6} style={{padding:3}}> Total Savings :   </Grid>
      <Grid item xs={6} style={{textAlign:'right'}}> {saving} </Grid>

      <Grid item xs={6} style={{padding:3}}> Delievery Charges :   </Grid>
      <Grid item xs={6} style={{textAlign:'right'}}> 0 </Grid>

      <Grid item xs={12}>  <Divider />  </Grid> 

      <Grid item xs={6} style={{padding:3}}>  Net Amount :  </Grid>
      <Grid item xs={6} style={{textAlign:'right'}}> {netamt} </Grid>
      </Grid>
      </div>
      <div style={{padding:3,marginTop:10, paddingRight:3}}>

        <Button style={{width:285}} variant='contained' onClick={()=>handleprocced()}  color='primary'  >Proceed</Button>
          <Button style={{width:285,marginTop:20}} variant='outlined' color='secondary'  onClick={toggleDrawer("right", false)} 
        color='primary'
         >Cancel</Button>
      </div>
      </div>
    );

    //Till here drawer for

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=>showorder()} >
        <IconButton aria-label="" color="inherit"   >
          <Badge 
          
           color="secondary">
            <FastfoodIcon />
          </Badge>
        </IconButton>
        <p>Show Order</p>
      </MenuItem>
     
      <MenuItem onClick={()=>gotoprofile()}>
      <IconButton aria-label="" color="inherit"
            >
              <Badge  color="secondary">
                < FaceIcon />
              </Badge>
            </IconButton>
        <p>User Profile</p>
        
      </MenuItem>
    
    </Menu>
  );
   
  return (
      <AppBar color='black'  position="fixed" style={{background:appbarcolor, height:60}}  >
        <Toolbar>
        <div className={classes.grow1} >
        <div className={classes.sectionDesktop1}>

                   
        <Button color="primary"  style={{margin:5, fontSize:25, color:'black', fontFamily:'cursive' , textAlign:'left' }} noWrap onClick={()=>gotohome()}>
            {JSON.stringify(res)!='{}' ?(<div style={{margin:4}} >{resInfo.restaurant_name}</div>):(<>Restaurant Name</>) }
            
          </Button>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </div>
          <div className={classes.sectionMobile1}>
          <Button color="primary"  style={{marginTop:5, fontSize:25, color:'black', fontFamily:'cursive' }} noWrap onClick={()=>gotohome()}>
            {JSON.stringify(res)!='{}' ?(< >RR</>):(<>RN</>) }
            
          </Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </div>

          </div>
      
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
      
        
            <IconButton aria-label="" color="inherit"  onClick={()=>showorder()}>
            <p style={{margineTop:25, fontSize:16}}>Order</p>
              <Badge 
              //badgeContent={} 
              color="secondary">

                <FastfoodIcon />
              </Badge>
              
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit"
            onClick={toggleDrawer("right", true)}>
                <p style={{margineTop:25, fontSize:16}}>Cart</p>
              <Badge badgeContent={keys.length} color="secondary">
                < ShoppingCart />
              </Badge>
            
            </IconButton>
           

            <IconButton aria-label="abcd " color="inherit"
            onClick={()=>gotoprofile()}>
               <p style={{margineTop:25, fontSize:16}}>User</p>
              <Badge  color="secondary">
                < FaceIcon />
              </Badge>
             
            </IconButton>
          
          </div>
          <div className={classes.sectionMobile}>
                   
       
         
          <IconButton
              onClick={toggleDrawer("right", true)}
              aria-label=""
              color="inherit"
            >
                <p style={{margineTop:25, fontSize:16}}>Cart</p>
              <Badge badgeContent={keys.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
     
      {renderMobileMenu}
      {renderMenu}

      {/* this is for drwaer */}
      <div>
      
        <React.Fragment key={"right"}>
         
          <Drawer  anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)}>
            {list("right")}
          </Drawer>
        </React.Fragment>
      
    </div>
    </AppBar>
  );
}
