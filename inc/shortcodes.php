<?php

function contact_form_shortcode() {
    ob_start();

    if (isset($_GET['success'])) {
        echo '<p class="contact-success">Thanks! We\'ll be in touch shortly.</p>';
    }

    ?>

    <form class="contact-form"
          action="<?php echo esc_url(admin_url('admin-post.php')); ?>"
          method="POST">

        <input type="hidden" name="action" value="contact_form">

        <?php wp_nonce_field('contact_form', 'contact_nonce'); ?>

        <label>Name <input type="text" name="name" required></label>

        <label>Email <input type="email" name="email" required></label>

        <label>Message <textarea name="message" required></textarea></label>

        <button type="submit" class="wp-element-button">
            Send Message
        </button>

        <input
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
            style="display:none"
        >

    </form>

    <?php

    return ob_get_clean();
}

add_shortcode('contact_form', 'contact_form_shortcode');