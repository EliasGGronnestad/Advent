<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$filePath = "elev_pool.csv";

$jsonSavedResults = "savedResults.json";

$pull = [];


if (!isset($navnListe)) {
  $navn = mb_convert_encoding(file_get_contents("http://it-forlaget.no/Data/Elever2024.csv"), "UTF-8", "auto");
  $navnListe = file_put_contents($filePath, $navn);
}


$liste = [];


if ($_SERVER["REQUEST_METHOD"] == "POST" && getallheaders()["What-Post"] === "get-list") {
  header("Content-Type: text/plain");
  $csv = file_get_contents($filePath);
  echo $csv;
  exit;
}


if (($handle = fopen($filePath, "r")) !== false) {

  while (($row = fgetcsv($handle, 1000, ";")) !== false) {
    $liste[] = $row;
  }
  fclose($handle);
  array_shift($liste);
}


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

if ($_SERVER["REQUEST_METHOD"] == "POST" && getallheaders()["What-Post"] === "send-pull") {
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
}


if ($_SERVER["REQUEST_METHOD"] == "POST" && getallheaders()["What-Post"] === "save-results-date") {
  header("Content-Type: application/json");

  $data = file_get_contents("php://input");
  $results = json_decode($data, true);

  if (file_exists($jsonSavedResults)) {
    $savedResults = json_decode(file_get_contents($jsonSavedResults));
  } else {
    $savedResults = new stdClass();
  }

  $resultKey = $results['key'];
  $resultToSave = $results['value'];
  $savedResults->$resultKey = $resultToSave;

  file_put_contents($jsonSavedResults, json_encode($savedResults, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

  echo json_encode(["status" => "success"]);
}


if ($_SERVER["REQUEST_METHOD"] == "POST" && getallheaders()["What-Post"] === "openedDates") {
  header('Content-Type: application/json');
  error_log("afw");
  if (file_exists($jsonSavedResults)) {
    $openedBoxes = json_decode(file_get_contents($jsonSavedResults), true);
    error_log(print_r($openedBoxes, true));
    echo json_encode($openedBoxes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  } else {
    error_log("Ingen lagret resultat eller klarte ikke å åpne");
  }
}
