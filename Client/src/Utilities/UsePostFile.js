import { useState, useEffect } from 'react'

const UsePostFile = async (url, data, method = "POST") => {
    try {
        const formData = new FormData();
        let all_keys = Object.keys(data)
        for (let key in all_keys) {
            // console.log(all_keys[key])
            // formData[all_keys[key]] = data[all_keys[key]]
            formData.append(all_keys[key], data[all_keys[key]])
        }
        // console.log(formData)
        // formData.append('File', selectedFile);
        console.log({
            method: method,
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
        let response = await fetch(
            url,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'multipart/form-data'
                },
                body: formData
            }
        );
        let res1 = await response.json();
        return res1;
    }

    catch (err) {
        console.log(err.toString())
    }
}

export default UsePostFile