const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const myModal = document.getElementById('my-modal');
const myMap = document.createElement('div');
document.querySelector('body').onload = defaultDataInModal();


searchButton.addEventListener('click',async()=>{
        const ipAddress = searchInput.value;
        fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_LrxRpAQ740L9XpMmJANuzazZmafT2&ipAddress=${ipAddress}`)    
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }})
        .then((data) => {
            const FetchedData ={
                IP: data.ip,
                Location: `${data.location.city} ${data.location.country} ${data.location.geonameId}`,
                TimeZone: `UTC ${data.location.timezone}`, 
                ISP: data.isp,
            };
            const fetchLocation ={
                lat: data.location.lat,
                lng: data.location.lng
            }
        createModalContent(FetchedData);
        changeMap(fetchLocation);
        })
        .catch((error) => {
          console.error(error)
        });}
    );


    function createModalContent(FetchedData){
        myModal.innerHTML='';
        for(const [key,value] of Object.entries(FetchedData)){
            const div = document.createElement('div');
            const heading = document.createElement('div');
            const content = document.createElement('div');
            div.className= 'modal-box';
            if(!(key === 'IP')){
                heading.innerHTML = key;
            }else{
                heading.innerHTML = `${key} Address`;
            }
            heading.className ='modal-heading';
            content.innerHTML=value;
            content.className ='modal-content';
            div.appendChild(heading);
            div.appendChild(content);
            myModal.appendChild(div);
            if(!(key ==='ISP')){
                const hr = document.createElement('hr');
                myModal.appendChild(hr);
            }
        }
    }

function defaultDataInModal(){
    myMap.innerHTML=`<iframe id="my-map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d845.2975747326326!2d34.772481570816176!3d32.06410133535028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1siw!2sil!4v1674721938136!5m2!1siw!2sil" title="my maps"></iframe>`
    document.body.appendChild(myMap);
    myMap.className='maps';
    setInterval(()=>{
        const inputValue = searchInput.value;
        if(!inputValue){
            myModal.innerHTML='';
            const defaultData ={
                IP: '',
                Location: '',
                TimeZone: '', 
                ISP: ''
            };
            createModalContent(defaultData)
        }
},1000);

}


function changeMap(fetchLocation){
    myMap.innerHTML=`<iframe id="my-map" src="//maps.google.com/maps?q=${fetchLocation.lat},${fetchLocation.lng}&hl=es;z=14&amp;output=embed" title="my maps"></iframe>`}