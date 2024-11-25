<?php 

session_start();
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

$rot = "/IT2/Advent/";

function beskyttSide($rolle) {
  global $rot;
  if ($_SESSION["rolle"] != $rolle) {
    header("location:" . $rot ."login.php");
    die();
  }
}


?>
