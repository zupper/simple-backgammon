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
  ev.target.appendChild(document.getElementById(data));
  ev.preventDefault();
}

function roll() {
  let dice = document.querySelectorAll('.die');
  dice.forEach(function(die) {
    die.textContent = Math.floor(Math.random() * 6) + 1;
  });
}
