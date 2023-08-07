import {useState,useEffect} from 'react';
import {useParams}from 'react-router-dom';
export default function Price(props){

    const [coin, setCoin]=useState('null');
    const apiKey='D42CB852-8906-4E35-A907-7FFC558C127D';
    const params= useParams(); //params is an object 
  const {symbol}= params;
  const url=`http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${process.env.REACT_APP_COINAPI_KEY}`;


  const getCoin=async()=>{
    try{
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setCoin(data);
    }catch(e){
        console.log("error fetching data",e);
    }
  }


  //run as soon as the components mounts 
  useEffect(()=>{
    getCoin();
  },[])
 //show the fetched data
const loaded =()=>{
    return(
<div>
<h1>
    {coin.asset_id_base}/{coin.asset_id_quote}
</h1>
<h2>{coin.rate}</h2>

</div>

    )
}
//show a loading msg
const loading = () =><h1>loading~...</h1>

//check if coin and coin.rate is true, call loaded function else show loading 
  return coin &&  coin.rate ? loaded(): loading();
}