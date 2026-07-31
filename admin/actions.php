<?php
session_start();
require_once 'config.php';

// Authentication Check
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: index.php");
    exit();
}

$action = $_POST['action'] ?? '';

if ($action === 'upload') {
    $category = $_POST['category'] ?? '';
    
    // Validate category
    $allowedCategories = ['floor', 'kitchen', 'roof', 'stairs', 'washroom'];
    if (!in_array($category, $allowedCategories)) {
        header("Location: index.php?err=Invalid category.");
        exit();
    }
    
    // Handle File
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $fileSize = $_FILES['image']['size'];
        $fileType = $_FILES['image']['type'];
        
        // Check size (max 2MB)
        if ($fileSize > 2 * 1024 * 1024) {
            header("Location: index.php?err=File is too large. Maximum size is 2MB.");
            exit();
        }
        
        // Check extension
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        if (!in_array($fileExtension, $allowedExtensions)) {
            header("Location: index.php?err=Invalid file type. Only JPG, PNG, and WEBP are allowed.");
            exit();
        }
        
        // Generate secure filename
        $newFileName = time() . '_' . rand(1000, 9999) . '.' . $fileExtension;
        
        // Target Directory
        $targetDir = UPLOAD_DIR . $category . '/';
        
        // Create directory if it doesn't exist (though it should)
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }
        
        $destPath = $targetDir . $newFileName;
        
        if (move_uploaded_file($fileTmpPath, $destPath)) {
            header("Location: index.php?msg=Image uploaded successfully!");
            exit();
        } else {
            header("Location: index.php?err=Failed to move uploaded file. Check folder permissions.");
            exit();
        }
    } else {
        header("Location: index.php?err=Error during file upload.");
        exit();
    }
} 
elseif ($action === 'delete') {
    $filePath = $_POST['file_path'] ?? '';
    
    // Security check to prevent directory traversal
    if (strpos($filePath, '..') === false || strpos($filePath, UPLOAD_DIR) !== 0) {
        header("Location: index.php?err=Invalid file path.");
        exit();
    }
    
    if (file_exists($filePath)) {
        if (unlink($filePath)) {
            header("Location: index.php?msg=Image deleted successfully!");
            exit();
        } else {
            header("Location: index.php?err=Failed to delete file. Check folder permissions.");
            exit();
        }
    } else {
        header("Location: index.php?err=File not found.");
        exit();
    }
} 
else {
    header("Location: index.php");
    exit();
}
?>
