const menu=document.querySelector('.menu');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('#nav').classList.toggle('open',open)});
const suggestions={vezetes:['Vezetőként szűk mozgástérben','A feladatkiadás és a döntési mozgástér körül érdemes elindulnunk.'],egyuttmukodes:['Együttműködés, amikor tétje van','A közös célok, az érdekek és a megállapodások működését vizsgálhatjuk.'],szokasok:['Atomi szokások a munkában','A kialakult rutinokat és a változtatás környezeti feltételeit néznénk meg.'],kaizen:['Kaizen az irodában','Egy konkrét folyamat végigkövetése segíthet megtalálni a felesleges köröket.'],egyutt:['Munka közbeni fejlesztés és további formák','On-the-job megfigyelésből indulhatunk, majd a tapasztalatokhoz választunk következő lépést.']};
const followups = {
  vezetes: ['Mi történik, ha a vezető elérhetetlen?', [['hatar','Nem világos, ki miben dönthet.'],['vezetes','Tudják, de nem mernek nélküle dönteni.']]],
  egyuttmukodes: ['Miben akad el a közös munka?', [['folyamat','Az átadásnál hiányzik az információ vagy a felelős.'],['egyuttmukodes','Van megállapodás, de mindenki a saját érdekét követi.']]],
  szokasok: ['Mi nehezíti a változtatást?', [['feltetel','Nincs rá idő vagy felhatalmazás a napi munkában.'],['szokasok','Lenne rá lehetőség, de visszatérünk a régi rutinhoz.']]],
  kaizen: ['Ismeritek a felesleges körök okát?', [['kaizen','Még végig kellene nézni a teljes folyamatot.'],['workshop','Tudjuk, hol akad el, közös döntés kellene róla.']]],
  egyutt: ['Mire szeretnétek rálátni?', [['onjob','Konkrét ügyfélbeszélgetésekre és munkavégzésre.'],['360','Arra, hogyan tapasztalják mások a vezető működését.']]]
};
const directions = {
  hatar: ['Először a döntési hatásköröket tisztázzuk','egyutt.html#facilitalas','Közös egyeztetés vagy facilitált workshop segíthet. Érdemes megnézni, milyen döntési jog és információ hiányzik.'],
  vezetes: [suggestions.vezetes[0],'vezetes.html','A vezetői reakciók, a feladatkiadás és az önállóság támogatása körül dolgozhatunk.'],
  folyamat: ['Nézzük végig az átadásokat','kaizen.html','Egy valódi ügy útját követve keressük meg, hol hiányzik információ vagy felelős.'],
  egyuttmukodes: [suggestions.egyuttmukodes[0],'egyuttmukodes.html','A megállapodásokat és az egymással kapcsolatos feltételezéseket is érdemes elővenni.'],
  feltetel: ['Tisztázzuk a változtatás feltételeit','egyutt.html#workshop','Előbb azt beszélnénk meg a vezetővel, milyen idő, eszköz és felhatalmazás áll rendelkezésre.'],
  szokasok: [suggestions.szokasok[0],'szokasok.html','Saját rutinból indulunk, és egy kipróbálható kis változtatást tervezünk.'],
  kaizen: [suggestions.kaizen[0],'kaizen.html','A folyamat megismerése után kiválasztunk egy kis léptékű javítást.'],
  workshop: ['Workshop a konkrét elakadásról','egyutt.html#workshop','Az érintettekkel közösen tisztázzuk a lehetőségeket és a következő döntést.'],
  onjob: ['On-the-job fejlesztés','egyutt.html#on-the-job','Megfigyelést és személyes visszajelzést javasolnék, valódi munkavégzés közben.'],
  '360': ['360° visszajelzés','egyutt.html#360','Több nézőpontból gyűjtünk visszajelzést, majd együtt értelmezzük a fejlesztési irányokat.']
};
const finder = document.querySelector('#finder');
finder?.addEventListener('change', event => {
  if (event.target.type === 'checkbox') {
    document.querySelector('#results').replaceChildren();
    finder.querySelector('button').textContent = 'Melyik képzést ajánlod? ↗';
  }
});
finder?.addEventListener('submit', event => {
  event.preventDefault();
  const selected = [...finder.querySelectorAll('input[type=checkbox]:checked')].map(input => input.value);
  const result = document.querySelector('#results');
  if (!selected.length) { result.textContent = 'Jelölj be legalább egy ismerős helyzetet.'; return; }
  if (!result.querySelector('.question')) {
    result.replaceChildren();
    for (const key of selected) {
      const field = document.createElement('fieldset');
      field.className = 'question';
      const legend = document.createElement('legend');
      legend.textContent = followups[key][0];
      field.append(legend);
      for (const [value, text] of followups[key][1]) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio'; input.name = key; input.value = value; input.required = true;
        label.append(input, document.createTextNode(text)); field.append(label);
      }
      result.append(field);
    }
    finder.querySelector('button').textContent = 'Ezek alapján mit javasolsz? ↗';
    result.scrollIntoView({behavior:'smooth',block:'nearest'});
    return;
  }
  const answers = [...result.querySelectorAll('input:checked')].map(input => input.value);
  result.replaceChildren();
  for (const key of [...new Set(answers)]) {
    const [title, url, description] = directions[key];
    const a = document.createElement('a'); a.href = url;
    const strong = document.createElement('strong'); strong.textContent = title + ' ↗';
    const p = document.createElement('p'); p.textContent = description;
    a.append(strong,p); result.append(a);
  }
  const note = document.createElement('p');
  note.textContent = 'Ez a válaszaid alapján adott javaslat. Egy beszélgetésben tisztázzuk a részleteket, mielőtt programot tervezünk.';
  result.append(note);
});
for(const button of document.querySelectorAll('.share'))button.addEventListener('click',async()=>{const status=button.parentElement.querySelector('.share-status');try{await navigator.clipboard.writeText(location.href);status.textContent='A linket kimásoltam. Küldheted tovább.'}catch{status.textContent='Másold ki a címsorból az oldal linkjét.'}});
