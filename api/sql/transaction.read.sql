SELECT `transaction`.id, `transaction`.timestamp, `transaction`.client_id, transaction_item.item_id, transaction_item.count, item.title, client.full_name
FROM `transaction` 
LEFT JOIN transaction_item ON transaction_item.transaction_id = transaction.id
LEFT JOIN client ON client.id = transaction.client_id
LEFT JOIN item ON item.id = transaction_item.item_id