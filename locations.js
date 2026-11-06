// ROMEO'S PIZZA STORE INFORMATION

const stores = [

    // ABUJA STORES

    {
        name: "Gwarinpa",
        city: "Abuja",
        address: "No 3, Bukoro Street, 3rd Avenue, Gwarinpa, Abuja",
        order: "https://romeospizza.africa.restaurant/gwarinpa",

        // Approximate neighborhood coordinates
        coordinates: [9.105, 7.404]
    },

    {
        name: "Garki",
        city: "Abuja",
        address: "No 6, Ogbomosho Street, Area 8, Garki, Abuja",
        order: "https://romeospizza.africa.restaurant/garki",
        coordinates: [9.033, 7.485]
    },

    {
        name: "Lugbe",
        city: "Abuja",
        address: "Beside Total Filling Station, Phase 2, FHA, Lugbe, Abuja",
        order: "https://romeospizza.africa.restaurant/lugbe",
        coordinates: [8.994, 7.365]
    },


    // LAGOS STORES

    {
        name: "Yaba",
        city: "Lagos",
        address: "197 Herbert Macaulay Way, Adekunle, Yaba, Lagos",
        order: "https://romeospizza.africa.restaurant/yaba",
        coordinates: [6.515, 3.384]
    },

    {
        name: "Surulere",
        city: "Lagos",
        address: "No 28, Adeniran Ogunsanya Street, Surulere, Lagos",
        order: "https://romeospizza.africa.restaurant/surulere",
        coordinates: [6.496, 3.351]
    },

    {
        name: "Okota",
        city: "Lagos",
        address: "Plot 111, Destiny Plaza, Ago Palace Way, Okota, Lagos",
        order: "https://romeospizza.africa.restaurant/okota",
        coordinates: [6.497, 3.306]
    },

    {
        name: "Festac",
        city: "Lagos",
        address: "1st Avenue by 11 Road Junction, Festac, Lagos",
        order: "https://romeospizza.africa.restaurant/festac",
        coordinates: [6.469, 3.282]
    },

    {
        name: "Ajao Estate",
        city: "Lagos",
        address: "Lateef Salami Street, Ajao Estate, Lagos",
        order: "https://romeospizza.africa.restaurant/ajao",
        coordinates: [6.527, 3.326]
    }

];


// CREATE THE MAP

const map = L.map("store-map");


// ADD OPENSTREETMAP TO THE MAP

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,

    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// STORE MARKERS

let markers = [];


// CREATE A MARKER FOR EACH STORE

stores.forEach(function(store) {

    const marker = L.marker(store.coordinates).addTo(map);

    marker.bindPopup(`
        <div class="map-popup">

            <h3>Romeo's Pizza ${store.name}</h3>

            <p>${store.address}</p>

            <a href="${store.order}"
               target="_blank"
               rel="noopener noreferrer">
               Order From This Store
            </a>

        </div>
    `);

    markers.push({
        marker: marker,
        store: store
    });

});


// DISPLAY ALL STORES

function showStores(city = "all") {

    const storeList = document.getElementById("store-list");

    storeList.innerHTML = "";

    markers.forEach(function(item) {

        const store = item.store;

        // Check which city the customer selected

        if (city === "all" || store.city === city) {

            const card = document.createElement("article");

            card.className = "location-card";

            const directions =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(store.address);

            card.innerHTML = `

                <span class="city">${store.city}</span>

                <h3>${store.name}</h3>

                <p>
                    <i class="fa-solid fa-location-dot"></i>
                    ${store.address}
                </p>

                <div class="store-actions">

                    <a class="directions-link"
                       href="${directions}"
                       target="_blank"
                       rel="noopener noreferrer">
                       Get Directions
                    </a>

                    <a class="order-link"
                       href="${store.order}"
                       target="_blank"
                       rel="noopener noreferrer">
                       Order Now
                    </a>

                </div>

            `;

            storeList.appendChild(card);

        }

    });

}


// FILTER THE MAP BY CITY

function filterMap(city) {

    const visibleMarkers = [];

    markers.forEach(function(item) {

        if (city === "all" || item.store.city === city) {

            if (!map.hasLayer(item.marker)) {
                item.marker.addTo(map);
            }

            visibleMarkers.push(item.marker);

        } else {

            map.removeLayer(item.marker);

        }

    });


    // ADJUST MAP TO SHOW SELECTED STORES

    if (visibleMarkers.length > 0) {

        const group = L.featureGroup(visibleMarkers);

        map.fitBounds(group.getBounds(), {
            padding: [40, 40],
            maxZoom: 13
        });

    }

    showStores(city);

}


// CITY FILTER BUTTONS

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCity = button.dataset.city;

        // Remove active class from every button

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Highlight selected button

        button.classList.add("active");

        // Display selected city

        filterMap(selectedCity);

    });

});


// INITIAL PAGE LOAD

showStores("all");

filterMap("all");