document.addEventListener('DOMContentLoaded', () => {
    const boutonsFiltre = document.querySelectorAll('.filtre');
    const cartes = document.querySelectorAll('.card');

    // Fonction pour filtrer les cartes
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

    // Ajouter un écouteur sur chaque bouton
    boutonsFiltre.forEach(bouton => {
        bouton.addEventListener('click', () => {
            // retirer la classe active de tous les boutons (optionnel, pour le style)
            boutonsFiltre.forEach(b => b.classList.remove('active'));
            bouton.classList.add('active');

            const valeurFiltre = bouton.getAttribute('data-filtre');
            filtrerCartes(valeurFiltre);
        });
    });

    // Afficher tout au chargement
    filtrerCartes('tous');
});


// -------------- ALPHABETICAL SORTING -----------------

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const cartes = Array.from(document.querySelectorAll('.card'));

  cartes.sort((a, b) => {
    const nomA = a.dataset.nom.toLowerCase();
    const nomB = b.dataset.nom.toLowerCase();
    return nomA.localeCompare(nomB, 'fr', { sensitivity: 'base' });
  });

  container.innerHTML = '';
  cartes.forEach(card => container.appendChild(card));
});

// 

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const cartes = Array.from(document.querySelectorAll('.card'));

  cartes.sort((a, b) => {
    const nomA = a.dataset.nom.toLowerCase();
    const nomB = b.dataset.nom.toLowerCase();
    return nomA.localeCompare(nomB, 'fr', { sensitivity: 'base' });
  });

  container.innerHTML = '';

  let lettreCourante = '';

  cartes.forEach(card => {
    const nom = card.dataset.nom.trim();
    const premiereLettre = nom.charAt(0).toUpperCase();

    if (premiereLettre !== lettreCourante) {
      lettreCourante = premiereLettre;

      const ancre = document.createElement('div');
      ancre.id = `lettre-${lettreCourante.toLowerCase()}`;
      ancre.textContent = lettreCourante;
      ancre.classList.add('lettre-section');

      container.appendChild(ancre);
    }

    container.appendChild(card);
  });
});