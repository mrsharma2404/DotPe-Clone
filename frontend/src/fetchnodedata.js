import {useHistory} from 'react-router-dom'

//var ServerURL="http://192.168.43.116:5000"
var ServerURL="http://localhost:5000"
var axios=require('axios')


var history = useHistory


const getData=async(url)=>{
    try
    {
        var response=await fetch(`${ServerURL}/${url}`,
        {
            method: "GET",
            // mode: 'cors',
            headers: {
              Authorization: localStorage.getItem("token"), 
              "Content-Type": "application/json;charset=utf-8",
            },
          });
        const result=await response.json()
        //console.log(result)    
        if (result == "expire") 
        {
            alert('session expired')
            window.location.href="http://localhost:3000/salogin"  
            return []
        }
        return result    
       
    }
    catch(e)
    {
        console.log(e)
        return null
    }
}

const postData=async(url, body)=>{
    try
    {   
        
        const response = await fetch(`${ServerURL}/${url}`, {
            method: "POST",
            mode: "cors",
            headers: { 
            Authorization: localStorage.getItem("token"), 
            "Content-Type": "application/json;charset=utf-8",},
            body: JSON.stringify(body),
          });
        const result = await response.json();
        if (result == "expire") 
        {
            alert('session expired')
            window.location.href="http://localhost:3000/salogin"  
            return []
        }
        else{
            return result    
        }

        
       
    }
    catch(e)
    {
        console.log(e)
        return null
    }
}

const postDataImage=async(url, formData, config)=>{
    try
    {   
        //do chane here
        const response = await axios.post(`${ServerURL}/${url}`, formData, config)             
        const result = await response.data
        return result;  
       
    }
    catch(e)
    {
        console.log(e)
        return null
    }
}



export {getData, postData, postDataImage, ServerURL}