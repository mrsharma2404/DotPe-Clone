import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
//import { Component } from 'react';
import Addnewres from './AddNewRestorent';
import Allrestaurant from './AllRestaurant';
import QrCode from './QrCodeGeneration';

export default function ListItems(props)
{
  const handleClick=(component)=>{
    props.setDashBoardView(component)
  }


const mainListItems = ()=>{

return(
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary=" " />
    </ListItem>
    <ListItem button  onClick={()=>handleClick(<Addnewres/> )}>
      <ListItemIcon>
      <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Add Restaurant"  />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Allrestaurant/> )}>
      <ListItemIcon>
      <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List of Restaurants" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<QrCode  history={props.history} /> )}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText  primary="Qr Code "  />
    </ListItem>
    
  </div>
);
}

const secondaryListItems = ()=>{
  return(
  <div>
    
  </div>
);}

return(
  <div>
    {mainListItems()}
    {secondaryListItems()}
  </div>
)
  }