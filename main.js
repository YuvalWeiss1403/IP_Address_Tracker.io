// getting the needed elements from the html file
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const myModal = document.getElementById("my-modal");

// creating a container for the changing maps
const myMap = document.createElement("div");

// putting a default empty value in the modal content, and a specific map by my choice
document.querySelector("body").onload = defaultDataInModal();

// fetching the ip data from the geo.ipify api when clicking on the search button
searchButton.addEventListener("click", async () => {
	// fetch the data by the value of the users input
	const ipAddress = searchInput.value;
	fetch(
		`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_LrxRpAQ740L9XpMmJANuzazZmafT2&ipAddress=${ipAddress}`
	)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(response.statusText);
			}
		})
		.then((data) => {
			//creating an object with the required fields from the fetched data:
			// FetchedData will contain the data to show on the modal
			const FetchedData = {
				IP: data.ip,
				Location: `${data.location.city} ${data.location.country} ${data.location.geonameId}`,
				TimeZone: `UTC ${data.location.timezone}`,
				ISP: data.isp,
			};
			// fetchLocation will contain the data to use to get the right map
			const fetchLocation = {
				lat: data.location.lat,
				lng: data.location.lng,
			};
			// creating the content and displaying it on the modal by the FetchedData values
			createModalContent(FetchedData);
			// changing the map by the fetchLocation values
			changeMap(fetchLocation);
		})
		.catch((error) => {
			console.error(error);
		});
});

const createModalContent = (FetchedData) => {
	// deleting the old value in the modal content
	myModal.innerHTML = "";
	// making a dynamic loop the add the values in the modal content
	for (const [key, value] of Object.entries(FetchedData)) {
		const div = document.createElement("div");
		const heading = document.createElement("div");
		const content = document.createElement("div");
		div.className = "modal-box";
		// checking if the key is equal to IP so we can add the word "address" if so
		if (!(key === "IP")) {
			heading.innerHTML = key;
		} else {
			heading.innerHTML = `${key} Address`;
		}
		heading.className = "modal-heading";
		content.innerHTML = value;
		content.className = "modal-content";
		div.appendChild(heading);
		div.appendChild(content);
		myModal.appendChild(div);
		// checking if the key is not equal to ISP so we will know if to add an hr element or not
		// (we will not add an hr element after the last value (ISP))
		if (!(key === "ISP")) {
			const hr = document.createElement("hr");
			myModal.appendChild(hr);
		}
	}
};

// creating a default data in the modal content with only the heading as long as the users input is null.
// every second the function checks if the input is null and will show or not show the default value by the result
// creating the iframe element to show the desired map with a first value of a picked place
// the function is not an arrow function so i can access it from the onload function written on top
function defaultDataInModal() {
	myMap.innerHTML = `<iframe id="my-map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d845.2975747326326!2d34.772481570816176!3d32.06410133535028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1siw!2sil!4v1674721938136!5m2!1siw!2sil" title="my maps"></iframe>`;
	document.body.appendChild(myMap);
	myMap.className = "map-container";
	setInterval(() => {
		const inputValue = searchInput.value;
		if (!inputValue) {
			myModal.innerHTML = "";
			const defaultData = {
				IP: "",
				Location: "",
				TimeZone: "",
				ISP: "",
			};
			createModalContent(defaultData);
		}
	}, 1000);
}

// changing the iframe values to replace the old map with a new one according to the new fetched location
function changeMap(fetchLocation) {
	myMap.innerHTML = `<iframe id="my-map" src="//maps.google.com/maps?q=${fetchLocation.lat},${fetchLocation.lng}&hl=es;z=14&amp;output=embed" title="my maps"></iframe>`;
}
