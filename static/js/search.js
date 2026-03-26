(function() {
    const STORE_URL = '/search_index.json';
    const DEBOUNCE_MS = 150;

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

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function getExcerpt(text, query, maxLength = 100) {
        if (!text) return '';
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const idx = lowerText.indexOf(lowerQuery);
        if (idx === -1) return text.slice(0, maxLength) + '...';

        const start = Math.max(0, idx - 30);
        const end = Math.min(text.length, idx + query.length + 70);
        let excerpt = text.slice(start, end);
        if (start > 0) excerpt = '...' + excerpt;
        if (end < text.length) excerpt += '...';
        return excerpt;
    }

    function simpleSearch(store, query) {
        const q = query.toLowerCase();
        const results = [];

        for (let i = 0; i < store.length; i++) {
            const item = store[i];
            const titleLower = (item.title || '').toLowerCase();
            const descLower = (item.description || '').toLowerCase();
            const contentLower = (item.content || '').toLowerCase();

            let score = 0;
            if (titleLower.includes(q)) score += 10;
            if (descLower.includes(q)) score += 5;
            if (contentLower.includes(q)) score += 1;

            if (score > 0) {
                results.push({ item, score });
            }
        }

        results.sort((a, b) => b.score - a.score);
        return results.map(r => r.item);
    }

    function renderResults(query) {
        if (!query.trim()) {
            resultsDropdown.innerHTML = '';
            resultsDropdown.classList.remove('show');
            return;
        }

        if (!searchStore || searchStore.length === 0) {
            resultsDropdown.innerHTML = '<div class="search-no-results">Search not ready</div>';
            resultsDropdown.classList.add('show');
            return;
        }

        const results = simpleSearch(searchStore, query);

        if (results.length === 0) {
            resultsDropdown.innerHTML = '<div class="search-no-results">No results found</div>';
            resultsDropdown.classList.add('show');
            return;
        }

        resultsDropdown.innerHTML = results.slice(0, 8).map(item => `
            <a href="${escapeHtml(item.url || item.permalink)}" class="search-result">
                <div class="search-result-title">${escapeHtml(item.title)}</div>
                ${item.description ? `<div class="search-result-excerpt">${escapeHtml(getExcerpt(item.description, query))}</div>` : ''}
            </a>
        `).join('');
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
        resultLinks.forEach((link, i) => {
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

        searchBox = document.querySelector('.search-input');
        resultsDropdown = document.querySelector('.search-results');

        if (searchBox) {
            searchBox.addEventListener('input', handleInput);
            searchBox.addEventListener('focus', () => {
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
