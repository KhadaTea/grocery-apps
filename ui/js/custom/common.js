// Define your api here
var productListApiUrl = 'http://127.0.0.1:5000/getProducts';
var uomListApiUrl = 'http://127.0.0.1:5000/getUOM';
var productSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productDeleteApiUrl = 'http://127.0.0.1:5000/deleteProducts';
var productUpdateApiUrl = 'http://127.0.0.1:5000/updateProduct';
var orderListApiUrl = 'http://127.0.0.1:5000/getAllOrders';
var orderSaveApiUrl = 'http://127.0.0.1:5000/insertOrder';
var orderDetailApiUrl = 'http://127.0.0.1:5000/getOrderDetails';

// For product drop in order
var productsApiUrl = 'https://fakestoreapi.com/products';

function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function (msg) {
        window.location.reload();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("API Call Failed: " + textStatus, errorThrown, jqXHR);
        alert("Có lỗi xảy ra khi thực hiện thao tác. Vui lòng kiểm tra console để biết thêm chi tiết.");
    });
}

function calculateValue() {
    var total = 0;
    $(".product-item").each(function (index) {
        var qty = parseFloat($(this).find('.product-qty').val());
        var price = parseFloat($(this).find('#product_price').val());
        price = price * qty;
        $(this).find('#item_total').val(price.toFixed(2));
        total += price;
    });
    $("#product_grand_total").val(total.toFixed(2));
}

function orderParser(order) {
    return {
        id: order.id,
        date: order.employee_name,
        orderNo: order.employee_name,
        customerName: order.employee_name,
        cost: parseInt(order.employee_salary)
    }
}

function productParser(product) {
    return {
        id: product.id,
        name: product.employee_name,
        unit: product.employee_name,
        price: product.employee_name
    }
}

function productDropParser(product) {
    return {
        id: product.id,
        name: product.title
    }
}

//To enable bootstrap tooltip globally
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// });