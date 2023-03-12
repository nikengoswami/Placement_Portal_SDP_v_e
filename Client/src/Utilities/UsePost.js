import { useState, useEffect } from 'react'
const UsePost = async (url, data, method = "POST") => {
    try {

        let response = await fetch(
            url,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        let res1 = await response.json();
        return res1;
    }
  
catch (err) {
        console.log(err.toString())
    }
}

export default UsePost