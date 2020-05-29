 <?php

$data = json_decode(file_get_contents("php://input"), true);
$task = $data['tekst'];


echo $task;

file_put_contents('points.txt', $task);