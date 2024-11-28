<?php 
  require_once("_config.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
  <link href="style.css" rel="stylesheet">
  <title>Hetland Advent Trekker</title>
</head>

<div id="logout" style="position: fixed; z-index: 999; top: 24px; right: 24px;"><a href="<?php echo $rot . "logout.php"?>">Logout</a></div>

<div class="erHerPopup">
  <h2>Er eleven her?</h2><br>
  <div>
    <button id="erHer">Er her</button>
    <button id="erIkkeHer">Er ikke her</button>
  </div>
</div>

<div class="erHerPopup" id="lukkPopup">
    <button id="lukk">Lukk</button>
</div>

<span class="displayWinner"></span>

<div class="lagreResultater">Lagre resultater</div>

<body onload="_body_onload()" id="body">
