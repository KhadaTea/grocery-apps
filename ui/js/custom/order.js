var productPrices = {};
var productDetails = {};

$(function () {
    //Json data by api call for order table
    $.get(productListApiUrl, function (response) {
        productPrices = {}
        productDetails = {};
        if(response) {
            var options = '<option value="">--Select--</option>';
            $.each(response, function(index, product) {
                options += '<option value="'+ product.product_id +'">'+ product.name +'</option>';
                productPrices[product.product_id] = product.price_per_unit;
                productDetails[product.product_id] = product;
            });
            // Only populate the dropdown in the first product-box element
            $(".product-box:first").find("select.cart-product").empty().html(options);
        }
    });
});

$("#addMoreButton").click(function () {
    var row = $(".product-box:first").clone();

    row.removeClass('hidden');

    $("#itemsInOrder").append(row);

    row.find(".remove-row").removeClass('hideit');
    
    var productDropdown = row.find("select.cart-product");
    productDropdown.empty();
    var options = '<option value="">--Select--</option>';
    $.each(productDetails, function(productId, product) {
        options += '<option value="'+ product.product_id +'">'+ product.name +'</option>';
    });
    productDropdown.html(options);

    row.find(".product-price").val('0.0');
    row.find(".product-qty").val('1');
    row.find(".product-total").val('0.0');
    row.find("select.product-discount-percentage").val('0');

    calculateValue();
});

$(document).on("click", ".remove-row", function (){
    $(this).closest('.row').remove();
    calculateValue();
});

$(document).on("change", ".cart-product", function (){
    var product_id = $(this).val();
    var price = productPrices[product_id];

    $(this).closest('.row').find('#product_price').val(price);
    calculateValue();
});

$(document).on("change", ".product-qty", function (e){
    calculateValue();
});

$(document).on("change", ".product-discount-percentage", function (e){
    calculateValue();
});

function calculateValue() {
    var grandTotal = 0;

    $("#itemsInOrder .product-item").each(function(index, element) {
        var qty = parseFloat($(element).find(".product-qty").val()) || 0;
        var price = parseFloat($(element).find("#product_price").val()) || 0;
        var discountPercentage = parseFloat($(element).find(".product-discount-percentage").val()) || 0;
        
        var itemTotal = qty * price;
        var discountAmount = (itemTotal * discountPercentage) / 100;
        var finalItemTotal = itemTotal - discountAmount;

        $(element).find("#item_total").val(finalItemTotal.toFixed(2));

        grandTotal += finalItemTotal;
    });

    $("#product_grand_total").val(grandTotal.toFixed(2));
}

$("#saveOrder").on("click", function(){
    var customerName = $("#customerName").val();
    if (!customerName) {
        alert("Vui lòng nhập Tên Khách Hàng.");
        return false;
    }

    var formData = $("form").serializeArray();
    var requestPayload = {
        customer_name: customerName,
        grand_total: parseFloat($("#product_grand_total").val()) || 0,
        order_details: []
    };
    
    $("#itemsInOrder .product-item").each(function(index, element) {
        var product_id = $(element).find(".cart-product").val();
        var quantity = $(element).find(".product-qty").val();
        var total_price = $(element).find("#item_total").val();
        var discount_percentage = $(element).find(".product-discount-percentage").val();

        if (product_id) {
             requestPayload.order_details.push({
                product_id: product_id,
                quantity: quantity,
                total_price: total_price,
                discount_percentage: discount_percentage
            });
        }
    });

    if (requestPayload.order_details.length === 0) {
        alert("Vui lòng thêm ít nhất một mặt hàng vào đơn hàng.");
        return false;
    }

    console.log("Request Payload:", requestPayload);

    callApi("POST", orderSaveApiUrl, {
        'data': JSON.stringify(requestPayload)
    });
});