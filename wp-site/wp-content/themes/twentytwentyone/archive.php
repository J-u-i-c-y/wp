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
    'post_type'      => 'delivery-companies',
    'posts_per_page' => 5,
    'paged'          => $paged,
    'orderby'        => 'ID',
    'order'          => 'ASC',
];

wp_enqueue_script('archive-search-js', get_template_directory_uri() . '/assets/js/archive-search.js');
wp_enqueue_script('archive-sort-js', get_template_directory_uri() . '/assets/js/archive-sort.js');

$query = new WP_Query($args);

if ($query->have_posts()): ?>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <div class="table-container">
            <?php get_template_part('template-parts/content/switches-container'); ?>
            <?php get_template_part('template-parts/content/search-form'); ?>
        <div class="table-wrapper">
            <?php get_template_part('template-parts/content/company-table', null, $query); ?>
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<?php endif; wp_reset_postdata(); ?>
        </div>
    </div>
<?php
get_footer();