-- Create table (if not already exists)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 50,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert mock products
INSERT INTO products (name, category, price, stock, description, image_url) VALUES
-- Consoles & Hardware
('NextBox X2 Console', 'Consoles', 499.99, 20, 'The latest-gen gaming console with 8K support and 2TB SSD storage.', 'https://example.com/images/nextbox-x2.jpg'),
('PlayMaster 5 Pro', 'Consoles', 549.99, 15, 'Experience ultra-fast load times and lifelike graphics with this next-gen console.', 'https://example.com/images/playmaster-5-pro.jpg'),
('RetroCube Classic', 'Consoles', 89.99, 40, 'Mini retro console preloaded with 200 classic arcade titles.', 'https://example.com/images/retrocube-classic.jpg'),
('Arcade FightStick Pro', 'Hardware', 149.99, 25, 'Tournament-grade fightstick with metal base and customizable buttons.', 'https://example.com/images/arcade-fightstick-pro.jpg'),

-- PC & Gaming Accessories
('Spectra RGB Mechanical Keyboard', 'Accessories', 129.99, 60, 'Hot-swappable keys, per-key RGB, and tactile blue switches.', 'https://example.com/images/spectra-keyboard.jpg'),
('AeroWave Wireless Gaming Mouse', 'Accessories', 69.99, 80, 'Ergonomic mouse with adjustable DPI up to 16,000 and 60-hour battery.', 'https://example.com/images/aerowave-mouse.jpg'),
('Vortex 7.1 Gaming Headset', 'Accessories', 99.99, 70, 'Surround-sound headset with noise-canceling mic and memory foam ear cups.', 'https://example.com/images/vortex-headset.jpg'),
('Titan XL Gaming Chair', 'Accessories', 249.99, 30, 'Adjustable ergonomic chair with lumbar support and RGB accent lighting.', 'https://example.com/images/titan-chair.jpg'),

-- Apparel & Merch
('Eat. Sleep. Game. Repeat. Hoodie', 'Apparel', 49.99, 100, 'Cozy fleece hoodie for serious gamers. Available in black, grey, and red.', 'https://example.com/images/hoodie-gamerepeat.jpg'),
('PixelPort Snapback Cap', 'Apparel', 24.99, 75, 'Premium embroidered cap with adjustable fit.', 'https://example.com/images/snapback-cap.jpg'),
('Level Up T-shirt', 'Apparel', 29.99, 90, '100% cotton shirt featuring a retro pixel design.', 'https://example.com/images/levelup-shirt.jpg'),
('Health Potion Water Bottle', 'Apparel', 19.99, 120, 'Stainless steel bottle shaped like an RPG health potion.', 'https://example.com/images/healthpotion-bottle.jpg'),

-- Collectibles & Figures
('CyberKnight Action Figure (Limited Edition)', 'Collectibles', 79.99, 25, 'Hand-painted 8-inch collectible from the hit sci-fi series.', 'https://example.com/images/cyberknight-figure.jpg'),
('Pixel Dragon Statue', 'Collectibles', 59.99, 35, 'Detailed resin statue inspired by classic RPG bosses.', 'https://example.com/images/pixel-dragon.jpg'),
('8-Bit Hero Mini Figure Set', 'Collectibles', 39.99, 50, 'A 5-piece set of retro-style pixelated mini heroes.', 'https://example.com/images/8bit-heroes.jpg'),
('Game Vault Poster Pack', 'Collectibles', 24.99, 60, 'Set of 4 high-quality prints featuring iconic video game covers.', 'https://example.com/images/gamevault-posters.jpg'),

-- Digital Items & Gift Cards
('$25 PixelPort Gift Card', 'Digital', 25.00, 999, 'Perfect for friends who can’t decide what to buy.', 'https://example.com/images/giftcard-25.jpg'),
('GameVault Plus Membership (1 Year)', 'Digital', 59.99, 500, 'Access exclusive discounts, early drops, and digital perks.', 'https://example.com/images/gamevault-plus.jpg'),
('QuestForge PC Download Code', 'Digital', 39.99, 200, 'Embark on a fantasy RPG adventure in this open-world masterpiece.', 'https://example.com/images/questforge.jpg');
