// Index page functionality - Search, Filters, Tax Toggle, and Favorites

document.addEventListener('DOMContentLoaded', function() {
    // ===== FILTER FUNCTIONALITY =====
    const filterItems = document.querySelectorAll('.filter-item');
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');
    
    filterItems.forEach(filter => {
        const filterCategory = filter.getAttribute('data-category');
        
        if (selectedCategory === filterCategory || (selectedCategory === '' && filterCategory === '')) {
            filter.classList.add('active');
        }
        
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const sortSelect = document.getElementById('sortSelect');
            const currentSort = sortSelect ? sortSelect.value : 'newest';
            window.location.href = `/listings?category=${encodeURIComponent(category)}&sort=${currentSort}`;
        });
    });

    // ===== SORT FUNCTIONALITY =====
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const category = urlParams.get('category') || '';
            window.location.href = `/listings?category=${category}&sort=${this.value}`;
        });
    }

    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.getElementById('searchBox');
    const searchForm = document.getElementById('searchForm');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                filterListingsBySearch(searchQuery);
            }
        });
        
        searchInput.addEventListener('input', function() {
            const searchQuery = this.value.trim().toLowerCase();
            if (searchQuery === '') {
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
    const TAX_RATE = 0.18;
    
    if (taxToggle) {
        taxToggle.addEventListener('change', function() {
            const priceElements = document.querySelectorAll('.listing-price');
            
            priceElements.forEach(element => {
                const basePriceAttr = element.getAttribute('data-base-price');
                const basePrice = parseInt(basePriceAttr);
                const priceAmount = element.querySelector('.price-amount');
                const taxSpan = element.querySelector('.price-tax');
                
                if (this.checked) {
                    const taxAmount = Math.round(basePrice * TAX_RATE);
                    const totalPrice = basePrice + taxAmount;
                    priceAmount.textContent = '₹' + totalPrice.toLocaleString('en-IN');
                    taxSpan.style.display = 'inline';
                    taxSpan.textContent = ` (+₹${taxAmount.toLocaleString('en-IN')} tax)`;
                } else {
                    priceAmount.textContent = '₹' + basePrice.toLocaleString('en-IN');
                    taxSpan.style.display = 'none';
                    taxSpan.textContent = '';
                }
            });
        });
    }

    // ===== FAVORITE BUTTON FUNCTIONALITY (Database-based) =====
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        const listingId = btn.getAttribute('data-listing-id');
        
        btn.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            try {
                const response = await fetch(`/wishlist/${listingId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (data.success) {
                    const icon = btn.querySelector('i');
                    
                    if (data.isWishlisted) {
                        btn.classList.add('liked');
                        icon.classList.remove('fa-regular');
                        icon.classList.add('fa-solid');
                        icon.style.color = '#f3424d';
                    } else {
                        btn.classList.remove('liked');
                        icon.classList.remove('fa-solid');
                        icon.classList.add('fa-regular');
                        icon.style.color = '#222222';
                    }
                }
            } catch (error) {
                console.error('Error toggling wishlist:', error);
                window.location.href = '/login';
            }
        });
    });

    // ===== RESPONSIVE FILTERS =====
    const filterScroll = document.querySelector('.filters-scroll');
    if (filterScroll) {
        const activeFilter = filterScroll.querySelector('.filter-item.active');
        if (activeFilter) {
            activeFilter.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
});
