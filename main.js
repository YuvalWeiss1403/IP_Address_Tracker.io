document.querySelector('body').onload = defaultDataInModal();
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const myModal = document.getElementById('my-modal');
const map = document.getElementById('myMap');


searchButton.addEventListener('click',async()=>{
    // debugger;
        const ipAddress = searchInput.value;
        fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_IqaOVPyAnIrIZCpFR8UP3mLPojM8w&ipAddress=${ipAddress}`)    
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
    // document.getElementById('myMap').src=`https://www.google.com/maps/@?api=1&map_action=map&center=${fetchLocation.lat}%2C${fetchLocation.lng}`;
    map.src=`http://www.google.com/maps/place/${fetchLocation.lat},${fetchLocation.lng}`;
}