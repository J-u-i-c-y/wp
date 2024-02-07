(function() {
    
    var paginationActiveClassSelector = '.page-numbers.current';
    var isPaidButton = document.querySelector('.mark-paid-btn');
    var companiesCheckbox = document.querySelectorAll('.table-wrapper input[type=checkbox]');
    
    
    isPaidButton.addEventListener('click', function() {
        // var currentCheckedItems = '';
        var currentCheckedItems = [];
        companiesCheckbox.forEach(function(input) {
            // if(input.checked) {
            //     if(currentCheckedItems === '') {
            //         currentCheckedItems += input.value;
            //     } else {
            //         currentCheckedItems += ', ' + input.value;
            //     }
            // }
            if(input.checked) {
                currentCheckedItems.push(input.value);
                // makeIsPaid(input.value);
            }
        })
        makeIsPaid(currentCheckedItems);
    })
    
    function makeIsPaid(ids) {
        $.ajax({
            type: 'POST',
            url: myAjax.ajaxurl,
            data: {
                action: 'make_is_paid',
                ids: ids,
                // id: id,
                page: getParams()
            },
        })
            .done(function(data) {
                if (data.length > 0) {
                    updateTable(data);
                }
            });
    }
    
    function addParams(pageNumber) {
        var paramsLink = '?',
            pageNumberValue = 1;
        
        if (pageNumber) {
            pageNumberValue = pageNumber;
        }
        
        // filterSelects.forEach(function(filterSelect) {
        //     paramsLink += filterSelect.getAttribute('data-taxonomy') + '=' +
        //         filterSelect.getAttribute('data-terms') + '&';
        // });
        
        paramsLink += 'paged=' + pageNumberValue;
        window.history.replaceState(null, null, paramsLink);
    }
    
    function paginationButtons() {
        // var paginationNotCurrentButtons = document.querySelectorAll('.page-numbers:not(.current)');
        var paginationButtons = document.querySelectorAll('.page-numbers');
        
        if (!paginationButtons.length) {
            return;
        }
    
        paginationButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var paginationCurrentButton = document.querySelector('.page-numbers.current');
                paginationCurrentButton.classList.remove('current');
                this.classList.add('current');
                
                // updateFilters();
                addParams(this.textContent);
                getCompanies();
            });
        })
        //  paginationNotCurrentButtons.forEach(function(button) {
        //     button.addEventListener('click', function() {
        //
        //         this.classList.add('current');
        //         paginationCurrentButton.classList.remove('current');
        //         // updateFilters();
        //         addParams(this.textContent);
        //         getCompanies();
        //     });
        // });
    }
    
    function paginationButtonsToggle(condition) {
        // Предыдущие обработчики событий
        let previousEventHandlers = [];
        
        // Функция, которая будет вешать обработчик события
        function addEventHandler(eventType, handler) {
            document.addEventListener(eventType, handler);
            previousEventHandlers.push({ eventType, handler });
        }
        
        // Функция для удаления предыдущих обработчиков событий
        function removePreviousEventHandlers() {
            previousEventHandlers.forEach(({ eventType, handler }) => {
                document.removeEventListener(eventType, handler);
            });
            previousEventHandlers = [];
        }
        
        // Определение условия и поведение в зависимости от него
        if (condition === true) {
            addEventHandler('click', handleClick);
            addEventHandler('keydown', handleKeyDown);
        } else {
            removePreviousEventHandlers();
        }
        
        // Обработчики событий
        function handleClick(event) {
            console.log('Клик!', event);
        }
        
        function handleKeyDown(event) {
            console.log('Нажата клавиша!', event);
        }
    }
    
    function getCompanies() {
        $.ajax({
            type: 'POST',
            url: myAjax.ajaxurl,
            data: {
                action: 'load_more_data',
                page: getParams()
            },
        })
            .done(function(data) {
                if (data.length > 0) {
                    updateTable(data);
                    // addInputsLimit();
                    // paginationButtons();
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
        // filters.insertAdjacentHTML('afterend', data);
        // var filterAllItems = document.querySelector(filterAllItemsClassSelector).innerHTML;
        // document.querySelector(filterAllItemsClassSelectorMob).innerHTML = filterAllItems;
    }
    
    function getParams() {
        var paramsData = {},
            pageNumber = document.querySelector(paginationActiveClassSelector);
        
        // filterSelects.forEach(function(filterSelect) {
        //     paramsData[filterSelect.getAttribute('data-taxonomy')] = filterSelect.getAttribute('data-terms');
        // });
        
        if (pageNumber) {
            paramsData['page'] = pageNumber.textContent;
        }
        
        return paramsData;
    }
    
    // var currentPage = 1;
    
    // function loadPage(page) {
    //     // Очищаем таблицу перед загрузкой нового контента
    //     $('#myTable tbody').empty();
    //
    //     // Отправляем AJAX запрос на сервер для получения данных
    //     $.ajax({
    //         url: myAjax.ajaxurl,
    //         type: 'GET',
    //         data: { page: getParams() },
    //         dataType: 'html',
    //         success: function(response) {
    //             // Добавляем полученный контент в таблицу
    //             $('#myTable tbody').append(response);
    //
    //             // Обновляем текущую страницу
    //             currentPage = page;
    //         },
    //     });
    // }
    
    // function updatePagination() {
    //     // Очищаем пагинацию перед обновлением
    //     $('#pagination').empty();
    //
    //     // Отправляем AJAX запрос на сервер для получения количества страниц
    //     $.ajax({
    //         url: myAjax.ajaxurl,
    //         type: 'POST',
    //         data: {
    //             action: 'update_pagination',
    //         },
    //         success: function(response) {
    //             var totalPages = parseInt(response);
    //
    //             // Создаем кнопки для каждой страницы
    //             for (var i = 1; i <= totalPages; i++) {
    //                 var button = $('<button>' + i + '</button>');
    //
    //                 // Если текущая страница, то выделяем кнопку
    //                 if (i === currentPage) {
    //                     button.addClass('active');
    //                 }
    //
    //                 // Навешиваем обработчик на клик по кнопке
    //                 button.on('click', function() {
    //                     var page = parseInt($(this).text());
    //
    //                     // Загрузка контента для выбранной страницы
    //                     loadPage(page);
    //
    //                     // Обновление активной кнопки
    //                     $(this).siblings().removeClass('active');
    //                     $(this).addClass('active');
    //                 });
    //
    //                 // Добавляем кнопку в пагинацию
    //                 $('#pagination').append(button);
    //             }
    //         },
    //     });
    // }
    
    if (document.readyState !== 'loading') {
        // updatePagination();
        paginationButtons();
        getParams();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            // updatePagination();
            paginationButtons();
            getParams();
        });
    }
})();
