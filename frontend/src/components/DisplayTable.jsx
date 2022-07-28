import { useEffect, useState } from "react";

const DisplayTable = () => {

    const [urls, setUrls] = useState()

    useEffect(() => {
        fetch("/api/urls")
        .then(res => res.json())
        .then(data => {
            console.log("fetch", data?.data)
            setUrls(data)
        })
    }, [])
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Full URL</th>
                        <th>Short URL</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {urls?.data.map(url => { return (
                        <tr key={url._id}>
                        <td><a href={url?.full}>{url?.full}</a></td>
                        <td><a href={"/api/"+ url?.short}>{url?.short}</a></td>
                        <td>{url?.clicks}</td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    )
}

export default DisplayTable;