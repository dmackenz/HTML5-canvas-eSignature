<?php
  // get name of image
  $name = ($_POST['iname']);

  // upload image
  file_put_contents($name, base64_decode($_POST['data']));
