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



  /* ---------------- RECHERCHE ---------------- */
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearSearch');

  function filtrerParRecherche(terme) {
    const query = terme.trim().toLowerCase();

    // si champ vide → tout réafficher
    if (query === '') {
      cartes.forEach(card => {
        card.style.display = 'flex';
      });
      return;
    }

    cartes.forEach(card => {
      const titre = card.querySelector('h2')?.textContent.toLowerCase() || '';
      const caption = card.querySelector('figcaption')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';

      const texteComplet = `${titre} ${caption} ${description}`;

      if (texteComplet.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // clic sur GO!!
  searchButton.addEventListener('click', () => {
    filtrerParRecherche(searchInput.value);
  });

  // lancer la recherche avec la touche Entrée
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    filtrerParRecherche(searchInput.value);
  }
});

  function resetHighlights() {
  cartes.forEach(card => {
    ['h2', 'figcaption', 'p'].forEach(selector => {
      const el = card.querySelector(selector);
      if (!el) return;
      // remets le texte brut (sans <mark>) à partir du dataset
      const original = el.dataset.originalText;
      if (original !== undefined) {
        el.innerHTML = original;
      }
    });
  });
}

function filtrerParRecherche(terme) {
  const query = terme.trim().toLowerCase();

  // enlever tous les anciens surlignages
  resetHighlights();

  // si champ vide → tout réafficher sans surlignage
  if (query === '') {
    cartes.forEach(card => {
      card.style.display = 'flex';
    });
    return;
  }

  cartes.forEach(card => {
    const h2 = card.querySelector('h2');
    const captionEl = card.querySelector('figcaption');
    const descEl = card.querySelector('p');

    const titre = h2?.textContent || '';
    const caption = captionEl?.textContent || '';
    const description = descEl?.textContent || '';

    const texteComplet = (titre + ' ' + caption + ' ' + description).toLowerCase();

    if (texteComplet.includes(query)) {
      card.style.display = 'flex';

      // surligner le mot dans chaque champ
      [h2, captionEl, descEl].forEach(el => {
        if (!el) return;
        const original = el.dataset.originalText || el.textContent;
        el.dataset.originalText = original; // stocker l’original une fois

        if (query === '') {
          el.innerHTML = original;
        } else {
          const regex = new RegExp(`(${query})`, 'gi');
          el.innerHTML = original.replace(regex, '<mark>$1</mark>');
        }
      });

    } else {
      card.style.display = 'none';
    }
  });
}

  // croix pour réinitialiser
clearButton.addEventListener('click', () => {
  searchInput.value = '';

  // enlever les surlignages
  resetHighlights();

  // remettre toutes les cartes (filtre "tous")
  filtrerCartes('tous');

  // remettre l'état visuel du bouton "Tous"
  boutonsFiltre.forEach(b => b.classList.remove('active'));
  const boutonTous = document.querySelector('.filtre[data-filtre="tous"]');
  if (boutonTous) boutonTous.classList.add('active');
});
});