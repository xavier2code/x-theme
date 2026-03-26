(function() {
    const STORE_URL = (window.SEARCH_BASE || '') + 'search_index.json';
    const DEBOUNCE_MS = 150;

    let searchIndex = null;
    let searchStore = null;
    let searchBox = null;
    let resultsDropdown = null;
    let debounceTimer = null;
    let activeIndex = -1;
    let resultLinks = [];

    async function loadStore() {
        try {
            const response = await fetch(STORE_URL);
            if (!response.ok) {
                console.warn('Search store not found');
                return [];
            }
            const data = await response.json();

            if (data.store) {
                return data.store;
            } else if (data.posts) {
                return data.posts;
            }
            return [];
        } catch (e) {
            console.warn('Failed to load store:', e);
            return [];
        }
    }

    function buildIndex(store) {
        const index = elasticlunr(function() {
            this.addField('title');
            this.addField('description');
            this.addField('content');
            this.setRef('id');
        });

        store.forEach(function(doc) {
            index.addDoc({
                id: doc.id || doc.url,
                title: doc.title || '',
                description: doc.description || '',
                content: doc.content || ''
            });
        });

        return index;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function getExcerpt(text, query, maxLength = 120) {
        if (!text) return '';
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const idx = lowerText.indexOf(lowerQuery);
        if (idx === -1) return text.slice(0, maxLength) + '...';

        const start = Math.max(0, idx - 40);
        const end = Math.min(text.length, idx + query.length + 80);
        let excerpt = text.slice(start, end);
        if (start > 0) excerpt = '...' + excerpt;
        if (end < text.length) excerpt += '...';
        return excerpt;
    }

    function renderResults(query) {
        if (!query.trim()) {
            resultsDropdown.innerHTML = '';
            resultsDropdown.classList.remove('show');
            return;
        }

        if (!searchIndex || !searchStore || searchStore.length === 0) {
            resultsDropdown.innerHTML = '<div class="search-no-results">Search not ready</div>';
            resultsDropdown.classList.add('show');
            return;
        }

        let results;
        try {
            results = searchIndex.search(query, {
                fields: {
                    title: { boost: 2 },
                    description: { boost: 1 },
                    content: { boost: 0.5 }
                },
                expand: true
            });
        } catch (e) {
            console.warn('Search error:', e);
            results = [];
        }

        if (results.length === 0) {
            resultsDropdown.innerHTML = '<div class="search-no-results">No results found</div>';
            resultsDropdown.classList.add('show');
            return;
        }

        const storeMap = {};
        searchStore.forEach(function(doc) {
            storeMap[doc.id || doc.url] = doc;
        });

        resultsDropdown.innerHTML = results.slice(0, 8).map(function(result) {
            const doc = storeMap[result.ref] || {};
            return '<a href="' + escapeHtml(doc.url || result.ref) + '" class="search-result">' +
                '<div class="search-result-title">' + escapeHtml(doc.title || '') + '</div>' +
                (doc.description ? '<div class="search-result-excerpt">' + escapeHtml(getExcerpt(doc.description, query)) + '</div>' : '') +
                '</a>';
        }).join('');
        resultsDropdown.classList.add('show');
        activeIndex = -1;
        resultLinks = Array.from(resultsDropdown.querySelectorAll('.search-result'));
    }

    function handleInput(e) {
        clearTimeout(debounceTimer);
        const query = e.target.value;
        debounceTimer = setTimeout(() => renderResults(query), DEBOUNCE_MS);
    }

    function handleClickOutside(e) {
        if (searchBox && !searchBox.contains(e.target) && !resultsDropdown.contains(e.target)) {
            resultsDropdown.classList.remove('show');
            activeIndex = -1;
        }
    }

    function handleKeydown(e) {
        if (!resultsDropdown.classList.contains('show')) return;

        if (e.key === 'Escape') {
            resultsDropdown.classList.remove('show');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (activeIndex < resultLinks.length - 1) {
                activeIndex++;
                updateActiveResult();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeIndex > 0) {
                activeIndex--;
                updateActiveResult();
            }
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            if (resultLinks[activeIndex]) {
                resultLinks[activeIndex].click();
            }
        }
    }

    function updateActiveResult() {
        resultLinks.forEach(function(link, i) {
            link.classList.toggle('active', i === activeIndex);
        });
        if (resultLinks[activeIndex]) {
            resultLinks[activeIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    async function init() {
        searchStore = await loadStore();
        if (searchStore.length === 0) {
            console.warn('No search data loaded');
            return;
        }

        searchIndex = buildIndex(searchStore);

        searchBox = document.querySelector('.search-input');
        resultsDropdown = document.querySelector('.search-results');

        if (searchBox) {
            searchBox.addEventListener('input', handleInput);
            searchBox.addEventListener('focus', function() {
                if (searchBox.value.trim()) renderResults(searchBox.value);
            });
        }

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeydown);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();