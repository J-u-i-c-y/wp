(function() {
    function tableSort() {
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
        
        var url = new URL(window.location.href);
        var searchParams = new URLSearchParams(url.search);
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
            var columnIndex = Array.from(table.querySelectorAll('th[data-sort]')).indexOf(
                document.querySelector(`th[data-sort="${column}"]`)
            );
        
            var rows = Array.from(table.querySelectorAll('tbody tr'))
                .sort((a, b) => {
                    var aValue = a.cells[columnIndex].innerText.replace(/[^\d.-]/g, '');
                    var bValue = b.cells[columnIndex].innerText.replace(/[^\d.-]/g, '');
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
            var url = new URL(window.location.href);
            var searchParams = new URLSearchParams(url.search);
            
            searchParams.set('sort', sortColumn);
            searchParams.set('order', sortOrder);
            
            history.replaceState(null, null, '?' + searchParams.toString());
        }
    }
    
    if (document.readyState !== 'loading') {
        tableSort();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            tableSort();
        });
    }
})();