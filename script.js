let canInteract = true;
let elev_pool = [];

let elev_pool_1 = [];
let elev_pool_2 = [];
let elev_pool_3 = [];
let pull1 = "";
let pull2 = "";
let pull3 = "";

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
    child_boks.addEventListener("click", function () {
      boks_click(index);
    });
    boks.appendChild(child_boks);
  }
}

function boks_click(index) {
  if (canInteract) {
    canInteract = false;
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

      //For å åpne hver presang
      let i = 0;
      document.querySelectorAll(".present").forEach((present, index) => {
        present.addEventListener("click", function () { openPresent(index) })
        i++;
      });
    }, 4000);

    //Animasjoner for lyskasterene
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

//Henter gyldig liste av elever
function pullName(dateIndex) {
  fetch("regNavn.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "what-post": "get-list",
    },
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      //Henter full klasseliste fra server
      const get_liste = data;
      const rader = get_liste.trim().split("\r\n");
      elev_pool = rader.map((rad) => (rad.split(";")));
      elev_pool.shift();

      //Skiller listene inn etter trinn
      elev_pool_1 = elev_pool.filter((rad) => {
        return rad[rad.length - 1][0] === "1";
      });
      elev_pool_2 = elev_pool.filter((rad) => {
        return rad[rad.length - 1][0] === "2";
      });
      elev_pool_3 = elev_pool.filter((rad) => {
        return rad[rad.length - 1][0] === "3";
      });

      //Velger en vinner fra hvert trinn
      pull1 = Math.floor(Math.random() * elev_pool_1.length);
      pull2 = Math.floor(Math.random() * elev_pool_2.length);
      pull3 = Math.floor(Math.random() * elev_pool_3.length);

      console.log(pull3);

    });


}

function openPresent(index) {
  let pullIndex = 0;
  console.log(index);
  console.log(index === 0);
  if (index === 0) {
    pullIndex = pull1;
  };
  if (index === 1) {
    pullIndex = pull2
  };
  if (index === 2) {
    pullIndex = pull3
  };
  document.querySelectorAll(".present")[index].classList.add(`presentOpened${index}`);
  const pull = [index, pullIndex, elev_pool_1.length, elev_pool_2.length, elev_pool_3.length];

  fetch("regNavn.php", {
    "method": "POST",
    "headers": {
      "Content-Type": "text/plain",
      "what-post": "send-pull",
    },
    "body": JSON.stringify(pull),
  }).then(data => {
    return data.text()
  }).then(response => {
    console.log(response);
  })
}
