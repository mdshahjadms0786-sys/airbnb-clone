// Filter functionality for index page
document.addEventListener('DOMContentLoaded', function() {
    const filterItems = document.querySelectorAll('.filter-item');
    
    // Get the selected category from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');
    
    filterItems.forEach(filter => {
        const filterCategory = filter.getAttribute('data-category');
        
        // Highlight the selected category
        if (selectedCategory === filterCategory) {
            filter.classList.add('active');
        }
        
        // Add click handler
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            // Navigate to listings page with category filter
            window.location.href = `/listings?category=${encodeURIComponent(category)}`;
        });
    });
    
    // Add favorite button functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            if(this.classList.contains('liked')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#f3424d';
            } else {
                icon.classList.add('fa-regular');
                icon.classList.remove('fa-solid');
                icon.style.color = '#222222';
            }
        });
    });
});
