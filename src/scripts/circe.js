/* Circé — comportements. Volontairement minimal : les animations répondent
   aux actions de l'internaute, rien ne s'anime tout seul au défilement. */
(function () {
  'use strict';

  /* En-tête : passe en fond opaque dès que la page quitte le haut. */
  var entete = document.querySelector('.entete');
  if (entete) {
    var figer = function () {
      entete.dataset.fige = window.scrollY > 40 ? 'oui' : 'non';
    };
    figer();
    window.addEventListener('scroll', figer, { passive: true });
  }

  /* Menu mobile plein écran. */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var ouvert = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!ouvert));
      nav.dataset.ouvert = ouvert ? 'non' : 'oui';
      document.documentElement.style.overflow = ouvert ? '' : 'hidden';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        burger.setAttribute('aria-expanded', 'false');
        nav.dataset.ouvert = 'non';
        document.documentElement.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.dataset.ouvert === 'oui') { burger.click(); burger.focus(); }
    });
  }

  /* Suivi de conversion : les clics utiles sont poussés dans dataLayer.
     Aucun script tiers n'est chargé ici ; GA4 et Meta ne se branchent
     qu'après consentement (voir docs/). */
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var evenement = null;
    if (a.dataset.evt) evenement = a.dataset.evt;
    else if (a.href.indexOf('sevenrooms.com') > -1) evenement = 'clic_reserver';
    else if (a.href.indexOf('tel:') === 0) evenement = 'clic_telephone';
    else if (a.href.indexOf('google.com/maps') > -1) evenement = 'clic_itineraire';
    else if (a.href.indexOf('capcadeau.com') > -1) evenement = 'clic_bon_cadeau';
    if (evenement) {
      window.dataLayer.push({ event: evenement, page: location.pathname });
    }
  });
})();
