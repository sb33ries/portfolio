const themes = [
    { background: '#F3C4C4', font: '#282B29' }, 
    { background: '#EBEDED', font: '#E83C38' },
    { background: '#00A19A', font: '#EBEDED' },
    { background: '#A6D1C9', font: '#E83C38' },
    { background: '#282B29', font: '#A6D1C9' }
];

// pink black
// white red
// blue white
// turq red
// gray blue

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

let initialSumValue = null;

function handleScroll() {
    const rectThree = document.getElementById('rect-three');
    const sparsityBox = document.getElementById('sparsity-box');
    const sparsityTop = sparsityBox.getBoundingClientRect().top;
    const header = document.querySelector('header');
    const rectThreeTop = rectThree.getBoundingClientRect().top;
    const headerBottom = header.getBoundingClientRect().bottom;

    // Debugging logs
    console.log('rectThreeTop:', rectThreeTop);
    console.log('headerBottom:', headerBottom);
    console.log('window.scrollY:', window.scrollY);

    if (initialSumValue === null) {
        initialSumValue = rectThreeTop + window.scrollY;
    }

    // Handle rect-three positioning
    if (window.scrollY < initialSumValue) {
        console.log('Resetting position to relative');
        rectThree.style.position = 'relative';
        rectThree.style.top = '50%';
        rectThree.style.transform = 'translateX(-50%) translateY(101%)';
        rectThree.style.zIndex = 5;
        sparsityBox.style.transform = 'translateY(150%)'; // Increase to move down
    } else if (rectThreeTop <= 0) {
        console.log('Setting position to fixed');
        rectThree.style.position = 'fixed';
        rectThree.style.top = `0px`;
        rectThree.style.transform = 'translateX(-50%) translateY(0%)';
        rectThree.style.zIndex = 5;
        sparsityBox.style.transform = 'translateY(375%)';
    }

    console.log('SUM OF VALUES:', initialSumValue);
    console.log('- Sparsity Top:', sparsityTop);
}

// Add event listener for scroll
window.addEventListener('scroll', handleScroll);

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const speedFactor = 0.5; // Adjust this value to control scroll speed; < 1 makes it faster
    const box = document.getElementById('tribeties-box');

    // Update the position
    box.style.transform = `translateY(${scrollPosition * speedFactor}px) translateY(350%)`;
});


// Initial call to set correct positions
handleScroll();

// Set random initial theme on page load
setRandomInitialTheme();

// Add click event listeners
document.body.addEventListener('click', changeTheme);
document.querySelector('header').addEventListener('click', changeTheme);

document.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.scrollY;

    if (scrollTop > 650) { // Adjust the value as needed
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add click event listeners to navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
});