import { useEffect, useState } from "react";


const useFetch = <T,>(fetchFunction: ()=> Promise<T>, autoFetch=true) => {

const [data,setData]=useState<T |null>(null);
const [loading,setLoading]=useState(false);
const [error,setError]=useState<Error |null>(null);

const fetchData=async()=>{

try{


    setLoading(true);
    setError(null);

    const result =await fetchFunction();
    setData(result);


}catch(error){
    setError(error instanceof Error ? error : new Error("error occurred"));

}finally{
    setLoading(false);
}


}
const reset=()=>{
    setData(null);
        setLoading(false);
    setError(null);

}

useEffect(()=>{
    if(autoFetch){
        fetchData();
    }
},[]);


return {data,loading,error,reset};


}
export default useFetch;