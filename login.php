<?php

require_once("_config.php");

$loginMelding = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $brukernavn = strip_tags($_POST["brukernavn"]);
  $passord = strip_tags($_POST["passord"]);

  if ($brukernavn == "admin" && $passord == "hemmelig") {
    $_SESSION["rolle"] = "admin";
    header("location: index.php");
  } else {
    $loginMelding = "Feil brukernavn eller passord";
  }
}

require_once("_topp.php");

?>
<div class="vAlign">
  <div class="candyBorder">
    <div class="menu">
      <div class="menuCenter">
        <h1>Login</h1>
        <form method="post">
          <table>
            <tr>
              <td>Brukernavn: </td>
              <td><input type="text" name="brukernavn" </td>
            </tr>
            <tr>
              <td>Passord: </td>
              <td><input type="password" name="passord"><input type="submit" value="Login"></td>
            </tr>
            <tr>
              <td colspan="3">
                <p><?php echo $loginMelding ?></p>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  </div>
</div>

<?php

require_once("_bunn.php");

?>
