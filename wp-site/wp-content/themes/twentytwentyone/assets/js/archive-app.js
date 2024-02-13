(function() {
    var activeClass = 'active';
    var isPaidButton = document.querySelector('.mark-paid-btn');
    var sortedButtons = document.querySelectorAll('.sort-status__btn');
    var pagination = document.querySelector('.pagination');
    
    function hidePagination(hide) {
        if (hide) {
            pagination.classList.add('d-none');
        } else {
            pagination.classList.remove('d-none');
        }
    }
    
    sortedButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var sortedActiveButton = document.querySelector('.sort-status__btn.active');
            sortedActiveButton.classList.remove(activeClass);
            this.classList.add(activeClass);
            getSortedStatus(btn.getAttribute('data-sort'));
        });
    });
    
    isPaidButton.addEventListener('click', function() {
        var currentCheckedItems = [];
        var companiesCheckbox = document.querySelectorAll('.table-wrapper input[type=checkbox]');
        
        companiesCheckbox.forEach(function(input) {
            
            if (input.checked) {
                currentCheckedItems.push(input.value);
            }
        });
        makeIsPaid(currentCheckedItems);
    });
    
    function makeIsPaid(ids) {
        $.ajax({
            type: 'POST',
            url: myAjax.ajaxurl,
            data: {
                action: 'make_is_paid',
                ids: ids,
            },
        }).done(function(data) {
            if (data.length > 0) {
                updateTable(data);
            }
        });
    }
    
    function getParams() {
        var searchParams = getSearchParams();
        
        var filters = {
            status: searchParams.get('status') ?? '',
            start: searchParams.get('start') ?? '',
            end: searchParams.get('end') ?? '',
            page: searchParams.get('page') ?? '1',
        };
        
        if (filters.status) {
            getSortedStatus(filters.status);
        }
        
        return filters;
    }
    
    function addParams(name, value = '') {
        var paramsLink = '?',
            searchParams = getSearchParams();
        
        searchParams.forEach(function(paramValue, paramName) {
            if (paramName !== name) {
                paramsLink += paramName + '=' + paramValue + '&';
            }
        });
        
        if (value !== '') {
            paramsLink += name + '=' + value;
        }
        
        if (paramsLink === '?') {
            paramsLink += name + '=' + value;
        }
        
        window.history.replaceState(null, null, paramsLink);
    }
    
    function paginationButtons() {
        var searchParams = getSearchParams();
        var paginationButtons = document.querySelectorAll('.page-numbers');
        var currentPage = searchParams.get('page') ?? '1';
        
        if (!paginationButtons.length) {
            return;
        }
        
        paginationButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                changeCurrentPaginationPage(this);
                addParams('page', this.textContent);
                getCompanies();
            });
        });
        
        changeCurrentPaginationPage(paginationButtons[currentPage - 1]);
        getCompanies();
    }
    
    function changeCurrentPaginationPage(current) {
        var paginationCurrentButton = document.querySelector('.page-numbers.current');
        paginationCurrentButton.classList.remove('current');
        current.classList.add('current');
    }
    
    function getCompanies() {
        $.ajax({
            type: 'POST',
            url: myAjax.ajaxurl,
            data: {
                action: 'load_more_data',
                params: getParams(),
            },
        }).done(function(data) {
            if (data.length > 0) {
                updateTable(data);
                priceSwitch();
            }
        });
    }
    
    function updateTable(data) {
        var tableWrapperTbody = document.querySelector('.table-wrapper tbody');
        
        if (!tableWrapperTbody) {
            return;
        }
        
        tableWrapperTbody.innerHTML = '';
        tableWrapperTbody.innerHTML = data;
    }
    
    function getSortedStatus(status) {
        $.ajax({
            url: myAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'status_sort',
                status: status,
            },
            success: function(response) {
                if (response) {
                    updateTable(response);
                    addParams('status', status);
                    hidePagination(status);
                    sortedButtons.forEach(function(btn) {
                        btn.classList.remove(activeClass);
                        btn.getAttribute('data-sort') === status ? btn.classList.add(activeClass) : '';
                    });
                }
            },
        });
    }
    
    function priceSwitch() {
        var switchUsd = document.getElementById('switchUsd');
        var switchPln = document.getElementById('switchPln');

        [switchUsd, switchPln].forEach(element => {
            element.addEventListener('click', () => {
                var pricesUsd = document.querySelectorAll('.price .usd');
                var pricesPln = document.querySelectorAll('.price .pln');

                pricesUsd.forEach(e => {
                    e.classList.toggle('d-none');
                });

                pricesPln.forEach(e => {
                    e.classList.toggle('d-none');
                });
            });
        });
    }

    function tableSort() {
        var searchParams = getSearchParams();
        var sortColumn = searchParams.get('sort');
        var sortOrder = searchParams.get('order') || 'asc';
        
        if (sortColumn && sortOrder) {
            sortTable(sortColumn, sortOrder);
        }
        
        document.querySelectorAll('th[data-sort]').forEach(th => {
            th.addEventListener('click', function() {
                var sortColumn = this.getAttribute('data-sort');
                var currentOrder = this.getAttribute('data-order') || 'asc';
                
                var newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                this.setAttribute('data-order', newOrder);
                
                sortTable(sortColumn, newOrder);
                updateUrl(sortColumn, newOrder);
            });
        });
        
        function sortTable(column, order) {
            var table = document.querySelector('table');
            var rows = Array.from(table.querySelectorAll('tbody tr'))
                .sort((a, b) => {
                    var aValue = a.cells.namedItem(column).innerText.replace(/[^\d.-]/g, '');
                    var bValue = b.cells.namedItem(column).innerText.replace(/[^\d.-]/g, '');
                    return Number(aValue) - Number(bValue);
                });
            
            if (order === 'desc') {
                rows = rows.reverse();
            }
            
            var tbody = table.querySelector('tbody');
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            
            rows.forEach(row => {
                tbody.appendChild(row);
            });
        }
        
        function updateUrl(sortColumn, sortOrder) {
            var searchParams = getSearchParams();
            
            searchParams.set('sort', sortColumn);
            searchParams.set('order', sortOrder);
            
            history.replaceState(null, null, '?' + searchParams.toString());
        }
    }
    
    function getSearchParams() {
        var url = new URL(window.location.href);
        return new URLSearchParams(url.search);
    }
    
    if (document.readyState !== 'loading') {
        paginationButtons();
        tableSort();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            paginationButtons();
            tableSort();
        });
    }
})();