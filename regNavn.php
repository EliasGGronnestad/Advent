<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$filePath = "elev_pool.csv";

if(!isset($navnListe)) {
  $navn = mb_convert_encoding(file_get_contents("http://it-forlaget.no/Data/Elever2024.csv"), "UTF-8", "auto");
  $navnListe = file_put_contents($filePath, $navn);
}


$csv = file_get_contents($filePath);

if($_SERVER["REQUEST_METHOD"] == "POST") {
    header("Content-Type: text/plain");
    echo $csv;
    exit;
}
