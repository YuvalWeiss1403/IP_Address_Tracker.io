document.querySelector('body').onload = defaultDataInModal();
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const myModal = document.getElementById('my-modal');

searchButton.addEventListener('click',async()=>{
    console.log('clicked');
    // debugger;
        const ipAddress = searchInput.value;
        const regexExpToCheckIfValidIP = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
        if(regexExpToCheckIfValidIP.test(ipAddress)){
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_RD84R7mq7FUiqOYf7JLrEr3qTq1Gh&ipAddress=${ipAddress}`)    
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
                ISP: data.isp
            };
        createModalContent(FetchedData);
        })
        .catch((error) => {
          console.error(error)
        });}
        else{
            fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_RD84R7mq7FUiqOYf7JLrEr3qTq1Gh&ipAddress=${ipAddress}`)    
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }})
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
          console.error(error)
        });}
    });


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
            console.log(key);
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
