(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initYear();
    initBurgerMenu();
    initThemeToggle();
    initLanguage();
    initFormValidation();
    initLightbox();
  });

  function initYear() {
    var yearEls = document.querySelectorAll('#year');
    var year = String(new Date().getFullYear());
    yearEls.forEach(function (el) { el.textContent = year; });
  }

  // Бургер-меню
  function initBurgerMenu() {
    var burger = document.getElementById('burgerBtn');
    var nav = document.getElementById('mainNav');
    if (!burger || !nav) return;
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav--open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    nav.addEventListener('click', function (e) {
      var target = e.target;
      if (target && target.classList && target.classList.contains('nav__link')) {
        nav.classList.remove('nav--open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Переключатель темы
  function initThemeToggle() {
    var toggle = document.getElementById('themeToggle');
    var root = document.documentElement;
    if (!toggle) return;

    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      root.setAttribute('data-theme', saved);
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.setAttribute('data-theme', 'dark');
      }
    }

    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'light';
      var next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // I18N
  function initLanguage() {
    var switcher = document.getElementById('langSwitch');
    var savedLang = localStorage.getItem('lang') || detectLang();
    applyTranslations(savedLang);
    updateLangUI(savedLang);

    if (switcher) {
      switcher.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-lang]');
        if (!btn) return;
        var lang = btn.getAttribute('data-lang');
        localStorage.setItem('lang', lang);
        applyTranslations(lang);
        updateLangUI(lang);
      });
    }
  }

  function detectLang() {
    var nav = (navigator.language || 'ru').toLowerCase();
    if (nav.startsWith('ru')) return 'ru';
    if (nav.startsWith('tr')) return 'tr';
    return 'en';
  }

  var I18N = {
    ru: {
      'nav.home': 'Главная',
      'nav.services': 'Услуги',
      'nav.about': 'Что такое детейлинг',
      'nav.contacts': 'Контакты',
      'hero.title': 'Imperial Detailing — детейлинг-центр',
      'hero.subtitle': 'Премиальный уход за автомобилем: блеск, защита и новая жизнь вашему авто.',
      'hero.cta.services': 'Смотреть услуги',
      'hero.cta.book': 'Записаться',
      'about.title': 'Что такое детейлинг',
      'about.text': 'Детейлинг — это комплекс процедур по тщательной очистке, восстановлению и защите автомобиля внутри и снаружи. Мы работаем бережно, строго по технологиям и используем профессиональную химию.',
      'about.l1': 'Глубокая мойка и деконтаминация',
      'about.l2': 'Многоступенчатая полировка ЛКП',
      'about.l3': 'Защитные покрытия: керамика, воск, плёнки',
      'about.l4': 'Химчистка и кондиционирование салона',
      'about.more': 'Регулярный детейлинг сохраняет покрытие, упрощает уход и повышает остаточную стоимость автомобиля. Базовый уход рекомендуем ежемесячно, защитные покрытия — раз в 6–24 месяца.',
      'preview.title': 'Популярные услуги',
      'service.ceramic.title': 'Керамическое покрытие',
      'service.ceramic.desc': 'Долговременная защита и глубокий блеск ЛКП.',
      'service.polish.title': 'Полировка кузова',
      'service.polish.desc': 'Удаление царапин и матовости, восстановление глянца.',
      'service.interior.title': 'Химчистка салона',
      'service.interior.desc': 'Свежесть, чистота и забота о материалах салона.',
      'service.ppf.title': 'Защитная плёнка (PPF)',
      'service.ppf.desc': 'Невидимая броня от сколов и пескоструя.',
      'contacts.title': 'Контакты',
      'contacts.lead': 'Свяжитесь с нами, чтобы записаться или задать вопрос — ответим в течение 10 минут.',
      'contacts.addressLabel': 'Адрес:',
      'contacts.phoneLabel': 'Телефон:',
      'contacts.hoursLabel': 'Режим работы:',
      'footer.copy': '©',
      'footer.rights': 'Все права защищены.',
      'services.hero.title': 'Наши услуги',
      'services.hero.subtitle': 'Подробное описание программ ухода и защиты автомобиля.',
      'pricing.title': 'Цены',
      'pricing.wash': 'Мойка',
      'pricing.polish': 'Полировка кузова',
      'pricing.ceramic': 'Нанесение керамики',
      'pricing.interior': 'Химчистка салона',
      'service.wash.title': 'Мойка кузова',
      'service.wash.desc': 'Деликатная бесконтактная и ручная мойка с использованием pH‑нейтральной химии, бережно удаляет грязь и соль.',
      'service.headlights.title': 'Полировка фар',
      'service.headlights.desc': 'Восстанавливаем прозрачность фар и улучшаем светопропускаемость.',
      'service.leather.title': 'Уход за кожей салона',
      'service.leather.desc': 'Очистка, кондиционирование и защита кожи от пересыхания и трещин.',
      'service.engine.title': 'Очистка моторного отсека',
      'service.engine.desc': 'Безопасная очистка с консервацией пластика и резины.',
      'service.wax.title': 'Нанесение воска',
      'service.wax.desc': 'Глубокий блеск и гидрофобный эффект для ЛКП.',
      'service.tires.title': 'Чернение шин и консервация пластика',
      'service.tires.desc': 'Сатиновый эффект и защита от выгорания.'
    },
    en: {
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.about': 'What is Detailing',
      'nav.contacts': 'Contacts',
      'hero.title': 'Imperial Detailing — detailing center',
      'hero.subtitle': 'Premium car care: gloss, protection and a new life for your car.',
      'hero.cta.services': 'View services',
      'hero.cta.book': 'Book now',
      'about.title': 'What is detailing',
      'about.text': 'Detailing is a set of procedures for careful cleaning, restoration and protection of a car inside and out. We work carefully, strictly following technology and using professional chemicals.',
      'about.l1': 'Deep wash and decontamination',
      'about.l2': 'Multi-stage paint correction',
      'about.l3': 'Protective coatings: ceramic, wax, films',
      'about.l4': 'Interior deep clean and conditioning',
      'about.more': 'Regular detailing preserves paintwork, simplifies maintenance and increases resale value. We recommend monthly basic care and protective coatings every 6–24 months.',
      'preview.title': 'Popular services',
      'service.ceramic.title': 'Ceramic coating',
      'service.ceramic.desc': 'Long-lasting protection and deep gloss.',
      'service.polish.title': 'Paint polishing',
      'service.polish.desc': 'Removes swirls and haze, restores gloss.',
      'service.interior.title': 'Interior deep clean',
      'service.interior.desc': 'Freshness, cleanliness and care for materials.',
      'service.ppf.title': 'Paint protection film (PPF)',
      'service.ppf.desc': 'Invisible armor against chips and sandblasting.',
      'contacts.title': 'Contacts',
      'contacts.lead': 'Contact us to book or ask a question — we reply within 10 minutes.',
      'contacts.addressLabel': 'Address:',
      'contacts.phoneLabel': 'Phone:',
      'contacts.hoursLabel': 'Hours:',
      'footer.copy': '©',
      'footer.rights': 'All rights reserved.',
      'services.hero.title': 'Our services',
      'services.hero.subtitle': 'Detailed descriptions of care and protection programs.',
      'pricing.title': 'Pricing',
      'pricing.wash': 'Wash',
      'pricing.polish': 'Polishing',
      'pricing.ceramic': 'Ceramic coating',
      'pricing.interior': 'Interior cleaning',
      'service.wash.title': 'Body wash',
      'service.wash.desc': 'Touchless and hand wash with pH-neutral chemistry.',
      'service.headlights.title': 'Headlight polishing',
      'service.headlights.desc': 'Restores clarity and improves light output.',
      'service.leather.title': 'Leather care',
      'service.leather.desc': 'Cleaning, conditioning and protection from drying and cracks.',
      'service.engine.title': 'Engine bay cleaning',
      'service.engine.desc': 'Safe cleaning with plastic and rubber conditioning.',
      'service.wax.title': 'Wax application',
      'service.wax.desc': 'Deep shine and hydrophobic effect.',
      'service.tires.title': 'Tire dressing and trim care',
      'service.tires.desc': 'Satin finish and UV protection.'
    },
    tr: {
      'nav.home': 'Anasayfa',
      'nav.services': 'Hizmetler',
      'nav.about': 'Detaylı temizlik nedir',
      'nav.contacts': 'İletişim',
      'hero.title': 'Imperial Detailing — detaylı temizlik merkezi',
      'hero.subtitle': 'Otomobiliniz için premium bakım: parlaklık, koruma ve yeni bir hayat.',
      'hero.cta.services': 'Hizmetleri gör',
      'hero.cta.book': 'Randevu al',
      'about.title': 'Detaylı temizlik nedir',
      'about.text': 'Detaylı temizlik; aracın iç ve dış yüzeylerinde titiz temizlik, restorasyon ve koruma işlemlerinin bütünüdür. Teknolojilere uyar ve profesyonel kimyasallar kullanırız.',
      'about.l1': 'Derin yıkama ve dekontaminasyon',
      'about.l2': 'Çok aşamalı boya düzeltme',
      'about.l3': 'Koruyucu kaplamalar: seramik, wax, film',
      'about.l4': 'İç detaylı temizlik ve bakım',
      'about.more': 'Düzenli detaylı temizlik boya yüzeyini korur, bakımı kolaylaştırır ve ikinci el değerini artırır. Aylık temel bakım, koruyucu kaplamalar için 6–24 ay önerilir.',
      'preview.title': 'Popüler hizmetler',
      'service.ceramic.title': 'Seramik kaplama',
      'service.ceramic.desc': 'Uzun ömürlü koruma ve derin parlaklık.',
      'service.polish.title': 'Boya parlatma',
      'service.polish.desc': 'Hareleri ve matlığı giderir, parlaklığı geri kazandırır.',
      'service.interior.title': 'İç detaylı temizlik',
      'service.interior.desc': 'Tazelik, temizlik ve malzeme bakımı.',
      'service.ppf.title': 'PPF boya koruma filmi',
      'service.ppf.desc': 'Çakıl ve kum aşındırmasına karşı görünmez zırh.',
      'contacts.title': 'İletişim',
      'contacts.lead': 'Randevu almak veya soru sormak için bize ulaşın — 10 dakika içinde cevaplarız.',
      'contacts.addressLabel': 'Adres:',
      'contacts.phoneLabel': 'Telefon:',
      'contacts.hoursLabel': 'Çalışma saatleri:',
      'footer.copy': '©',
      'footer.rights': 'Tüm hakları saklıdır.',
      'services.hero.title': 'Hizmetlerimiz',
      'services.hero.subtitle': 'Bakım ve koruma programlarının ayrıntılı açıklamaları.',
      'pricing.title': 'Fiyatlar',
      'pricing.wash': 'Yıkama',
      'pricing.polish': 'Parlatma',
      'pricing.ceramic': 'Seramik kaplama',
      'pricing.interior': 'İç temizlik',
      'service.wash.title': 'Gövde yıkama',
      'service.wash.desc': 'pH nötr kimyasalla temassız ve elle yıkama.',
      'service.headlights.title': 'Far parlatma',
      'service.headlights.desc': 'Şeffaflığı geri kazandırır, aydınlatmayı iyileştirir.',
      'service.leather.title': 'Deri bakımı',
      'service.leather.desc': 'Temizleme, kondisyon ve çatlaklara karşı koruma.',
      'service.engine.title': 'Motor bölmesi temizliği',
      'service.engine.desc': 'Plastik ve kauçuk korumalı güvenli temizlik.',
      'service.wax.title': 'Wax uygulaması',
      'service.wax.desc': 'Derin parlaklık ve hidrofobik etki.',
      'service.tires.title': 'Lastik parlatma ve plastik bakımı',
      'service.tires.desc': 'Saten görünüm ve UV koruması.'
    }
  };

  function applyTranslations(lang) {
    var dict = I18N[lang] || I18N.ru;
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-price]').forEach(function (el) {
      var amount = el.getAttribute('data-price');
      el.textContent = formatPrice(lang, amount);
    });
  }

  function formatPrice(lang, amount) {
    var value = String(amount) + '₺';
    if (lang === 'ru') return 'от ' + value;
    if (lang === 'en') return 'from ' + value;
    if (lang === 'tr') return value + "'den başlayan";
    return 'from ' + value;
  }

  function updateLangUI(lang) {
    document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('lang-switch__btn--active', isActive);
    });
  }

  // Валидация формы
  function initFormValidation() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var messageInput = document.getElementById('message');
    var errName = document.getElementById('error-name');
    var errEmail = document.getElementById('error-email');
    var errMessage = document.getElementById('error-message');
    var successEl = document.getElementById('formSuccess');

    function setError(el, msg, errEl) { if (!el || !errEl) return; el.setAttribute('aria-invalid', 'true'); errEl.textContent = msg; }
    function clearError(el, errEl) { if (!el || !errEl) return; el.removeAttribute('aria-invalid'); errEl.textContent = ''; }
    function validateEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true; successEl.textContent = '';
      if (!nameInput.value || nameInput.value.trim().length < 2) { setError(nameInput, 'Введите имя (минимум 2 символа)', errName); valid = false; } else { clearError(nameInput, errName); }
      if (!emailInput.value || !validateEmail(emailInput.value)) { setError(emailInput, 'Введите корректный email', errEmail); valid = false; } else { clearError(emailInput, errEmail); }
      if (!messageInput.value || messageInput.value.trim().length < 10) { setError(messageInput, 'Сообщение должно содержать минимум 10 символов', errMessage); valid = false; } else { clearError(messageInput, errMessage); }
      if (valid) { form.reset(); successEl.textContent = 'Спасибо! Мы скоро свяжемся с вами.'; }
    });
  }

  // Лайтбокс (на случай появления галерей)
  function initLightbox() {
    var galleries = document.querySelectorAll('[data-gallery]');
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImage');
    var lightboxClose = document.getElementById('lightboxClose');
    if (!galleries.length || !lightbox || !lightboxImg || !lightboxClose) return;
    function open(src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; }
    function close() { lightbox.setAttribute('hidden', ''); lightboxImg.src = ''; document.body.style.overflow = ''; }
    galleries.forEach(function (gallery) { gallery.addEventListener('click', function (e) { var t = e.target; if (t && t.tagName === 'IMG') { open(t.src, t.alt); } }); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) { close(); } });
    lightboxClose.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
})();


