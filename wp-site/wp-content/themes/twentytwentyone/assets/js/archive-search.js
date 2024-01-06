jQuery(document).ready(function($) {
    var table = document.getElementById('custom-posts-table').getElementsByTagName('tbody')[0];
    var searchFormBtn = document.querySelector('#search-form button');
    var page = 1;
    
    function loadMoreData() {
        var search = document.getElementById('search').value;
        var startDate = document.getElementById('start-date').value;
        var endDate = document.getElementById('end-date').value;
        
        $.ajax({
            url: 'http://localhost:8888/wp-site/wp-admin/admin-ajax.php',
            type: 'POST',
            data: {
                action: 'load_more_data',
                search: search,
                start_date_range: startDate,
                end_date_range: endDate,
                page: page,
            },
            success: function(response) {
                console.log(response);
                if (response) {
                    table.innerHTML = response;
                    page++;
                }
            },
        });
    }
    
    searchFormBtn.addEventListener('click', function() {
        page = 1;
        table.innerHTML = '';
        loadMoreData();
    });
});
