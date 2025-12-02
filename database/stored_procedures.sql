-- ============================================================================
-- STORED PROCEDURES - Nexus Audio Platform
-- ============================================================================
-- Purpose: Optimized database queries for track retrieval and search
-- ============================================================================

DELIMITER //

-- ============================================================================
-- 1. GET TRACKS BY SUB-GENRE
-- ============================================================================
-- Returns all tracks for a specific sub-genre with full details
-- Parameters: subGenreId INT
-- ============================================================================

DROP PROCEDURE IF EXISTS GetTracksBySubGenre//

CREATE PROCEDURE GetTracksBySubGenre(IN subGenreId INT)
BEGIN
    SELECT
        t.id AS track_id,
        t.title,
        t.artist,
        t.bpm,
        t.duration_sec,
        t.price_basic,
        t.price_pro,
        t.price_stems,
        t.itunes_track_id,
        t.preview_url,
        t.artwork_url_small,
        t.artwork_url_large,
        t.collection_name,
        t.release_date,
        t.demo_url,
        t.cover_image_url,
        t.created_at,
        sg.id AS sub_genre_id,
        sg.name AS sub_genre_name,
        sg.slug AS sub_genre_slug,
        g.id AS genre_id,
        g.name AS genre_name,
        g.slug AS genre_slug
    FROM tracks t
    INNER JOIN sub_genres sg ON t.sub_genre_id = sg.id
    INNER JOIN genres g ON sg.genre_id = g.id
    WHERE t.sub_genre_id = subGenreId
    ORDER BY t.created_at DESC;
END//

-- ============================================================================
-- 2. GET TRACK BY ID
-- ============================================================================
-- Returns single track with full details including genre and sub-genre info
-- Parameters: trackId INT
-- ============================================================================

DROP PROCEDURE IF EXISTS GetTrackById//

CREATE PROCEDURE GetTrackById(IN trackId INT)
BEGIN
    SELECT
        t.id AS track_id,
        t.title,
        t.artist,
        t.bpm,
        t.duration_sec,
        t.price_basic,
        t.price_pro,
        t.price_stems,
        t.itunes_track_id,
        t.preview_url,
        t.artwork_url_small,
        t.artwork_url_large,
        t.collection_name,
        t.release_date,
        t.demo_url,
        t.cover_image_url,
        t.created_at,
        sg.id AS sub_genre_id,
        sg.name AS sub_genre_name,
        sg.slug AS sub_genre_slug,
        sg.description AS sub_genre_description,
        g.id AS genre_id,
        g.name AS genre_name,
        g.slug AS genre_slug,
        g.description AS genre_description
    FROM tracks t
    INNER JOIN sub_genres sg ON t.sub_genre_id = sg.id
    INNER JOIN genres g ON sg.genre_id = g.id
    WHERE t.id = trackId
    LIMIT 1;
END//

-- ============================================================================
-- 3. SEARCH TRACKS
-- ============================================================================
-- Advanced search with multiple filters
-- Parameters:
--   - keyword VARCHAR(255): Search in title, artist, genre, sub-genre
--   - genreId INT: Filter by genre (NULL for all)
--   - minBpm INT: Minimum BPM (NULL for no minimum)
--   - maxBpm INT: Maximum BPM (NULL for no maximum)
-- ============================================================================

DROP PROCEDURE IF EXISTS SearchTracks//

CREATE PROCEDURE SearchTracks(
    IN keyword VARCHAR(255),
    IN genreId INT,
    IN minBpm INT,
    IN maxBpm INT
)
BEGIN
    SELECT
        t.id AS track_id,
        t.title,
        t.artist,
        t.bpm,
        t.duration_sec,
        t.price_basic,
        t.price_pro,
        t.price_stems,
        t.itunes_track_id,
        t.preview_url,
        t.artwork_url_small,
        t.artwork_url_large,
        t.collection_name,
        t.release_date,
        t.demo_url,
        t.cover_image_url,
        t.created_at,
        sg.id AS sub_genre_id,
        sg.name AS sub_genre_name,
        sg.slug AS sub_genre_slug,
        g.id AS genre_id,
        g.name AS genre_name,
        g.slug AS genre_slug
    FROM tracks t
    INNER JOIN sub_genres sg ON t.sub_genre_id = sg.id
    INNER JOIN genres g ON sg.genre_id = g.id
    WHERE
        (keyword IS NULL OR keyword = '' OR
            t.title LIKE CONCAT('%', keyword, '%') OR
            t.artist LIKE CONCAT('%', keyword, '%') OR
            sg.name LIKE CONCAT('%', keyword, '%') OR
            g.name LIKE CONCAT('%', keyword, '%'))
        AND (genreId IS NULL OR g.id = genreId)
        AND (minBpm IS NULL OR t.bpm >= minBpm)
        AND (maxBpm IS NULL OR t.bpm <= maxBpm)
    ORDER BY t.created_at DESC;
END//

-- ============================================================================
-- 4. GET ALL GENRES WITH SUB-GENRES
-- ============================================================================
-- Returns all genres with their sub-genres for navigation
-- ============================================================================

DROP PROCEDURE IF EXISTS GetGenresWithSubGenres//

CREATE PROCEDURE GetGenresWithSubGenres()
BEGIN
    SELECT
        g.id AS genre_id,
        g.name AS genre_name,
        g.slug AS genre_slug,
        g.description AS genre_description,
        sg.id AS sub_genre_id,
        sg.name AS sub_genre_name,
        sg.slug AS sub_genre_slug,
        sg.description AS sub_genre_description,
        COUNT(t.id) AS track_count
    FROM genres g
    LEFT JOIN sub_genres sg ON g.id = sg.genre_id
    LEFT JOIN tracks t ON sg.id = t.sub_genre_id
    GROUP BY g.id, sg.id
    ORDER BY g.name, sg.name;
END//

-- ============================================================================
-- 5. GET TRACKS BY GENRE
-- ============================================================================
-- Returns all tracks for a specific genre (across all sub-genres)
-- Parameters: genreId INT
-- ============================================================================

DROP PROCEDURE IF EXISTS GetTracksByGenre//

CREATE PROCEDURE GetTracksByGenre(IN genreId INT)
BEGIN
    SELECT
        t.id AS track_id,
        t.title,
        t.artist,
        t.bpm,
        t.duration_sec,
        t.price_basic,
        t.price_pro,
        t.price_stems,
        t.itunes_track_id,
        t.preview_url,
        t.artwork_url_small,
        t.artwork_url_large,
        t.collection_name,
        t.release_date,
        t.demo_url,
        t.cover_image_url,
        t.created_at,
        sg.id AS sub_genre_id,
        sg.name AS sub_genre_name,
        sg.slug AS sub_genre_slug,
        g.id AS genre_id,
        g.name AS genre_name,
        g.slug AS genre_slug
    FROM tracks t
    INNER JOIN sub_genres sg ON t.sub_genre_id = sg.id
    INNER JOIN genres g ON sg.genre_id = g.id
    WHERE g.id = genreId
    ORDER BY t.created_at DESC;
END//

-- ============================================================================
-- 6. GET FEATURED TRACKS
-- ============================================================================
-- Returns latest tracks across all genres for homepage/featured section
-- Parameters: limitCount INT (default 12)
-- ============================================================================

DROP PROCEDURE IF EXISTS GetFeaturedTracks//

CREATE PROCEDURE GetFeaturedTracks(IN limitCount INT)
BEGIN
    SELECT
        t.id AS track_id,
        t.title,
        t.artist,
        t.bpm,
        t.duration_sec,
        t.price_basic,
        t.price_pro,
        t.price_stems,
        t.itunes_track_id,
        t.preview_url,
        t.artwork_url_small,
        t.artwork_url_large,
        t.collection_name,
        t.release_date,
        t.demo_url,
        t.cover_image_url,
        t.created_at,
        sg.id AS sub_genre_id,
        sg.name AS sub_genre_name,
        sg.slug AS sub_genre_slug,
        g.id AS genre_id,
        g.name AS genre_name,
        g.slug AS genre_slug
    FROM tracks t
    INNER JOIN sub_genres sg ON t.sub_genre_id = sg.id
    INNER JOIN genres g ON sg.genre_id = g.id
    ORDER BY t.created_at DESC
    LIMIT limitCount;
END//

-- ============================================================================
-- 7. GET TRACKS BY PRICE RANGE
-- ============================================================================
-- Returns tracks within a specific price range (using basic price)
-- Parameters: minPrice DECIMAL, maxPrice DECIMAL
-- ============================================================================

DROP PROCEDURE IF EXISTS GetTracksByPriceRange//

CREATE PROCEDURE GetTracksByPriceRange(
    IN minPrice DECIMAL(10,2),
    IN maxPrice DECIMAL(10,2)
)
BEGIN
    SELECT
        t.id AS track_id,
        t.title,
        t.artist,
        t.bpm,
        t.duration_sec,
        t.price_basic,
        t.price_pro,
        t.price_stems,
        t.itunes_track_id,
        t.preview_url,
        t.artwork_url_small,
        t.artwork_url_large,
        t.collection_name,
        t.release_date,
        t.demo_url,
        t.cover_image_url,
        t.created_at,
        sg.id AS sub_genre_id,
        sg.name AS sub_genre_name,
        sg.slug AS sub_genre_slug,
        g.id AS genre_id,
        g.name AS genre_name,
        g.slug AS genre_slug
    FROM tracks t
    INNER JOIN sub_genres sg ON t.sub_genre_id = sg.id
    INNER JOIN genres g ON sg.genre_id = g.id
    WHERE t.price_basic BETWEEN minPrice AND maxPrice
    ORDER BY t.price_basic ASC, t.created_at DESC;
END//

-- ============================================================================
-- 8. GET CATALOG STATISTICS
-- ============================================================================
-- Returns summary statistics for the entire catalog
-- ============================================================================

DROP PROCEDURE IF EXISTS GetCatalogStatistics//

CREATE PROCEDURE GetCatalogStatistics()
BEGIN
    SELECT
        (SELECT COUNT(*) FROM genres) AS total_genres,
        (SELECT COUNT(*) FROM sub_genres) AS total_sub_genres,
        (SELECT COUNT(*) FROM tracks) AS total_tracks,
        (SELECT AVG(price_basic) FROM tracks) AS avg_price_basic,
        (SELECT AVG(price_pro) FROM tracks) AS avg_price_pro,
        (SELECT AVG(price_stems) FROM tracks) AS avg_price_stems,
        (SELECT AVG(bpm) FROM tracks WHERE bpm > 0) AS avg_bpm,
        (SELECT AVG(duration_sec) FROM tracks) AS avg_duration_sec;
END//

DELIMITER ;

-- ============================================================================
-- END OF STORED PROCEDURES
-- ============================================================================
