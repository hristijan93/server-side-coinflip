
document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

    const userName = document.querySelector("#userName").value;
    // const userName = 'hristijan';
    const res = await fetch(`/api?student=${userName}`)
    const data = await res.json() 

    console.log(data);
    document.querySelector("#personName").textContent = data.result;
    document.querySelector('img').src = data.image;
    
    // document.querySelector("#personStatus").textContent = data.status
    // document.querySelector("#personOccupation").textContent = data.currentOccupation
}