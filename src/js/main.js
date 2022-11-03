const $key = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_v0aAmU3cs0TLq3OJkFwdekKhZENGl&ipAddress='
let $getSessionStorage = sessionStorage.getItem('ip')
const $ownIp = 'https://api.ipify.org?format=json'
const fetchData = (url) =>{
    return fetch(url)
}

const dataConstruction = (obj) =>{
    const nodeListElements = document.querySelectorAll('.data')
    const {ip,location: {city}, location: {timezone}, isp} = obj
    const dataExtrated = [ip,city,timezone,isp]
    nodeListElements.forEach((element,index) => {
        const contentElement = element.getAttribute('name')
        element.textContent = `${contentElement}${dataExtrated[index]}`
    });
    const ubication = {
        'lat' : obj.location.lat,
        'lng' : obj.location.lng,
        'city' : city
    }
    createMap(ubication)
}
const createMap = (obj) => {
    let map = L.map('map').setView([obj.lat,obj.lng],11)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    let marker = L.marker([obj.lat,obj.lng]).addTo(map)
    marker.bindPopup(`<b>${obj.city}</b>`).openPopup();
}
window.addEventListener('load',()=>{
    const input = document.querySelector('input')
    const buttom = document.querySelector('button')
    if(!sessionStorage.ip == ''){
        fetchData(`${$key}${$getSessionStorage}`)
            .then(response => response.json())
            .then(resp => {
                    dataConstruction(resp)
                })
            .catch(err => console.error())
    }else{
        fetchData($ownIp)
            .then(response => response.json())
            .then(data => {
                const ip = data.ip 
                const url = `${$key}${ip}`
                fetchData(url)
                    .then(response => response.json())
                    .then(resp => {
                            dataConstruction(resp)
                            sessionStorage.setItem('ip', ip)
                        })
                    .catch(err => console.error())
        })
    }
    buttom.addEventListener('click', (e)=>{
        e.preventDefault()
        const ip = input.value
        const url = `${$key}${ip}`
        const mainWrapper = document.querySelector('.main-wrapper')
        let p = document.querySelector('#map')
        p.remove()
        let mapDiv = '<div id="map" class="map-section"></div>'
        mainWrapper.innerHTML += mapDiv
        fetchData(url)
            .then(resp => resp.json())
            .then(data => dataConstruction(data))
    })
})

