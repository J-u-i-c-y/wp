<?php

//$connect = new PDO('mysql:host=localhost;dbname=wp_site', 'root', 'root');
//$sql  = "UPDATE wp_postmeta SET meta_value = :paid WHERE post_id IN (:ids)";
//$stmt = $connect->prepare($sql);
////$stmt->execute([
////        'status' => 'status',
////        'id' => '49'
////]);
//$stmt->execute([
//    'paid' => 'paid',
//    'ids'   => implode([15, 16])
//]);

//$stmt = $connect->query($sql);
//while($company = $stmt->fetch(PDO::FETCH_ASSOC)) {
//    var_dump($company);
//}

//$companies = $stmt->fetch(PDO::FETCH_ASSOC);
//var_dump($companies);

?>


<div class="buttons-container">
    <div class="mark-paid-btn">Mark as paid</div>
    <div class="switches-container">
        <input type="radio" id="switchUsd" name="switchPrice" value="USD" checked="checked"/>
        <input type="radio" id="switchPln" name="switchPrice" value="PLN"/>
        <label for="switchUsd">USD</label>
        <label for="switchPln">PLN</label>
        <div class="switch-wrapper" id="switchWrapper">
            <div class="switch">
                <div>USD</div>
                <div>PLN</div>
            </div>
        </div>
    </div>
</div>