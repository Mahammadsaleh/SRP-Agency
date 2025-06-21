<?php
// send_email.php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1) Grab the form fields
    $name    = trim($_POST["name"] ?? '');
    $email   = trim($_POST["email"] ?? '');
    $subject = trim($_POST["subject"] ?? '');
    $message = trim($_POST["message"] ?? '');

    // 2) Validate (optional, but recommended)
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "Please fill all required fields.";
        exit;
    }

    // 3) Who should receive the email? (Replace with your email)
    $to = "game.hacker.1990@mail.ru";

    // 4) Build the actual email content
    $email_subject = "New message from: $name | Subject: $subject";
    $email_body    = "You have received a new message from your website contact form.\n\n".
                     "Name: $name\n".
                     "Email: $email\n".
                     "Subject: $subject\n".
                     "Message:\n$message\n";

    // 5) Send the email
    //    This uses the server's native mail() function.
    //    Your hosting environment must support sending email.
    if (@mail($to, $email_subject, $email_body)) {
        // Optionally echo success or redirect
        echo "success";
    } else {
        echo "error";
    }
} else {
    // If someone tries to access send_email.php directly without POST
    echo "Invalid request.";
}
?>
