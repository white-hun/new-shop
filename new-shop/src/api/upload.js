export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
  // Axios.post(process.env.REACT_APP_CLOUDINARY_URL, data).then((response) => {
  //   console.log("1", response);
  // });
  return (
    fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    })
      // .then((response) => console.log(response));
      .then((res) => res.json())
      .then((data) => data.url)
  );
}
