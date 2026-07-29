<?php
/**
 * Reviews API for Zeetech
 * Handles POST (submit review) and GET (fetch approved reviews)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config.php';

// Auto-create table if it doesn't exist
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reviewer_name VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        review_text TEXT NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {
    // Ignore error if table exists
}

// ---------------------------------------------------------
// GET REQUEST: Fetch approved reviews
// ---------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->prepare("SELECT reviewer_name, rating, review_text, created_at FROM reviews WHERE status = 'approved' ORDER BY created_at DESC");
        $stmt->execute();
        $reviews = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'data' => $reviews
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch reviews']);
    }
    exit;
}

// ---------------------------------------------------------
// POST REQUEST: Submit a new review
// ---------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
        exit;
    }
    
    // Validate required fields
    if (empty($data['reviewer_name']) || empty($data['rating']) || empty($data['review_text'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO reviews (reviewer_name, rating, review_text) VALUES (:name, :rating, :text)");
        $stmt->execute([
            ':name' => strip_tags(trim($data['reviewer_name'])),
            ':rating' => (int)$data['rating'],
            ':text' => strip_tags(trim($data['review_text']))
        ]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Review submitted successfully and is pending approval.'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to save review to database']);
    }
    exit;
}

// If neither GET nor POST
http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
?>
