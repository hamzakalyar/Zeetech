<?php
/**
 * Projects API for Zeetech
 * Scans the assets/images/portfolio directories and returns a JSON list of images.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 

$baseDir = '../assets/images/portfolio';
$allowedCategories = ['floor', 'kitchen', 'roof', 'stairs', 'washroom'];

$projects = [];

foreach ($allowedCategories as $category) {
    $dirPath = $baseDir . '/' . $category;
    
    // Check if directory exists
    if (is_dir($dirPath)) {
        // Scan for images (jpg, jpeg, png, webp)
        $files = glob($dirPath . '/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', GLOB_BRACE);
        
        if ($files) {
            foreach ($files as $file) {
                // Remove the '../' prefix to make the path relative to the root
                $publicPath = ltrim($file, './'); // strip any leading dots and slashes
                if (substr($publicPath, 0, 3) === '../') {
                    $publicPath = substr($publicPath, 3);
                }
                
                $projects[] = [
                    'category' => $category,
                    'src' => $publicPath,
                    'alt' => $category . ' project by Zeetech',
                    'filename' => basename($file),
                    'timestamp' => filemtime($file)
                ];
            }
        }
    }
}

// Sort by timestamp (newest first)
usort($projects, function($a, $b) {
    return $b['timestamp'] - $a['timestamp'];
});

echo json_encode([
    'status' => 'success',
    'count' => count($projects),
    'data' => $projects
]);
?>
