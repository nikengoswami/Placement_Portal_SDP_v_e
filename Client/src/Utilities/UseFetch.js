import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
// Provide a url you want to fetch data from and a callback
// this callback function would be called before setting data 
// also you can check if the data is arrived by loading variable's 
// value .
// The callback would modify data as you want before setting it.
const UseFetch = (url, method = "POST") => {
    const [required_data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const response = await fetch(url, { method: method });
        let data = await response.json();
        // console.log(data);
        setData(data);
        setLoading(false);
    }, []);

    return { required_data, loading };
};
export default UseFetch