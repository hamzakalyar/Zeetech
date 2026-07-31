<?php
/**
 * Database Configuration for Zeetech Reviews API
 * 
 * Update these variables with your cPanel MySQL database credentials.
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'alfaeprp_Zeetech_Reviews');
define('DB_USER', 'alfaeprp_Zeetech_Reviews');
define('DB_PASS', 'YOUR_DATABASE_PASSWORD');

function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
    }
    
    $conn->set_charset("utf8mb4");
    return $conn;
}
?>
