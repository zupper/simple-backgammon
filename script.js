function startup() {
  // setup checkers = make them draggable
  const checkers = document.getElementsByClassName("checker");
  for (c of checkers) {
    c.draggable = true;
    c.ondragstart = dragStart;
    c.ondblclick = take;
  }

  // setup drop zones
  const dropzones = document.getElementsByClassName("dropzone");
  for (d of dropzones) {
    d.ondrop = drop;
    d.ondragover = dragOver;
  }

  defaultSetup();
}

function drawChecker(color) {
  const canvas = document.createElement("canvas");
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.height = 54 * ratio;

  const context = canvas.getContext('2d');

  context.beginPath();
  context.arc(27 * ratio, 27 * ratio, 26 * ratio, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
  context.lineWidth = 2 * ratio;
  context.strokeStyle = 'black';
  context.stroke();

  return canvas;
}

function identifyDraggedCheckers(e) {
  const target = e.target;
  if (target.parentElement.id.includes('side')) {
    return [target];
  }

  const siblings = Array.from(e.target.parentElement.children);
  const targetIndex = siblings.findIndex(e => e.id == target.id);
  let result = siblings.filter((_, idx) => idx >= targetIndex);
  return result;
}

function getColor(el) {
  return window.getComputedStyle(el).backgroundColor;
}

function merge(cs) {
  const totalHeight = cs.reduce((acc, c) => acc + c.height, 0);
  const maxWidth = cs.reduce((acc, c) => c.width > acc ? c.width : acc, 0);

  let result = document.createElement("canvas");
  const context = result.getContext("2d");
  result.width = maxWidth;
  result.height = totalHeight;

  cs.reduce((offset, c) => {
    context.drawImage(c, 0, offset);
    return c.height + offset;
  }, 0);

  return result;
}

function getOffsets(ev) {
  const offsetX = ev.clientX - ev.explicitOriginalTarget.offsetLeft;
  const offsetY = ev.clientY - ev.explicitOriginalTarget.offsetTop;

  return [offsetX, offsetY];
}

function dragStart(ev) {
  const dragged = identifyDraggedCheckers(ev);
  const dragImages = dragged.map(c => drawChecker(getColor(c)));

  ev.dataTransfer.setData("application/simple-backgammon", JSON.stringify(dragged.map(d => d.id)));
  ev.dataTransfer.effectAllowed = "move";

  const shouldReverse = ev.target.parentElement.parentElement.id == 'lower';
  const checkerHeight = dragged[0].clientHeight;

  const offsets = getOffsets(ev);
  const offsetX = offsets[0];
  const offsetY = shouldReverse ? offsets[1] + (checkerHeight * (dragged.length - 1)) : offsets[1];

  const dragImage = shouldReverse ? merge(dragImages.reverse()) : merge(dragImages);
  ev.dataTransfer.setDragImage(dragImage, offsetX, offsetY);
}

function dragOver(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop(ev) {
  const ids = JSON.parse(ev.dataTransfer.getData("application/simple-backgammon"));

  ids.forEach(id => this.appendChild(document.getElementById(id)));
  ev.preventDefault();
}

function take(e) {
  if (this.classList.contains('black')) {
    document.getElementById('left-side').appendChild(this);
  }
  else if (this.classList.contains('white')) {
    document.getElementById('right-side').appendChild(this);
  }
  e.preventDefault();
}

function roll() {
  let diceDiv = document.getElementById('dice');
  diceDiv.style.backgroundColor = '#647687';
  setTimeout(() => { diceDiv.style.backgroundColor = '#ffffff'; }, 100);
  let dice = document.querySelectorAll('.die');
  dice.forEach(function(die) {
    die.textContent = Math.floor(Math.random() * 6) + 1;
  });
}

function defaultSetup() {
  document.getElementById('uc1').appendChild(document.getElementById('white1'));
  document.getElementById('uc1').appendChild(document.getElementById('white2'));
  document.getElementById('uc1').appendChild(document.getElementById('white3'));
  document.getElementById('uc1').appendChild(document.getElementById('white4'));
  document.getElementById('uc1').appendChild(document.getElementById('white5'));

  document.getElementById('lc7').appendChild(document.getElementById('white6'));
  document.getElementById('lc7').appendChild(document.getElementById('white7'));
  document.getElementById('lc7').appendChild(document.getElementById('white8'));
  document.getElementById('lc7').appendChild(document.getElementById('white9'));
  document.getElementById('lc7').appendChild(document.getElementById('white10'));

  document.getElementById('lc5').appendChild(document.getElementById('white11'));
  document.getElementById('lc5').appendChild(document.getElementById('white12'));
  document.getElementById('lc5').appendChild(document.getElementById('white13'));

  document.getElementById('uc12').appendChild(document.getElementById('white14'));
  document.getElementById('uc12').appendChild(document.getElementById('white15'));

  document.getElementById('lc1').appendChild(document.getElementById('black1'));
  document.getElementById('lc1').appendChild(document.getElementById('black2'));
  document.getElementById('lc1').appendChild(document.getElementById('black3'));
  document.getElementById('lc1').appendChild(document.getElementById('black4'));
  document.getElementById('lc1').appendChild(document.getElementById('black5'));

  document.getElementById('uc7').appendChild(document.getElementById('black6'));
  document.getElementById('uc7').appendChild(document.getElementById('black7'));
  document.getElementById('uc7').appendChild(document.getElementById('black8'));
  document.getElementById('uc7').appendChild(document.getElementById('black9'));
  document.getElementById('uc7').appendChild(document.getElementById('black10'));

  document.getElementById('uc5').appendChild(document.getElementById('black11'));
  document.getElementById('uc5').appendChild(document.getElementById('black12'));
  document.getElementById('uc5').appendChild(document.getElementById('black13'));

  document.getElementById('lc12').appendChild(document.getElementById('black14'));
  document.getElementById('lc12').appendChild(document.getElementById('black15'));
}

function empty() {
  const whites = document.querySelectorAll(`[id^="white"]`);
  const blacks = document.querySelectorAll(`[id^="black"]`);

  const leftSide = document.getElementById('left-side');
  const rightSide = document.getElementById('right-side');

  for (let w of whites) {
    rightSide.appendChild(w);
  }

  for (let b of blacks) {
    leftSide.appendChild(b);
  }
}
