const $key = 'https://geo.ipify.org/api/v2/country?apiKey=at_v0aAmU3cs0TLq3OJkFwdekKhZENGl&ipAddress='
let $getSessionStorage = sessionStorage.getItem('ip')
const $ownIp = 'https://api.ipify.org?format=json'
const obj = {
    "ip": "8.8.8.8",
    "location": {
        "country": "US",
        "region": "California",
        "city": "Mountain View",
        "lat": 37.38605,
        "lng": -122.08385,
        "postalCode": "94035",
        "timezone": "-07:00",
        "geonameId": 5375480
    },
    "domains": [
        "ioz0xp6.bar",
        "technostar.ma",
        "tq08zk3.bar",
        "21vek-api-1803.21vek-dev.by",
        "m.21vek-1803.21vek-dev.by"
    ],
    "as": {
        "asn": 15169,
        "name": "GOOGLE",
        "route": "8.8.8.0/24",
        "domain": "https://about.google/intl/en/",
        "type": "Content"
    },
    "isp": "Google LLC",
    "proxy": {
        "proxy": false,
        "vpn": false,
        "tor": false
    }
}

const fetchData = (url) =>{
    return fetch(url)
}
const dataConstruction = (obj) =>{
    console.log(obj)
    const nodeListElements = document.querySelectorAll('.data')
    const {ip,location: {region}, location: {timezone}, isp} = obj
    const dataExtrated = [ip,region,timezone,isp]
    nodeListElements.forEach((element,index) => {
        element.textContent = dataExtrated[index]
    });
}
window.addEventListener('load',()=>{
    const input = document.querySelector('input')
    const buttom = document.querySelector('button')
    if(!sessionStorage.ip == ''){
        console.log('We have a IP')
        fetchData(`${$key}${$getSessionStorage}`)
            .then(response => response.json())
            .then(resp => {
                    dataConstruction(resp)
                })
            .catch(err => console.error())
    }else{
        console.log('search IP')
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
        console.log(input.value)
        const ip = input.value
        const url = `${$key}${ip}`
        fetchData(url)
            .then(resp => resp.json())
            .then(data => dataConstruction(data))
    })
})


