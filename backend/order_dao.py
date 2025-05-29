from datetime import datetime
from sql_connection import get_sql_connection


def insert_order(connection, order):
    cursor = connection.cursor()
    order_query = ("INSERT INTO orders (customer_name, total, datetime) VALUES (%s, %s, %s)")

    order_data = (order['customer_name'], order['grand_total'], datetime.now())

    cursor.execute(order_query, order_data)
    order_id = cursor.lastrowid

    order_details_data = []
    order_details_query = ("INSERT INTO order_details (order_id, product_id, quantity, total_price) VALUES (%s, %s, %s, %s)")


    for order_detail_record in order['order_details']:
        order_details_data.append((
            order_id,
            int(order_detail_record['product_id']),
            float(order_detail_record['quantity']),
            float(order_detail_record['total_price']),

        ))
    
    cursor.executemany(order_details_query, order_details_data)

    connection.commit()

    return order_id

def get_all_orders(connection):
    cursor = connection.cursor()
    query = ("SELECT * FROM orders ")
    cursor.execute(query)
    
    response = []
    for (order_id, custome_name, total, datetime) in cursor:
        response.append({
            'order_id': order_id,
            'customer_name': custome_name,
            'total': total,
            'datetime': datetime
        })
    return response

# def get_orders_by_date(connection, search_date):
#     cursor = connection.cursor()
#     query = ("SELECT * FROM orders WHERE DATE(datetime) = %s")
#     cursor.execute(query, (search_date,))
    
#     response = []
#     for (order_id, custome_name, total, datetime) in cursor:
#         response.append({
#             'order_id': order_id,
#             'customer_name': custome_name,
#             'total': total,
#             'datetime': datetime
#         })
#     return response

def delete_order_details_by_product_id(connection, product_id):
    cursor = connection.cursor()
    query = ("DELETE FROM order_details WHERE product_id =" + str(product_id))
    cursor.execute(query)
    connection.commit()

# def get_order_details_by_order_id(connection, order_id):
#     cursor = connection.cursor()
#     query = ("SELECT * FROM order_details WHERE order_id = %s")
#     cursor.execute(query, (order_id,))
    
#     response = []
#     for (order_detail_id, order_id, product_id, quantity, total_price) in cursor:
#         response.append({
#             'order_detail_id': order_detail_id,
#             'order_id': order_id,
#             'product_id': product_id,
#             'quantity': quantity,
#             'total_price': total_price
#         })

#     return response

if __name__ == '__main__':
    connection = get_sql_connection()
    print(get_all_orders(connection))
