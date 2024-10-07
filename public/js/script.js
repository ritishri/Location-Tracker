const socket = io()
// using this...connection request send to the backend..when we call io() it will send request to the backend

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude} =
        position.coords
        socket.emit("send-location",{latitude,longitude})
    },
    (error)=>{
        console.log(error);
        
    },
    {
      enableHighAccuracy:true,
      timeout:5000, // after 5sec it will check for the position
      maximumAge:0, // set so that caching will not perform...not saved any data for use..when it need data it get real data
    })
}

const map = L.map("map").setView([0,0],16)

L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Ritika Shrivastava"
}).addTo(map)


const markers = {}

socket.on("receive-location",(data)=>{
    const {id, latitude, longitude} = data
    map.setView([latitude,longitude])

    if(markers[id]){
        markers[id].setLanLng([latitude,longitude])
        //setLanLng is used to set latitude and longitude
    }else{
        markers[id] = L.marker([latitude,longitude]).addTo(map)
    }
})

socket.on("User-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id]
    }
})





