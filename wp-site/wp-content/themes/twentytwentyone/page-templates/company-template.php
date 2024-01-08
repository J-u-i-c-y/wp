<?php

/**
 * Template Name: Delivery Company
 * Template Post Type: delivery-companies
 */

wp_enqueue_style(
    'delivery-company-css',
    get_stylesheet_directory_uri() . '/page-templates/company-template/assets/css/company-template.css'
);
// По какой то причине, файл так не подключается, поэтому вынес просто в тэг style

$status = get_field('status');
$description = get_field('description');
$start_date = get_field('start_date');
$end_date = get_field('end_date');
$total = get_field('total'); ?>
<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .company-info {
        padding: 20px;
        border-bottom: 1px solid #ddd;
    }

    .company-info h2 {
        color: #333;
        margin-bottom: 10px;
    }

    .company-info p {
        color: #666;
        line-height: 1.6;
    }

    .delivery-options {
        display: flex;
        justify-content: space-around;
        padding: 20px;
    }

    .delivery-option {
        text-align: center;
    }

    .delivery-option img {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
    }

    .delivery-option h3 {
        color: #333;
        margin-bottom: 5px;
    }

    .delivery-option p {
        color: #666;
    }
</style>

<div class="container">
    <div class="company-info">
        <h1><?= get_the_title() ?></h1>
        <p><?= sanitize_text_field($description); ?></p>
    </div>
    <div class="delivery-options">
        <div class="delivery-option">
            <h3>Status</h3>
            <p><?= sanitize_text_field($status); ?></p>
        </div>
        <div class="delivery-option">
            <h3>Date</h3>
            <p>From <?= sanitize_text_field($start_date); ?> to <?= sanitize_text_field($end_date); ?></p>
        </div>
        <div class="delivery-option">
            <h3>Price</h3>
            <p>$<?= sanitize_text_field($total); ?></p>
        </div>
    </div>
</div>
