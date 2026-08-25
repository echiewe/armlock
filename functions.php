<?php

function armlock_enqueue_styles() {

    wp_enqueue_style(
        'armlock-style',
        get_stylesheet_directory_uri() . '/style.css',
        [],
        filemtime(get_stylesheet_directory() . '/style.css')
    );

    wp_enqueue_style(
        'armlock-animation',
        get_stylesheet_directory_uri() . '/assets/css/animation.css',
        ['armlock-style'],
        filemtime(get_stylesheet_directory() . '/assets/css/animation.css')
    );

    wp_enqueue_style(
        'armlock-buttons',
        get_stylesheet_directory_uri() . '/assets/css/buttons.css',
        ['armlock-style'],
        filemtime(get_stylesheet_directory() . '/assets/css/buttons.css')
    );

    wp_enqueue_style(
        'armlock-cards',
        get_stylesheet_directory_uri() . '/assets/css/cards.css',
        ['armlock-style'],
        filemtime(get_stylesheet_directory() . '/assets/css/cards.css')
    );

    wp_enqueue_style(
        'armlock-contact',
        get_stylesheet_directory_uri() . '/assets/css/contact.css',
        ['armlock-style'],
        filemtime(get_stylesheet_directory() . '/assets/css/contact.css')
    );

    wp_enqueue_style(
        'armlock-diagnosis',
        get_stylesheet_directory_uri() . '/assets/css/diagnosis.css',
        ['armlock-style'],
        filemtime(get_stylesheet_directory() . '/assets/css/diagnosis.css')
    );

    wp_enqueue_style(
        'armlock-faq',
        get_stylesheet_directory_uri() . '/assets/css/faq.css',
        ['armlock-style'],
        filemtime(get_stylesheet_directory() . '/assets/css/faq.css')
    );

    wp_enqueue_style(
        'armlock-founders',
        get_stylesheet_directory_uri() . '/assets/css/founders.css',
        ['armlock-style'],
        filemtime(get_stylesheet_directory() . '/assets/css/founders.css')
    );

    wp_enqueue_style(
        'armlock-science',
        get_stylesheet_directory_uri() . '/assets/css/science.css',
        ['armlock-style'],
        filemtime(get_stylesheet_directory() . '/assets/css/science.css')
    );
}

add_action('wp_enqueue_scripts', 'armlock_enqueue_styles');

function armlock_enqueue_scripts() {

    wp_enqueue_script(
        'armlock-buy',
        get_stylesheet_directory_uri() . '/assets/js/buy.js',
        [],
        filemtime(get_stylesheet_directory() . '/assets/js/buy.js'),
        true
    );

    wp_enqueue_script(
        'armlock-diagnosis',
        get_stylesheet_directory_uri() . '/assets/js/diagnosis.js',
        [],
        filemtime(get_stylesheet_directory() . '/assets/js/diagnosis.js'),
        true
    );

    wp_enqueue_script(
        'armlock-responsivity',
        get_stylesheet_directory_uri() . '/assets/js/responsivity.js',
        [],
        filemtime(get_stylesheet_directory() . '/assets/js/responsivity.js'),
        true
    );

    wp_enqueue_script(
        'armlock-science',
        get_stylesheet_directory_uri() . '/assets/js/science.js',
        [],
        filemtime(get_stylesheet_directory() . '/assets/js/science.js'),
        true
    );
}

add_action('wp_enqueue_scripts', 'armlock_enqueue_scripts');

require_once get_stylesheet_directory() . '/inc/contact-form.php';
require_once get_stylesheet_directory() . '/inc/shortcodes.php';
require_once get_stylesheet_directory() . '/inc/smtp.php';