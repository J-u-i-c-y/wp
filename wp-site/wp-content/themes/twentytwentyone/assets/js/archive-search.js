jQuery(document).ready(function($) {
    var table = document.getElementById('custom-posts-table').getElementsByTagName('tbody')[0];
    var searchFormBtn = document.querySelector('#search-form button');
    var pagination = document.querySelector('.pagination');
    var searchInputs = document.querySelectorAll('.search-form__item input[type=text]');
    var page = 1;
    
    function loadMoreData() {
        var search = document.getElementById('search').value;
        var startDate = document.getElementById('start-date').value;
        var endDate = document.getElementById('end-date').value;
        
        $.ajax({
            url: myAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'load_more_data',
                search: search,
                start_date_range: startDate,
                end_date_range: endDate,
                page: page,
            },
            success: function(response) {
                if (response) {
                    table.innerHTML = response;
                    page++;
                }
            },
        });
    }
    
    searchFormBtn.addEventListener('click', function() {
        var isEmpty = true;
    
        searchInputs.forEach(function(e) {
            if (e.value !== '') {
                isEmpty = false;
            }
        });
        if (!isEmpty) {
            pagination.classList.add('d-none');
        } else {
            pagination.classList.remove('d-none');
        }
        page = 1;
        table.innerHTML = '';
        loadMoreData();
    });
});
