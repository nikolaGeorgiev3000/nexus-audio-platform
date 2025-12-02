/**
 * iTunes API Seeding Script
 * Fetches real tracks from iTunes Search API and generates SQL seed data
 *
 * Usage: node itunes-seeder.js > seeds_itunes.sql
 */

import fetch from 'node-fetch';
import fs from 'fs';

// Sub-genre mapping with iTunes search terms
const SUB_GENRES = [
    // Electronic (Genre ID: 1)
    { id: 1, name: 'Melodic Techno', searchTerm: 'melodic techno electronic', genreId: 1 },
    { id: 2, name: 'Drum & Bass', searchTerm: 'drum and bass electronic', genreId: 1 },
    { id: 3, name: 'House', searchTerm: 'house electronic music', genreId: 1 },

    // Cinematic (Genre ID: 2)
    { id: 4, name: 'Trailer Music', searchTerm: 'epic orchestral cinematic', genreId: 2 },
    { id: 5, name: 'Ambient Cinematic', searchTerm: 'ambient cinematic piano', genreId: 2 },
    { id: 6, name: 'Action & Adventure', searchTerm: 'action adventure orchestral', genreId: 2 },

    // Urban (Genre ID: 3)
    { id: 7, name: 'Trap', searchTerm: 'trap hip hop beats', genreId: 3 },
    { id: 8, name: 'Lo-Fi Hip Hop', searchTerm: 'lofi hip hop chill beats', genreId: 3 },
    { id: 9, name: 'R&B & Soul', searchTerm: 'rnb soul smooth', genreId: 3 },

    // Rock (Genre ID: 4)
    { id: 10, name: 'Alternative Rock', searchTerm: 'alternative rock indie', genreId: 4 },
    { id: 11, name: 'Hard Rock', searchTerm: 'hard rock metal guitar', genreId: 4 },
    { id: 12, name: 'Indie Rock', searchTerm: 'indie rock garage', genreId: 4 },

    // Jazz & Soul (Genre ID: 5)
    { id: 13, name: 'Smooth Jazz', searchTerm: 'smooth jazz instrumental', genreId: 5 },
    { id: 14, name: 'Neo-Soul', searchTerm: 'neo soul contemporary', genreId: 5 },
    { id: 15, name: 'Funk', searchTerm: 'funk groovy bass', genreId: 5 },
];

// Pricing tiers based on genre
const PRICING = {
    1: { basic: 1.99, pro: 4.99, stems: 19.99 }, // Electronic
    2: { basic: 2.99, pro: 7.99, stems: 29.99 }, // Cinematic
    3: { basic: 1.99, pro: 4.99, stems: 19.99 }, // Urban
    4: { basic: 1.99, pro: 4.99, stems: 19.99 }, // Rock
    5: { basic: 2.49, pro: 5.99, stems: 22.99 }, // Jazz & Soul
};

// Delay helper to avoid rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch tracks from iTunes API
async function fetchTracksForSubGenre(subGenre, limit = 8) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(subGenre.searchTerm)}&media=music&entity=song&limit=${limit}`;

    console.error(`\n🔍 Fetching tracks for: ${subGenre.name}`);
    console.error(`   Search term: "${subGenre.searchTerm}"`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            console.error(`   ⚠️  No tracks found for ${subGenre.name}`);
            return [];
        }

        console.error(`   ✅ Found ${data.results.length} tracks`);

        return data.results.map(track => ({
            subGenreId: subGenre.id,
            genreId: subGenre.genreId,
            title: cleanString(track.trackName),
            artist: cleanString(track.artistName),
            itunesTrackId: track.trackId,
            previewUrl: track.previewUrl || '',
            artworkSmall: track.artworkUrl100 || '',
            artworkLarge: (track.artworkUrl100 || '').replace('100x100', '600x600'),
            collectionName: cleanString(track.collectionName || ''),
            releaseDate: track.releaseDate ? track.releaseDate.split('T')[0] : null,
            durationSec: Math.floor((track.trackTimeMillis || 180000) / 1000),
            bpm: 0, // iTunes doesn't provide BPM
        }));
    } catch (error) {
        console.error(`   ❌ Error fetching tracks for ${subGenre.name}:`, error.message);
        return [];
    }
}

// Clean string for SQL (escape single quotes)
function cleanString(str) {
    if (!str) return '';
    return str.replace(/'/g, "''");
}

// Generate SQL INSERT statements
function generateSQL(tracks) {
    const pricing = PRICING[tracks[0].genreId];

    const values = tracks.map(track => {
        const price = pricing || { basic: 1.99, pro: 4.99, stems: 19.99 };
        return `(${track.subGenreId}, '${track.title}', '${track.artist}', ${track.bpm || 0}, ${track.durationSec}, ${price.basic}, ${price.pro}, ${price.stems}, ${track.itunesTrackId}, '${track.previewUrl}', '${track.artworkSmall}', '${track.artworkLarge}', '${track.collectionName}', ${track.releaseDate ? `'${track.releaseDate}'` : 'NULL'})`;
    }).join(',\n');

    return values;
}

// Main seeding function
async function seedDatabase() {
    console.error('🎵 Starting iTunes API Seeding Script\n');
    console.error('=' .repeat(60));

    // Generate SQL header
    console.log('-- ============================================================================');
    console.log('-- ITUNES API SEED DATA - Nexus Audio Platform');
    console.log('-- ============================================================================');
    console.log('-- Generated:', new Date().toISOString());
    console.log('-- Total Sub-Genres: 15');
    console.log('-- Tracks per Sub-Genre: 8');
    console.log('-- Total Tracks: 120');
    console.log('-- ============================================================================\n');

    let totalTracks = 0;

    for (const subGenre of SUB_GENRES) {
        // Fetch tracks from iTunes
        const tracks = await fetchTracksForSubGenre(subGenre, 8);

        if (tracks.length > 0) {
            // Generate SQL
            console.log(`-- ---------------------------------------------------------------------------`);
            console.log(`-- ${subGenre.name} (Sub-genre ID: ${subGenre.id}) - ${tracks.length} tracks`);
            console.log(`-- ---------------------------------------------------------------------------`);
            console.log(`INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, itunes_track_id, preview_url, artwork_url_small, artwork_url_large, collection_name, release_date) VALUES`);
            console.log(generateSQL(tracks));
            console.log(';\n');

            totalTracks += tracks.length;
        }

        // Rate limiting: Wait 500ms between requests
        await delay(500);
    }

    console.log('-- ============================================================================');
    console.log(`-- END OF SEED DATA - Total Tracks: ${totalTracks}`);
    console.log('-- ============================================================================');

    console.error('\n' + '='.repeat(60));
    console.error(`✅ Seeding complete! Generated ${totalTracks} tracks`);
    console.error('='.repeat(60));
}

// Run the seeder
seedDatabase().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
