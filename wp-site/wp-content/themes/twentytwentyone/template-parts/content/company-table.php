<table id="custom-posts-table">
    <thead>
    <tr>
        <th data-sort="id">ID</th>
        <th data-sort="title">Title</th>
        <th data-sort="status">Status</th>
        <th data-sort="start_date">Start Date</th>
        <th data-sort="end_date">End Date</th>
        <th data-sort="total">Total</th>
    </tr>
    </thead>
    <tbody>
        <?php while ($args->have_posts()) : $args->the_post(); ?>
            <?= add_table_row() ?>
        <?php endwhile; ?>
    </tbody>
</table>
<!--<div class="pagination">-->
<!--    --><?php
//    $total_pages  = $args->max_num_pages;
//    $current_page = max(1, get_query_var('paged'));
//
//    echo '<div class="pagination-info">';
//    echo 'Page ' . $current_page . ' of ' . $total_pages;
//    echo '</div>'; ?>
<!---->
<!--    <div class="pagination-arrows">-->
<!--        <//= paginate_links([
//            'total'     => $total_pages,
//            'current'   => $current_page,
//            'prev_text' => '',
//            'next_text' => '',
//            'prev_next' => true,
//        ]); ?>-->
<!--    </div>-->
<!--</div>-->
<div class="pagination" id="pagination">
    <?php

    $total_pages  = $args->max_num_pages;
    $current_page = max(1, get_query_var('paged'));
    ?>
    <div class="pagination-info">Page <?= $current_page ?> of <?= intval($total_pages) ?></div>
    <div class="pagination-arrows">
        <?php for ($i = 1; $i <= intval($total_pages); $i++): ?>
            <?php if ($i === $current_page): ?>
                <div class="page-numbers current"><?= $current_page ?></div>
            <?php else: ?>
                <div class="page-numbers"><?= $i ?></div>
            <?php endif; ?>
        <?php endfor; ?>
    </div>
</div>
