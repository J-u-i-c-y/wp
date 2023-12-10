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
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = array(
    'post_type' => 'delivery-companies',
    'posts_per_page' => 5,
    'paged' => $paged,
);

$query = new WP_Query($args);

if ($query->have_posts()): ?>
<div class="table-container">

<?= file_get_contents('wp-site/wp-content/themes/twentytwentyone/assets/images/32074.svg'); ?>
<div class="table-wrapper">
    <table id="custom-posts-table">
        <thead>
        <tr>
            <th data-sort="id">ID</th>
            <th data-sort="title">Title</th>
            <th data-sort="status">Status</th>
            <th data-sort="start_date">Start Date</th>
            <th data-sort="end_date">End Date</th>
            <th data-sort="total">Total
<!--                --><?//= file_get_contents('wp-content/themes/twentytwentyone/assets/images/free-icon-arrow-11067209.png'); ?>
                <?= file_get_contents('wp-site/wp-content/themes/twentytwentyone/assets/images/32074.svg'); ?>
            </th>

        </tr>
        </thead>
        <tbody>
        <?php while ($query->have_posts()) : $query->the_post();
            $status = get_post_meta(get_the_ID(), 'status', true);
            $start_date = date(get_option('date_format'), strtotime(get_post_meta(get_the_ID(), 'start_date', true)));
            $end_date = date(get_option('date_format'), strtotime(get_post_meta(get_the_ID(), 'end_date', true)));
            $total = get_post_meta(get_the_ID(), 'total', true); ?>
            <tr>
                <td>#<?= get_the_ID(); ?></td>
                <td><?php the_title(); ?></td>
                <td><?= $status; ?></td>
                <td><?= $start_date; ?></td>
                <td><?= $end_date; ?></td>
                <td><?= $total ?'$'.$total:''; ?></td>
            </tr>
        <?php endwhile; ?>
        </tbody>
    </table>

    <div class="pagination">
        <?php
        $total_pages = $query->max_num_pages;
        $current_page = max(1, get_query_var('paged'));

        // Выводим информацию о текущей странице и общем количестве страниц
        echo '<div class="pagination-info">';
        echo 'Page ' . $current_page . ' of ' . $total_pages;
        echo '</div>'; ?>

      <div class="pagination-arrows">
        <?= paginate_links(array(
            'total' => $total_pages,
            'current' => $current_page,
            'prev_text' => '',
            'next_text' => '',
            'prev_next' => true, // Всегда отображать стрелки
        ));
        ?>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

    <!-- Скрипт для сортировки таблицы -->
    <script>
        $(document).ready(function () {
            $('th[data-sort]').click(function () {
                var table = $(this).parents('table').eq(0);
                var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                this.asc = !this.asc;
                if (!this.asc) {
                    rows = rows.reverse();
                }
                for (var i = 0; i < rows.length; i++) {
                    table.append(rows[i]);
                }
            });

            function comparer(index) {
                return function (a, b) {
                    var valA = getCellValue(a, index);
                    var valB = getCellValue(b, index);
                    return $.isNumeric(valA) && $.isNumeric(valB) ?
                        valA - valB :
                        valA.toString().localeCompare(valB);
                };
            }

            function getCellValue(row, index) {
                return $(row).children('td').eq(index).text();
            }
        });
    </script>
<?php
endif;
wp_reset_postdata();
?>
    </div>
    </div>
<?php if ( have_posts() ) : ?>

	<header class="page-header alignwide">
		<h3>Invoices</h3>

		<?php if ( $description ) : ?>
			<div class="archive-description"><?php echo wp_kses_post( wpautop( $description ) ); ?></div>
		<?php endif; ?>
	</header><!-- .page-header -->

	<?php while ( have_posts() ) :
		 the_post(); ?>

		 <?php get_template_part( 'template-parts/content/content', get_theme_mod( 'display_excerpt_or_full_post',
        'excerpt' ) ); ?>


	<?php endwhile; ?>

	<?php twenty_twenty_one_the_posts_navigation(); ?>

<?php else : ?>
	<?php get_template_part( 'template-parts/content/content-none' ); ?>
<?php endif; ?>

<?php
get_footer();
