let canInteract = true;
let elev_pool = [];

fetch("Elever_2024.csv")
  .then((response) => response.arrayBuffer())
  .then((buffer) => {
    const decoder = new TextDecoder("iso-8859-1"); // Change to the appropriate encoding if needed
    const text = decoder.decode(buffer);
    const rows = text.split("\n").map((row) => row.split(";"));
    elev_pool = rows;
  });

function _body_onload() {
  const kalender = document.getElementById("inner_kalender");
  for (let index = 0; index < 24; index++) {
    const boks = document.createElement("div");
    boks.value = index;
    boks.classList.add("boks_kalender");
    kalender.appendChild(boks);
    const child_boks = document.createElement("div");
    child_boks.classList.add("child_boks");
    child_boks.innerText = index + 1;
    child_boks.id = index;
    child_boks.addEventListener("click", function() {
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
      document.querySelector(".presentBar").classList.add("pSlideIn");
      pullName(index);

      let i = 0;
      document.querySelectorAll(".present").forEach((present, index) => {
        present.addEventListener("click", function () {
          openPresent(index);
        })
        i++;
      });
      

    }, 4000);
    setTimeout(() => {
      document.getElementById("lights_off").classList.add("light_off_trans");
      document.querySelector(".light1").classList.add("light_trans1");
      document.querySelector(".light2").classList.add("light_trans2");
      document.querySelector(".light3").classList.add("light_trans3");
    }, 4500);
    setTimeout(() => {
      canInteract = true;
    }, 10000);
  }
}

function pullName(dateIndex) {
  fetch("regNavn.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      //Henter full klasseliste fra server
      const get_liste = data;
      const rader = get_liste.trim().split("\n");
      elev_pool = rader.map((rad) => (rad.split(";")));
      elev_pool.shift();

      //Skiller listene inn etter trinn
      const elev_pool_1 = elev_pool.filter((rad) => {
        return rad[rad.length - 1][0] === "1";
      });
      const elev_pool_2 = elev_pool.filter((rad) => {
        return rad[rad.length - 1][0] === "2";
      });
      const elev_pool_3 = elev_pool.filter((rad) => {
        return rad[rad.length - 1][0] === "3";
      });

      const pull1 = Math.floor(Math.random() * elev_pool_1.length);
      const pull2 = Math.floor(Math.random() * elev_pool_2.length);
      const pull3 = Math.floor(Math.random() * elev_pool_3.length);
    });
}

function openPresent(index) {
  document.querySelectorAll(".present")[index].classList.add(`presentOpened${index}`);
}
