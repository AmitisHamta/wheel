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
const errorText = $.querySelector('#data-modal small');
const spinBtn = $.querySelector('.spin');
const prizeModal = $.querySelector('.prize-modal');
const prizeButton = $.querySelector('#prize-btn');
const prizeMsg = $.querySelector('.prize-modal small')
// const lossModal = $.getElementById('loss');
// const LossButton = $.querySelector('#loss button');
const wheelEffect = $.getElementById('wheelEffect');
const winEffect = $.getElementById('winEffect');
// const failEffect = $.getElementById('failEffect');
const winVideo = $.getElementById('winVideo');
const cardInput = $.getElementById('card-input');

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
    removeVideo();
}

const hidePrizeModal = () => {
    prizeModal.classList.remove('scale-in-center');
    prizeModal.classList.add('scale-out-center');
    setTimeout(() => {
        prizeModal.classList.remove('show-modal');
    }, 300);
}

// const showLossModal = () => {
//     hideSpinLazyLoader();
//     lossModal.classList.remove('scale-out-center');
//     lossModal.classList.add('show-modal');
//     lossModal.classList.add('scale-in-center');
// }

// const hideLossModal = () => {
//     lossModal.classList.remove('scale-in-center');
//     lossModal.classList.add('scale-out-center');
//     setTimeout(() => {
//         lossModal.classList.remove('show-modal');
//     }, 300);
// }

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

// const playFailEffect = () => {
//     failEffect.play()
// }

const playWinVideo = () => {
    winVideo.classList.add('show-video');
    winVideo.play().then(() => {
        if (!winVideo.paused) {
            playWinEffect();
        }
    })
}

const removeVideo = () => {
    setTimeout(() => {
        winVideo.classList.remove('show-video');
    }, 3000);
}

const showSpinLazyLoader = () => {
    spinBtn.disabled = true;
    const btnText = $.querySelector('.spin p');
    const lazyLoader = $.querySelector('.spin .loader');
    btnText.classList.add('display-none');
    lazyLoader.classList.add('display-inline');
}

const hideSpinLazyLoader = () => {
    const btnText = $.querySelector('.spin p');
    const lazyLoader = $.querySelector('.spin .loader');
    btnText.classList.remove('display-none');
    lazyLoader.classList.remove('display-inline');
}

const showSubmitLazyLoader = () => {
    submitBtn.disabled = true;
    const btnText = $.querySelector('#submit-btn p');
    const lazyLoader = $.querySelector('#submit-btn .loader');
    btnText.classList.add('display-none');
    lazyLoader.classList.add('display-inline');
}

const hideSubmitLazyLoader = () => {
    submitBtn.disabled = false;
    const btnText = $.querySelector('#submit-btn p');
    const lazyLoader = $.querySelector('#submit-btn .loader');
    btnText.classList.remove('display-none');
    lazyLoader.classList.remove('display-inline');
}

const showPrizeLazyLoader = () => {
    prizeButton.disabled = true;
    const btnText = $.querySelector('#prize-btn p');
    const lazyLoader = $.querySelector('#prize-btn .loader');
    btnText.classList.add('display-none');
    lazyLoader.classList.add('display-inline');
}

const hidePrizeLazyLoader = () => {
    prizeButton.disabled = false;
    const btnText = $.querySelector('#prize-btn p');
    const lazyLoader = $.querySelector('#prize-btn .loader');
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

        setTimeout(() => {
            element.classList.add('animate');
            showSpinLazyLoader();
            getPrizeData();
            box.style.setProperty(`transition`, 'initial');
            box.style.transform = 'rotate(90deg)';
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
    const englishNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if (!phoneInput.value) {
        hideSubmitLazyLoader()
        loginError('* لطفا شماره تلفن همراه خود را وارد کنید')
    }else {
        let isNum = true;
        let value = phoneInput.value.split('');

        value.forEach(num => {
            if (!englishNums.includes(num)) {
                isNum = false;
                return;
            }
        })
        
        
        if (!isNum) {
            hideSubmitLazyLoader();
            loginError('* لطفا از ارقام فارسی و حروف استفاده نکنید');
            return;
        }else if (!phoneRegex.test(phoneInput.value)) {
            hideSubmitLazyLoader()
            loginError('* شماره تلفن صحیح نمیباشد');
        }else {
            getUsersData(phoneInput.value);
        }
    }
}

async function getUsersData (phone) {
    const formData = new FormData();
    if (phone[0] === 0) {
        let nums = phone.split('');
        nums.splice(0, 1);
        let newPhone = nums.join('');
        formData.append('phone', newPhone);
    }else {
        formData.append('phone', phone);
    }

    const requestOpions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    }

    await fetch('https://gardone.liara.run/acceptors/get_phone/', requestOpions)
    .then(response => {
        if (response.ok) {
            return response.text()
        }
    })
    .then(res => JSON.parse(res))
    .then(users => checkUserChance(users[0]))
    .catch(() =>  {
        hideSubmitLazyLoader()
        loginError('* شماره به عنوان پذیرنده ثبت نشده')
    })
}

const checkUserChance = user => {
    if (user.count_chance > 0) {
        setIdCookie(user.id);
        resetInputs();
        hideSubmitLazyLoader()
        closeLoginModal();
    }else {
        hideSubmitLazyLoader()
        loginError('* شانس شما برای گردونه تموم شده، منتظر فرصت های بعدی باش ')
    }
}

const setIdCookie = userId => {
    let now = new Date();
    let expire = now.getTime() + (24 * 60 * 60 * 1000);
    now.setTime(expire);

    $.cookie = `userId=${userId};path=/;expires=${now}`;
}

const getIdCookie = () => {
    const cookies = $.cookie.split(';');
    let userId = 0;

    cookies.forEach(cookie => {
        if (cookie.includes('userId')) {
            userId = cookie.substring(cookie.indexOf('=') + 1);
        }
    })

    return userId;
}

async function getPrizeData () {
    const userId = getIdCookie();

    const formData = new FormData();
    formData.append('user', userId);

    const requestOpions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    }

    await fetch('https://gardone.liara.run/acceptors/get_gift/', requestOpions)
    .then(response => response.text())
    .then(res => JSON.parse(res))
    .then(data => checkPrizeData(data.gif))
    .catch(err => {
        hideSpinLazyLoader();
        spin.disabled = false;
        alert('* دوباره تلاش کنید')
    })
}

const checkPrizeData = prize => {
    const img = $.getElementById('prize-img');

    if (prize.type.includes('وجه') && prize.title.includes('500,000')) {
        cardInput.classList.add('display-inline');
        img.setAttribute('src', "assets/Images/1.webp");
    }else if (prize.type.includes('وجه') && prize.title.includes('1,000,000')) {
        cardInput.classList.add('display-inline');
        img.setAttribute('src', "assets/Images/2.webp")
    }else if (prize.type.includes('وجه') && prize.title.includes('2,000,000')) {
        cardInput.classList.add('display-inline');
        img.setAttribute('src', "assets/Images/3.webp")
    }else if (prize.type.includes('وجه') && prize.title.includes('3,000,000')) {
        cardInput.classList.add('display-inline');
        img.setAttribute('src', "assets/Images/4.webp")
    }else if (prize.type.includes('وجه') && prize.title.includes('4,000,000')) {
        cardInput.classList.add('display-inline');
        img.setAttribute('src', "assets/Images/5.webp")
    }else if (prize.type.includes('وجه') && prize.title.includes('5,000,000')) {
        cardInput.classList.add('display-inline');
        img.setAttribute('src', "assets/Images/6.webp")
    }else if (prize.type.includes('کارتخوان') && prize.title.includes('5,000,000')) {
        img.setAttribute('src', "assets/Images/7.webp")
    }else if (prize.type.includes('کارتخوان') && prize.title.includes('7,000,000')) {
        img.setAttribute('src', "assets/Images/8.webp")
    }else if (prize.type.includes('کارتخوان') && prize.title.includes('8,000,000')) {
        img.setAttribute('src', "assets/Images/9.webp")
    }else if (prize.type.includes('کارتخوان') && prize.title.includes('10,000,000')) {
        img.setAttribute('src', "assets/Images/10.webp")
    }else if (prize.type.includes('کارتخوان') && prize.title.includes('15,000,000')) {
        img.setAttribute('src', "assets/Images/11.webp")
    }else if (prize.type.includes('کارتخوان') && prize.title.includes('20,000,000')) {
        img.setAttribute('src', "assets/Images/12.webp")
    }else if (prize.type.includes('رومیزی') && prize.title.includes('25,000,000')) {
        img.setAttribute('src', "assets/Images/13.webp")
    }else if (prize.type.includes('رومیزی') && prize.title.includes('30,000,000')) {
        img.setAttribute('src', "assets/Images/14.webp")
    }else if (prize.type.includes('رومیزی') && prize.title.includes('50,000,000')) {
        img.setAttribute('src', "assets/Images/15.jpwebpg")
    }else if (prize.type.includes('دیواری') && prize.title.includes('70,000,000')) {
        img.setAttribute('src', "assets/Images/16.webp")
    }else if (prize.type.includes('دیواری') && prize.title.includes('80,000,000')) {
        img.setAttribute('src', "assets/Images/17.webp")
    }else if (prize.type.includes('دیواری') && prize.title.includes('100,000,000')) {
        img.setAttribute('src', "assets/Images/18.webp")
    }

    playWinVideo();
}

const checkCardInput = () => {
    if (cardInput.className.includes('display-inline')) {
        if (!cardInput.value) {
            prizeMsg.textContent = '* لطفا شماره شبا خود را وارد کنید';
            prizeMsg.classList.add('display-inline');
            hidePrizeLazyLoader()
            setTimeout(() => {
                prizeMsg.classList.remove('display-inline');
            }, 3000)
        }else if (cardInput.value.length < 24) {
            prizeMsg.textContent = '* شماره شبا صحیح نمیباشد'
            prizeMsg.classList.add('display-inline');
            hidePrizeLazyLoader()
            setTimeout(() => {
                prizeMsg.classList.remove('display-inline');
            }, 3000)
        }else {
            prizeMsg.classList.remove('display-inline');
            setUserCard(cardInput.value);
        }
    }else {
        hidePrizeLazyLoader()
        hidePrizeModal();
        removeVideo();
    }
}

async function setUserCard (card) {
    const userId = getIdCookie();

    const formData = new FormData();
    formData.append('user', userId);
    formData.append('card', card);

    const requestOpions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    }

    await fetch('https://gardone.liara.run/acceptors/add_card/', requestOpions)
    .then(res => {
        hidePrizeLazyLoader();
        hidePrizeModal();
        removeVideo();
    })
    .catch(err => alert('* دوباره تلاش کنید'))
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
    showPrizeLazyLoader()
    checkCardInput();
})

// LossButton.addEventListener('click', () => {
//     hideLossModal();
// })

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    showSubmitLazyLoader();
    checkPhoneValidation();
})