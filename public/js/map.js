// Map initialization with geocoding
function initializeMap(location, country, title, imageUrl, price, savedCoordinates) {
    const mapContainer = document.getElementById('map');
    
    if (!mapContainer) {
        console.error('Map container not found!');
        return;
    }

    // Check if saved coordinates exist and are valid
    if (savedCoordinates && savedCoordinates.length === 2 && savedCoordinates[0] !== 0 && savedCoordinates[1] !== 0) {
        const longitude = parseFloat(savedCoordinates[0]);
        const latitude = parseFloat(savedCoordinates[1]);
        displayMap(latitude, longitude, title, location, country, imageUrl, price);
        return;
    }

    // Search query banao
    const searchQuery = `${location}, ${country}`;
    
    // Nominatim API se coordinates fetch karo
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let latitude, longitude;
            
            if (data && data.length > 0) {
                // Agar location mill gaya to use karo
                latitude = parseFloat(data[0].lat);
                longitude = parseFloat(data[0].lon);
                displayMap(latitude, longitude, title, location, country, imageUrl, price);
            } else {
                // Agar location nahi mila to warning aur fallback use karo
                console.warn(`Location "${searchQuery}" not found. Using default coordinates.`);
                displayMap(28.6139, 77.2090, title, location, country, imageUrl, price);
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
            // Fallback: default coordinates (Delhi)
            displayMap(28.6139, 77.2090, title, location, country, imageUrl, price);
        });
}

// Map display karne ka function
function displayMap(latitude, longitude, title, location, country, imageUrl, price) {
    // Check if map already exists, if yes destroy it
    if (window.mapInstance) {
        window.mapInstance.remove();
    }

    // Map initialize karo
    const map = L.map('map', {
        center: [latitude, longitude],
        zoom: 13,
        scrollWheelZoom: true
    });

    // OpenStreetMap tiles add karo
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors | © Nominatim',
        maxZoom: 15,
        minZoom: 1
    }).addTo(map);

    // Custom popup HTML - Airbnb style
    const popupHTML = `
        <div class="airbnb-popup">
            <div class="popup-image-container">
                <img src="${imageUrl}" alt="${title}" class="popup-image">
            </div>
            <div class="popup-content">
                <div class="popup-title">${title}</div>
                <div class="popup-location">📍 ${location}, ${country}</div>
                <div class="popup-price">₹${parseInt(price).toLocaleString('en-IN')}/night</div>
            </div>
        </div>
    `;

    // Marker add karo with custom popup
    const marker = L.marker([latitude, longitude], {
        title: title
    })
        .bindPopup(popupHTML, {
            maxWidth: 300,
            className: 'airbnb-marker-popup'
        })
        .addTo(map);

    // Hover par popup show/hide karo (Airbnb style)
    marker.on('mouseover', function() {
        this.openPopup();
    });
    
    marker.on('mouseout', function() {
        this.closePopup();
    });

    // Map instance save karo reusability ke liye
    window.mapInstance = map;

    // Mobile responsiveness ke liye
    setTimeout(() => {
        map.invalidateSize();
    }, 300);
}

// EJS variables from the template
document.addEventListener('DOMContentLoaded', () => {
    // Get values from data attributes (HTML se)
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        const location = mapContainer.getAttribute('data-location');
        const country = mapContainer.getAttribute('data-country');
        const title = mapContainer.getAttribute('data-title');
        const imageUrl = mapContainer.getAttribute('data-image');
        const price = mapContainer.getAttribute('data-price');
        const coordinates = mapContainer.getAttribute('data-coordinates');
        const savedCoordinates = coordinates ? coordinates.split(',') : null;
        
        if (location && country && title && imageUrl && price) {
            initializeMap(location, country, title, imageUrl, price, savedCoordinates);
        } else {
            console.error('Missing map data attributes!');
        }
    }
});

// Reusable function for map reset
function resetMap(location, country, title, imageUrl, price, coordinates) {
    initializeMap(location, country, title, imageUrl, price, coordinates);
}

// Export functions for global use
window.mapFunctions = {
    initialize: initializeMap,
    reset: resetMap
};
