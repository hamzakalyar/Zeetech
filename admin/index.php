<?php
session_start();
require_once 'config.php';

// Handle Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit();
}

// Handle Login
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        header("Location: index.php");
        exit();
    } else {
        $error = "Invalid username or password.";
    }
}

$isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
$categories = ['floor', 'kitchen', 'roof', 'stairs', 'washroom'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zeetech Admin Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; background-color: #f3f4f6; }
    </style>
</head>
<body>

<?php if (!$isLoggedIn): ?>
    <!-- LOGIN SCREEN -->
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Zeetech Admin</h2>
                <p class="text-gray-500">Sign in to manage projects</p>
            </div>
            <?php if ($error): ?>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"><?php echo $error; ?></div>
            <?php endif; ?>
            <form method="POST" action="">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input type="text" name="username" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" name="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required>
                </div>
                <button type="submit" name="login" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">Sign In</button>
            </form>
        </div>
    </div>

<?php else: ?>
    <!-- DASHBOARD -->
    <nav class="bg-blue-600 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="text-white font-bold text-xl"><i class="fa-solid fa-gear mr-2"></i> Zeetech Admin</div>
                <a href="?logout=1" class="text-white hover:text-blue-200 transition duration-200"><i class="fa-solid fa-sign-out-alt mr-1"></i> Logout</a>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <?php if (isset($_GET['msg'])): ?>
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
                <span><?php echo htmlspecialchars($_GET['msg']); ?></span>
                <button onclick="this.parentElement.remove()" class="text-green-700 font-bold">&times;</button>
            </div>
        <?php endif; ?>
        <?php if (isset($_GET['err'])): ?>
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
                <span><?php echo htmlspecialchars($_GET['err']); ?></span>
                <button onclick="this.parentElement.remove()" class="text-red-700 font-bold">&times;</button>
            </div>
        <?php endif; ?>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- UPLOAD WIDGET -->
            <div class="bg-white p-6 rounded-xl shadow-md lg:col-span-1 h-fit sticky top-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Upload New Project</h3>
                <form action="actions.php" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="action" value="upload">
                    
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Category</label>
                        <select name="category" class="w-full px-3 py-2 border rounded-lg bg-white" required>
                            <?php foreach ($categories as $cat): ?>
                                <option value="<?php echo $cat; ?>"><?php echo ucfirst($cat); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Select Image</label>
                        <input type="file" name="image" accept="image/jpeg, image/png, image/webp" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required>
                        <p class="text-xs text-gray-400 mt-1">Format: JPG, PNG, WEBP. Max size: 2MB.</p>
                    </div>

                    <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
                        <i class="fa-solid fa-cloud-arrow-up mr-2"></i> Upload Image
                    </button>
                </form>
            </div>

            <!-- GALLERY MANAGER -->
            <div class="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
                <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Manage Uploaded Projects</h3>
                
                <?php
                // Fetch current images
                $imagesByCategory = [];
                foreach ($categories as $cat) {
                    $imagesByCategory[$cat] = [];
                    $dir = UPLOAD_DIR . $cat;
                    if (is_dir($dir)) {
                        $files = glob($dir . '/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', GLOB_BRACE);
                        foreach ($files as $file) {
                            $imagesByCategory[$cat][] = [
                                'filename' => basename($file),
                                'path' => $file,
                                'public_path' => str_replace('../', '', $file) // relative to root for viewing
                            ];
                        }
                    }
                }
                
                $totalImages = 0;
                foreach ($imagesByCategory as $cat => $imgs) {
                    $totalImages += count($imgs);
                }
                ?>
                
                <?php if ($totalImages === 0): ?>
                    <p class="text-gray-500 text-center py-8">No images found. Upload some to get started!</p>
                <?php else: ?>
                    <?php foreach ($imagesByCategory as $categoryName => $images): ?>
                        <?php if (count($images) > 0): ?>
                            <div class="mb-8">
                                <h4 class="text-md font-bold text-gray-700 mb-3 uppercase tracking-wide border-b border-gray-200 pb-1">
                                    <i class="fa-solid fa-folder-open text-blue-500 mr-2"></i> <?php echo ucfirst($categoryName); ?> (<?php echo count($images); ?>)
                                </h4>
                                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    <?php foreach ($images as $img): ?>
                                        <div class="relative group rounded-lg overflow-hidden border">
                                            <!-- Image Preview -->
                                            <img src="../<?php echo $img['public_path']; ?>" alt="Project" class="w-full h-32 object-cover">
                                            
                                            <!-- Delete Overlay -->
                                            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                                                <form action="actions.php" method="POST" onsubmit="return confirm('Are you sure you want to delete this image?');">
                                                    <input type="hidden" name="action" value="delete">
                                                    <input type="hidden" name="file_path" value="<?php echo $img['path']; ?>">
                                                    <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded shadow">
                                                        <i class="fa-solid fa-trash-can"></i> Delete
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        <?php endif; ?>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
<?php endif; ?>

</body>
</html>
