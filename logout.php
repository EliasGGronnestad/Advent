<?php
  require_once("_config.php");
  session_destroy();
  session_unset();
  header("location: " . $rot . "login.php");
?>
