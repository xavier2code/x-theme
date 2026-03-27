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

    function tokenizeChinese(text) {
        if (!text) return '';
        if (typeof Segment === 'undefined') {
            return text;
        }
        const segments = Segment.prototype.doSegment(text, { simple: true });
        return segments.join(' ');
    }

    function buildIndex(store) {
        const index = new FlexSearch.Document({
            document: {
                id: 'id',
                index: ['title', 'description', 'content'],
                store: ['title', 'description', 'content', 'url']
            },
            tokenize: 'full',
            cache: true
        });

        store.forEach(function(doc) {
            index.add({
                id: doc.id || doc.url,
                title: tokenizeChinese(doc.title || ''),
                description: tokenizeChinese(doc.description || ''),
                content: tokenizeChinese(doc.content || ''),
                url: doc.url || doc.id,
                _originalTitle: doc.title || '',
                _originalDescription: doc.description || ''
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

        let results = [];
        try {
            const tokenizedQuery = tokenizeChinese(query);
            results = searchIndex.search(tokenizedQuery, {
                limit: 8,
                enrich: true
            });
        } catch (e) {
            console.warn('Search error:', e);
        }

        const seen = new Set();
        const uniqueResults = [];
        results.forEach(function(fieldResult) {
            if (fieldResult.result) {
                fieldResult.result.forEach(function(item) {
                    if (!seen.has(item.id)) {
                        seen.add(item.id);
                        uniqueResults.push(item);
                    }
                });
            }
        });

        if (uniqueResults.length === 0) {
            resultsDropdown.innerHTML = '<div class="search-no-results">No results found</div>';
            resultsDropdown.classList.add('show');
            return;
        }

        resultsDropdown.innerHTML = uniqueResults.slice(0, 8).map(function(result) {
            const doc = result.doc || {};
            const title = doc._originalTitle || doc.title || '';
            const description = doc._originalDescription || doc.description || '';
            return '<a href="' + escapeHtml(doc.url || result.id) + '" class="search-result">' +
                '<div class="search-result-title">' + escapeHtml(title) + '</div>' +
                (description ? '<div class="search-result-excerpt">' + escapeHtml(getExcerpt(description, query)) + '</div>' : '') +
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
