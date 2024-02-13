<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header();

$description = get_the_archive_description();
$paged       = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args        = [
    'post_type' => 'delivery-companies',
    'posts_per_page' => 5,
    'paged' => $paged,
    'orderby' => 'ID',
    'order' => 'ASC',
];

wp_enqueue_script('archive-app-js', get_template_directory_uri() . '/assets/js/archive-app.js');
wp_enqueue_script('archive-search-js', get_template_directory_uri() . '/assets/js/archive-search.js');
wp_enqueue_style(
    'fontawesome-css',
    get_template_directory_uri() . '/page-templates/company-template/assets/css/fontawesome.css'
);

$query = new WP_Query($args);

if ($query->have_posts()): ?>
    <div class="table-container">
    <?php get_template_part('template-parts/content/switches-container'); ?>
    <?php get_template_part('template-parts/content/search-form'); ?>
    <div class="table-wrapper">
    <?php get_template_part('template-parts/content/company-table', null, $query); ?>
<?php endif;
wp_reset_postdata(); ?>
    </div>
    </div>
<?php
get_footer();