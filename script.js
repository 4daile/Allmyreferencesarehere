document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- FILTRES ---------------- */
  const boutonsFiltre = document.querySelectorAll('.filtre');
  const cartes = Array.from(document.querySelectorAll('.card'));
  const container = document.querySelector('.container');

  function filtrerCartes(categorie) {
    cartes.forEach(card => {
      const cardCategorie = card.getAttribute('data-categorie');
      if (categorie === 'tous' || cardCategorie === categorie) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  boutonsFiltre.forEach(bouton => {
    bouton.addEventListener('click', () => {
      boutonsFiltre.forEach(b => b.classList.remove('active'));
      bouton.classList.add('active');

      const valeurFiltre = bouton.getAttribute('data-filtre');
      filtrerCartes(valeurFiltre);
    });
  });

  filtrerCartes('tous'); // au chargement

});