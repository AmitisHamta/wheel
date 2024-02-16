"use strict"

const $ = document;
const template = $.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="assets/components/footer/footer.css">
<footer id="footer">
            <div class="wave-bg">
                <img src="assets/Images/wave-haikei3.svg" alt="شرکت همتا">
            </div>
            <div id="footer-content">
                <h1>
                    شرکت آمیتیس همتا
                </h1>
                <hr>
                <div id="footer-info">
                    <div class="footer-list footer-description">
                        <p id="footer-description">
                            همتا، هسته مرکزی تراکنش های الکترونیکی در حوزه مالی و بانکی و پرداخت های هوشمند <br>
                            و توزیع کننده دستگاه های کش لس، کارتخوان، خودپرداز، صندوق فروشگاهی و خدمات سوئیچ بانکی از طریق شبکه گسترده نمایندگی در سراسر کشور
                        </p>
                        <p>
                            <i class="bi bi-geo-alt-fill"></i>
                            آدرس: خیابان میزاری شیرازی، کوچه شهدا، پلاک 23، طبقه پنجم، واحد 11
                        </p>
                        <div id="social-btns-list">
                            <button class="social-btns" aria-label="site-btn">
                                <a href="https://hamtasb.com/" target="_blank" title="Website">
                                    <i class="bi bi-globe2"></i>
                                </a>
                            </button>
                            <button class="social-btns" aria-label="email-btn">
                                <a href="mailto:info@hamtasb.com" target="_blank" title="Email">
                                    <i class="bi bi-envelope"></i>
                                </a>
                            </button>
                            <button class="social-btns" aria-label="telephone-btn">
                                <a href="tel:+9802158702" target="_blank" title="Phone">
                                    <i class="bi bi-telephone-fill"></i>
                                </a>
                            </button>
                            <button class="social-btns" aria-label="instagram-btn">
                                <a href="https://www.instagram.com/amitishamta/" target="_blank" title="Instagram">
                                    <i class="bi bi-instagram"></i>
                                </a>
                            </button>
                            <button class="social-btns" aria-label="location-btn">
                                <a href="https://maps.app.goo.gl/SnUcEP8mfzfehgKDA" target="_blank" title="Location">
                                    <i class="bi bi-geo-alt-fill"></i>
                                </a>
                            </button>
                        </div>
                    </div>
                    <div id="footer-lists">
                        <div class="footer-list">
                            <h3>منابع</h3>
                            <ul>
                                <li>
                                    <a href="https://hamtasb.com/about">درباره ما</a>
                                </li>
                                <li>
                                    <a href="https://hamtasb.com/service">خدمات</a>
                                </li>
                                <li>
                                    <a href="https://hamtasb.com/products">محصولات</a>
                                </li>
                                <li>
                                    <a href="https://hamtasb.com/news">اخبار</a>
                                </li>
                                <li>
                                    <a href="https://hamtasb.com/contact">ارتباط با ما</a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer-list">
                            <h3>ارتباط با ما</h3>
                            <ul>
                                <li>
                                    <a href="https://hamtasb.com/">
                                        سایت
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+9802158702" target="_blank">
                                        تلفن
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@hamtasb.com" target="_blank">
                                        ایمیل
                                    </a>
                                </li>
                                <li>
                                    <a href="https://maps.app.goo.gl/SnUcEP8mfzfehgKDA" target="_blank">
                                        آدرس
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/amitishamta/" target="_blank">
                                        اینستاگرام
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr>
                <div id="footer-copyright">
                    <p>
                        2024
                        <i class="bi bi-c-circle"></i>
                        کلیه حقوق این سایت مطعلق به <span> شرکت آمیتیس همتا </span> میباشد
                    </p>
                    <p>
                        <span>Amitis Hamta</span> | Electronic and smart payment, since 2006
                    </p>
                </div>
            </div>
        </footer>
`

class Footer extends HTMLElement {
    constructor () {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback () {
        window.addEventListener('DOMContentLoaded', () => {
            this.checkPage()
        })
    }

    checkPage () {
        if (location.href.includes('products')) {
            const waveBg = this.shadowRoot.querySelector('.wave-bg');
            waveBg.style.display = 'none';
        }
    }
}

export default Footer;