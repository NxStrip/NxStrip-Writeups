// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;

themeBtn.addEventListener('click', () => {
    const newTheme = htmlTag.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlTag.setAttribute('data-theme', newTheme);
    themeBtn.querySelector('.icon').innerText = newTheme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
});

if (localStorage.getItem('theme')) {
    const saved = localStorage.getItem('theme');
    htmlTag.setAttribute('data-theme', saved);
    themeBtn.querySelector('.icon').innerText = saved === 'dark' ? '🌙' : '☀️';
}

// Card Generator
function createCard(post) {
    const card = document.createElement('a');
    card.href = post.link;
    card.target = "_top"; // This is the key fix for the rewrite layout
    card.className = 'card';
    card.innerHTML = `
        <span class="platform-tag">${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
    `;
    return card;
}

// --- HOMEPAGE LOGIC (Latest 3) ---
const latestGrid = document.getElementById('latest-grid');
if (latestGrid) {
    writeups.slice(0, 3).forEach(post => latestGrid.appendChild(createCard(post)));
}

// --- WRITEUPS PAGE LOGIC (Filtering) ---
const allWriteupsGrid = document.getElementById('all-writeups-grid');
const platformFilter = document.getElementById('platform-filter');
const ctfFilter = document.getElementById('ctf-filter');
const resetBtn = document.getElementById('reset-btn');

if (allWriteupsGrid) {
    function renderWriteups(data) {
        allWriteupsGrid.innerHTML = '';
        data.forEach(post => allWriteupsGrid.appendChild(createCard(post)));
    }

    // Initial Load
    renderWriteups(writeups);

    // Filter Logic
    function applyFilters() {
        const platformVal = platformFilter.value;
        const ctfVal = ctfFilter.value;

        let filtered = writeups;

        if (platformVal !== 'all') {
            filtered = filtered.filter(w => w.category === 'Platform' && w.tag === platformVal);
            ctfFilter.value = 'all'; // Reset the other dropdown
        } else if (ctfVal !== 'all') {
            filtered = filtered.filter(w => w.category === 'CTF' && w.tag === ctfVal);
            platformFilter.value = 'all'; // Reset the other dropdown
        }

        renderWriteups(filtered);
    }

    platformFilter.addEventListener('change', applyFilters);
    ctfFilter.addEventListener('change', applyFilters);

    resetBtn.addEventListener('click', () => {
        platformFilter.value = 'all';
        ctfFilter.value = 'all';
        renderWriteups(writeups);
    });
}
