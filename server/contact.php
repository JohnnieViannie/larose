<?php
// Enable CORS
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

// Enable PHP error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'vendor/autoload.php';
require_once 'config.php'; // contains $pdo

$data = json_decode(file_get_contents('php://input'), true);

// REQUIRED FIELDS (match frontend + DB)
if (
    !empty($data['name']) &&
    !empty($data['email']) &&
    !empty($data['subject']) &&
    !empty($data['message'])
) {
    try {
        // Sanitize
        $full_name = htmlspecialchars($data['name']);
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        $phone = htmlspecialchars($data['phone'] ?? '');
        $subject = htmlspecialchars($data['subject']);
        $message = htmlspecialchars($data['message']);

        // PHPMailer
        $mail = new PHPMailer(true);

        // SMTP SETTINGS (UNCHANGED)
        $mail->isSMTP();
        $mail->Host = 'mail.beaconchildafrica.org';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@beaconchildafrica.org';
        $mail->Password = 'Y7hVvff@';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];

        // Recipients
        $mail->setFrom('info@beaconchildafrica.org', 'Contact form');
        $mail->addAddress('info@beaconchildafrica.org  ', 'Contact form');
        $mail->addReplyTo($email, $full_name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;

        $mail->Body = "
            <strong>Name:</strong> {$full_name}<br>
            <strong>Email:</strong> {$email}<br>
            <strong>Phone:</strong> {$phone}<br>
            <strong>Subject:</strong> {$subject}<br>
            <strong>Message:</strong><br>{$message}
        ";

        if ($mail->send()) {

            // INSERT INTO CORRECT TABLE & COLUMNS
            $stmt = $pdo->prepare("
                INSERT INTO contact_submissions 
                (full_name, email, phone, subject, message)
                VALUES 
                (:full_name, :email, :phone, :subject, :message)
            ");

            $stmt->execute([
                ':full_name' => $full_name,
                ':email' => $email,
                ':phone' => $phone,
                ':subject' => $subject,
                ':message' => $message
            ]);

            echo json_encode([
                "success" => true,
                "message" => "Message sent and stored successfully"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Email sending failed"
            ]);
        }

    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
}
