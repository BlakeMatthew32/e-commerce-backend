ALTER TABLE orders ADD COLUMN shipping_address TEXT;
ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50);
ALTER TABLE orders ADD COLUMN tracking_number VARCHAR(50);
ALTER TABLE order_items ADD COLUMN subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * price) STORED;
