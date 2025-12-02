-- NEXUS AUDIO PLATFORM - DATABASE SCHEMA (STAGE 1)

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS nexus_audio_db;
USE nexus_audio_db;

-- 2. Users Table (Admin & Customers)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Departments -> GENRES (Requirement: "Departments")
-- Represents the main musical genres (e.g., Electronic, Rock, Jazz)
CREATE TABLE IF NOT EXISTS genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL, -- URL friendly name
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Categories -> SUB-GENRES (Requirement: "Categories")
-- Specific styles within a genre (e.g., Techno, Deep House)
CREATE TABLE IF NOT EXISTS sub_genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    genre_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- 5. Products -> TRACKS (Requirement: "Items/Goods")
-- The actual audio assets for sale
CREATE TABLE IF NOT EXISTS tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sub_genre_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    bpm INT, -- Beats per minute
    duration_sec INT,

    -- Pricing Tier System (Innovation aspect)
    price_basic DECIMAL(10, 2) DEFAULT 0.99, -- MP3 License
    price_pro DECIMAL(10, 2) DEFAULT 2.49,   -- WAV License
    price_stems DECIMAL(10, 2) DEFAULT 19.99,-- Commercial/Stems License

    -- iTunes API Integration (External System Integration)
    itunes_track_id BIGINT, -- iTunes track ID for API lookups
    preview_url VARCHAR(512), -- Real 30-sec preview from iTunes
    artwork_url_small VARCHAR(512), -- 100x100 artwork
    artwork_url_large VARCHAR(512), -- 600x600 artwork
    collection_name VARCHAR(200), -- Album/Collection name
    release_date DATE, -- Track release date

    -- File Paths & Metadata (Fallback/Local)
    demo_url VARCHAR(255), -- 30 sec preview path (fallback)
    cover_image_url VARCHAR(255), -- Local cover (fallback)

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sub_genre_id) REFERENCES sub_genres(id) ON DELETE CASCADE
);

-- 6. Stored Procedure (Requirement: "Stored Procedures")
-- Fetches all tracks belonging to a specific main Genre (Department)
DROP PROCEDURE IF EXISTS GetTracksByGenre;
DELIMITER //
CREATE PROCEDURE GetTracksByGenre(IN genreName VARCHAR(100))
BEGIN
    SELECT t.title, t.artist, t.price_basic, s.name as sub_genre, g.name as genre
    FROM tracks t
    JOIN sub_genres s ON t.sub_genre_id = s.id
    JOIN genres g ON s.genre_id = g.id
    WHERE g.name = genreName;
END //
DELIMITER ;