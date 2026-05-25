<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header('Content-Type: application/json');

// PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'vendor/autoload.php';
require_once 'config.php'; // contains $pdo

$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['email'])) {
    try {
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email");
        }

        // Check if exists
        $check = $pdo->prepare("SELECT id FROM contact_submissions WHERE email = ?");
        $check->execute([$email]);

        if ($check->fetch()) {
            echo json_encode([
                "success" => false,
                "message" => "Already subscribed"
            ]);
            exit;
        }

        // Insert
        $stmt = $pdo->prepare("INSERT INTO contact_submissions  (email, created_at) VALUES (?, NOW())");
        $stmt->execute([$email]);

        // Optional: Send welcome email
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'mail.larozanatureresort.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'booking@larozaresort.com';
        $mail->Password = 'ra2S66EEHaPWJqUG8Bkz';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('booking@larozaresort.com', 'La Roza Nature Resort');
        $mail->addAddress($email);
        $mail->Subject = "Subscribed to Newsletter";
        $mail->Body = "Thank you for subscribing to La Roza Nature Resort newsletter.";

        $mail->send();

        echo json_encode([
            "success" => true,
            "message" => "Subscribed successfully"
        ]);

    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Email required"
    ]);
}