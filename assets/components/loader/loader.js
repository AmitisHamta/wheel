"use strict"

const $ = document;

const template = $.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="assets/components/loader/loader.css">
<div class="loader-container">
    <div class="loader" width="300px" height="300px">
        <img src="assets/Videos/loader.gif" alt="شرکت آمیتیس همتا" width="100%" height="100%">
    </div>
</div>
`

class Loader extends HTMLElement {
    constructor () {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback () {
        let loaderContainer = this.shadowRoot.querySelector('.loader-container');

        window.addEventListener('load', () => {
            loaderContainer.classList.add('hidden');

            loaderContainer.addEventListener('animationend', () => {
                loaderContainer.classList.add('remove')
            })
        })
    }
}

export default Loader;