-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create order_items table for many-to-many relation
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1,
    price DECIMAL(10,2) NOT NULL
);

-- Insert sample orders
INSERT INTO orders (user_id, total, status, created_at) VALUES
(2, 619.98, 'Shipped', NOW() - INTERVAL '7 days'),
(3, 89.99, 'Delivered', NOW() - INTERVAL '3 days'),
(4, 199.98, 'Pending', NOW() - INTERVAL '1 day'),
(5, 49.99, 'Delivered', NOW() - INTERVAL '10 days');

-- Insert order items (linked to above orders)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
-- Order #1 (player1)
(1, 1, 1, 499.99), -- NextBox X2 Console
(1, 6, 1, 69.99),  -- AeroWave Mouse
-- Order #2 (gamer_girl)
(2, 3, 1, 89.99),  -- RetroCube Classic
-- Order #3 (no_scope_nick)
(3, 7, 2, 99.99),  -- 2x Vortex Headset
-- Order #4 (retro_fan)
(4, 9, 1, 49.99);  -- Hoodie
