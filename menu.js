'use strict';
const dishes=[
['rotli','Rotli','Bread',5,'Soft wheat flatbread, an everyday companion to vegetables and dal.','rotli'],
['rotlo','Rotlo','Bread',25,'Rustic bajra flatbread, a Kathiyawadi favourite.','bajra rotlo'],
['butter-rotlo','Rotlo with butter','Bread',30,'A hearty rotlo served with butter.','butter rotlo'],
['chass','Chass','Side',10,'Cooling buttermilk to accompany your meal.','chass'],
['masala-chass','Masala chass','Side',15,'Buttermilk with a savoury masala twist.','masala chass'],
['papad','Papad','Side',5,'A crisp accompaniment to your meal.','papad'],
['dal-bhat','Dal-bhat','Meal',40,'The comforting combination of lentil dal and rice.','dal bhat'],
['khichdi-kadhi','Khichdi-kadhi','Meal',40,'Rice-and-lentil khichdi paired with kadhi.','khichdi kadhi'],
['salad','Salad','Side',null,'A fresh accompaniment listed with both lunch and dinner.','salad'],
['sev-tomato','Sev tomato','Curry',null,'Tomato curry with crunchy sev; a daily menu favourite.','sev tomato'],
['undhiyu','Undhiyu','Curry',null,'A Gujarati mixed-vegetable favourite.','undhiyu'],
['desi-chana','Desi chana','Dal',null,'A hearty chana preparation.','desi chana'],
['pav-bhaji','Pav bhaji ni bhaji','Curry',null,'The vegetable bhaji from the classic pav bhaji pairing.','pav bhaji'],
['rasila-bateta','Rasila bateta','Curry',null,'Potatoes in a flavourful gravy.','rasila bateta'],
['marvadi-dhokli','Marvadi dhokli','Curry',null,'A Marvadi-style dhokli preparation.','Marvadi dhokli'],
['guvar-bateta','Guvar bateta','Curry',null,'Cluster beans and potatoes.','guvar bateta'],
['dahi-tikhari','Dahi tikhari','Curry',null,'A seasoned yoghurt preparation.','dahi tikhari'],
['vatala-bateta','Vatala bateta','Curry',null,'Peas and potatoes.','vatala bateta'],
['mug','Mug','Dal',null,'A comforting mung-bean preparation.','mug'],
['mix-veg','Mix veg','Curry',null,'A mixed-vegetable preparation.','mix veg'],
['masala-bhinda','Masala bhinda','Curry',null,'Okra cooked with masala.','masala bhinda'],
['dhokali','Dhokali','Curry',null,'A traditional dhokali preparation, as listed on the menu.','dhokali'],
['chana-dal','Chana ni dal','Dal',null,'A split-chickpea dal preparation.','chana dal'],
['guvar-chola-bateta','Guvar chola bateta','Curry',null,'The guvar, chola and potato combination from Thursday lunch.','guvar chola bateta'],
['dal-fry','Fix dal fry sabji','Dal',null,'The dal fry dish listed on the Thursday dinner menu.','dal fry'],
['chole-chana','Chole chana','Dal',null,'A chickpea curry.','chole chana'],
['aloo-changeji','Aloo changeji','Curry',null,'The potato dish listed on Friday evening’s menu.','aloo changeji'],
['dungdi-gathiya','Dungdi gathiya','Curry',null,'An onion and gathiya preparation.','dungdi gathiya'],
['udad-dal','Udad dal','Dal',null,'A hearty urad-lentil preparation.','udad dal'],
['ringan-vatala-bateta','Ringan vatala bateta mix','Curry',null,'A mix of brinjal, peas and potatoes.','ringan vatala bateta'],
['dudhi-bateta','Dudhi bateta','Curry',null,'Bottle gourd and potatoes.','dudhi bateta'],
['mug-dal','Mug dal','Dal',null,'A mung-lentil dal preparation.','mug dal'],
['galka-gathiya','Galka gathiya','Curry',null,'A ridge-gourd and gathiya preparation.','galka gathiya']
];
const week=[
['Monday',['undhiyu','desi-chana','sev-tomato'],['pav-bhaji','rasila-bateta','sev-tomato']],
['Tuesday',['marvadi-dhokli','guvar-bateta','sev-tomato'],['dahi-tikhari','vatala-bateta','sev-tomato']],
['Wednesday',['mug','mix-veg','sev-tomato'],['masala-bhinda','dhokali','sev-tomato']],
['Thursday',['chana-dal','guvar-chola-bateta','sev-tomato'],['dal-fry','rasila-bateta','sev-tomato']],
['Friday',['undhiyu','chole-chana','sev-tomato'],['aloo-changeji','dungdi-gathiya','sev-tomato']],
['Saturday',['udad-dal','mix-veg','sev-tomato'],['mug','ringan-vatala-bateta','sev-tomato']],
['Sunday',['marvadi-dhokli','dudhi-bateta','sev-tomato'],['mug-dal','galka-gathiya','sev-tomato']]
];
const lookup=Object.fromEntries(dishes.map(d=>[d[0],d]));
const sides=['rotli','rotlo','chass','papad','salad'];
const itemName=id=>lookup[id][1];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selectedDay=0;
function selectDay(i,focus=false){selectedDay=i;document.querySelectorAll('[role=tab]').forEach((b,j)=>{b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1});const row=week[i];const panel=document.getElementById('day-panel');panel.setAttribute('aria-labelledby','day-'+i);panel.innerHTML='<div class="meal-grid">'+['Lunch','Dinner'].map((meal,j)=>`<article class="meal-card"><div class="meal-head"><h3>${meal}</h3><span>${row[0]}</span></div><h4>ON THE MENU</h4><ul class="specials">${row[j+1].map(id=>`<li>${esc(itemName(id))}</li>`).join('')}</ul><h4>BREADS, RICE & ACCOMPANIMENTS</h4><p class="accompaniment">${[...sides.slice(0,2),j===0?'dal-bhat':'khichdi-kadhi',...sides.slice(2)].map(itemName).join(' · ')}</p></article>`).join('')+'</div>';if(focus)document.getElementById('day-'+i).focus()}
document.getElementById('day-tabs').innerHTML=week.map((r,i)=>`<button id="day-${i}" role="tab" aria-controls="day-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${r[0]}</button>`).join('');
document.querySelectorAll('[role=tab]').forEach((b,i)=>b.addEventListener('click',()=>selectDay(i)));
document.getElementById('day-tabs').addEventListener('keydown',e=>{let i=selectedDay;if(e.key==='ArrowRight')i=(i+1)%7;else if(e.key==='ArrowLeft')i=(i+6)%7;else if(e.key==='Home')i=0;else if(e.key==='End')i=6;else return;e.preventDefault();selectDay(i,true)});selectDay(0);
const priceEntries=[...dishes.filter(d=>d[3]!==null).map(d=>[d[1],d[4],d[3]]),
['Undhiyu','Gujarati mixed-vegetable favourite.',40],
['Ringan olo','A traditional brinjal preparation.',40],
['Aloo changeji','Potato sabji.',40],
['Other sabji','Other vegetable dishes.',30],
['Fix thali','2 sabji, 5 roti, dal-bhat and chass.',100],
['Full thali','Complimentary sweets Wednesday to Friday.',130],
['Sweet','Sweet item.',20]];
document.getElementById('price-table').innerHTML=priceEntries.map(d=>`<tr><td>${esc(d[0])}</td><td>${esc(d[1])}</td><td>₹${d[2]}</td></tr>`).join('');
const imageMap={"rotli": "rotli.jpg", "bajra rotlo": "rotlo.jpg", "butter rotlo": "rotlo.jpg", "chass": "chaas.jpg", "masala chass": "chaas.jpg", "papad": "papad.jpg", "dal bhat": "dal-fry.jpg", "khichdi kadhi": "khichdi-kadhi.jpg", "salad": "salad.jpg", "sev tomato": "sev-tomato.jpg", "undhiyu": "undhiyu.jpg", "desi chana": "chole.jpg", "pav bhaji": "pav-bhaji.jpg", "rasila bateta": "potato-peas.jpg", "Marvadi dhokli": "dhokli.jpg", "guvar bateta": "guvar-potato.jpg", "dahi tikhari": "khichdi-kadhi.jpg", "vatala bateta": "potato-peas.jpg", "mug": "mung.jpg", "mix veg": "undhiyu.jpg", "masala bhinda": "bhindi.jpg", "dhokali": "dhokli.jpg", "chana dal": "dal-fry.jpg", "guvar chola bateta": "guvar-potato.jpg", "dal fry": "dal-fry.jpg", "chole chana": "chole.jpg", "aloo changeji": "potato-peas.jpg", "dungdi gathiya": "sev-tomato.jpg", "udad dal": "mung.jpg", "ringan vatala bateta": "undhiyu.jpg", "dudhi bateta": "guvar-potato.jpg", "mug dal": "dal-fry.jpg", "galka gathiya": "guvar-potato.jpg"};
function availability(id){const found=[];week.forEach(row=>{if(row[1].includes(id))found.push(row[0].slice(0,3)+' lunch');if(row[2].includes(id))found.push(row[0].slice(0,3)+' dinner')});if(id==='dal-bhat')return 'Every day · Lunch';if(id==='khichdi-kadhi')return 'Every day · Dinner';if(sides.includes(id)||id==='sev-tomato')return 'Every day · Lunch & dinner';if(['butter-rotlo','masala-chass'].includes(id))return 'Individual menu item';return found.join(' · ')}
const removedCards=new Set(['salad','sev-tomato','undhiyu','desi-chana','pav-bhaji','rasila-bateta','marvadi-dhokli','guvar-bateta','dahi-tikhari','vatala-bateta','mug','mix-veg','masala-bhinda','dhokali','chana-dal','guvar-chola-bateta','dal-fry','chole-chana','aloo-changeji','dungdi-gathiya','udad-dal','ringan-vatala-bateta','dudhi-bateta','mug-dal','galka-gathiya']);
const removedPhotos=new Set(['dhokali','chana-dal','guvar-chola-bateta']);
function showDishes(){document.getElementById('dish-grid').innerHTML=dishes.filter(d=>!removedCards.has(d[0])).map(d=>`<article class="dish-card ${removedPhotos.has(d[0])?'text-only':''}">${removedPhotos.has(d[0])?'':`<div class="dish-photo"><img src="assets/food/${imageMap[d[5]]}" width="600" height="430" alt="Illustrative food photo for ${esc(d[1])}" loading="lazy"><span class="dish-price ${d[3]===null?'ask':''}">${d[3]===null?'Ask for price':'₹'+d[3]}</span></div>`}<div class="dish-content">${removedPhotos.has(d[0])?'<span class="dish-price ask">Ask for price</span>':''}<span class="dish-category">${{Curry:'Vegetables & curries',Dal:'Dals & pulses',Bread:'Breads',Meal:'Meal pairings',Side:'Drinks & sides'}[d[2]]}</span><h3>${esc(d[1])}</h3><p>${esc(d[4])}</p><div class="dish-days">${availability(d[0])}</div></div></article>`).join('')}
showDishes();
