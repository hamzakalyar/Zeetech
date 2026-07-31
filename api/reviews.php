<?php
/**
 * Reviews API for Zeetech
 * Handles POST (submit review) and GET (fetch approved reviews)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin (e.g. for testing)
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';
$conn = getDBConnection();

// GET Request: Fetch approved reviews
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT reviewer_name, rating, review_text, created_at FROM reviews WHERE status = 'approved' ORDER BY created_at DESC");
    $stmt->execute();
    $result = $stmt->get_result();
    
    $reviews = [];
    while ($row = $result->fetch_assoc()) {
        // Get the first letter of the name for the avatar
        $row['avatar_letter'] = strtoupper(substr(trim($row['reviewer_name']), 0, 1));
        $reviews[] = $row;
    }
    
    echo json_encode(["status" => "success", "data" => $reviews]);
    $stmt->close();
}
// POST Request: Submit a new review
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON POST body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (!isset($data['reviewer_name']) || !isset($data['rating']) || !isset($data['review_text'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit();
    }
    
    $name = trim($data['reviewer_name']);
    $rating = (int)$data['rating'];
    $text = trim($data['review_text']);
    
    // Validate
    if (strlen($name) < 2 || strlen($text) < 10 || $rating < 1 || $rating > 5) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid input data"]);
        exit();
    }
    
    $stmt = $conn->prepare("INSERT INTO reviews (reviewer_name, rating, review_text, status) VALUES (?, ?, ?, 'pending')");
    $stmt->bind_param("sis", $name, $rating, $text);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Review submitted and is pending approval."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to save review."]);
    }
    
    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

$conn->close();
?>
