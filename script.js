// --- Obsługa zakładek (tabów) ---
const tabLinks = document.querySelectorAll('.tab-link');
const tabSections = document.querySelectorAll('.tab-section');

// --- Typing animation for tab section headers ---
function animateTyping(element) {
    if (!element) return;
    const text = element.dataset.fulltext || element.textContent;
    element.dataset.fulltext = text;
    let i = 0;
    function type() {
        element.textContent = text.substring(0, i);
        if (i < text.length) {
            i++;
            setTimeout(type, 22 + Math.random()*30);
        } else {
            element.textContent = text;
            element.style.visibility = 'visible'; // zawsze widoczny po animacji
        }
    }
    element.style.visibility = 'visible'; // zawsze widoczny na starcie
    type();
}

function showTab(tab) {
    tabSections.forEach(section => {
        if (section.id === tab) {
            section.classList.add('active');
            section.style.display = 'block';
            section.style.opacity = '1';
            section.style.pointerEvents = '';
            // Typing animacja dla nagłówka sekcji
            const header = section.querySelector('h1, h2');
            if (header) animateTyping(header);
            // Re-trigger animation for Kadra org chart
            if (tab === 'kadra') {
                const cards = section.querySelectorAll('.team-card');
                cards.forEach(card => {
                    // Remove all animation classes
                    card.classList.remove('slide-in-up', 'slide-in-left', 'slide-in-right', 'fade-in', 'fade-in-delay');
                    // Force reflow
                    void card.offsetWidth;
                    // Add back the correct animation class
                    if (card.classList.contains('slide-in-up')) card.classList.add('slide-in-up');
                    else if (card.classList.contains('slide-in-left')) card.classList.add('slide-in-left');
                    else if (card.classList.contains('slide-in-right')) card.classList.add('slide-in-right');
                    else if (card.classList.contains('fade-in')) card.classList.add('fade-in');
                    else if (card.classList.contains('fade-in-delay')) card.classList.add('fade-in-delay');
                });
            }
        } else {
            section.classList.remove('active');
            section.style.display = 'none';
            section.style.opacity = '0';
            section.style.pointerEvents = 'none';
        }
    });
    tabLinks.forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector('.tab-link[data-tab="' + tab + '"]');
    if (activeLink) activeLink.classList.add('active');
}

tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.getAttribute('data-tab');
        showTab(tab);
    });
});
// Ustaw domyślnie pierwszą zakładkę jako aktywną
showTab('o-nas');

// --- Animacja SVG przy scrollowaniu ---
window.addEventListener('scroll', () => {
    const svg = document.getElementById('bankAnim');
    if (!svg) return;
    const rect1 = svg.getElementById('window1');
    const rect2 = svg.getElementById('window2');
    const rect3 = svg.getElementById('window3');
    const dot1 = svg.getElementById('dot1');
    const dot2 = svg.getElementById('dot2');
    const scrollY = window.scrollY;
    if (rect1 && rect2 && rect3 && dot1 && dot2) {
        rect1.setAttribute('transform', `translate(${Math.sin(scrollY/80)*10},${Math.cos(scrollY/60)*8})`);
        rect2.setAttribute('transform', `translate(${Math.cos(scrollY/60)*8},${Math.sin(scrollY/80)*10})`);
        rect3.setAttribute('transform', `translate(${Math.sin(scrollY/50)*12},${Math.cos(scrollY/50)*12})`);
        dot1.setAttribute('transform', `translate(${Math.sin(scrollY/30)*6},${Math.cos(scrollY/30)*6})`);
        dot2.setAttribute('transform', `translate(${Math.cos(scrollY/30)*6},${Math.sin(scrollY/30)*6})`);
    }
});

// --- Parallax metropolis SVG ---
function metropolisParallax() {
    document.querySelectorAll('.city-bg .city-svg').forEach(obj => {
        if (!obj.contentDocument) return;
        const svg = obj.contentDocument.getElementById('metropolis-svg');
        if (!svg) return;
        const back = svg.getElementById('layer-back');
        const mid = svg.getElementById('layer-mid');
        const front = svg.getElementById('layer-front');
        const scrollY = window.scrollY;
        if (back) back.setAttribute('transform', `translate(0,${scrollY * 0.08})`);
        if (mid) mid.setAttribute('transform', `translate(0,${scrollY * 0.16})`);
        if (front) front.setAttribute('transform', `translate(0,${scrollY * 0.28})`);
    });
}
window.addEventListener('scroll', metropolisParallax);
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(metropolisParallax, 500); // ensure SVG loaded
});
