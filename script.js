const themes = [
    { background: '#F8E9E9', font: '#2C3E50' },
    { background: '#E9F8F1', font: '#34495E' },
    { background: '#E9EDF8', font: '#8E44AD' },
    { background: '#F8F3E9', font: '#16A085' },
    { background: '#F1E9F8', font: '#D35400' }
];

let currentTheme;

function setRandomInitialTheme() {
    currentTheme = Math.floor(Math.random() * themes.length);
    applyTheme();
}

function changeTheme(event) {
    currentTheme = (currentTheme + 1) % themes.length;
    applyTheme();
    if (event) {
        createRipple(event);
    }
}

function applyTheme() {
    document.body.style.backgroundColor = themes[currentTheme].background;
    document.body.style.color = themes[currentTheme].font;
    
    const header = document.querySelector('header');
    header.style.backgroundColor = themes[currentTheme].background;
    header.style.color = themes[currentTheme].font;
}

function createRipple(event) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    ripple.style.borderColor = themes[currentTheme].font;
    
    const rippleContainer = document.getElementById('ripple-container');
    rippleContainer.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

function handleNavClick(event) {
    // Prevent default link behavior
    event.preventDefault();
    
    // Change theme
    changeTheme();
    
    // Navigate to the new page after a short delay
    setTimeout(() => {
        window.location.href = event.target.href;
    }, 200);
}

function applyTheme() {
    // Apply background and font color to the body and header
    document.body.style.backgroundColor = themes[currentTheme].background;
    document.body.style.color = themes[currentTheme].font;
    
    const header = document.querySelector('header');
    header.style.backgroundColor = themes[currentTheme].background;
    header.style.color = themes[currentTheme].font;
    
    // Update colors
    document.documentElement.style.setProperty('--scrollbar-bg', themes[currentTheme].background);
    document.documentElement.style.setProperty('--scrollbar-thumb', themes[currentTheme].font);
    document.documentElement.style.setProperty('--first-rect-bg', themes[currentTheme].background);
    document.documentElement.style.setProperty('--first-rect-font', themes[currentTheme].font);
}

function handleScroll() {
    const rectThree = document.getElementById('rect-three');
    const header = document.querySelector('header');
    const rectThreeTop = rectThree.getBoundingClientRect().top;
    const headerBottom = header.getBoundingClientRect().bottom;

    if (rectThreeTop <= headerBottom && rectThreeTop > 0) {
        // Make rect-three fixed when its top is within the viewport but below the header
        rectThree.style.position = 'fixed';
        rectThree.style.top = `${headerBottom}px`;
        rectThree.style.transform = 'translateX(-50%) translateY(0)';
    } else {
        // Reset rect-three to its original position
        rectThree.style.position = 'relative';
        rectThree.style.top = '50%';
        rectThree.style.transform = 'translateX(-50%) translateY(114%)';
    }
}
// Add the scroll event listener
window.addEventListener('scroll', handleScroll);

// Set random initial theme on page load
setRandomInitialTheme();

// Add click event listeners
document.body.addEventListener('click', changeTheme);
document.querySelector('header').addEventListener('click', changeTheme);

// Add click event listeners to navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
});