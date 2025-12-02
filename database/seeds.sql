-- ============================================================================
-- SEED DATA - Nexus Audio Platform
-- ============================================================================
-- Requirements: 5 Genres, 15 Sub-Genres, 120 Tracks (8 per sub-genre)
-- Optimized for university project demonstration
-- ============================================================================

-- ============================================================================
-- 1. DEPARTMENTS (GENRES) - 5 Total
-- ============================================================================
INSERT IGNORE INTO genres (name, slug, description) VALUES
('Electronic', 'electronic', 'Beats, techno, house, and everything electronic. Perfect for high-energy content, gaming streams, and club vibes.'),
('Cinematic', 'cinematic', 'Epic orchestral scores and dramatic soundtracks. Make your videos feel like blockbuster films.'),
('Urban', 'urban', 'Hip-hop beats, trap bangers, and R&B grooves. The sound of modern music and street culture.'),
('Rock', 'rock', 'Guitar-driven tracks from punk to indie. Add some edge and attitude to your content.'),
('Jazz & Soul', 'jazz-soul', 'Smooth jazz, neo-soul, and funky vibes. Perfect for chill content, vlogs, and laid-back moments.');

-- ============================================================================
-- 2. CATEGORIES (SUB-GENRES) - 15 Total (3 per genre)
-- ============================================================================

-- Electronic Sub-Genres (3)
INSERT IGNORE INTO sub_genres (genre_id, name, slug, description) VALUES
(1, 'Melodic Techno', 'melodic-techno', 'Hypnotic rhythms with emotional melodies and deep basslines'),
(1, 'Drum & Bass', 'dnb', 'High-energy breakbeats at 160-180 BPM with heavy bass'),
(1, 'House', 'house', 'Four-on-the-floor beats and infectious grooves for the dancefloor');

-- Cinematic Sub-Genres (3)
INSERT IGNORE INTO sub_genres (genre_id, name, slug, description) VALUES
(2, 'Trailer Music', 'trailer', 'Epic orchestral builds and powerful crescendos for film previews'),
(2, 'Ambient Cinematic', 'ambient-cinematic', 'Delicate strings and piano for emotional storytelling'),
(2, 'Action & Adventure', 'action-adventure', 'Fast-paced orchestral compositions with driving percussion');

-- Urban Sub-Genres (3)
INSERT IGNORE INTO sub_genres (genre_id, name, slug, description) VALUES
(3, 'Trap', 'trap', '808-driven beats with hi-hat rolls and hard-hitting percussion'),
(3, 'Lo-Fi Hip Hop', 'lofi-hiphop', 'Relaxed beats with vinyl crackle and jazzy samples'),
(3, 'R&B & Soul', 'rnb-soul', 'Smooth rhythms and emotional vocals with modern production');

-- Rock Sub-Genres (3)
INSERT IGNORE INTO sub_genres (genre_id, name, slug, description) VALUES
(4, 'Alternative Rock', 'alt-rock', 'Modern guitar-driven tracks with indie sensibilities'),
(4, 'Hard Rock', 'hard-rock', 'Powerful riffs and driving rhythms with attitude'),
(4, 'Indie Rock', 'indie-rock', 'Lo-fi aesthetics and authentic songwriting');

-- Jazz & Soul Sub-Genres (3)
INSERT IGNORE INTO sub_genres (genre_id, name, slug, description) VALUES
(5, 'Smooth Jazz', 'smooth-jazz', 'Polished instrumentals perfect for lounges and cafes'),
(5, 'Neo-Soul', 'neo-soul', 'Contemporary R&B with jazz influences and organic instrumentation'),
(5, 'Funk', 'funk', 'Groovy basslines and syncopated rhythms that make you move');

-- ============================================================================
-- 3. PRODUCTS (TRACKS) - 120 Total (8 per sub-genre)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- ELECTRONIC > Melodic Techno (Sub-genre ID: 1) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(1, 'Neon Horizon', 'CyberWave', 124, 342, 1.99, 4.99, 19.99, '/demos/neon-horizon.mp3', '/covers/neon-horizon.jpg'),
(1, 'Midnight Drive', 'Analog Dreams', 126, 385, 1.99, 4.99, 19.99, '/demos/midnight-drive.mp3', '/covers/midnight-drive.jpg'),
(1, 'Berlin Nights', 'Modular Soul', 123, 398, 2.49, 5.99, 22.99, '/demos/berlin-nights.mp3', '/covers/berlin-nights.jpg'),
(1, 'Euphoric State', 'Synth Collective', 125, 411, 1.99, 4.99, 19.99, '/demos/euphoric-state.mp3', '/covers/euphoric-state.jpg'),
(1, 'Deep Resonance', 'Echo Chamber', 122, 367, 1.99, 4.99, 19.99, '/demos/deep-resonance.mp3', '/covers/deep-resonance.jpg'),
(1, 'Lost in Translation', 'Quantum Beats', 127, 423, 2.49, 5.99, 22.99, '/demos/lost-translation.mp3', '/covers/lost-translation.jpg'),
(1, 'Aurora', 'Northern Lights', 124, 389, 1.99, 4.99, 19.99, '/demos/aurora.mp3', '/covers/aurora.jpg'),
(1, 'Crystalline', 'Prism Audio', 128, 356, 1.99, 4.99, 19.99, '/demos/crystalline.mp3', '/covers/crystalline.jpg');

-- ---------------------------------------------------------------------------
-- ELECTRONIC > Drum & Bass (Sub-genre ID: 2) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(2, 'Liquid Soul', 'Neural Network', 174, 298, 1.49, 3.99, 17.99, '/demos/liquid-soul.mp3', '/covers/liquid-soul.jpg'),
(2, 'Breakpoint', 'Amen Theory', 170, 312, 1.49, 3.99, 17.99, '/demos/breakpoint.mp3', '/covers/breakpoint.jpg'),
(2, 'Neurofunk Anthem', 'Dark Matter', 176, 287, 1.99, 4.99, 19.99, '/demos/neurofunk.mp3', '/covers/neurofunk.jpg'),
(2, 'Jungle Warrior', 'Ragga Beats', 172, 301, 1.49, 3.99, 17.99, '/demos/jungle-warrior.mp3', '/covers/jungle-warrior.jpg'),
(2, 'Hospital Records', 'Medic Sound', 174, 324, 1.99, 4.99, 19.99, '/demos/hospital.mp3', '/covers/hospital.jpg'),
(2, 'Roller', 'Bassline Cartel', 175, 295, 1.49, 3.99, 17.99, '/demos/roller.mp3', '/covers/roller.jpg'),
(2, 'Jump Up', 'Party Starters', 173, 283, 1.49, 3.99, 17.99, '/demos/jump-up.mp3', '/covers/jump-up.jpg'),
(2, 'Deep Jungle', 'Organic Breaks', 171, 318, 1.49, 3.99, 17.99, '/demos/deep-jungle.mp3', '/covers/deep-jungle.jpg');

-- ---------------------------------------------------------------------------
-- ELECTRONIC > House (Sub-genre ID: 3) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(3, 'Disco Heat', 'Groove Dealers', 128, 287, 1.99, 4.99, 19.99, '/demos/disco-heat.mp3', '/covers/disco-heat.jpg'),
(3, 'Deep House Vibes', 'Soulful Sessions', 122, 356, 1.99, 4.99, 19.99, '/demos/deep-vibes.mp3', '/covers/deep-vibes.jpg'),
(3, 'Chicago Nights', 'Warehouse Collective', 125, 298, 1.99, 4.99, 19.99, '/demos/chicago.mp3', '/covers/chicago.jpg'),
(3, 'Funky Business', 'Bassline Brothers', 126, 312, 2.49, 5.99, 22.99, '/demos/funky-business.mp3', '/covers/funky-business.jpg'),
(3, 'Tech House Anthem', 'Underground Sound', 128, 334, 1.99, 4.99, 19.99, '/demos/tech-anthem.mp3', '/covers/tech-anthem.jpg'),
(3, 'Acid House', 'TB-303 Crew', 130, 289, 1.99, 4.99, 19.99, '/demos/acid.mp3', '/covers/acid.jpg'),
(3, 'Jackin House', 'Old School Vibes', 127, 276, 1.99, 4.99, 19.99, '/demos/jackin.mp3', '/covers/jackin.jpg'),
(3, 'Progressive Journey', 'Melodic Minds', 124, 423, 2.49, 5.99, 22.99, '/demos/progressive.mp3', '/covers/progressive.jpg');

-- ---------------------------------------------------------------------------
-- CINEMATIC > Trailer Music (Sub-genre ID: 4) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(4, 'Epic Awakening', 'Orchestral Power', 85, 178, 2.99, 7.99, 29.99, '/demos/epic-awakening.mp3', '/covers/epic-awakening.jpg'),
(4, 'Rise of Heroes', 'Cinematic Glory', 90, 156, 2.99, 7.99, 29.99, '/demos/heroes.mp3', '/covers/heroes.jpg'),
(4, 'Battle Cry', 'War Drums', 95, 134, 3.49, 8.99, 34.99, '/demos/battle-cry.mp3', '/covers/battle-cry.jpg'),
(4, 'Victory March', 'Triumph Sound', 88, 167, 2.99, 7.99, 29.99, '/demos/victory.mp3', '/covers/victory.jpg'),
(4, 'Destiny Calls', 'Epic Music World', 92, 189, 2.99, 7.99, 29.99, '/demos/destiny.mp3', '/covers/destiny.jpg'),
(4, 'Final Showdown', 'Action Orchestra', 110, 145, 3.49, 8.99, 34.99, '/demos/showdown.mp3', '/covers/showdown.jpg'),
(4, 'Legendary', 'Heroic Sounds', 87, 201, 2.99, 7.99, 29.99, '/demos/legendary.mp3', '/covers/legendary.jpg'),
(4, 'Ascension', 'Skyward Orchestra', 93, 178, 2.99, 7.99, 29.99, '/demos/ascension.mp3', '/covers/ascension.jpg');

-- ---------------------------------------------------------------------------
-- CINEMATIC > Ambient Cinematic (Sub-genre ID: 5) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(5, 'Emotional Journey', 'String Theory', 0, 234, 2.49, 5.99, 22.99, '/demos/emotional.mp3', '/covers/emotional.jpg'),
(5, 'Lost Memories', 'Piano Tales', 0, 267, 2.49, 5.99, 22.99, '/demos/memories.mp3', '/covers/memories.jpg'),
(5, 'Whispers', 'Subtle Sounds', 0, 289, 1.99, 4.99, 19.99, '/demos/whispers.mp3', '/covers/whispers.jpg'),
(5, 'Reflection', 'Contemplation', 0, 312, 2.49, 5.99, 22.99, '/demos/reflection.mp3', '/covers/reflection.jpg'),
(5, 'Gentle Rain', 'Nature & Strings', 0, 245, 1.99, 4.99, 19.99, '/demos/rain.mp3', '/covers/rain.jpg'),
(5, 'Hope Springs', 'Uplifting Cinema', 0, 278, 2.49, 5.99, 22.99, '/demos/hope.mp3', '/covers/hope.jpg'),
(5, 'Distant Dreams', 'Ethereal Orchestra', 0, 298, 1.99, 4.99, 19.99, '/demos/distant.mp3', '/covers/distant.jpg'),
(5, 'Graceful', 'Elegant Strings', 0, 256, 2.49, 5.99, 22.99, '/demos/graceful.mp3', '/covers/graceful.jpg');

-- ---------------------------------------------------------------------------
-- CINEMATIC > Action & Adventure (Sub-genre ID: 6) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(6, 'Chase Scene', 'Adrenaline Rush', 140, 178, 2.99, 7.99, 29.99, '/demos/chase.mp3', '/covers/chase.jpg'),
(6, 'Quest Begins', 'Adventure Awaits', 130, 201, 2.99, 7.99, 29.99, '/demos/quest.mp3', '/covers/quest.jpg'),
(6, 'Velocity', 'Speed Force', 150, 156, 3.49, 8.99, 34.99, '/demos/velocity.mp3', '/covers/velocity.jpg'),
(6, 'Running Wild', 'Untamed Orchestra', 135, 189, 2.99, 7.99, 29.99, '/demos/running.mp3', '/covers/running.jpg'),
(6, 'Exploration', 'Discovery Sound', 120, 234, 2.49, 5.99, 22.99, '/demos/exploration.mp3', '/covers/exploration.jpg'),
(6, 'Into the Unknown', 'Mystery Quest', 125, 212, 2.99, 7.99, 29.99, '/demos/unknown.mp3', '/covers/unknown.jpg'),
(6, 'Danger Zone', 'Tense Moments', 145, 167, 3.49, 8.99, 34.99, '/demos/danger.mp3', '/covers/danger.jpg'),
(6, 'Heroic Deed', 'Brave Hearts', 128, 198, 2.99, 7.99, 29.99, '/demos/heroic.mp3', '/covers/heroic.jpg');

-- ---------------------------------------------------------------------------
-- URBAN > Trap (Sub-genre ID: 7) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(7, 'Hard Knock', 'Street Beats', 140, 189, 1.99, 4.99, 19.99, '/demos/hard-knock.mp3', '/covers/hard-knock.jpg'),
(7, '808 Thunder', 'Sub Bass Mafia', 145, 167, 1.99, 4.99, 19.99, '/demos/808-thunder.mp3', '/covers/808-thunder.jpg'),
(7, 'Trap Lord', 'Hood Classic', 138, 201, 2.49, 5.99, 22.99, '/demos/trap-lord.mp3', '/covers/trap-lord.jpg'),
(7, 'Street Kings', 'Urban Legends', 142, 178, 1.99, 4.99, 19.99, '/demos/street-kings.mp3', '/covers/street-kings.jpg'),
(7, 'Banger Alert', 'Hit Factory', 140, 156, 1.99, 4.99, 19.99, '/demos/banger.mp3', '/covers/banger.jpg'),
(7, 'Boss Mode', 'Power Moves', 136, 193, 2.49, 5.99, 22.99, '/demos/boss-mode.mp3', '/covers/boss-mode.jpg'),
(7, 'Skrrt Skrrt', 'Auto Tuned', 144, 172, 1.99, 4.99, 19.99, '/demos/skrrt.mp3', '/covers/skrrt.jpg'),
(7, 'Drip Check', 'Fashion Trap', 141, 184, 1.99, 4.99, 19.99, '/demos/drip.mp3', '/covers/drip.jpg');

-- ---------------------------------------------------------------------------
-- URBAN > Lo-Fi Hip Hop (Sub-genre ID: 8) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(8, 'Coffee Shop Vibes', 'Chill Beats', 85, 234, 1.49, 3.99, 17.99, '/demos/coffee.mp3', '/covers/coffee.jpg'),
(8, 'Study Session', 'Focus Flow', 80, 267, 1.49, 3.99, 17.99, '/demos/study.mp3', '/covers/study.jpg'),
(8, 'Rainy Days', 'Cozy Sounds', 78, 289, 1.99, 4.99, 19.99, '/demos/rainy.mp3', '/covers/rainy.jpg'),
(8, 'Lazy Sunday', 'Relax Mode', 82, 245, 1.49, 3.99, 17.99, '/demos/lazy.mp3', '/covers/lazy.jpg'),
(8, 'Midnight Thoughts', 'Late Night Beats', 75, 298, 1.99, 4.99, 19.99, '/demos/midnight.mp3', '/covers/midnight.jpg'),
(8, 'Nostalgic', 'Memory Lane', 83, 256, 1.49, 3.99, 17.99, '/demos/nostalgic.mp3', '/covers/nostalgic.jpg'),
(8, 'Tokyo Nights', 'City Lights', 88, 223, 1.99, 4.99, 19.99, '/demos/tokyo.mp3', '/covers/tokyo.jpg'),
(8, 'Vinyl Dreams', 'Analog Vibes', 79, 278, 1.49, 3.99, 17.99, '/demos/vinyl.mp3', '/covers/vinyl.jpg');

-- ---------------------------------------------------------------------------
-- URBAN > R&B & Soul (Sub-genre ID: 9) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(9, 'Smooth Operator', 'Velvet Voice', 92, 212, 2.49, 5.99, 22.99, '/demos/smooth.mp3', '/covers/smooth.jpg'),
(9, 'Late Night Love', 'Soul Sessions', 88, 234, 2.49, 5.99, 22.99, '/demos/late-love.mp3', '/covers/late-love.jpg'),
(9, 'Feel Good', 'Good Vibes Crew', 95, 198, 1.99, 4.99, 19.99, '/demos/feel-good.mp3', '/covers/feel-good.jpg'),
(9, 'Soulful', 'Modern Soul', 90, 223, 2.49, 5.99, 22.99, '/demos/soulful.mp3', '/covers/soulful.jpg'),
(9, 'Slow Jam', 'Bedroom Producer', 75, 267, 2.49, 5.99, 22.99, '/demos/slow-jam.mp3', '/covers/slow-jam.jpg'),
(9, 'City Lights', 'Urban Romance', 93, 201, 1.99, 4.99, 19.99, '/demos/city-lights.mp3', '/covers/city-lights.jpg'),
(9, 'Golden Hour', 'Sunset Soul', 87, 245, 2.49, 5.99, 22.99, '/demos/golden.mp3', '/covers/golden.jpg'),
(9, 'Vibe Check', 'Chill RnB', 91, 189, 1.99, 4.99, 19.99, '/demos/vibe.mp3', '/covers/vibe.jpg');

-- ---------------------------------------------------------------------------
-- ROCK > Alternative Rock (Sub-genre ID: 10) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(10, 'Rebel Youth', 'Generation X', 145, 234, 1.99, 4.99, 19.99, '/demos/rebel.mp3', '/covers/rebel.jpg'),
(10, 'Grunge Revival', 'Seattle Sound', 120, 267, 1.99, 4.99, 19.99, '/demos/grunge.mp3', '/covers/grunge.jpg'),
(10, 'Modern Anthem', 'New Wave', 138, 212, 2.49, 5.99, 22.99, '/demos/modern-anthem.mp3', '/covers/modern-anthem.jpg'),
(10, 'Indie Spirit', 'Garage Band', 130, 245, 1.99, 4.99, 19.99, '/demos/indie-spirit.mp3', '/covers/indie-spirit.jpg'),
(10, 'Underground', 'DIY Records', 142, 223, 1.99, 4.99, 19.99, '/demos/underground.mp3', '/covers/underground.jpg'),
(10, 'Noise Pop', 'Distortion Dreams', 155, 198, 2.49, 5.99, 22.99, '/demos/noise-pop.mp3', '/covers/noise-pop.jpg'),
(10, 'Post Punk', 'Dark Wave', 125, 256, 1.99, 4.99, 19.99, '/demos/post-punk.mp3', '/covers/post-punk.jpg'),
(10, 'College Radio', 'Campus Rockers', 135, 289, 1.99, 4.99, 19.99, '/demos/college.mp3', '/covers/college.jpg');

-- ---------------------------------------------------------------------------
-- ROCK > Hard Rock (Sub-genre ID: 11) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(11, 'Thunder Strike', 'Metal Gods', 160, 245, 2.49, 5.99, 22.99, '/demos/thunder.mp3', '/covers/thunder.jpg'),
(11, 'Riff Master', 'Guitar Heroes', 155, 223, 2.49, 5.99, 22.99, '/demos/riff.mp3', '/covers/riff.jpg'),
(11, 'Highway Anthem', 'Road Warriors', 140, 267, 1.99, 4.99, 19.99, '/demos/highway.mp3', '/covers/highway.jpg'),
(11, 'Power Chords', 'Amp Squad', 165, 234, 2.49, 5.99, 22.99, '/demos/power-chords.mp3', '/covers/power-chords.jpg'),
(11, 'Rock Solid', 'Heavy Hitters', 150, 256, 1.99, 4.99, 19.99, '/demos/rock-solid.mp3', '/covers/rock-solid.jpg'),
(11, 'Arena Rock', 'Stadium Sound', 145, 298, 2.49, 5.99, 22.99, '/demos/arena.mp3', '/covers/arena.jpg'),
(11, 'Shredder', 'Solo King', 170, 212, 3.49, 8.99, 34.99, '/demos/shredder.mp3', '/covers/shredder.jpg'),
(11, 'Maximum Overdrive', 'Pedal Power', 158, 278, 2.49, 5.99, 22.99, '/demos/overdrive.mp3', '/covers/overdrive.jpg');

-- ---------------------------------------------------------------------------
-- ROCK > Indie Rock (Sub-genre ID: 12) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(12, 'Bedroom Pop', 'Home Studio', 110, 189, 1.49, 3.99, 17.99, '/demos/bedroom.mp3', '/covers/bedroom.jpg'),
(12, 'Hipster Anthem', 'Vinyl Only', 118, 234, 1.99, 4.99, 19.99, '/demos/hipster.mp3', '/covers/hipster.jpg'),
(12, 'Lo-Fi Rock', 'Tape Machine', 105, 267, 1.49, 3.99, 17.99, '/demos/lofi-rock.mp3', '/covers/lofi-rock.jpg'),
(12, 'Garage Days', 'DIY Ethic', 125, 212, 1.99, 4.99, 19.99, '/demos/garage.mp3', '/covers/garage.jpg'),
(12, 'Authentic', 'Real Instruments', 115, 245, 1.49, 3.99, 17.99, '/demos/authentic.mp3', '/covers/authentic.jpg'),
(12, 'Festival Ready', 'Summer Vibes', 130, 223, 1.99, 4.99, 19.99, '/demos/festival.mp3', '/covers/festival.jpg'),
(12, 'Art Rock', 'Experimental', 95, 298, 2.49, 5.99, 22.99, '/demos/art-rock.mp3', '/covers/art-rock.jpg'),
(12, 'Twee Pop', 'Cute & Clean', 122, 178, 1.49, 3.99, 17.99, '/demos/twee.mp3', '/covers/twee.jpg');

-- ---------------------------------------------------------------------------
-- JAZZ & SOUL > Smooth Jazz (Sub-genre ID: 13) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(13, 'Sunset Boulevard', 'Sax Appeal', 95, 267, 2.49, 5.99, 22.99, '/demos/sunset.mp3', '/covers/sunset.jpg'),
(13, 'Lounge Lizard', 'Cocktail Hour', 88, 289, 2.49, 5.99, 22.99, '/demos/lounge.mp3', '/covers/lounge.jpg'),
(13, 'Mellow Mood', 'Easy Listening', 82, 312, 1.99, 4.99, 19.99, '/demos/mellow.mp3', '/covers/mellow.jpg'),
(13, 'Café Society', 'Jazz Café', 90, 234, 2.49, 5.99, 22.99, '/demos/cafe.mp3', '/covers/cafe.jpg'),
(13, 'Smooth Operator', 'Cool Jazz', 92, 278, 2.49, 5.99, 22.99, '/demos/smooth-op.mp3', '/covers/smooth-op.jpg'),
(13, 'Late Night Jazz', 'Blue Note', 80, 298, 1.99, 4.99, 19.99, '/demos/late-jazz.mp3', '/covers/late-jazz.jpg'),
(13, 'Sophisticated', 'High Class', 87, 256, 2.49, 5.99, 22.99, '/demos/sophisticated.mp3', '/covers/sophisticated.jpg'),
(13, 'Elevator Music', 'Muzak Modern', 85, 245, 1.99, 4.99, 19.99, '/demos/elevator.mp3', '/covers/elevator.jpg');

-- ---------------------------------------------------------------------------
-- JAZZ & SOUL > Neo-Soul (Sub-genre ID: 14) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(14, 'Soulful Journey', 'Modern Soul', 92, 234, 2.49, 5.99, 22.99, '/demos/journey.mp3', '/covers/journey.jpg'),
(14, 'Organic Vibes', 'Live Instruments', 88, 267, 2.49, 5.99, 22.99, '/demos/organic.mp3', '/covers/organic.jpg'),
(14, 'Rhodes Dream', 'Electric Piano', 85, 289, 1.99, 4.99, 19.99, '/demos/rhodes.mp3', '/covers/rhodes.jpg'),
(14, 'Groove Theory', 'Pocket Sound', 95, 245, 2.49, 5.99, 22.99, '/demos/groove.mp3', '/covers/groove.jpg'),
(14, 'Velvet Soul', 'Smooth Grooves', 90, 278, 2.49, 5.99, 22.99, '/demos/velvet.mp3', '/covers/velvet.jpg'),
(14, 'Future Classic', 'Neo Movement', 93, 223, 1.99, 4.99, 19.99, '/demos/future.mp3', '/covers/future.jpg'),
(14, 'Conscious', 'Thoughtful Beats', 87, 298, 2.49, 5.99, 22.99, '/demos/conscious.mp3', '/covers/conscious.jpg'),
(14, 'Urban Soul', 'City Funk', 92, 256, 1.99, 4.99, 19.99, '/demos/urban-soul.mp3', '/covers/urban-soul.jpg');

-- ---------------------------------------------------------------------------
-- JAZZ & SOUL > Funk (Sub-genre ID: 15) - 8 tracks
-- ---------------------------------------------------------------------------
INSERT IGNORE INTO tracks (sub_genre_id, title, artist, bpm, duration_sec, price_basic, price_pro, price_stems, demo_url, cover_image_url) VALUES
(15, 'Funky Fresh', 'Bass Brothers', 110, 234, 1.99, 4.99, 19.99, '/demos/funky-fresh.mp3', '/covers/funky-fresh.jpg'),
(15, 'Get Down', 'Groove Gang', 115, 267, 1.99, 4.99, 19.99, '/demos/get-down.mp3', '/covers/get-down.jpg'),
(15, 'Super Bad', 'JB Tribute', 108, 245, 2.49, 5.99, 22.99, '/demos/super-bad.mp3', '/covers/super-bad.jpg'),
(15, 'Boogie Nights', 'Disco Funk', 118, 289, 1.99, 4.99, 19.99, '/demos/boogie.mp3', '/covers/boogie.jpg'),
(15, 'Slap Bass', 'Thumb Funk', 112, 223, 1.99, 4.99, 19.99, '/demos/slap.mp3', '/covers/slap.jpg'),
(15, 'Parliament Funk', 'P-Funk Crew', 105, 298, 2.49, 5.99, 22.99, '/demos/parliament.mp3', '/covers/parliament.jpg'),
(15, 'Uptown Funk', 'Modern Funk', 116, 212, 1.99, 4.99, 19.99, '/demos/uptown.mp3', '/covers/uptown.jpg'),
(15, 'Funky Drummer', 'Break Beats', 110, 256, 1.99, 4.99, 19.99, '/demos/drummer.mp3', '/covers/drummer.jpg');

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
-- Total Summary:
-- - Genres: 5
-- - Sub-Genres: 15 (3 per genre)
-- - Tracks: 120 (8 per sub-genre)
-- ============================================================================
