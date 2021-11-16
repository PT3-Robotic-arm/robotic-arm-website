function getData(){

    fetch(`http://127.0.0.1:3000/api/getLatest`).then(res => res.json().then(data=> {
        console.log(data);
    }))
}

getData();