<?php
require_once("_config.php");

beskyttSide("admin");

require_once("_topp.php");
?>


<div class="center" id="kalenderScene">
  <div class="kalender">
    <img src="images/holly.png" id="holly">
    <div id="inner_kalender">
    </div>
  </div>
</div>
<div class="center scene_2_2" id="presentScene">
  <div class="kalender">
    <a href="regNavn.php"><img src="images/holly.png" id="holly"></a>
    <div id="presents_container">
      <div class="presentBar">
        <div class="present">
          <img class="base" src="images/presentBase.png">
          <img class="lid" src="images/presentLid.png">
        </div>
        <div class="present">
          <img class="base" src="images/presentBase.png">
          <img class="lid" src="images/presentLid.png">
        </div>
        <div class="present">
          <img class="base" src="images/presentBase.png">
          <img class="lid" src="images/presentLid.png">
        </div>
      </div>
      <div id="lights_off" class="light_off"></div>
      <div class="light1"></div>
      <div class="light2"></div>
      <div class="light3"></div>
      <p id="winner"></p>
    </div>
  </div>
</div>

<?php
require_once("_bunn.php");
?>
