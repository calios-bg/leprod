// Activation progressive du loader
window.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.querySelector('.loading-screen');

  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
    setTimeout(() => {
      loadingScreen.style.opacity = '1';
    }, 50); // Petit délai pour s'assurer que display:flex est appliqué avant la transition d'opacité
  }

  window.addEventListener('load', () => {
    if (loadingScreen) {
      setTimeout(() => { // Délai avant le début du fondu
        loadingScreen.style.opacity = '0';
        setTimeout(() => { // Après la transition de fondu
          loadingScreen.style.display = 'none';
          // DÉCLENCHER les animations initiales pour les éléments visibles
          animateOnScroll();
          // Ajouter l'écouteur de scroll pour les animations suivantes
          window.addEventListener('scroll', animateOnScroll);
        }, 1000); // Durée de la transition d'opacité (doit correspondre au CSS)
      }, 500); // Délai avant de commencer le fondu
    } else {
      // Pas d'écran de chargement, exécuter les animations initiales immédiatement
      animateOnScroll();
      // Ajouter l'écouteur de scroll pour les animations suivantes
      window.addEventListener('scroll', animateOnScroll);
    }
  });
});

// Gestion des animations d'entrée
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => {
    // Vérifier si l'élément est déjà animé pour éviter de redéclencher si ce n'est pas nécessaire
    if (el.classList.contains('animated')) {
      return;
    }
    const elementTop = el.getBoundingClientRect().top;
    const elementVisibleOffset = 100; // Marge de visibilité pour déclencher l'animation

    if (elementTop < window.innerHeight - elementVisibleOffset) {
      el.classList.add('animated');
    }
  });
}

// L'appel initial à animateOnScroll() et l'écouteur d'événement 'load' pour celui-ci
// sont maintenant gérés dans la logique principale de l'écouteur d'événement 'load' ci-dessus.
// L'écouteur d'événement 'scroll' y est également ajouté conditionnellement.
// Donc, les lignes ci-dessous ne sont plus nécessaires ici :
// window.addEventListener('load', animateOnScroll);
// window.addEventListener('scroll', animateOnScroll);
// animateOnScroll();