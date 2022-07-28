import { useEffect, useState } from "react";

const DisplayTable = ({urls, setUrls}) => {

       useEffect(() => {
        fetch("/api/urls")
        .then(res => res.json())
        .then(data => {
            console.log("fetch", data?.data)
            setUrls(data)
        })
    }, [])
    
    const deleteLink = (url) => {
        fetch(`/api/${url._id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(url)
        })
        .then((res) => res.json())
        .then(data => {
            fetch("/api/urls").then(res => res.json()).then(data => setUrls(data))
        })
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Full URL</th>
                        <th>Short URL</th>
                        <th>Clicks</th>
                        <th>Delete Link</th>
                    </tr>
                </thead>
                <tbody>
                    {urls?.data.map(url => { return (
                        <tr key={url._id}>
                        <td><a href={url?.full}>{url?.full}</a></td>
                        <td><a href={"/api/"+ url?.short}>{url?.short}</a></td>
                            <td>{url?.clicks} </td>
                            <td><svg onClick={()=> deleteLink(url)} xmlns="http://www.w3.org/2000/svg" style={{ height: "13px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg></td>
                        </tr>

                    )})}
                </tbody>
            </table>
        </div>
    )
}

export default DisplayTable;