document.addEventListener('DOMContentLoaded', function () {
    /********* SCROLLING ARTICLES lOGIC ********/
    document.querySelectorAll('.article-carousel-wrapper').forEach(wrapper => {
        const track = wrapper.querySelector('.article-carousel');
        const prevBtn = wrapper.querySelector('.prev');
        const nextBtn = wrapper.querySelector('.next');

        function scrollByCard(direction) {
            const card = track.querySelector('.science-card');
            const cardWidth = card.getBoundingClientRect().width;
            const gap = 24;
            track.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' });
        }

        prevBtn.addEventListener('click', () => scrollByCard(-1));
        nextBtn.addEventListener('click', () => scrollByCard(1));

        // greyed out button logic
        function updateArrows() {
            const trackStyles = getComputedStyle(track);
            const paddingLeft = parseFloat(trackStyles.paddingLeft) || 0;
            const paddingRight = parseFloat(trackStyles.paddingRight) || 0;

            const maxScroll = track.scrollWidth - track.clientWidth;
            const atStart = track.scrollLeft <= paddingLeft + 5;
            const atEnd = track.scrollLeft >= maxScroll - paddingRight - 5;

            prevBtn.classList.toggle('is-disabled', atStart);
            nextBtn.classList.toggle('is-disabled', atEnd);
        }
        track.addEventListener('scroll', updateArrows);
        updateArrows();
    });

    /********* SEARCH ARTICLES LOGIC ********/
    const input = document.getElementById('science-search-input');
    const button = document.getElementById('science-search-btn');
    const resultsContainer = document.getElementById('science-search-results');

    const originalCards = Array.from(document.querySelectorAll('.science-card'));

    function runSearch() {
        const query = input.value.trim().toLowerCase();

        resultsContainer.innerHTML = '';

        if (query === '') {
            return;
        }

        const matches = originalCards.filter(card => {
            const title = card.querySelector('.science-card-title')?.textContent.toLowerCase() || '';
            const summary = card.querySelector('.science-card-summary')?.textContent.toLowerCase() || '';
            return title.includes(query) || summary.includes(query);
        });

        if (matches.length === 0) {
            const noResults = document.createElement('p');
            noResults.className = 'science-search-no-results';
            noResults.textContent = `No results found for "${input.value.trim()}".`;
            resultsContainer.appendChild(noResults);
            return;
        }

        const row = document.createElement('div');
        row.className = 'science-search-results-row';

        matches.forEach(card => {
            row.appendChild(card.cloneNode(true));
        });

        resultsContainer.appendChild(row);
    }

    if (button && input) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            runSearch();
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                runSearch();
            }
        });
    }

    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');

    if (searchParam) {
        input.value = searchParam;
        runSearch();
        window.history.replaceState(
            {},
            '',
            window.location.pathname + window.location.hash
        );
    }

    /********* ABSTRACT MODAL LOGIC ********/
    document.querySelectorAll('.read-abstract-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const modal = document.getElementById(btn.dataset.modalTarget);
        if (modal) modal.classList.add('active');
        });
    });

    document.querySelectorAll('.abstract-modal').forEach(modal => {
        modal.querySelector('.abstract-modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.abstract-modal.active').forEach(m => m.classList.remove('active'));
        }
    });
});