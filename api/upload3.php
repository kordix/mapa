<?php
// echo $_FILES["fileToUpload"];
// Sprawdzenie, czy formularz został wysłany
print_r($_FILES);
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["fileToUpload"])) {
    $target_dir = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR ; // Katalog, do którego będą zapisywane pliki
    echo $target_dir;
    // $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); // Pełna ścieżka do zapisanego pliku

    $nazwapliku = $_GET['nazwapliku'];
    $rozszerzenie = strtolower(pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION));

    $target_file = $target_dir . basename($nazwapliku.'.'.$rozszerzenie);

    $uploadOk = 1; // Zmienna flagowa informująca, czy upload jest możliwy

    // Sprawdzenie, czy plik już istnieje
    if (file_exists($target_file)) {
        echo "Przepraszamy, plik o tej nazwie już istnieje.";
        $uploadOk = 0;
    }

    // Sprawdzenie rozmiaru pliku
    if ($_FILES["fileToUpload"]["size"] > 50000000) { // Tutaj można ustawić maksymalny dopuszczalny rozmiar pliku
        echo "Przepraszamy, twój plik jest zbyt duży.";
        $uploadOk = 0;
    }

    // Dozwolone formaty plików
    $allowed_extensions = array("jpg","jpeg","png");
    $file_extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    if (!in_array($file_extension, $allowed_extensions)) {
        echo "Przepraszamy, tylko pliki mp3 są dozwolone";
        $uploadOk = 0;
    }

    // Sprawdzenie, czy $uploadOk jest nadal równa 1, czyli czy plik można przesłać
    if ($uploadOk == 0) {
        echo "Przepraszamy, twój plik nie został przesłany.";
        // Jeśli wszystko jest w porządku, próbujemy przesłać plik
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "Plik ". htmlspecialchars(basename($_FILES["fileToUpload"]["name"])). " został przesłany.";
        } else {
            echo "Przepraszamy, wystąpił błąd podczas przesyłania pliku.";
        }
    }
}
?>

