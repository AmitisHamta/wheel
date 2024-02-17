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

const loginError = error => {
    errorText.textContent = error;
    errorText.classList.add('display-inline');
    setTimeout(() => {
        errorText.classList.remove('display-inline');
    }, 3000)
}

const resetInputs = () => {
    phoneInput.value = '';
}

const showPrizeModal = () => {
    hideSpinLazyLoader();
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
    hideSpinLazyLoader();
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
    wheelEffect.play().then(() => {
        spin();
    })
}

const playWinEffect = () => {
    winEffect.play().then(() => {
        showPrizeModal();
    })
}

const playFailEffect = () => {
    failEffect.play()
}

const playWinVideo = () => {
    winVideo.classList.add('show-video')
    winVideo.play().then(() => {
        if (!winVideo.paused) {
            playWinEffect();
        }
    })
}

const removeVideo = () => {
    winVideo.classList.remove('show-video');
}

const showSpinLazyLoader = () => {
    spinBtn.disabled = true;
    const btnText = $.querySelector('.spin p');
    const lazyLoader = $.querySelector('.loader');
    btnText.classList.add('display-none');
    lazyLoader.classList.add('display-inline');
}

const hideSpinLazyLoader = () => {
    const btnText = $.querySelector('.spin p');
    const lazyLoader = $.querySelector('.loader');
    btnText.classList.remove('display-none');
    lazyLoader.classList.remove('display-inline');
}

const spin = () => {
        const box = $.getElementById('box');
        const element = $.getElementById('mainbox');
    
        let first = shuffle([1890, 2250, 2610]);
        let second = shuffle([1850, 2210, 2570]);
        let third = shuffle([1770, 2130, 2490]);
        let fourth = shuffle([1810, 2270, 2530]);
        let fifth = shuffle([1750, 2110, 2470]);
        let sixth = shuffle([1630, 1990, 2350]);
        let seventh = shuffle([1570, 1930, 2290]);
    
        let results = shuffle([first[0], second[0], third[0], fourth[0], fifth[0], sixth[0], seventh[0]]);
    
        box.style.setProperty('transition', 'all ease 5s');
        box.style.transform = `rotate(${results[0]}deg)`;
        element.classList.remove('animate');
        hideSpinLazyLoader();

        // random index generation

        // check index in database


        setTimeout(() => {
            element.classList.add('animate');
            // show the result / show prize if won || show fail if lost
            showSpinLazyLoader();
            playWinVideo();
            // showLossModal();
            // playFailEffect();
            box.style.setProperty(`transition`, 'initial');
            box.style.transform = 'rotate(90deg)';
            spinBtn.disabled = false;

            // update user chance
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

const checkPhoneValidation = () => {
    if (!phoneInput.value) {
        loginError('* لطفا شماره تلفن همراه خود را وارد کنید')
    }else if (!phoneRegex.test(phoneInput.value)) {
        loginError('* شماره تلفن صحیح نمیباشد');
    }else {
        getUsersData(phoneInput.value);
    }
}

async function getUsersData (phone) {
    const formData = new FormData();
    formData.append('phone', phone);

    const requestOpions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    }

    await fetch('https://gardone.liara.run/acceptors/get_phone/', requestOpions)
    .then(response => {
        if (response.ok) {
            return response.text()
        }else {
            loginError('* شماره به عنوان پذیرنده ثبت نشده')
        }
    })
    .then(res => JSON.parse(res))
    .then(users => checkUserData(users, phone))
    .catch(() =>  {
        console.log('catch err');
        loginError('* شماره به عنوان پذیرنده ثبت نشده')
    })
}

async function checkUserData (users, phone) {
    let currentUser = {};
    let isInList = false;

    console.log(users);
    users.forEach(user => {
        if (user.phone.includes(phone)) {
            isInList = true;
            currentUser = user;
        }else {
            isInList = false;
        }
    })

    if (isInList) {
        checkUserChance(currentUser);
    }else {
        loginError('* شماره به عنوان پذیرنده ثبت نشده');
    }
}

const checkUserChance = user => {
    if (user.count_chance > 0) {
        resetInputs();
        closeLoginModal();
    }else {
        loginError('* شانس شما برای گردونه تموم شده، منتظر فرصت های بعدی باش ')
    }
}

window.addEventListener('load', async function ()  {
    removeFilter();
    showLoginModal();
})

spinBtn.addEventListener('click', () => {
    showSpinLazyLoader();
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
    checkPhoneValidation();
})

// phone existing check in database
// user chances check