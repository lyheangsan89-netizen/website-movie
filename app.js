const { useState, useEffect, useRef, useCallback, useMemo, memo } = React;
const moviesData = [
    {
        "id": 1,
        "title": "Spider-Man: Brand New Day",
        "year": 2026,
        "rating": 8.5,
        "genre": "Action",
        "backdrop": "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop",
        "poster": "https://cdn.marvel.com/content/2x/spidermanbrandnewday_lob_crd_02.webp",
        "synopsis": "Following the events where the world forgot who Peter Parker is, Spider-Man must rebuild his life from scratch as a street-level hero in New York City, facing new threats and balancing his duty with his isolated personal life.",
        "runtime": "145 min",
        "director": "Destin Daniel Cretton",
        "cast": ["Tom Holland", "Zendaya", "Sadie Sink", "Liza Soberano", "Mark Ruffalo"],
        "trending": true,
        "popular": true,
        "topRated": true,
        "category": "Action",
        "video": "https://ok.ru/video/15646947936821"
    },
    {

        "id": 2,
        "title": "Blades of the Guardians",
        "year": 2023,
        "rating": 8.1,
        "genre": "Animation / Action / Historical",
        "backdrop": "https://m.media-amazon.com/images/M/MV5BY2RhODg0NzctNjgxMi00OWNjLThiNmUtYTcyNjllMTc3ZmY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "poster": "https://m.media-amazon.com/images/M/MV5BY2RhODg0NzctNjgxMi00OWNjLThiNmUtYTcyNjllMTc3ZmY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "synopsis": "Set in the turmoil of the late Sui Dynasty, Dao Ma, a highly skilled mercenary with a deadly past, travels across the treacherous western sands on an escort mission to Chang'an, facing ruthless warlords and political conspiracies.",
        "runtime": "24 min / ep",
        "director": "Shi Yi",
        "cast": ["Gu Jiangshan", "Liu Cong", "Guan Shuai", "Zhao Qianjing"],
        "trending": true,
        "popular": true,
        "topRated": true,
        "category": "Animation",
        "video": "https://drive.google.com/file/d/1OoBTXgEEciAWzRMf_r-m3di8rrnZe5iU/preview"

    },
    {
        "id": 3,
        "title": "Thaghut",
        "year": 2024,
        "rating": 5.7,
        "genre": "Horror",
        "backdrop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ2K8ogJj6wXDRg8WdTm8nkdkvYUhk-xAJ-lMKWRSwBw&s=10",
        "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ2K8ogJj6wXDRg8WdTm8nkdkvYUhk-xAJ-lMKWRSwBw&s=10",
        "synopsis": "After discovering her biological father is a spiritual healer with a dark legacy, Ainun delves into his mysterious teachings, only to uncover terrifying rituals and dangerous dark magic lurking within.",
        "runtime": "102 min",
        "director": "Bobby Prasetyo",
        "cast": ["Yasmin Napper", "Arbani Yasiz", "Ria Ricis", "Whani Darmawan", "Hana Saraswati"],
        "trending": true,
        "popular": true,
        "topRated": false,
        "category": "Horror",
        "video": "https://drive.google.com/file/d/1LhDzY7XfxfICo1nXTpUWOfG4YE9skDlP/preview"
    },
    {
        "id": 4,
        "title": "Spider-Verse",
        "year": 2023,
        "rating": 8.7,
        "genre": "Animation",
        "backdrop": "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop",
        "poster": "https://tse1.mm.bing.net/th/id/OIP.eum5hRk914QhnnJWB6E9EgHaKe?r=0&w=1080&h=1527&rs=1&pid=ImgDetMain&o=7&rm=3",
        "synopsis": "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People...",
        "runtime": "140 min",
        "director": "Joaquim Dos Santos",
        "cast": ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry", "Luna Lauren Velez"],
        "trending": true,
        "popular": true,
        "topRated": true,
        "category": "Action",
        "video": "https://ok.ru/video/15446058404412"
    },
    {
        "id": 5,
        "title": "Boonie Bears: The Hidden Protector",
        "year": 2023,
        "rating": 7.7,
        "genre": "Crime / Drama / History",
        "backdrop": "https://tse1.mm.bing.net/th/id/OIP.zzyhzNfaQV050H9vXZ2W9AAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        "poster": "https://tse1.mm.bing.net/th/id/OIP.zzyhzNfaQV050H9vXZ2W9AAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        "synopsis": "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one until the FBI steps in to unravel the conspiracy.",
        "runtime": "206 min",
        "director": "Martin Scorsese",
        "cast": ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone", "Jesse Plemons"],
        "trending": false,
        "popular": true,
        "topRated": true,
        "category": "Crime",
        "video": "https://ok.ru/video/15647240227381"
    },
    {
        "id": 6,
        "title": "18×2 Beyond Youthful Days",
        "year": 2024,
        "rating": 7.2,
        "genre": "Romance, Drama",
        "backdrop": "https://www.acmodasi.in/amdb/images/movie/w360/118/82/18x2-beyond-youthful-days-2024-678635.webp",
        "poster": "https://www.acmodasi.in/amdb/images/movie/w360/118/82/18x2-beyond-youthful-days-2024-678635.webp",
        "synopsis": "Jimmy, a 36-year-old Taiwanese video game developer, travels back to Japan after getting fired to find Ami, a Japanese backpacker he fell in love with 18 years ago.",
        "runtime": "124 min",
        "director": "Michihito Fujii",
        "cast": ["Greg Han Hsu", "Kaya Kiyohara", "Joseph Chang", "Kuroki Haru", "Shunsuke Michieda"],
        "trending": true,
        "popular": true,
        "topRated": false,
        "category": "Romance",
        "video": "https://ok.ru/videoembed/15646749887029"
    },
    {
        "id": 7,
        "title": "League of Gods: Alluring Woman",
        "year": 2021,
        "rating": 6.5,
        "genre": "Action, Fantasy, Romance",
        "backdrop": "https://tse1.mm.bing.net/th/id/OIP.04k42MeT1mb_A0OIoHimIwHaLC?r=0&w=1041&h=1551&rs=1&pid=ImgDetMain&o=7&rm=3",
        "poster": "https://tse1.mm.bing.net/th/id/OIP.04k42MeT1mb_A0OIoHimIwHaLC?r=0&w=1041&h=1551&rs=1&pid=ImgDetMain&o=7&rm=3",
        "synopsis": "During the end of the Shang Dynasty, King Zhou is captivated by Daji, a nine-tailed fox spirit disguised as a beautiful woman, leading the kingdom into chaos as heroes and gods rise to fight.",
        "runtime": "90 min",
        "director": "Liu Chun",
        "cast": ["Qiu Yining", "Xu Feng", "Leanne Liu", "Zhou Haodong"],
        "trending": true,
        "popular": true,
        "topRated": false,
        "category": "Action",
        "video": "https://ok.ru/videoembed/15647375166005"
    },
    {
        "id": 8,
        "title": "The Spell",
        "year": 2020,
        "rating": 5.8,
        "genre": "Horror, Thriller",
        "backdrop": "https://i1.wp.com/jaikonmovie.com/wp-content/uploads/2026/01/unnamed-1.jpg",
        "poster": "https://i1.wp.com/jaikonmovie.com/wp-content/uploads/2026/01/unnamed-1.jpg",
        "synopsis": "After surviving a plane crash, Marquis is stranded in the rural Appalachia and held captive in the attic of a Hoodoo practitioner who attempts to heal him using dark magic.",
        "runtime": "91 min",
        "director": "Mark Tonderai",
        "cast": ["Omari Hardwick", "Loretta Devine", "John Beasley", "Lorraine Burroughs"],
        "trending": true,
        "popular": true,
        "topRated": false,
        "category": "Horror",
        "video": "https://ok.ru/videoembed/15647375297077"
    },
    {
        "id": 9,
        "title": "You Are the Apple of My Eye",
        "year": 2011,
        "rating": 7.6,
        "genre": "Comedy, Drama, Romance",
        "backdrop": "https://i.scdn.co/image/ab67616d0000b2739b5a1932f9fb727cf6d05faa",
        "poster": "https://i.scdn.co/image/ab67616d0000b2739b5a1932f9fb727cf6d05faa",
        "synopsis": "A group of close friends who attend the same school all fall in love with the top student in their class, Shen Chia-yi, leading to a nostalgic story of mischief, growing up, and first love.",
        "runtime": "110 min",
        "director": "Giddens Ko",
        "cast": ["Ko Chen-tung", "Michelle Chen", "Steven Shao", "Yen Sheng-yu", "A-Ken"],
        "trending": true,
        "popular": true,
        "topRated": true,
        "category": "Romance",
        "video": "https://ok.ru/videoembed/15647728863797"
    },
    {
        "id": 10,
        "title": "Don't Forget I Love You",
        "year": 2022,
        "rating": 6.1,
        "genre": "Romance, Drama",
        "backdrop": "https://sino-cinema.com/wp-content/uploads/2022/04/dontforgetiloveyou.jpg",
        "poster": "https://sino-cinema.com/wp-content/uploads/2022/04/dontforgetiloveyou.jpg",
        "synopsis": "Lu Yao, a composer suffering from short-term memory loss where his memory resets every single day, falls in love with his psychologist Xu Yue as they navigate the challenges of his condition.",
        "runtime": "126 min",
        "director": "Wong Chun-Chun",
        "cast": ["Gulnazar", "Jasper Liu", "Rayza", "Zhang Yishang"],
        "trending": true,
        "popular": true,
        "topRated": false,
        "category": "Romance",
        "video": "https://ok.ru/video/15647847680565"
    },
    {
        "id": 11,
        "title": "Eye for an Eye",
        "year": 2022,
        "rating": 7.1,
        "genre": "Action, Drama",
        "backdrop": "https://m.media-amazon.com/images/M/MV5BMDZmMTkyNTAtNmU1Yy00ZTVlLWJlZmEtM2RhODA5MWY2MWNlXkEyXkFqcGc@._V1_FMjpg_UY2832_.jpg",
        "poster": "https://m.media-amazon.com/images/M/MV5BMDZmMTkyNTAtNmU1Yy00ZTVlLWJlZmEtM2RhODA5MWY2MWNlXkEyXkFqcGc@._V1_FMjpg_UY2832_.jpg",
        "synopsis": "A highly skilled blind bounty hunter named Cheng Xiaazi unexpectedly saves a wine house servant who was framed and ruined by a powerful local family, leading him onto a bloody path of vengeance.",
        "runtime": "74 min",
        "director": "Yang Bingjia",
        "cast": ["Xie Miao", "Gao Weiguang", "Zhang Chuhan", "Xiang Hao"],
        "trending": true,
        "popular": true,
        "topRated": false,
        "category": "Action",
        "video": "https://ok.ru/video/15650716518965"
    }

];

const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Horror", "Comedy", "Romance", "Crime"];

// ─── HELPER FOR VIDEO URLS ──────────────────────────────────
const getUrlInfo = (url) => {
    if (!url) return { type: 'invalid', src: '' };

    // Direct video file (.mp4)
    if (url.endsWith('.mp4')) {
        let finalUrl = url;
        if (url.includes('archive.org/details/')) {
            // Transform archive.org page URL to a direct download link
            const transformedUrl = url.replace('/details/', '/download/');
            // Clean up filename: handle spaces and remove zero-width spaces
            const parts = transformedUrl.split('/');
            const filename = parts.pop().replace(/\+/g, '%20').replace(/%E2%80%8B/g, '');
            finalUrl = [...parts, filename].join('/');
        }
        return { type: 'video', src: finalUrl };
    }

    // Google Drive
    if (url.includes('drive.google.com')) {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            // Use the more reliable /uc endpoint for embedding
            return { type: 'iframe', src: `https://drive.google.com/uc?export=view&id=${match[1]}` };
        }
        // Fallback for any other GDrive URL format
        return { type: 'iframe', src: url };
    }

    // OK.ru
    if (url.includes('ok.ru/video/')) {
        return { type: 'iframe', src: url.replace('/video/', '/videoembed/') };
    }
    if (url.includes('ok.ru/videoembed/')) {
        return { type: 'iframe', src: url };
    }

    // Archive.org (non-mp4 embed pages)
    if (url.includes('archive.org/details/')) {
        return { type: 'iframe', src: url.replace('/details/', '/embed/') };
    }

    // Default to iframe for any other unrecognized URL
    return { type: 'iframe', src: url };
};

// ─── ICON COMPONENT ─────────────────────────────────────────
const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
        play: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="5 3 19 12 5 21 5 3" /></svg>,
        plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>,
        check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5" /></svg>,
        star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
        chevronLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6" /></svg>,
        chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6" /></svg>,
        x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
        user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>,
        info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
        clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        film: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" /><line x1="7" x2="7" y1="2" y2="22" /><line x1="17" x2="17" y1="2" y2="22" /><line x1="2" x2="22" y1="12" y2="12" /><line x1="2" x2="7" y1="7" y2="7" /><line x1="2" x2="7" y1="17" y2="17" /><line x1="17" x2="22" y1="17" y2="17" /><line x1="17" x2="22" y1="7" y2="7" /></svg>,
        heart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
        menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
        trending: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
        award: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>,
        loader: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>,
        fullscreen: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg>,
        fullscreenExit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>,
    };
    return icons[name] || null;
};

// ─── STAR RATING COMPONENT ──────────────────────────────────
const StarRating = memo(({ rating }) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalf = (rating / 2) % 1 >= 0.5;
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Icon key={i} name="star" size={14} className={i < fullStars ? "text-yellow-400" : i === fullStars && hasHalf ? "text-yellow-400/50" : "text-gray-600"} />
            ))}
            <span className="ml-1 text-sm text-gray-400">{rating}</span>
        </div>
    );
});

// ─── VIDEO PLAYER MODAL (with Plyr.js) ──────────────────────
const VideoPlayer = ({ movie, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const playerElementRef = useRef(null);
    const videoInfo = useMemo(() => movie ? getUrlInfo(movie.video) : { type: 'invalid', src: '' }, [movie]);

    // Reset loading state and handle body overflow/escape key
    useEffect(() => {
        setIsLoading(true);
        document.body.style.overflow = 'hidden';
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [movie, onClose]);

    // Initialize and destroy Plyr instance
    useEffect(() => {
        let player = null;
        // Ensure Plyr is loaded and we have an element and a valid source
        if (window.Plyr && playerElementRef.current && videoInfo.src) {
            player = new Plyr(playerElementRef.current, {
                autoplay: true,
            });

            // For <video> elements, we use Plyr's events to manage loading state.
            if (videoInfo.type === 'video') {
                player.on('ready', () => setIsLoading(false));
                player.on('error', () => {
                    console.error("Plyr error: Video could not be loaded.");
                    setIsLoading(false); // Hide loader even on error
                });
            }
        }

        // Cleanup: destroy the Plyr instance
        return () => {
            player?.destroy();
        };
    }, [videoInfo]); // Re-run when the video source changes

    if (!movie) return null;

    const commonPlayerProps = {
        ref: playerElementRef,
        className: `absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`,
        allow: "autoplay; encrypted-media; fullscreen",
        allowFullScreen: true,
    };

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black animate-fadeIn"
            onClick={onClose}
        >
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="fixed top-3 right-3 z-[210] w-10 h-10 rounded-full bg-black/70 backdrop-blur text-white flex items-center justify-center hover:bg-red-600 transition-colors border border-white/10 shadow-lg"
                aria-label="Close player"
            >
                <Icon name="x" size={20} />
            </button>

            <div
                className="relative w-full sm:max-w-5xl lg:max-w-6xl flex flex-col items-center justify-center px-0 sm:px-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative w-full bg-neutral-900 overflow-hidden sm:rounded-2xl sm:shadow-2xl sm:border sm:border-white/10 video-player-wrapper"
                >
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 gap-3">
                            <Icon name="loader" size={40} className="text-white" />
                            <span className="text-xs text-gray-400">Loading video…</span>
                        </div>
                    )}

                    {videoInfo.type === 'video' && (
                        <video {...commonPlayerProps} src={videoInfo.src} playsInline controls />
                    )}

                    {videoInfo.type === 'iframe' && (
                        <iframe
                            {...commonPlayerProps}
                            src={videoInfo.src}
                            title={`Player for ${movie.title}`}
                            frameBorder="0"
                            scrolling="no"
                            onLoad={() => setIsLoading(false)}
                        />
                    )}

                    {videoInfo.type === 'invalid' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black text-red-500">Invalid video source.</div>
                    )}
                </div>

                <div className="mt-3 sm:mt-4 px-4 sm:px-0 pb-4 sm:pb-0 w-full flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-2xl font-bold text-white truncate">{movie.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                            {movie.year} &middot; {movie.genre} &middot; {movie.runtime}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
// ─── NAVBAR COMPONENT ───────────────────────────────────────
const Navbar = ({ searchQuery, setSearchQuery, watchlistCount, activeTab, setActiveTab, scrollY }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'movies', label: 'Movies' },
        { id: 'tv', label: 'TV Shows' },
        { id: 'genres', label: 'Genres' },
        { id: 'list', label: 'My List' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-dark-900/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex items-center gap-8">
                        <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-accent-red to-accent-pink rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                <Icon name="film" size={18} className="text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Stream<span className="text-accent-red">Vault</span>
                            </span>
                        </button>

                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map(link => (
                                <button
                                    key={link.id}
                                    onClick={() => setActiveTab(link.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === link.id ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`flex items-center rounded-full transition-all duration-300 ${isSearchFocused ? 'bg-dark-700 ring-2 ring-accent-red/50 w-64' : 'bg-dark-800 w-10 lg:w-48 hover:bg-dark-700'}`}>
                            <div className="flex items-center justify-center w-10 h-10">
                                <Icon name="search" size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search titles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className="hidden lg:block bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full pr-4"
                            />
                        </div>

                        <button onClick={() => setActiveTab('list')} className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                            <Icon name="heart" size={20} className="text-gray-300" />
                            {watchlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-red rounded-full text-xs font-bold flex items-center justify-center text-white">
                                    {watchlistCount}
                                </span>
                            )}
                        </button>

                        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:block">
                            <Icon name="bell" size={20} className="text-gray-300" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-red rounded-full"></span>
                        </button>

                        <button className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center text-sm font-bold hover:ring-2 hover:ring-white/30 transition-all">
                            <Icon name="user" size={18} />
                        </button>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <Icon name={isMenuOpen ? "x" : "menu"} size={22} />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-white/10 animate-fade-in">
                        <div className="flex flex-col gap-1">
                            {navLinks.map(link => (
                                <button
                                    key={link.id}
                                    onClick={() => { setActiveTab(link.id); setIsMenuOpen(false); }}
                                    className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${activeTab === link.id ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 px-4">
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-dark-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-accent-red/50"
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

// ─── HERO SECTION ───────────────────────────────────────────
const Hero = memo(({ movie, onWatchNow, onMoreInfo, onAddWatchlist, isInWatchlist }) => {
    return (
        <div className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden">
            <div className="absolute inset-0">
                <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 hero-gradient"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/40 to-transparent"></div>
            </div>

            <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 lg:pb-24">
                <div className="max-w-2xl animate-slide-up">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-accent-red text-white text-xs font-bold rounded-md uppercase tracking-wider">#1 Trending</span>
                        <span className="px-3 py-1 bg-white/10 backdrop-blur text-white text-xs font-medium rounded-md">{movie.year}</span>
                        <span className="px-3 py-1 bg-white/10 backdrop-blur text-white text-xs font-medium rounded-md">{movie.runtime}</span>
                        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-md">
                            <Icon name="star" size={12} /> {movie.rating}
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight text-glow">
                        {movie.title}
                    </h1>

                    <p className="text-gray-300 text-base lg:text-lg mb-8 line-clamp-3 max-w-xl leading-relaxed">
                        {movie.synopsis}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => onWatchNow(movie)}
                            className="flex items-center gap-2 px-8 py-3.5 bg-white text-dark-900 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
                        >
                            <Icon name="play" size={18} />
                            Watch Now
                        </button>
                        <button
                            onClick={() => onAddWatchlist(movie.id)}
                            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 border ${isInWatchlist ? 'bg-accent-red/20 border-accent-red text-accent-red' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                        >
                            <Icon name={isInWatchlist ? "check" : "plus"} size={18} />
                            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                        </button>
                        <button
                            onClick={() => onMoreInfo(movie)}
                            className="hidden sm:flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all"
                        >
                            <Icon name="info" size={18} />
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

// ─── MOVIE CARD ─────────────────────────────────────────────
const MovieCard = memo(({ movie, onClick, onToggleWatchlist, isInWatchlist }) => {
    return (
        <div
            className="movie-card relative flex-shrink-0 w-[160px] sm:w-[180px] lg:w-[200px] cursor-pointer group"
            onClick={() => onClick(movie)}
        >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-dark-700 shadow-lg">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out"
                    loading="lazy"
                />

                <div className="movie-overlay absolute inset-0 bg-dark-900/80 opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <button className="w-12 h-12 rounded-full bg-accent-red flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75 hover:bg-red-600">
                        <Icon name="play" size={20} className="text-white ml-0.5" />
                    </button>
                    <div className="flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isInWatchlist ? 'bg-accent-red text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                        >
                            <Icon name={isInWatchlist ? "check" : "plus"} size={16} />
                        </button>
                    </div>
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 bg-dark-900/80 backdrop-blur rounded-md text-xs font-bold text-yellow-400 flex items-center gap-0.5">
                    <Icon name="star" size={10} /> {movie.rating}
                </div>
            </div>

            <div className="mt-2.5 px-0.5">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-accent-red transition-colors">{movie.title}</h3>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{movie.year}</span>
                    <span className="text-xs px-2 py-0.5 bg-dark-700 rounded text-gray-400">{movie.genre}</span>
                </div>
            </div>
        </div>
    );
});

// ─── MOVIE ROW ──────────────────────────────────────────────
const MovieRow = memo(({ title, movies, icon, onMovieClick, onToggleWatchlist, watchlist }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (el) el.addEventListener('scroll', checkScroll);
        return () => { if (el) el.removeEventListener('scroll', checkScroll); };
    }, [movies]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction * 600, behavior: 'smooth' });
        }
    };

    if (movies.length === 0) return null;

    return (
        <div className="py-6 lg:py-8">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-5">
                    {icon && <Icon name={icon} size={22} className="text-accent-red" />}
                    <h2 className="text-xl lg:text-2xl font-bold text-white">{title}</h2>
                </div>

                <div className="relative group/row">
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll(-1)}
                            className="absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-dark-900 to-transparent flex items-center justify-start pl-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
                        >
                            <div className="w-10 h-10 rounded-full bg-dark-800/90 backdrop-blur border border-white/10 flex items-center justify-center hover:bg-dark-700 transition-colors">
                                <Icon name="chevronLeft" size={20} />
                            </div>
                        </button>
                    )}

                    {canScrollRight && (
                        <button
                            onClick={() => scroll(1)}
                            className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-dark-900 to-transparent flex items-center justify-end pr-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
                        >
                            <div className="w-10 h-10 rounded-full bg-dark-800/90 backdrop-blur border border-white/10 flex items-center justify-center hover:bg-dark-700 transition-colors">
                                <Icon name="chevronRight" size={20} />
                            </div>
                        </button>
                    )}

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
                    >
                        {movies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={onMovieClick}
                                onToggleWatchlist={onToggleWatchlist}
                                isInWatchlist={watchlist.includes(movie.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

// ─── MOVIE DETAIL MODAL ─────────────────────────────────────
const MovieModal = ({ movie, onClose, onToggleWatchlist, isInWatchlist, onWatchNow, relatedMovies, onMovieClick }) => {
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!movie) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto modal-backdrop" onClick={onClose}>
            <div
                className="relative w-full max-w-full sm:max-w-lg md:max-w-4xl lg:max-w-6xl mx-auto my-4 lg:my-10 bg-dark-800 rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-dark-900/60 backdrop-blur flex items-center justify-center hover:bg-dark-900 transition-colors"
                >
                    <Icon name="x" size={20} />
                </button>

                <div className="relative h-64 sm:h-80 lg:h-96">
                    <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/50 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                        <div className="flex items-end gap-6">
                            <img src={movie.poster} alt={movie.title} className="hidden sm:block w-32 lg:w-40 rounded-lg shadow-2xl border-2 border-white/10" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-accent-red text-white text-xs font-bold rounded">{movie.genre}</span>
                                    <span className="text-gray-400 text-sm">{movie.year}</span>
                                    <span className="text-gray-400 text-sm flex items-center gap-1"><Icon name="clock" size={14} /> {movie.runtime}</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-black text-white mb-2">{movie.title}</h2>
                                <div className="flex items-center gap-4">
                                    <StarRating rating={movie.rating} />
                                    <span className="text-gray-500 text-sm">Directed by {movie.director}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 lg:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        <button
                            onClick={() => onWatchNow(movie)}
                            className="flex items-center gap-2 px-6 py-3 bg-accent-red text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-all transform hover:scale-105"
                        >
                            <Icon name="play" size={18} />
                            Watch Now
                        </button>
                        <button
                            onClick={() => onToggleWatchlist(movie.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 border ${isInWatchlist ? 'bg-accent-red/20 border-accent-red text-accent-red' : 'bg-dark-700 border-dark-600 text-white hover:bg-dark-600'}`}
                        >
                            <Icon name={isInWatchlist ? "check" : "plus"} size={18} />
                            {isInWatchlist ? 'In Watchlist' : 'Watchlist'}
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-dark-700 border border-dark-600 text-white rounded-xl font-bold text-sm hover:bg-dark-600 transition-all">
                            <Icon name="heart" size={18} />
                            Like
                        </button>
                    </div>

                    <div className="flex items-center gap-1 mb-6 border-b border-dark-600">
                        {['overview', 'cast', 'related'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-sm font-semibold capitalize transition-colors border-b-2 ${activeTab === tab ? 'text-accent-red border-accent-red' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'overview' && (
                        <div className="animate-fade-in">
                            <p className="text-gray-300 leading-relaxed text-base mb-6">{movie.synopsis}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <div className="bg-dark-700/50 rounded-xl p-4">
                                    <span className="text-gray-500 text-xs uppercase tracking-wider">Release Year</span>
                                    <p className="text-white font-semibold mt-1">{movie.year}</p>
                                </div>
                                <div className="bg-dark-700/50 rounded-xl p-4">
                                    <span className="text-gray-500 text-xs uppercase tracking-wider">Runtime</span>
                                    <p className="text-white font-semibold mt-1">{movie.runtime}</p>
                                </div>
                                <div className="bg-dark-700/50 rounded-xl p-4">
                                    <span className="text-gray-500 text-xs uppercase tracking-wider">Genre</span>
                                    <p className="text-white font-semibold mt-1">{movie.genre}</p>
                                </div>
                                <div className="bg-dark-700/50 rounded-xl p-4">
                                    <span className="text-gray-500 text-xs uppercase tracking-wider">Director</span>
                                    <p className="text-white font-semibold mt-1">{movie.director}</p>
                                </div>
                                <div className="bg-dark-700/50 rounded-xl p-4">
                                    <span className="text-gray-500 text-xs uppercase tracking-wider">Rating</span>
                                    <p className="text-white font-semibold mt-1 flex items-center gap-1"><Icon name="star" size={14} className="text-yellow-400" /> {movie.rating}/10</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'cast' && (
                        <div className="animate-fade-in">
                            <div className="flex gap-4 overflow-x-auto cast-scroll pb-4">
                                {movie.cast.map((actor, i) => (
                                    <div key={i} className="flex-shrink-0 text-center w-24">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-purple/30 to-accent-pink/30 border-2 border-white/10 flex items-center justify-center mb-2">
                                            <span className="text-lg font-bold text-white/70">{actor.split(' ').map(n => n[0]).join('')}</span>
                                        </div>
                                        <p className="text-xs text-white font-medium truncate">{actor}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'related' && (
                        <div className="animate-fade-in">
                            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                                {relatedMovies.filter(m => m.id !== movie.id).slice(0, 6).map(m => (
                                    <div
                                        key={m.id}
                                        className="flex-shrink-0 w-36 cursor-pointer group"
                                        onClick={() => onMovieClick(m)}
                                    >
                                        <div className="aspect-[2/3] rounded-lg overflow-hidden bg-dark-700 mb-2">
                                            <img src={m.poster} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <p className="text-xs text-white font-medium truncate group-hover:text-accent-red transition-colors">{m.title}</p>
                                        <p className="text-xs text-gray-500">{m.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── GENRE FILTER SECTION ───────────────────────────────────
const GenreFilter = memo(({ activeGenre, setActiveGenre }) => (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
            {genres.map(genre => (
                <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeGenre === genre ? 'bg-accent-red text-white shadow-lg shadow-accent-red/25' : 'bg-dark-800 text-gray-400 hover:bg-dark-700 hover:text-white border border-dark-700'}`}
                >
                    {genre}
                </button>
            ))}
        </div>
    </div>
));

// ─── FOOTER ─────────────────────────────────────────────────
const Footer = () => (
    <footer className="bg-dark-900 border-t border-white/5 mt-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h4 className="text-white font-bold mb-4">StreamVault</h4>
                    <ul className="space-y-2.5">
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Press</a></li>
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Support</h4>
                    <ul className="space-y-2.5">
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Cookie Preferences</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Discover</h4>
                    <ul className="space-y-2.5">
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">New Releases</a></li>
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Top Rated</a></li>
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Coming Soon</a></li>
                        <li><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Collections</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Connect</h4>
                    <div className="flex items-center gap-3">
                        {['Twitter', 'Instagram', 'YouTube', 'Facebook'].map(social => (
                            <a key={social} href="#" className="w-9 h-9 rounded-full bg-dark-800 flex items-center justify-center text-gray-500 hover:bg-accent-red hover:text-white transition-all">
                                <span className="text-xs font-bold">{social[0]}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-accent-red to-accent-pink rounded flex items-center justify-center">
                        <Icon name="film" size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-bold text-white">StreamVault</span>
                </div>
                <p className="text-gray-600 text-xs">© 2024 StreamVault. All rights reserved. This is a demo application.</p>
            </div>
        </div>
    </footer>
);

// ─── MAIN APP ───────────────────────────────────────────────
const App = () => {
    const [scrollY, setScrollY] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('home');
    const [activeGenre, setActiveGenre] = useState('All');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [playingMovie, setPlayingMovie] = useState(null);
    const [watchlist, setWatchlist] = useState(() => {
        try { return JSON.parse(localStorage.getItem('watchlist')) || []; } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleWatchlist = useCallback((id) => {
        setWatchlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    }, []);

    const isInWatchlist = useCallback((id) => watchlist.includes(id), [watchlist]);

    // Memoize filtering logic to prevent expensive recalculations on every render
    const filteredMovies = useMemo(() => {
        return moviesData.filter(m => {
            const searchLower = searchQuery.toLowerCase();
            // Expanded search to include director and cast for a better user experience
            const matchesSearch =
                m.title.toLowerCase().includes(searchLower) ||
                m.genre.toLowerCase().includes(searchLower) ||
                m.director.toLowerCase().includes(searchLower) ||
                m.cast.some(actor => actor.toLowerCase().includes(searchLower));

            // Improved genre matching to handle multiple genres in one string (e.g., "Action / Drama")
            const matchesGenre = activeGenre === 'All' || m.genre.includes(activeGenre);

            // Apply filters based on the active tab's logic
            if (activeTab === 'list') {
                return watchlist.includes(m.id) && (searchQuery ? matchesSearch : true);
            }
            if (activeTab === 'tv') {
                return false; // No TV show data available
            }
            if (activeTab === 'genres') {
                // On the 'Genres' tab, filter by genre, and allow search to refine the results.
                return matchesGenre && (searchQuery ? matchesSearch : true);
            }
            // Default for 'home' and 'movies' tabs
            return matchesSearch && matchesGenre;
        });
    }, [searchQuery, activeGenre, activeTab, watchlist]);

    // Memoize derived lists so they only recalculate when filteredMovies changes
    const trendingMovies = useMemo(() => filteredMovies.filter(m => m.trending), [filteredMovies]);
    const popularMovies = useMemo(() => filteredMovies.filter(m => m.popular), [filteredMovies]);
    const topRatedMovies = useMemo(() => filteredMovies.filter(m => m.topRated), [filteredMovies]);
    const actionMovies = useMemo(() => filteredMovies.filter(m => m.genre.includes('Action')), [filteredMovies]);
    const dramaMovies = useMemo(() => filteredMovies.filter(m => m.genre.includes('Drama')), [filteredMovies]);
    const sciFiMovies = useMemo(() => filteredMovies.filter(m => m.genre.includes('Sci-Fi')), [filteredMovies]);

    const heroMovie = moviesData[0];

    // Memoize handlers to prevent re-rendering of child components that receive them as props
    const handleMovieClick = useCallback((movie) => setSelectedMovie(movie), []);
    const handleWatchNow = useCallback((movie) => setPlayingMovie(movie), []);
    const handleClosePlayer = useCallback(() => setPlayingMovie(null), []);
    const handleCloseModal = useCallback(() => setSelectedMovie(null), []);

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                watchlistCount={watchlist.length}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                scrollY={scrollY}
            />

            {activeTab === 'home' && !searchQuery && (
                <>
                    <Hero
                        movie={heroMovie}
                        onWatchNow={handleWatchNow}
                        onMoreInfo={handleMovieClick}
                        onAddWatchlist={toggleWatchlist}
                        isInWatchlist={isInWatchlist(heroMovie.id)}
                    />

                    <div className="relative -mt-20 z-10">
                        <MovieRow
                            title="Trending Now"
                            movies={trendingMovies}
                            icon="trending"
                            onMovieClick={handleMovieClick}
                            onToggleWatchlist={toggleWatchlist}
                            watchlist={watchlist}
                        />
                    </div>
                </>
            )}

            {(activeTab !== 'home' || searchQuery) && (
                <div className="pt-24 pb-8">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-black text-white mb-2">
                            {activeTab === 'list' ? 'My Watchlist' : activeTab === 'genres' ? 'Browse by Genre' : searchQuery ? `Results for "${searchQuery}"` : 'All Movies'}
                        </h1>
                        <p className="text-gray-500 mb-6">
                            {filteredMovies.length} {filteredMovies.length === 1 ? 'title' : 'titles'} found
                        </p>
                    </div>
                </div>
            )}

            {(activeTab === 'movies' || activeTab === 'genres' || searchQuery) && (
                <GenreFilter activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
            )}

            {activeTab === 'list' && filteredMovies.length === 0 && (
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-dark-800 flex items-center justify-center">
                        <Icon name="heart" size={32} className="text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h3>
                    <p className="text-gray-500 mb-6">Start adding movies you want to watch later.</p>
                    <button
                        onClick={() => setActiveTab('home')}
                        className="px-6 py-3 bg-accent-red text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-all"
                    >
                        Discover Movies
                    </button>
                </div>
            )}

            {(activeTab !== 'home' || searchQuery) && filteredMovies.length > 0 && (
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                        {filteredMovies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={handleMovieClick}
                                onToggleWatchlist={toggleWatchlist}
                                isInWatchlist={watchlist.includes(movie.id)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'home' && !searchQuery && (
                <>
                    <MovieRow
                        title="Popular on StreamVault"
                        movies={popularMovies}
                        icon="film"
                        onMovieClick={handleMovieClick}
                        onToggleWatchlist={toggleWatchlist}
                        watchlist={watchlist}
                    />
                    <MovieRow
                        title="Top Rated"
                        movies={topRatedMovies}
                        icon="award"
                        onMovieClick={handleMovieClick}
                        onToggleWatchlist={toggleWatchlist}
                        watchlist={watchlist}
                    />
                    <MovieRow
                        title="Action & Adventure"
                        movies={actionMovies}
                        onMovieClick={handleMovieClick}
                        onToggleWatchlist={toggleWatchlist}
                        watchlist={watchlist}
                    />
                    <MovieRow
                        title="Drama"
                        movies={dramaMovies}
                        onMovieClick={handleMovieClick}
                        onToggleWatchlist={toggleWatchlist}
                        watchlist={watchlist}
                    />
                    <MovieRow
                        title="Sci-Fi"
                        movies={sciFiMovies}
                        onMovieClick={handleMovieClick}
                        onToggleWatchlist={toggleWatchlist}
                        watchlist={watchlist}
                    />
                </>
            )}

            <Footer />

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={handleCloseModal}
                    onToggleWatchlist={toggleWatchlist}
                    isInWatchlist={isInWatchlist(selectedMovie.id)}
                    onWatchNow={handleWatchNow}
                    relatedMovies={moviesData.filter(m => m.genre === selectedMovie.genre || m.category === selectedMovie.category)}
                    onMovieClick={handleMovieClick}
                />
            )}

            {playingMovie && (
                <VideoPlayer
                    movie={playingMovie}
                    onClose={handleClosePlayer}
                />
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
