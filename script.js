/* ===========================================
   Data Mining Educational Website - script.js
   =========================================== */

/* ---- Dark Mode Toggle ---- */
(function initTheme() {
  const stored = localStorage.getItem('dm-theme');
  if (stored === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  /* -- Dark Mode -- */
  const toggleBtn = document.getElementById('darkToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('dm-theme', 'light');
        toggleBtn.textContent = '🌙 Dark';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('dm-theme', 'dark');
        toggleBtn.textContent = '☀️ Light';
      }
    });

    // Set initial button label
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      toggleBtn.textContent = '☀️ Light';
    } else {
      toggleBtn.textContent = '🌙 Dark';
    }
  }

  /* -- Mobile Nav Toggle -- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  /* -- Mark active nav link -- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* -- Back to Top Button -- */
  const topBtn = document.getElementById('backToTop');
  if (topBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        topBtn.classList.add('visible');
      } else {
        topBtn.classList.remove('visible');
      }
    });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -- Fade-in Animations (IntersectionObserver) -- */
  const fadeEls = document.querySelectorAll('.section-card, .unit-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show all immediately
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* -- Search Functionality -- */
  const searchBar = document.getElementById('searchBar');
  const searchResults = document.getElementById('searchResults');

  // Search index – covers all units and major topics
  var searchData = [
    // Unit 1
    { title: 'What is Data Mining', unit: 'Unit 1: Basics of Data Mining', url: 'unit1.html#what-is-data-mining' },
    { title: 'Issues and Challenges in Data Mining', unit: 'Unit 1', url: 'unit1.html#issues-challenges' },
    { title: 'Applications of Data Mining', unit: 'Unit 1', url: 'unit1.html#applications' },
    { title: 'Kinds of Data', unit: 'Unit 1', url: 'unit1.html#kinds-of-data' },
    { title: 'Database Data', unit: 'Unit 1', url: 'unit1.html#kinds-of-data' },
    { title: 'Data Warehouses', unit: 'Unit 1', url: 'unit1.html#kinds-of-data' },
    { title: 'Transactional Data', unit: 'Unit 1', url: 'unit1.html#kinds-of-data' },
    { title: 'Architecture of Data Mining', unit: 'Unit 1', url: 'unit1.html#architecture' },
    { title: 'Pattern Mining', unit: 'Unit 1', url: 'unit1.html#pattern-mining' },
    { title: 'Characterization and Discrimination', unit: 'Unit 1', url: 'unit1.html#pattern-mining' },
    { title: 'Frequent Patterns', unit: 'Unit 1', url: 'unit1.html#pattern-mining' },
    { title: 'Association and Correlation', unit: 'Unit 1', url: 'unit1.html#pattern-mining' },
    { title: 'Classification and Regression', unit: 'Unit 1', url: 'unit1.html#pattern-mining' },
    { title: 'Cluster Analysis', unit: 'Unit 1', url: 'unit1.html#analysis' },
    { title: 'Outlier Analysis', unit: 'Unit 1', url: 'unit1.html#analysis' },
    // Unit 2
    { title: 'Data Attributes', unit: 'Unit 2: Data Concepts', url: 'unit2.html#data-attributes' },
    { title: 'Nominal Attributes', unit: 'Unit 2', url: 'unit2.html#data-attributes' },
    { title: 'Binary Attributes', unit: 'Unit 2', url: 'unit2.html#data-attributes' },
    { title: 'Ordinal Attributes', unit: 'Unit 2', url: 'unit2.html#data-attributes' },
    { title: 'Numeric Attributes', unit: 'Unit 2', url: 'unit2.html#data-attributes' },
    { title: 'Discrete vs Continuous', unit: 'Unit 2', url: 'unit2.html#data-attributes' },
    { title: 'Central Tendency – Mean Median Mode', unit: 'Unit 2', url: 'unit2.html#central-tendency' },
    { title: 'Mean', unit: 'Unit 2', url: 'unit2.html#central-tendency' },
    { title: 'Median', unit: 'Unit 2', url: 'unit2.html#central-tendency' },
    { title: 'Mode', unit: 'Unit 2', url: 'unit2.html#central-tendency' },
    { title: 'Dispersion – Range Variance Standard Deviation', unit: 'Unit 2', url: 'unit2.html#dispersion' },
    { title: 'Quartiles', unit: 'Unit 2', url: 'unit2.html#dispersion' },
    { title: 'Interquartile Range', unit: 'Unit 2', url: 'unit2.html#dispersion' },
    { title: 'Standard Deviation', unit: 'Unit 2', url: 'unit2.html#dispersion' },
    { title: 'Variance', unit: 'Unit 2', url: 'unit2.html#dispersion' },
    // Unit 3
    { title: 'Data Preprocessing', unit: 'Unit 3: Data Preprocessing', url: 'unit3.html#need-preprocessing' },
    { title: 'Data Cleaning', unit: 'Unit 3', url: 'unit3.html#data-cleaning' },
    { title: 'Missing Values', unit: 'Unit 3', url: 'unit3.html#data-cleaning' },
    { title: 'Noisy Data', unit: 'Unit 3', url: 'unit3.html#data-cleaning' },
    { title: 'Data Integration', unit: 'Unit 3', url: 'unit3.html#data-integration' },
    { title: 'Redundancy', unit: 'Unit 3', url: 'unit3.html#data-integration' },
    { title: 'Duplicate Detection', unit: 'Unit 3', url: 'unit3.html#data-integration' },
    { title: 'Data Reduction', unit: 'Unit 3', url: 'unit3.html#data-reduction' },
    { title: 'PCA – Principal Component Analysis', unit: 'Unit 3', url: 'unit3.html#data-reduction' },
    { title: 'Attribute Subset Selection', unit: 'Unit 3', url: 'unit3.html#data-reduction' },
    { title: 'Histograms', unit: 'Unit 3', url: 'unit3.html#data-reduction' },
    // Unit 4
    { title: 'Classification', unit: 'Unit 4: Classification & Clustering', url: 'unit4.html#classification' },
    { title: 'Decision Trees', unit: 'Unit 4', url: 'unit4.html#classification' },
    { title: 'Naive Bayes', unit: 'Unit 4', url: 'unit4.html#classification' },
    { title: 'Rule-based Classification', unit: 'Unit 4', url: 'unit4.html#classification' },
    { title: 'SVM – Support Vector Machine', unit: 'Unit 4', url: 'unit4.html#classification' },
    { title: 'KNN – K-Nearest Neighbor', unit: 'Unit 4', url: 'unit4.html#classification' },
    { title: 'Genetic Algorithms', unit: 'Unit 4', url: 'unit4.html#classification' },
    { title: 'Fuzzy Sets', unit: 'Unit 4', url: 'unit4.html#classification' },
    { title: 'Clustering', unit: 'Unit 4', url: 'unit4.html#clustering' },
    { title: 'K-means Clustering', unit: 'Unit 4', url: 'unit4.html#clustering' },
    { title: 'Hierarchical Clustering', unit: 'Unit 4', url: 'unit4.html#clustering' },
    { title: 'Partition Clustering', unit: 'Unit 4', url: 'unit4.html#clustering' },
    // Unit 5
    { title: 'Data Mining Tools', unit: 'Unit 5: Data Mining Tools', url: 'unit5.html#intro-tools' },
    { title: 'Weka Tool', unit: 'Unit 5', url: 'unit5.html#intro-tools' },
    { title: 'Load Data in Tools', unit: 'Unit 5', url: 'unit5.html#features-tools' },
    { title: 'Feature Selection in Tools', unit: 'Unit 5', url: 'unit5.html#features-tools' },
    { title: 'Association in Tools', unit: 'Unit 5', url: 'unit5.html#features-tools' },
    // Unit 6
    { title: 'Data Warehousing', unit: 'Unit 6: Data Warehousing', url: 'unit6.html#basics-dw' },
    { title: 'Operational DB vs Data Warehouse', unit: 'Unit 6', url: 'unit6.html#basics-dw' },
    { title: 'Characteristics of Data Warehouse', unit: 'Unit 6', url: 'unit6.html#basics-dw' },
    { title: 'ETL Process', unit: 'Unit 6', url: 'unit6.html#architecture-dw' },
    { title: 'Multitier Architecture', unit: 'Unit 6', url: 'unit6.html#architecture-dw' },
    { title: 'Data Mart', unit: 'Unit 6', url: 'unit6.html#architecture-dw' },
    { title: 'Metadata Repository', unit: 'Unit 6', url: 'unit6.html#architecture-dw' },
    { title: 'Virtual Warehouse', unit: 'Unit 6', url: 'unit6.html#architecture-dw' },
  ];

  function performSearch(query) {
    var q = query.trim().toLowerCase();
    if (!q) {
      searchResults.classList.remove('visible');
      return;
    }
    var matches = searchData.filter(function (item) {
      return item.title.toLowerCase().includes(q) || item.unit.toLowerCase().includes(q);
    });

    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="no-results">No results found for "<strong>' + escapeHTML(query) + '</strong>"</div>';
    } else {
      searchResults.innerHTML = matches.slice(0, 8).map(function (item) {
        return '<a href="' + item.url + '" class="search-result-item">' +
          '<div class="result-title">' + highlightMatch(item.title, q) + '</div>' +
          '<div class="result-unit">' + escapeHTML(item.unit) + '</div>' +
          '</a>';
      }).join('');
    }
    searchResults.classList.add('visible');
  }

  function highlightMatch(text, q) {
    var escaped = escapeHTML(text);
    var escapedQ = escapeHTML(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escaped.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark>$1</mark>');
  }

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  if (searchBar && searchResults) {
    searchBar.addEventListener('input', function () {
      performSearch(searchBar.value);
    });

    searchBar.addEventListener('focus', function () {
      if (searchBar.value.trim()) {
        searchResults.classList.add('visible');
      }
    });

    // Hide results on outside click
    document.addEventListener('click', function (e) {
      if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('visible');
      }
    });

    // Keyboard: Escape closes
    searchBar.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchResults.classList.remove('visible');
        searchBar.blur();
      }
    });
  }

});
