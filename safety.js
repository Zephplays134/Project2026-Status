/* Safety systems — extras + interactivity.
   Injects six more planned safety systems into the #safety section,
   keeps the section-head count current, and staggers the new cards in.
   Loads after script.js and extras.js (defer order). */
(function () {
  var section = document.getElementById('safety');
  if (!section) return;
  var grid = section.querySelector('.cards');
  if (!grid) return;

  var EXTRA = [
    { group: 'Fire', title: 'Fire stations &amp; equipment', text: 'Extinguishers, hoses and fire points on every deck, with a crew that responds to any alarm.' },
    { group: 'Emergency', title: 'Emergency lighting &amp; signage', text: 'Illuminated exit signs and escape-route lighting that stay on when the lights go out.' },
    { group: 'Life saving', title: 'Evacuation slides', text: 'Marine evacuation systems that deploy from the embarkation decks for a full abandon-ship drill.' },
    { group: 'Bridge', title: 'EPIRB &amp; distress gear', text: 'A satellite emergency beacon and radio distress equipment carried on the bridge.' },
    { group: 'Crew', title: 'Lifeboat tender stations', text: 'Tender boats that double as rescue craft, crewed and lowered from their own stations.' },
    { group: 'Bridge', title: 'Navigation &amp; collision alarms', text: 'Alarms for shallow water, collision course and fog, with lookout protocol on every watch.' }
  ];

  EXTRA.forEach(function (item, i) {
    if (grid.querySelector('.extra[data-title="' + item.title + '"]')) return;
    var card = document.createElement('article');
    card.className = 'card safety-card extra';
    card.setAttribute('data-title', item.title);
    card.style.setProperty('--safety-i', String(i));
    card.innerHTML =
      '<p class="ev-k">' + item.group + '</p>' +
      '<h3>' + item.title + '</h3>' +
      '<p>' + item.text + '</p>';
    grid.appendChild(card);
  });

  var head = section.querySelector('.section-head .muted');
  if (head) {
    head.textContent = 'Planned for the cruise side of Project 2026 \u00b7 ' +
      grid.querySelectorAll('.card').length + ' systems and counting';
  }
})();
