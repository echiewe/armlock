<?php

use PHPMailer\PHPMailer\PHPMailer;

add_action('phpmailer_init', function (PHPMailer $phpmailer) {

    $phpmailer->isSMTP();

    $phpmailer->Host = SMTP_HOST;
    $phpmailer->SMTPAuth = true;

    $phpmailer->Port = SMTP_PORT;
    $phpmailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

    $phpmailer->Username = SMTP_USER;
    $phpmailer->Password = SMTP_PASS;

    $phpmailer->From = SMTP_USER;
    $phpmailer->FromName = 'ArmLock';
});