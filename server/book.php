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

// REQUIRED FIELDS for booking
if (
    !empty($data['name']) &&
    !empty($data['email']) &&
    !empty($data['phone']) &&
    !empty($data['guests']) &&
    !empty($data['checkin']) &&
    !empty($data['checkout']) &&
    !empty($data['roomType'])
) {
    try {
        // Sanitize all fields
        $full_name = htmlspecialchars($data['name']);
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        $phone = htmlspecialchars($data['phone']);
        $guests = intval($data['guests']);
        $checkin = htmlspecialchars($data['checkin']);
        $checkout = htmlspecialchars($data['checkout']);
        $roomType = htmlspecialchars($data['roomType']);
        $requests = htmlspecialchars($data['requests'] ?? '');
        $howHear = htmlspecialchars($data['howHear'] ?? '');

        // Additional fields from form
        $bookingType = htmlspecialchars($data['bookingType'] ?? 'room');
        $nights = intval($data['nights'] ?? 1);
        $totalPrice = floatval($data['totalPrice'] ?? 0);

        // Get room details
        $roomName = 'Unknown Room';
        $roomPrice = 0;
        $roomGuests = 0;
        $roomSize = '';

        if (!empty($data['selectedRoom'])) {
            $room = $data['selectedRoom'];
            $roomName = htmlspecialchars($room['name'] ?? 'Unknown Room');
            $roomPrice = floatval($room['price'] ?? 0);
            $roomGuests = intval($room['guests'] ?? 0);
            $roomSize = htmlspecialchars($room['size'] ?? '');
        }

        // Format dates for display
        $checkinDate = date('F j, Y', strtotime($checkin));
        $checkoutDate = date('F j, Y', strtotime($checkout));
        $nightsDisplay = $nights . ' ' . ($nights == 1 ? 'night' : 'nights');

        // PHPMailer for ADMIN email
        $adminMail = new PHPMailer(true);

        // SMTP SETTINGS
        $adminMail->isSMTP();
        $adminMail->Host = 'mail.larozanatureresort.com';
        $adminMail->SMTPAuth = true;
        $adminMail->Username = 'booking@larozaresort.com';
        $adminMail->Password = 'qwert125';
        $adminMail->SMTPSecure = 'ssl';
        $adminMail->Port = 465;
        $adminMail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];

        // Admin email recipients
        $adminMail->setFrom('booking@larozaresort.com', 'La Roza Nature Resort Booking');
        $adminMail->addAddress('booking@larozaresort.com', 'Reservations');
        $adminMail->addReplyTo($email, $full_name);

        // Admin email content
        $adminMail->isHTML(true);
        $adminMail->Subject = "New Room Booking - " . $full_name;

        // HTML Email Template for ADMIN
        $adminMail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
                .section { margin-bottom: 20px; padding: 15px; background: white; border-left: 4px solid #4CAF50; }
                .label { font-weight: bold; color: #555; }
                .value { color: #333; }
                .total { font-size: 18px; font-weight: bold; color: #4CAF50; }
                .footer { margin-top: 20px; padding: 15px; background: #eee; text-align: center; font-size: 12px; }
                table { width: 100%; border-collapse: collapse; }
                th { background: #f2f2f2; padding: 10px; text-align: left; }
                td { padding: 10px; border-bottom: 1px solid #ddd; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1> New Room Booking Request</h1>
                </div>
                
                <div class='content'>
                    <div class='section'>
                        <h2> Guest Information</h2>
                        <table>
                            <tr><td class='label'>Full Name:</td><td class='value'>$full_name</td></tr>
                            <tr><td class='label'>Email:</td><td class='value'>$email</td></tr>
                            <tr><td class='label'>Phone:</td><td class='value'>$phone</td></tr>
                            <tr><td class='label'>Number of Guests:</td><td class='value'>$guests</td></tr>
                        </table>
                    </div>
                    
                    <div class='section'>
                        <h2> Stay Details</h2>
                        <table>
                            <tr><td class='label'>Check-in Date:</td><td class='value'>$checkinDate</td></tr>
                            <tr><td class='label'>Check-out Date:</td><td class='value'>$checkoutDate</td></tr>
                            <tr><td class='label'>Duration:</td><td class='value'>$nightsDisplay</td></tr>
                        </table>
                    </div>
                    
                    <div class='section'>
                        <h2> Room Selection</h2>
                        <table>
                            <tr><td class='label'>Room Type:</td><td class='value'>$roomName</td></tr>
                            <tr><td class='label'>Room Price:</td><td class='value'>$" . number_format($roomPrice, 2) . "/night</td></tr>
                            <tr><td class='label'>Max Guests:</td><td class='value'>$roomGuests</td></tr>
                            <tr><td class='label'>Room Size:</td><td class='value'>$roomSize</td></tr>
                        </table>
                    </div>
                    
                    <div class='section'>
                        <h2> Price Summary</h2>
                        <table>
                            <tr><td class='label'>Room Rate:</td><td>$" . number_format($roomPrice, 2) . " × $nights nights</td></tr>
                            <tr><td class='total'>Estimated Total:</td><td class='total'>$" . number_format($totalPrice, 2) . "</td></tr>
                        </table>
                        <p><small>* 30% deposit required to confirm booking</small></p>
                    </div>";

        // Add optional fields if provided
        if (!empty($requests)) {
            $adminMail->Body .= "
                    <div class='section'>
                        <h2>💬 Special Requests</h2>
                        <p>$requests</p>
                    </div>";
        }

        if (!empty($howHear)) {
            $adminMail->Body .= "
                    <div class='section'>
                        <h2>🔍 How They Heard About Us</h2>
                        <p>$howHear</p>
                    </div>";
        }

        // Additional information
        $source = htmlspecialchars($data['source'] ?? 'website_booking_form');
        $submittedAt = htmlspecialchars($data['submittedAt'] ?? date('Y-m-d H:i:s'));

        $adminMail->Body .= "
                    <div class='section'>
                        <h2>📋 Additional Information</h2>
                        <table>
                            <tr><td class='label'>Booking Type:</td><td>$bookingType</td></tr>
                            <tr><td class='label'>Source:</td><td>$source</td></tr>
                            <tr><td class='label'>Submitted At:</td><td>" . date('F j, Y g:i A', strtotime($submittedAt)) . "</td></tr>
                        </table>
                    </div>
                </div>
                
                <div class='footer'>
                    <p>This booking request was submitted through the La Roza Nature Resort website.</p>
                    <p>Please respond within 24 hours to confirm availability.</p>
                </div>
            </div>
        </body>
        </html>";

        // SEND ADMIN EMAIL
        if ($adminMail->send()) {

            // ========== SEND AUTO-REPLY TO CUSTOMER ==========
            $customerMail = new PHPMailer(true);

            // SMTP SETTINGS for customer email
            $customerMail->isSMTP();
            $customerMail->Host = 'mail.larozanatureresort.com';
            $customerMail->SMTPAuth = true;
            $customerMail->Username = 'booking@larozaresort.com';
            $customerMail->Password = 'qwert125';
            $customerMail->SMTPSecure = 'ssl';
            $customerMail->Port = 465;
            $customerMail->SMTPOptions = [
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                ]
            ];

            // Customer email recipients
            $customerMail->setFrom('booking@larozaresort.com', 'La Roza Nature Resort');
            $customerMail->addAddress($email, $full_name);
            $customerMail->addReplyTo('booking@larozaresort.com', 'Reservations');

            // Customer email content
            $customerMail->isHTML(true);
            $customerMail->Subject = "Booking Received - La Roza Nature Resort";

            // Simple auto-reply email as requested
            $customerMail->Body = "
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 5px; }
                    .message { font-size: 18px; margin-bottom: 20px; }
                    .footer { margin-top: 20px; padding: 15px; background: #eee; text-align: center; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h1>La Roza Nature Resort</h1>
                    </div>
                    
                    <div class='content'>
                        <h2>Dear $full_name,</h2>
                        
                        <div class='message'>
                            <p><strong>Booking has been received, we shall contact you shortly.</strong></p>
                        </div>
                        
                        <p>Thank you for choosing La Roza Nature Resort. Our team will review your booking request and get back to you within 24 hours to confirm availability and provide payment instructions.</p>
                        
                        <p><strong>Booking Summary:</strong><br>
                        Room: $roomName<br>
                        Check-in: $checkinDate<br>
                        Check-out: $checkoutDate<br>
                        Guests: $guests</p>
                        
                        <p>If you have any questions in the meantime, please don't hesitate to contact us at booking@larozaresort.com or call us at +94 XXX XXX XXX.</p>
                        
                        <p>Warm regards,<br>
                        <strong>La Roza Nature Resort Team</strong></p>
                    </div>
                    
                    <div class='footer'>
                        <p>La Roza Nature Resort - Your peaceful getaway in nature</p>
                    </div>
                </div>
            </body>
            </html>";

            // Plain text alternative for email clients that don't support HTML
            $customerMail->AltBody = "Dear $full_name,\n\nBooking has been received, we shall contact you shortly.\n\nThank you for choosing La Roza Nature Resort. Our team will review your booking request and get back to you within 24 hours.\n\nBooking Summary:\nRoom: $roomName\nCheck-in: $checkinDate\nCheck-out: $checkoutDate\nGuests: $guests\n\nWarm regards,\nLa Roza Nature Resort Team";

            // SEND CUSTOMER EMAIL
            $customerMail->send();

            // INSERT INTO BOOKINGS TABLE
            $stmt = $pdo->prepare("
                INSERT INTO booking_submissions 
                (full_name, email, phone, guests, checkin_date, checkout_date, 
                 nights, room_type, room_name, room_price, total_price, 
                 special_requests, how_heard, booking_type, source, submitted_at)
                VALUES 
                (:full_name, :email, :phone, :guests, :checkin, :checkout,
                 :nights, :roomType, :roomName, :roomPrice, :totalPrice,
                 :requests, :howHear, :bookingType, :source, NOW())
            ");

            $stmt->execute([
                ':full_name' => $full_name,
                ':email' => $email,
                ':phone' => $phone,
                ':guests' => $guests,
                ':checkin' => $checkin,
                ':checkout' => $checkout,
                ':nights' => $nights,
                ':roomType' => $roomType,
                ':roomName' => $roomName,
                ':roomPrice' => $roomPrice,
                ':totalPrice' => $totalPrice,
                ':requests' => $requests,
                ':howHear' => $howHear,
                ':bookingType' => $bookingType,
                ':source' => $source
            ]);

            echo json_encode([
                "success" => true,
                "message" => "Booking request submitted successfully. Confirmation email sent."
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
        "message" => "Required fields are missing. Please fill in all required fields."
    ]);
}
?>