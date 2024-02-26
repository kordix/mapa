<?php
return;
 define('SITE_ROOT', realpath(dirname(__FILE__)));
 require_once('dir.php');

 $nazwapliku = $_GET['nazwapliku'];
 $rozszerzenie = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));

 $target_file = $target_dir . basename($nazwapliku.'.'.$rozszerzenie);

move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);

