<?php

add_action('wp_enqueue_scripts', function () {
  // Theme styleshee
  wp_enqueue_style('wp-react-style', get_stylesheet_uri());
  wp_enqueue_script('wp-react-indexjs', get_template_directory_uri() . '/dist/index.js', [], 0, true);
});
