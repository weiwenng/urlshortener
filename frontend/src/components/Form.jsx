import { useState } from "react";

const Form = ({setUrls}) => {
  const [fullUrl, setFullUrl] = useState({ full: ""});

  const shrinkUrl = (e) => {
    e.preventDefault();
    fetch(`/api/shortUrls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullUrl),
    })
      .then((res) => res.json())
      .then((data) => {
        setFullUrl({ full: ""})
        fetch('/api/urls').then((res) => res.json()).then(data => setUrls(data))
      });
  };

  return (
    <form onSubmit={shrinkUrl}>
      <label htmlFor="fullURL">URL</label>
      <input
        style={{width: "100%", margin: "10px auto" }}
        type="url"
        name="fullURL"
        id="fullURL"
        placeholder="URL"
        value={fullUrl.full}
        onChange={(e) => setFullUrl({full: e.target.value})}
        required
      />
      <button>Shrink</button>
    </form>
  );
};

export default Form;
