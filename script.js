let canInteract = true;
let elev_pool = [];
let dagOpen;

let winnersToday = {};
let elev_pool_1 = [];
let elev_pool_2 = [];
let elev_pool_3 = [];
let pull1 = "";
let pull2 = "";
let pull3 = "";

let openedDatesData = [];
let openedDates = [];

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

    if (!child_boks.hasAttribute("data-listener")) {
      child_boks.addEventListener("click", function () {
        boks_click(index);
      });
      child_boks.setAttribute("data-listener", "true");
    }

    boks.appendChild(child_boks);
  }

  document.querySelector(".backToTop").addEventListener("click", initialize)

  updateOpenedDates();
}

function boks_click(index) {
  if (canInteract) {
    if (
      !document.querySelectorAll(".child_boks")[index].classList
        .contains("dateOpened")
    ) {
      dagOpen = index;
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
        pullName();

        let i = 0;
        document.querySelectorAll(".present").forEach((present, index) => {
          if (!present.hasAttribute("data-listener")) {
            present.addEventListener("click", function () {
              openPresent(index);
            });
            present.setAttribute("data-listener", "true");
          }
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
      }, 5000);
    } else {
      document.getElementById(index).classList.add("opened");
      document.querySelector(".showPrevWinners").classList.add("show");

      document.getElementById("winner1").innerText = openedDatesData[index][0];
      document.getElementById("winner2").innerText = openedDatesData[index][1];
      document.getElementById("winner3").innerText = openedDatesData[index][2];

      document.querySelector(".backToTop").classList.add("show");

      setTimeout(() => {
        const kalenderScene = document.getElementById("kalenderScene");
        const presentScene = document.getElementById("presentScene");
        kalenderScene.classList.toggle("scene_2");
        presentScene.classList.toggle("scene_2_2");
      }, 1500);
    }
  }
}

function pullName() {
  fetch("regNavn.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "What-Post": "get-list",
    },
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      const get_liste = data;
      const rader = get_liste.trim().split("\r\n");
      elev_pool = rader.map((rad) => (rad.split(";")));
      elev_pool.shift();

      elev_pool_1 = elev_pool.filter((rad) => {
        return rad[rad.length - 1][0] === "1";
      });
      elev_pool_2 = elev_pool.filter((rad) => {
        return rad[rad.length - 1][0] === "2";
      });
      elev_pool_3 = elev_pool.filter((rad) => {
        return rad[rad.length - 1][0] === "3";
      });

      pull1 = Math.floor(Math.random() * elev_pool_1.length);
      pull2 = Math.floor(Math.random() * elev_pool_2.length);
      pull3 = Math.floor(Math.random() * elev_pool_3.length);
    });
}

function erHer() {
  return new Promise((resolve) => {
    const erHerKnapp = document.querySelector("#erHer");
    const erIkkeHerKnapp = document.querySelector("#erIkkeHer");
    const erHerPopup = document.querySelector(".erHerPopup");

    erHerKnapp.addEventListener("click", () => {
      resolve(true);
    });
    erIkkeHerKnapp.addEventListener("click", () => {
      resolve(false);
    });
    erHerPopup.classList.add("isVisible");
  });
}

async function openPresent(index) {
  if (canInteract) {
    canInteract = false;
    let lukk = false;
    let pullIndex = 0;
    if (index === 0) {
      pullIndex = pull1;
    }
    if (index === 1) {
      pullIndex = pull2;
    }
    if (index === 2) {
      pullIndex = pull3;
    }
    document.querySelectorAll(".present")[index].classList.add(
      `presentOpened${index}`,
    );
    const pull = [
      index,
      pullIndex,
      elev_pool_1.length,
      elev_pool_2.length,
      elev_pool_3.length,
    ];

    const elev_pools = [elev_pool_1, elev_pool_2, elev_pool_3];
    const winner = document.querySelector(".displayWinner");

    if (winnersToday[index] !== undefined) {
      winner.innerText = winnersToday[index];
      lukk = true;
    } else {
      winner.innerText = elev_pools[index][pullIndex];
      lukk = false;
    }

    winner.classList.add("winnerShow");
    if (!lukk) {
      const erHerBool = await erHer();
      pullName();

      if (erHerBool) {
        fetch("regNavn.php", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "What-Post": "send-pull",
          },
          "body": JSON.stringify(pull),
        }).then((data) => {
          return data.text();
        });
        document.querySelector(".erHerPopup").classList.remove("isVisible");
        winner.classList.remove("winnerShow");
        document.querySelectorAll(".present")[index].classList.remove(
          `presentOpened${index}`,
        );

        canInteract = true;
        if (winnersToday[`${index}`] == undefined) {
          winnersToday[`${index}`] = elev_pools[index][pullIndex];
          if (
            (winnersToday[0] !== undefined) &&
            (winnersToday[1] !== undefined) &&
            (winnersToday[2] !== undefined)
          ) {
            document.querySelector(".lagreResultater").classList.add("show");
            if (
              !document.querySelector(".lagreResultater").hasAttribute(
                "data-listener",
              )
            ) {
              document.querySelector(".lagreResultater").addEventListener(
                "click",
                () => {
                  const resultsToSave = {
                    key: `${dagOpen}`,
                    value: [
                      winnersToday[0],
                      winnersToday[1],
                      winnersToday[2],
                    ],
                  };

                  document.querySelector(".lagreResultater").classList.remove(
                    "show",
                  );
                  initialize();

                  fetch("regNavn.php", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "What-Post": "save-results-date",
                    },
                    body: JSON.stringify(resultsToSave),
                  })
                    .then((data) => data.text())
                    .then(() => updateOpenedDates);
                },
              );
              document.querySelector(".lagreResultater").setAttribute(
                "data-listener",
                "true",
              );
            }
            document.querySelector(".lagreResultater").classList.add("show");
          }
        }
      } else {
        document.querySelector(".erHerPopup").classList.remove("isVisible");
        winner.classList.remove("winnerShow");
        canInteract = true;
        document.querySelectorAll(".present")[index].classList.remove(
          `presentOpened${index}`,
        );
      }
    }
    if (lukk) {
      document.querySelector("#lukkPopup").classList.add("isVisible");
      document.querySelector("#lukk").addEventListener("click", () => {
        document.querySelector("#lukkPopup").classList.remove("isVisible");
        document.querySelectorAll(".present")[index].classList.remove(
          `presentOpened${index}`,
        );
        winner.classList.remove("winnerShow");
        canInteract = true;
      });
    }
  }
  updateOpenedDates();
}

function updateOpenedDates() {
  fetch("regNavn.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "What-Post": "openedDates",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      openedDatesData = data;
      openedDates = Object.keys(openedDatesData);

      document.querySelectorAll(".child_boks").forEach((luke) => {
        if (openedDates.includes((parseInt(luke.innerText) - 1).toString())) {
          luke.classList.add("dateOpened");
          luke.innerText = "";
        }
      });
    });
}

function initialize() {
  document.querySelector("#kalenderScene").classList.remove(
    "scene_2",
  );
  document.querySelector("#presentScene").classList.add(
    "scene_2_2",
  );
  document.querySelector(".presentBar").classList.remove(
    "pSlideIn",
  );
  document.getElementById("lights_off").classList.remove(
    "light_off_trans",
  );
  document.querySelector(".light1").classList.remove("light_trans1");
  document.querySelector(".light2").classList.remove("light_trans2");
  document.querySelector(".light3").classList.remove("light_trans3");


  document.querySelectorAll(".present").forEach((present, index) => {
    present.classList.remove(`presentOpened${index}`);
  });
  document.querySelectorAll(".child_boks").forEach((boks) => {
    boks.classList.remove("opened");
  });

  setTimeout(() => {
    document.getElementById("winner1").innerText = "";
    document.getElementById("winner2").innerText = "";
    document.getElementById("winner3").innerText = "";

    document.querySelector(".backToTop").classList.remove("show");
  }, 3000);

  updateOpenedDates();

  winnersToday = [];
}
