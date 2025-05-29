$(function () {
    //Json data by api call for order table
    $.get(orderListApiUrl, function (response) {
        if (response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function (index, order) {
                totalCost += parseFloat(order.total);
                table += '<tr>' +
                    '<td>' + order.datetime + '</td>' +
                    '<td>' + order.order_id + '</td>' +
                    '<td>' + order.customer_name + '</td>' +
                    '<td>' + order.total.toFixed(2) + ' VND</td>' +
                    '<td><button class="btn btn-sm btn-info view-order-btn" data-order-id="' + order.order_id + '">View</button></td></tr>';
            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>' + totalCost.toFixed(2) + ' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});

$(document).on("click", ".view-order-btn", function () {
    var orderId = $(this).data("order-id");

    // Call API to get order details
    $.get(orderDetailApiUrl + '?order_id=' + orderId, function (response) {
        if (response && response.order_details) {
            var detailsHtml = '<h6>Order ID: ' + orderId + '</h6>';
            detailsHtml += '<table class="table table-bordered"><thead><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></thead><tbody>';
            $.each(response.order_details, function (index, item) {
                detailsHtml += '<tr>' +
                    '<td>' + item.product_name + '</td>' +
                    '<td>' + item.quantity + '</td>' +
                    '<td>' + parseFloat(item.total_price / item.quantity).toFixed(2) + '</td>' +
                    '<td>' + parseFloat(item.total_price).toFixed(2) + '</td>' +
                    '</tr>';
            });
            detailsHtml += '</tbody></table>';

            $("#orderDetailsModal .modal-body").html(detailsHtml);
            $("#orderDetailsModal").modal('show');
        } else {
            alert("Không thể lấy chi tiết đơn hàng.");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("API Call Failed: " + textStatus, errorThrown, jqXHR);
        alert("Có lỗi xảy ra khi lấy chi tiết đơn hàng.");
    });
});

// $(document).ready(function() {
//     // Load all orders when page loads
//     loadOrders();

//     // Handle search button click
//     $('#searchButton').click(function() {
//         const searchDate = $('#searchDate').val();
//         if (searchDate) {
//             loadOrdersByDate(searchDate);
//         }
//     });

//     // Handle clear button click
//     $('#clearSearch').click(function() {
//         $('#searchDate').val('');
//         loadOrders();
//     });
// });

// function loadOrders() {
//     $.ajax({
//         url: 'http://localhost:5000/getAllOrders',
//         type: 'GET',
//         success: function(response) {
//             displayOrders(response);
//         },
//         error: function(xhr, status, error) {
//             console.error('Error loading orders:', error);
//         }
//     });
// }

// function loadOrdersByDate(date) {
//     $.ajax({
//         url: 'http://localhost:5000/getOrdersByDate',
//         type: 'GET',
//         data: { date: date },
//         success: function(response) {
//             displayOrders(response);
//         },
//         error: function(xhr, status, error) {
//             console.error('Error loading orders by date:', error);
//         }
//     });
// }

// function displayOrders(orders) {
//     const tbody = $('table tbody');
//     tbody.empty();

//     orders.forEach(function(order) {
//         const date = new Date(order.datetime).toLocaleDateString();
//         const row = `
//             <tr>
//                 <td>${date}</td>
//                 <td>${order.order_id}</td>
//                 <td>${order.customer_name}</td>
//                 <td>${order.total} VND</td>
//                 <td>
//                     <button class="btn btn-sm btn-info view-order" data-order-id="${order.order_id}">View</button>
//                 </td>
//             </tr>
//         `;
//         tbody.append(row);
//     });
// }