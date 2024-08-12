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
    // Create inner ripple
    const rippleInner = document.createElement('div');
    rippleInner.classList.add('ripple-inner');
    rippleInner.style.left = `${event.clientX}px`;
    rippleInner.style.top = `${event.clientY}px`;
    rippleInner.style.borderColor = themes[currentTheme].font;

    // Create outer ripple
    const rippleOuter = document.createElement('div');
    rippleOuter.classList.add('ripple-outer');
    rippleOuter.style.left = `${event.clientX}px`;
    rippleOuter.style.top = `${event.clientY}px`;
    rippleOuter.style.borderColor = themes[currentTheme].font;

    const rippleContainer = document.getElementById('ripple-container');
    rippleContainer.appendChild(rippleInner);
    rippleContainer.appendChild(rippleOuter);

    // Function to update ripple position
    function followCursor(e) {
        rippleInner.style.left = `${e.clientX}px`;
        rippleInner.style.top = `${e.clientY}px`;
        rippleOuter.style.left = `${e.clientX}px`;
        rippleOuter.style.top = `${e.clientY}px`;
    }

    // Attach the mousemove event listener
    document.addEventListener('mousemove', followCursor);

    // Remove ripple and event listener when animation ends
    rippleInner.addEventListener('animationend', () => {
        rippleInner.remove();
        document.removeEventListener('mousemove', followCursor);
    });

    rippleOuter.addEventListener('animationend', () => {
        rippleOuter.remove();
        document.removeEventListener('mousemove', followCursor);
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

let initialRectThreeTop = null;
let initialRectFourTop = null;
let initialPositionsSet = false;

function handleScroll() {
    const rectThree = document.getElementById('rect-three');
    const rectThreeTop = rectThree.getBoundingClientRect().top;
    
    const rectFour = document.getElementById('rect-four');
    const rectFourTop = rectFour.getBoundingClientRect().top;

    const sparsityBox = document.getElementById('sparsity-box');
    const sparsityTop = sparsityBox.getBoundingClientRect().top;

    const header = document.querySelector('header');
    const headerBottom = header.getBoundingClientRect().bottom;

    // Set initial positions only once after scrolling past 90px
    if (window.scrollY > 90 && !initialPositionsSet) {
        initialRectThreeTop = rectThreeTop + window.scrollY;
        initialRectFourTop = rectFourTop + window.scrollY;
        initialPositionsSet = true;
    }

    // Calculate current sums
    const currentSumValue3 = initialPositionsSet ? initialRectThreeTop : null;

    // Debugging logs
    console.log('rectThreeTop:', rectThreeTop);
    console.log('headerBottom:', headerBottom);
    console.log('window.scrollY:', window.scrollY);
    console.log('SUM OF VALUES3:', currentSumValue3);
    console.log('- Sparsity Top:', sparsityTop);

    // Handle rect-three positioning
    if (window.scrollY -0 < currentSumValue3) {
        // console.log('Resetting position to relative');
        rectThree.style.position = 'relative';
        rectThree.style.top = '50%';
        rectThree.style.transform = 'translateX(-50%) translateY(16%)';
        rectThree.style.zIndex = 5;
        // sparsityBox.style.transform = 'translateY(-40%)'; // Increase to move down
    } else if (rectThreeTop <= 70) {
        // console.log('Setting position to fixed');
        rectThree.style.position = 'fixed';
        rectThree.style.top = `0%`;
        rectThree.style.transform = 'translateX(-50%) translateY(8%)';
        rectThree.style.zIndex = 5;
        // sparsityBox.style.transform = 'translateY(185%)';
    }
}

// Add event listener for scroll
window.addEventListener('scroll', handleScroll);

// Initial call to set correct positions
handleScroll();

// Set random initial theme on page load
setRandomInitialTheme();

// Add click event listeners
document.addEventListener('mouseup', changeTheme);
document.querySelector('header').addEventListener('mouseup', changeTheme);


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
