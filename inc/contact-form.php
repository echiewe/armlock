<?php

add_action('admin_post_contact_form', 'handle_contact_form');
add_action('admin_post_nopriv_contact_form', 'handle_contact_form');

function handle_contact_form() {

    if (
        ! isset($_POST['contact_nonce']) ||
        ! wp_verify_nonce($_POST['contact_nonce'], 'contact_form')
    ) {
        wp_die('Invalid request.');
    }

    if (!empty($_POST['website'])) {
        wp_die();
    }

    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $message = sanitize_textarea_field($_POST['message']);

    $to = 'developyng@gmail.com';

    $subject = 'Website Contact Form';

    $body =
        "Name: $name\n\n" .
        "Email: $email\n\n" .
        "Message:\n$message";
        
    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        "Reply-To: $name <$email>"
    ];

    $sent = wp_mail($to, $subject, $body, $headers);

    if (!$sent) {
        wp_die('Failed to send email.');
    }

    wp_redirect(home_url('/faq?success=1'));
    exit;
}