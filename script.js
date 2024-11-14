let canInteract = true;
let data

function _body_onload() {
  const kalender = document.getElementById("inner_kalender");
  for (let index = 0; index < 24; index++) {
    const boks = document.createElement("div");
    boks.value = index;
    boks.classList.add("boks_kalender");
    kalender.appendChild(boks);
    const child_boks = document.createElement("div");
    child_boks.classList.add("child_boks");
    child_boks.innerText = index;
    child_boks.id = index;
    child_boks.addEventListener("click", function () {
      boks_click(index);
    });
    boks.appendChild(child_boks);
  }
}

function boks_click(index) {
  if (canInteract) {
    canInteract = false;
    console.log(canInteract);
    setTimeout(() => {
      const kalenderScene = document.getElementById("kalenderScene");
      const presentScene = document.getElementById("presentScene");
      kalenderScene.classList.toggle("scene_2");
      presentScene.classList.toggle("scene_2_2");
    }, 1500);
    document.getElementById(index).classList.add("opened");
    setTimeout(() => {
      const lights_off = document.createElement("div");
      lights_off.classList.add("light_off");
      lights_off.id = "lights_off";
      document.getElementById("body").appendChild(lights_off);
    }, 4000);
    setTimeout(() => {
      document.getElementById("lights_off").classList.add("light_off_trans");
    }, 4500);
    setTimeout(() => {
      pullName(index)
    }, 6500);
    setTimeout(() => {
      canInteract = true;
      console.log(canInteract)
    }, 10000);
  }
}


function pullName(dateIndex) {
  
}
