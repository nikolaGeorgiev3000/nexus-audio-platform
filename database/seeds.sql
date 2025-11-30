-- SEED DATA (Test Data for Stage 1)

-- 1. Departments (Genres)
INSERT IGNORE INTO genres (name, slug, description) VALUES 
('Electronic', 'electronic', 'Synthesizers, drum machines, and digital landscapes.'),
('Cinematic', 'cinematic', 'Orchestral scores and epic soundscapes for film.'),
('Urban', 'urban', 'Hip-hop, Trap, and R&B beats.');

-- 2. Categories (Sub-genres)
INSERT IGNORE INTO sub_genres (genre_id, name, slug) VALUES 
(1, 'Melodic Techno', 'melodic-techno'),
(1, 'Drum & Bass', 'dnb'),
(1, 'Ambient', 'ambient'),
(2, 'Trailer Music', 'trailer'),
(3, 'Trap', 'trap');

-- 3. Products (Tracks)
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, price_basic, price_pro) VALUES 
(1, 'Neon Horizon', 'CyberWave', 1.99, 4.99),
(2, 'Liquid Soul', 'Neural Network', 1.49, 3.99);