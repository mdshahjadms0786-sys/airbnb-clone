// Index page functionality - Search, Filters, Tax Toggle, and Favorites

document.addEventListener('DOMContentLoaded', function() {
    // ===== FILTER FUNCTIONALITY =====
    const filterItems = document.querySelectorAll('.filter-item');
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');
    
    filterItems.forEach(filter => {
        const filterCategory = filter.getAttribute('data-category');
        
        // Highlight selected category
        if (selectedCategory === filterCategory) {
            filter.classList.add('active');
        }
        
        // Add click handler
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            window.location.href = `/listings?category=${encodeURIComponent(category)}`;
        });
    });

    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.getElementById('searchBox');
    const searchForm = document.getElementById('searchForm');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                // Filter listings by title, location, or country
                filterListingsBySearch(searchQuery);
            }
        });
        
        // Real-time search as user types
        searchInput.addEventListener('input', function() {
            const searchQuery = this.value.trim().toLowerCase();
            if (searchQuery === '') {
                // Show all listings
                document.querySelectorAll('.listing-link').forEach(link => {
                    link.style.display = '';
                });
            } else {
                filterListingsBySearch(searchQuery);
            }
        });
    }
    
    function filterListingsBySearch(query) {
        query = query.toLowerCase();
        const listingLinks = document.querySelectorAll('.listing-link');
        let visibleCount = 0;
        
        listingLinks.forEach(link => {
            const title = link.querySelector('.listing-title')?.textContent.toLowerCase() || '';
            const location = link.querySelector('.listing-location')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(query) || location.includes(query);
            link.style.display = matches ? '' : 'none';
            if (matches) visibleCount++;
        });
        
        // Show no results message if needed
        const container = document.querySelector('.listings-container');
        const existingMessage = container.querySelector('.no-search-results');
        if (existingMessage) existingMessage.remove();
        
        if (visibleCount === 0) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-search-results';
            noResultsDiv.innerHTML = `<p>No listings found for "${query}". Try searching for a different location or property type.</p>`;
            container.appendChild(noResultsDiv);
        }
    }

    // ===== TAX TOGGLE FUNCTIONALITY =====
    const taxToggle = document.getElementById('taxToggle');
    const TAX_RATE = 0.18; // 18% GST
    
    if (taxToggle) {
        taxToggle.addEventListener('change', function() {
            const priceElements = document.querySelectorAll('.listing-price');
            
            priceElements.forEach(element => {
                const basePriceAttr = element.getAttribute('data-base-price');
                const basePrice = parseInt(basePriceAttr);
                const priceAmount = element.querySelector('.price-amount');
                const taxSpan = element.querySelector('.price-tax');
                
                if (this.checked) {
                    // Show price with tax
                    const taxAmount = Math.round(basePrice * TAX_RATE);
                    const totalPrice = basePrice + taxAmount;
                    priceAmount.textContent = '₹' + totalPrice.toLocaleString('en-IN');
                    taxSpan.style.display = 'inline';
                    taxSpan.textContent = ` (+₹${taxAmount.toLocaleString('en-IN')} tax)`;
                } else {
                    // Show base price only
                    priceAmount.textContent = '₹' + basePrice.toLocaleString('en-IN');
                    taxSpan.style.display = 'none';
                    taxSpan.textContent = '';
                }
            });
        });
    }

    // ===== FAVORITE BUTTON FUNCTIONALITY =====
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        // Load saved favorites from localStorage
        const listingId = btn.closest('.listing-link').href.split('/').pop();
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '{}');
        
        if (savedFavorites[listingId]) {
            btn.classList.add('liked');
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            icon.style.color = '#f3424d';
        }
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const listingId = this.closest('.listing-link').href.split('/').pop();
            const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '{}');
            const icon = this.querySelector('i');
            
            this.classList.toggle('liked');
            
            if (this.classList.contains('liked')) {
                savedFavorites[listingId] = true;
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#f3424d';
            } else {
                delete savedFavorites[listingId];
                icon.classList.add('fa-regular');
                icon.classList.remove('fa-solid');
                icon.style.color = '#222222';
            }
            
            localStorage.setItem('favorites', JSON.stringify(savedFavorites));
        });
    });

    // ===== RESPONSIVE FILTERS =====
    const filterScroll = document.querySelector('.filters-scroll');
    if (filterScroll) {
        // Auto-scroll to active filter
        const activeFilter = filterScroll.querySelector('.filter-item.active');
        if (activeFilter) {
            activeFilter.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
});
