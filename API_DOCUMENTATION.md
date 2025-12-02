# Nexus Audio Platform - API Documentation

## Base URL

```
http://localhost:3000/api
```

## Overview

This document describes all available API endpoints for the Nexus Audio Platform. All responses are in JSON format.

---

## Catalog Statistics

### Get Catalog Statistics

Get overall statistics about the entire catalog.

**Endpoint:** `GET /genres/statistics`

**Response:**

```json
{
	"total_genres": 5,
	"total_sub_genres": 25,
	"total_tracks": 158,
	"avg_price_basic": "2.19",
	"avg_price_pro": "5.60",
	"avg_price_stems": "23.08",
	"avg_bpm": "115.09",
	"avg_duration_sec": "268.03"
}
```

---

## Genre Endpoints

### Get All Genres (Simple)

Get a simple list of all genres without sub-genres.

**Endpoint:** `GET /genres`

**Response:**

```json
[
  {
    "id": 1,
    "name": "Electronic",
    "slug": "electronic",
    "description": "Synthesizers, drum machines, and digital soundscapes pushing the boundaries of modern music production."
  },
  ...
]
```

### Get Genres with Sub-Genres

Get all genres with their sub-genres and track counts (for navigation menus).

**Endpoint:** `GET /genres/with-sub-genres`

**Response:**

```json
[
  {
    "id": 1,
    "name": "Electronic",
    "slug": "electronic",
    "description": "Synthesizers, drum machines, and digital soundscapes...",
    "sub_genres": [
      {
        "id": 1,
        "genre_id": 1,
        "name": "Melodic Techno",
        "slug": "melodic-techno",
        "description": "Hypnotic rhythms with emotional melodies",
        "track_count": 8
      },
      ...
    ]
  },
  ...
]
```

---

## Track Endpoints

### Get Featured Tracks

Get the latest tracks across all genres for homepage/featured sections.

**Endpoint:** `GET /tracks/featured`

**Query Parameters:**

- `limit` (optional): Number of tracks to return (default: 12, max: 100)

**Example:** `GET /tracks/featured?limit=5`

**Response:**

```json
[
  {
    "track_id": 15,
    "title": "Neon Horizon",
    "artist": "CyberWave",
    "bpm": 124,
    "duration_sec": 342,
    "price_basic": "1.99",
    "price_pro": "4.99",
    "price_stems": "19.99",
    "demo_url": "/demos/neon-horizon.mp3",
    "cover_image_url": "/covers/neon-horizon.jpg",
    "created_at": "2025-12-01T17:02:25.000Z",
    "sub_genre_id": 1,
    "sub_genre_name": "Melodic Techno",
    "sub_genre_slug": "melodic-techno",
    "genre_id": 1,
    "genre_name": "Electronic",
    "genre_slug": "electronic"
  },
  ...
]
```

### Get Track by ID

Get detailed information about a single track.

**Endpoint:** `GET /tracks/:trackId`

**Example:** `GET /tracks/15`

**Response:**

```json
{
	"track_id": 15,
	"title": "Neon Horizon",
	"artist": "CyberWave",
	"bpm": 124,
	"duration_sec": 342,
	"price_basic": "1.99",
	"price_pro": "4.99",
	"price_stems": "19.99",
	"demo_url": "/demos/neon-horizon.mp3",
	"cover_image_url": "/covers/neon-horizon.jpg",
	"created_at": "2025-12-01T17:02:25.000Z",
	"sub_genre_id": 1,
	"sub_genre_name": "Melodic Techno",
	"sub_genre_slug": "melodic-techno",
	"sub_genre_description": "Hypnotic rhythms with emotional melodies",
	"genre_id": 1,
	"genre_name": "Electronic",
	"genre_slug": "electronic",
	"genre_description": "Synthesizers, drum machines, and digital soundscapes..."
}
```

**Error Responses:**

- `400 Bad Request`: Invalid track ID
- `404 Not Found`: Track does not exist

### Get Tracks by Genre

Get all tracks for a specific genre (across all sub-genres).

**Endpoint:** `GET /tracks/genre/:genreId`

**Example:** `GET /tracks/genre/1`

**Response:** Array of tracks (same format as featured tracks)

**Error Responses:**

- `400 Bad Request`: Invalid genre ID

### Get Tracks by Sub-Genre

Get all tracks for a specific sub-genre.

**Endpoint:** `GET /tracks/sub-genre/:subGenreId`

**Example:** `GET /tracks/sub-genre/1`

**Response:** Array of tracks (same format as featured tracks)

**Error Responses:**

- `400 Bad Request`: Invalid sub-genre ID

### Search Tracks

Advanced search with multiple filters.

**Endpoint:** `GET /tracks/search`

**Query Parameters (all optional):**

- `keyword`: Search in title, artist, genre, or sub-genre name
- `genreId`: Filter by specific genre ID
- `minBpm`: Minimum BPM (beats per minute)
- `maxBpm`: Maximum BPM

**Examples:**

```
GET /tracks/search?keyword=trap
GET /tracks/search?keyword=cinematic&minBpm=120&maxBpm=140
GET /tracks/search?genreId=1&minBpm=125
```

**Response:** Array of tracks (same format as featured tracks)

### Get Tracks by Price Range

Get tracks within a specific price range (using basic price).

**Endpoint:** `GET /tracks/price-range`

**Query Parameters:**

- `minPrice` (required): Minimum price in dollars
- `maxPrice` (required): Maximum price in dollars

**Example:** `GET /tracks/price-range?minPrice=1.00&maxPrice=3.00`

**Response:** Array of tracks (same format as featured tracks)

**Error Responses:**

- `400 Bad Request`: Missing parameters or invalid price range

---

## Health Check

### Server Health

Check if the API server is running.

**Endpoint:** `GET /health`

**Response:**

```json
{
	"status": "active",
	"system": "Nexus Audio Platform API"
}
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error responses include an error message:

```json
{
	"error": "Error description here"
}
```

---

## Database Schema

### Current Data:

- **5 Genres**: Electronic, Cinematic, Urban, Rock, Jazz & Soul
- **25+ Sub-Genres**: Various sub-genres across all genres
- **158 Tracks**: Full catalog with pricing and metadata

### Pricing Tiers:

All tracks have three pricing tiers:

1. **Basic** (MP3): $1.49 - $3.49
2. **Pro** (WAV): $3.99 - $8.99
3. **Stems** (Commercial License): $17.99 - $34.99

---

## Testing the API

You can test these endpoints using:

1. **cURL:**

```bash
curl http://localhost:3000/api/genres/statistics
curl "http://localhost:3000/api/tracks/featured?limit=5"
curl "http://localhost:3000/api/tracks/search?keyword=trap&minBpm=140"
```

2. **Browser:**
   Simply navigate to the endpoints in your browser:

- http://localhost:3000/api/genres
- http://localhost:3000/api/tracks/featured

3. **Postman/Insomnia:**
   Import the endpoints and test with various parameters.

---

## Database Stored Procedures

The API uses optimized stored procedures for all queries:

- `GetTracksBySubGenre(subGenreId)`
- `GetTrackById(trackId)`
- `SearchTracks(keyword, genreId, minBpm, maxBpm)`
- `GetTracksByGenre(genreId)`
- `GetFeaturedTracks(limit)`
- `GetTracksByPriceRange(minPrice, maxPrice)`
- `GetGenresWithSubGenres()`
- `GetCatalogStatistics()`

These provide better performance and maintainability compared to raw SQL queries.

---

## Next Steps

### For Frontend Development:

1. Use `/tracks/featured` for the homepage featured section
2. Use `/genres/with-sub-genres` for navigation menus
3. Use `/tracks/search` for the search functionality
4. Use `/tracks/sub-genre/:id` for catalog browsing pages

### For Future Development:

- User authentication endpoints (login, register, profile)
- Shopping cart endpoints (add, update, remove items)
- Order/checkout endpoints
- Payment integration (Stripe)
- Track download endpoints (after purchase)
- iTunes API integration for additional metadata
