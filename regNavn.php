<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$filePath = "elev_pool.csv";

$pull = [];

if (!isset($navnListe)) {
  $navn = mb_convert_encoding(file_get_contents("http://it-forlaget.no/Data/Elever2024.csv"), "UTF-8", "auto");
  $navnListe = file_put_contents($filePath, $navn);
}


$csv = file_get_contents($filePath);

if ($_SERVER["REQUEST_METHOD"] == "POST" && getallheaders()["what-post"] === "get-list") {
  header("Content-Type: text/plain");
  echo $csv;
  exit;
}

$liste = [];

if (($handle = fopen($filePath, "r")) !== false) {

  while (($row = fgetcsv($handle, 1000, ";")) !== false) {
    $liste[] = $row;
  }
  fclose($handle);
}

array_shift($liste);

function updateListFile()
{
  global $liste, $filePath;
  $fil = fopen($filePath, "w");

  if ($fil) {
    foreach ($liste as $rad) {
      fputcsv($fil, $rad, ";");
    }
    fclose($fil);
  }
}

updateListFile();

if ($_SERVER["REQUEST_METHOD"] == "POST" && getallheaders()["what-post"] === "send-pull") {
  header("Content-Type: text/plain");
  $data = file_get_contents("php://input");
  $pull = json_decode($data, true);

  if ($pull[0] === 0) {
    $index_to_unset = $pull[1];
  } elseif ($pull[0] === 1) {
    $index_to_unset = $pull[1] + $pull[2];
  } else {
    $index_to_unset = $pull[1] + $pull[2] + $pull[3];
  }

  $removed = $liste[$index_to_unset][0];
  unset($liste[$index_to_unset]);
  $liste = array_values($liste);
  updateListFile();
  echo $removed;
  // Må legge til en "er her" faktor til det å ta vekk navn. 
  // Må også legge til lagring av vinner per dag og dager trukket.
}
