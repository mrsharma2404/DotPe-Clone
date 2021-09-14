import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'

import Slider from "react-slick";
import {ServerURL,getData,postData} from "../../fetchnodedata"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      padding: 1,
      display: "flex",
      flexDirection: "column",
    },
    paperstyle: {
      justifyContent: "flex-start",
      display: "flex",
      padding: 1,
      
        width:'100%',
      margin: 1,
      borderRadius: 0,
      flexDirection: "column",
    },
    imageview: {
      //width: 350,
      //height: 160,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 1,
      margin: 1,
      cursor: "pointer",
  
     // "&:hover": {
     //   transform: "scale(1.25)",
     //   tansition: "all 0.5s ease 0s",
      //},
    },
    arrowstyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    grow:{
      flexGrow:1,
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
  }));

export default function SimplePaper(props)
{
  var resid = props.resid
  //console.log('slider' , props)
  //alert(resid)
    const classes = useStyles();
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };
    
      var itemsettings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
      };
      var itemsettings1 = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
      };
    useEffect(function(){
       
        fetchFoodTypes(resid)
       
         },[])
    const fetchFoodTypes = async (resid) => {
        var body={restaurantId:resid}
        var list = await postData("food/listfoodtype",body);
        setList(list);
      };

      const [list, setList] = useState([])
    const showConsoleOffers = () => {
        return list.map((item) => {
          return (
            <div>
              <div style={{ justifyContent: "center",alignItems: "center",display: "flex",flexDirection: "row",padding: 1, marginLeft:'1%' }}>
              <Paper elevation={1} className={classes.paperstyle}>
              <div className={classes.imageview}>
                <img src={`${ServerURL}/images/${item.adv_image}`} width="100%" height='170px'  />
              </div>
              </Paper>
              </div>
            </div>
          );
        });
      };
  




    return (
        <div style={{marginTop:70}}>
      {/*   <div style={{ display: "flex", flexDirection: "column" }}>
         

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              className={classes.arrowstyle}
              style={{
                background: "#1e6b7b",
                position: "absolute",
                zIndex: 1,
                left: 5,
                opacity: 0.8,
              }}
              onClick={}
            >
              <ArrowBackIosIcon style={{ color: "#FFF", fontSize: "large" }} />
            </IconButton>
             */}
              <div className={classes.grow}>
              <div className={classes.sectionDesktop} > 
          
            <div style={{ width: "100%" }}>
              <Slider {...itemsettings}>  {showConsoleOffers()}</Slider>
            </div>
            </div>
            <div className={classes.sectionMobile} >
            <div style={{ width: "100%" }}>
              <Slider {...itemsettings1}>  {showConsoleOffers()}</Slider>
            </div>
               </div>
            </div>
           
            {/* 
            <IconButton
              className={classes.arrowstyle}
              style={{
                background: "#1e6b7b",
                position: "absolute",
                zIndex: 1,
                right: 5,
                opacity: 0.8,
              }}
            >
              <ArrowForwardIosIcon
                style={{ color: "#FFF", fontSize: "large" }}
              />
            </IconButton>
        
          </div>


         
         </div>*/}
          
          </div>
           
           
    )
}