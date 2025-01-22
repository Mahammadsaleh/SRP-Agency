    fetch('./public/assets/js/portfolio.json') // Adjust path if needed
      .then(response => response.json())
      .then(data => {
        // 'data' now contains the array of portfolio items
        // e.g., data = [{title: "...", image: "...", category: "...", link: "..."}, ...]

        // 2) Initialize your variables or states
        let allItems = data;
        let currentFilter = 'All'; 
        let itemsPerPage = 6;
        let currentPage = 1;

        // 3) Render the first 6 (or fewer) items by default
        renderItems(allItems, currentFilter, currentPage, itemsPerPage);

        // 4) Set up event listeners for filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
          button.addEventListener('click', () => {
            // Remove .active from all
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add .active to the clicked one
            button.classList.add('active');

            currentFilter = button.dataset.filter; // e.g. "Company", "All", etc.
            currentPage = 1; // reset to first page
            clearGrid(); 
            renderItems(allItems, currentFilter, currentPage, itemsPerPage);
          });
        });

        // 5) Set up the "Load More" button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn.addEventListener('click', () => {
          currentPage++;
          renderItems(allItems, currentFilter, currentPage, itemsPerPage);
        });

      })
      .catch(error => {
        console.error('Error fetching portfolio items:', error);
      });

    // Helper: clear the grid before rendering
    function clearGrid() {
      document.getElementById('portfolio-grid').innerHTML = '';
    }

    // Helper: renders items based on filter + pagination
    function renderItems(allItems, filter, page, itemsPerPage) {
      // Filter the items if not "All"
      let filteredItems = (filter === 'All')
        ? allItems
        : allItems.filter(item => item.category === filter);

      // Calculate start/end indexes for the current page
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      const itemsToShow = filteredItems.slice(startIndex, endIndex);

      // Insert items into the grid
      const grid = document.getElementById('portfolio-grid');
      itemsToShow.forEach(item => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-4', 'col-md-6', 'mb-4');
        colDiv.innerHTML = `
          <div class="portfolio-wrap">
            <img src="${item.image}" alt="${item.title}" class="img-fluid" />
            <div class="portfolio-info">
              <h4>${item.title}</h4>
              <p>${item.category}</p>
              <div class="portfolio-links">
                <a href="${item.link}" title="More Details" target="_blank">
                  <i class="bx bxl-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        `;
        grid.appendChild(colDiv);
      });

      // If we've displayed everything, hide the Load More button
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      if (endIndex >= filteredItems.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-block';
      }
    }


