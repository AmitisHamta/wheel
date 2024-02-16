"use strict"

import  Footer  from "../components/footer/footer.js";
import  Header  from '../components/header/header.js';
import Loader from '../components/loader/loader.js';

window.customElements.define('site-header', Header);
window.customElements.define('site-footer', Footer);
window.customElements.define('site-loader', Loader);

const $ = document;
const container = $.getElementById('container');
const content = $.getElementById('content');
const modal = $.getElementById('data-modal');
const submitBtn = $.getElementById('submit-btn');
const phoneInput = $.getElementById('phone-input');
const errorText = $.querySelector('small');
const spinBtn = $.querySelector('.spin');
const prizeModal = $.querySelector('.prize-modal');
const prizeButton = $.querySelector('.prize-modal button');
const lossModal = $.getElementById('loss');
const LossButton = $.querySelector('#loss button');
const wheelEffect = $.getElementById('wheelEffect');
const winEffect = $.getElementById('winEffect');
const failEffect = $.getElementById('failEffect');
const winVideo = $.getElementById('winVideo');

const phoneRegex = /^(?:(?:\+|00)98|0)?9\d{9}$/;

const removeFilter = () => {
    container.style.filter = 'none';
}

const showLoginModal = () => {
    modal.classList.add('slide-in-blurred-top');
}

const closeLoginModal = () => {
    errorText.classList.remove('display-inline');
    modal.classList.add('slide-out-blurred-bottom');
    content.style.filter = 'none';
    setTimeout(() => {
        modal.classList.add('display-none');
    }, 500);
}

const loginError = () => {
    errorText.classList.add('display-inline');
    setTimeout(() => {
        errorText.classList.remove('display-inline');
    }, 3000)
}

const resetInputs = () => {
    phoneInput.value = '';
}

const showPrizeModal = () => {
    prizeModal.classList.remove('scale-out-center');
    prizeModal.classList.add('show-modal');
    prizeModal.classList.add('scale-in-center');
}

const hidePrizeModal = () => {
    prizeModal.classList.remove('scale-in-center');
    prizeModal.classList.add('scale-out-center');
    setTimeout(() => {
        prizeModal.classList.remove('show-modal');
    }, 300);
}

const showLossModal = () => {
    lossModal.classList.remove('scale-out-center');
    lossModal.classList.add('show-modal');
    lossModal.classList.add('scale-in-center');
}

const hideLossModal = () => {
    lossModal.classList.remove('scale-in-center');
    lossModal.classList.add('scale-out-center');
    setTimeout(() => {
        lossModal.classList.remove('show-modal');
    }, 300);
}

const playWheelEffect = () => {
    wheelEffect.play()
}

const playWinEffect = () => {
    winEffect.play()
}

const playFailEffect = () => {
    failEffect.play()
}

const playWinVideo = () => {
    winVideo.classList.add('show-video')
    winVideo.play()
}

const removeVideo = () => {
    winVideo.classList.remove('show-video');
}

const spin = () => {
        // prizeModal.classList.remove('show-modal');
        const box = $.getElementById('box');
        const element = $.getElementById('mainbox');
        let selectedItem = '';
    
        let first = shuffle([1890, 2250, 2610]);
        let second = shuffle([1850, 2210, 2570]);
        let third = shuffle([1770, 2130, 2490]);
        let fourth = shuffle([1810, 2270, 2530]);
        let fifth = shuffle([1750, 2110, 2470]);
        let sixth = shuffle([1630, 1990, 2350]);
        let seventh = shuffle([1570, 1930, 2290]);
    
        let results = shuffle([first[0], second[0], third[0], fourth[0], fifth[0], sixth[0], seventh[0]]);
    
        if (first.includes(results[0])) {
            selectedItem = 'جایزه اول'
        }else if (second.includes(results[0])) {
            selectedItem = 'جایزه دوم'
        }else if (third.includes(results[0])) {
            selectedItem = 'جایزه سوم'
        }else if (fourth.includes(results[0])) {
            selectedItem = 'جایزه چهارم'
        }else if (fifth.includes(results[0])) {
            selectedItem = 'جایزه پنجم'
        }else if (sixth.includes(results[0])) {
            selectedItem = 'جایزه ششم'
        }else if (seventh.includes(results[0])) {
            selectedItem = 'جایزه هفتم'
        }
    
        box.style.setProperty('transition', 'all ease 5s');
        box.style.transform = `rotate(${results[0]}deg)`;
        element.classList.remove('animate');
        setTimeout(() => {
            element.classList.add('animate');
            // checkPrize(clicked);
            showPrizeModal();
            playWinVideo()
            playWinEffect();
            // showLossModal();
            // playFailEffect()
            box.style.setProperty(`transition`, 'initial');
            box.style.transform = 'rotate(90deg)'
        }, 5000);
}

const shuffle = array => {
    let currentIndex = array.length;
    let randomIndex = null;
    
    while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[currentIndex], array[currentIndex]]
    }
    return array;
}

window.addEventListener('load', () => {
    removeFilter();
    showLoginModal();
})

spinBtn.addEventListener('click', () => {
    spin();
    playWheelEffect();
})

prizeButton.addEventListener('click', () => {
    hidePrizeModal();
    removeVideo();
})

LossButton.addEventListener('click', () => {
    hideLossModal();
})

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    closeLoginModal();
})

// phone input empty check
// phone input validation