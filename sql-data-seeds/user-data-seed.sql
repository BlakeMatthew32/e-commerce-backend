-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert mock users (hashed passwords can be generated later if needed)
INSERT INTO users (username, email, password_hash, is_admin) VALUES
('admin', 'admin@pixelport.com', 'hashed_admin_pass', TRUE),
('player1', 'player1@email.com', 'hashed_pass_1', FALSE),
('gamer_girl', 'gg@email.com', 'hashed_pass_2', FALSE),
('no_scope_nick', 'nick@email.com', 'hashed_pass_3', FALSE),
('retro_fan', 'retro@email.com', 'hashed_pass_4', FALSE);
