
async function getDataFromServer() {
  try {
    const res = await fetch(`http://localhost:5000/api/app`, {
      method: "GET",
    });

    const data = await res.json();
    return await data
  } catch (error) {
    console.log(error);
  } finally {
  }
}

function addToServer(data){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "imageUrl": data.imageUrl,
    "name": data.name,
    "price": data.price,
    "description": data.description,
    "companyName": data.companyName
  });
  
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:5000/api/app", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function deleteById(id){
const requestOptions = {
  method: 'DELETE',
  redirect: 'follow'
};
fetch(`http://localhost:5000/api/app/${id}`, requestOptions)
}


export { getDataFromServer , addToServer ,deleteById};
