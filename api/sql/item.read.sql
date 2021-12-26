SELECT id, title, 
(SELECT SUM(transaction_item.count) FROM transaction_item WHERE transaction_item.item_id = item.id) AS available
FROM item