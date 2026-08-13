document.addEventListener('DOMContentLoaded', function () {
  // Assign data-letter to each card based on its H2 title
  const cards = Array.from(document.querySelectorAll('.card'));
  cards.forEach(card => {
    const h = card.querySelector('h2');
    if (!h) return;
    const first = h.textContent.trim().charAt(0).toUpperCase();
    card.dataset.letter = first;
  });

  // Build a map from letter to first matching card
  const letterMap = new Map();
  cards.forEach(card => {
    const l = card.dataset.letter;
    if (!letterMap.has(l)) letterMap.set(l, card);
  });

  // Alphabet button handlers
  const alphaButtons = Array.from(document.querySelectorAll('.alphabet .alpha'));
  alphaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const letter = btn.dataset.letter.toUpperCase();
      const target = letterMap.get(letter);
      // Clear active state
      alphaButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Optionally focus the card for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
});
