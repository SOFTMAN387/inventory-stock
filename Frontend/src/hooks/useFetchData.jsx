import { useState,useEffect } from 'react';
import { BASE_URL} from '../config';
import { useSelector } from 'react-redux';
//import axios from 'axios';
const useFetchData = (url) => {
    const userToken=useSelector((state)=>state?.currentUser[0]?.token);
    const [resultData,setData]=useState();
    const [error,setError]=useState(false);
    const [loader,setloader]=useState(false);
    // console.log(resultData);
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                setloader(true);
                const res=await fetch(`${BASE_URL}/${url}`
                ,{
                 headers:{
                     Authorization:`Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                    }
                }
                )
                const result= await res.json();
                if(!res.ok){
                   throw new Error(res.message);
                }
                 console.log(result);
                setData(result);
                setloader(false);
                
            } catch (error) {
                setloader(false);
                setError(error.message);
            }
        }
        fetchData();
    },[url,userToken])
 
    return {resultData,loader,error}
}

export default useFetchData;