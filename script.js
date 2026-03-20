// --- THEME LOGIC ---
const themeBtn = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;

themeBtn.addEventListener('click', () => {
    const newTheme = htmlTag.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlTag.setAttribute('data-theme', newTheme);
    themeBtn.querySelector('.icon').innerText = newTheme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlTag.setAttribute('data-theme', savedTheme);
    if(themeBtn) themeBtn.querySelector('.icon').innerText = savedTheme === 'dark' ? '🌙' : '☀️';
}

// --- ACTIVE LINK HIGHLIGHTING ---
// This finds which page you are on and highlights the correct nav link
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    if (link.getAttribute('href').includes(currentPath) && currentPath !== "/") {
        link.classList.add('active');
    }
});

// --- CARD GENERATOR ---
function createCard(post) {
    const card = document.createElement('a');
    card.href = post.link;
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
    // Show only the 3 most recent writeups
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

    renderWriteups(writeups);

    function applyFilters() {
        const platformVal = platformFilter.value;
        const ctfVal = ctfFilter.value;
        let filtered = writeups;

        if (platformVal !== 'all') {
            filtered = filtered.filter(w => w.category === 'Platform' && w.tag === platformVal);
            ctfFilter.value = 'all'; 
        } else if (ctfVal !== 'all') {
            filtered = filtered.filter(w => w.category === 'CTF' && w.tag === ctfVal);
            platformFilter.value = 'all';
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
