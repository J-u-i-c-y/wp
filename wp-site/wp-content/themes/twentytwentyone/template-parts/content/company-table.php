<table id="custom-posts-table">
    <thead>
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Status</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th data-sort="price">Total</th>
    </tr>
    </thead>
    <tbody>
        <?php while ($args->have_posts()) : $args->the_post(); ?>
            <?= add_table_row() ?>
        <?php endwhile; ?>
    </tbody>
</table>
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
