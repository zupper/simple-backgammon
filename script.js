function startup() {
  // setup checkers = make them draggable
  const checkers = document.getElementsByClassName("checker");
  for (c of checkers) {
    c.draggable = true;
    c.ondragstart = dragstart_handler;
  }

  // setup drop zones
  const dropzones = document.getElementsByClassName("dropzone");
  for (d of dropzones) {
    d.ondrop = drop_handler;
    d.ondragover = dragover_handler;
  }
}

function dragstart_handler(ev) {
  ev.dataTransfer.setData("application/my-app", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
  const data = ev.dataTransfer.getData("application/my-app");
  this.appendChild(document.getElementById(data));
  ev.preventDefault();
}

function roll() {
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
