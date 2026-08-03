const { useState, useEffect, useRef, useCallback } = React;
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
        "video": "https://drive.google.com/file/d/1morswxZ8a4IecXBSxaPWQnGkDpe6TYtF/preview"
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
        "video": "https://drive.google.com/file/d/1YNeo6OWd4quqVZibXDWiZo1gv4CxxotE/preview"
    },
    {
        "id": 5,
        "title": "Killers of the Flower Moon",
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
        "video": "https://drive.google.com/file/d/1kQYkGFwa11AvOYYTGxmWYNPG-taTnLvG/preview"
    }

];

const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Horror", "Comedy", "Romance", "Crime"];

// ─── HELPER FOR DRIVE LINKS ─────────────────────────────────
const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
        // The `?e=view` parameter can sometimes provide a better preview experience
        if (url.includes('/preview')) return url.includes('?e=view') ? url : `${url}?e=view`;
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/file/d/${match[1]}/preview?e=view`;
        }
    }
    return url;
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
    };
    return icons[name] || null;
};

// ─── STAR RATING COMPONENT ──────────────────────────────────
const StarRating = ({ rating }) => {
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
};

// ─── VIDEO PLAYER MODAL ─────────────────────────────────────
const VideoPlayer = ({ movie, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    if (!movie) return null;
    const embedSrc = getEmbedUrl(movie.video);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4 animate-fadeIn" onClick={onClose}>
            <div className="relative w-full max-w-5xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="relative w-full aspect-video bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/20 min-h-[200px]">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-800/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors border border-white/10 z-20"
                    >
                        <Icon name="x" size={20} />
                    </button>

                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                            <Icon name="loader" size={48} className="text-white" />
                        </div>
                    )}

                    <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
                        <iframe
                            src={embedSrc}
                            title={`Player for ${movie.title}`}
                            frameBorder="0"
                            scrolling="no"
                            className={`absolute transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'
                                }`}
                            style={{
                                // ពង្រីកទំហំ iframe ឱ្យធំជាង Container
                                width: '130%',
                                height: '140%',
                                // តម្រៀបឱ្យវានៅចំកណ្ដាល ដើម្បីកាត់គែមជុំវិញ (Top/Bottom/Left/Right)
                                top: '-20%',
                                left: '-15%',
                                border: 'none',
                            }}
                            allow="autoplay; encrypted-media; fullscreen"
                            allowFullScreen={true}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setIsLoading(false)}
                            webkitallowfullscreen="true"
                            mozallowfullscreen="true"
                        ></iframe>
                    </div>

                </div>

                <div className="mt-4 flex items-center justify-between text-white px-2 sm:px-0">
                    <div>
                        <h3 className="text-2xl font-bold">{movie.title}</h3>
                        <p className="text-sm text-gray-400">{movie.year} · {movie.genre} · {movie.runtime}</p>
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
const Hero = ({ movie, onWatchNow, onMoreInfo, onAddWatchlist, isInWatchlist }) => {
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
};

// ─── MOVIE CARD ─────────────────────────────────────────────
const MovieCard = ({ movie, onClick, onToggleWatchlist, isInWatchlist }) => {
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
};

// ─── MOVIE ROW ──────────────────────────────────────────────
const MovieRow = ({ title, movies, icon, onMovieClick, onToggleWatchlist, watchlist }) => {
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
};

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
                className="relative w-full max-w-4xl mx-auto my-4 lg:my-10 bg-dark-800 rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
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
const GenreFilter = ({ activeGenre, setActiveGenre }) => (
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
);

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

    const filteredMovies = moviesData.filter(m => {
        const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.genre.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = activeGenre === 'All' || m.genre === activeGenre || m.category === activeGenre;

        if (activeTab === 'list') return isInWatchlist(m.id) && matchesSearch;
        if (activeTab === 'movies') return matchesSearch && matchesGenre;
        if (activeTab === 'tv') return false;
        if (activeTab === 'genres') return matchesGenre;
        return matchesSearch && matchesGenre;
    });

    const trendingMovies = filteredMovies.filter(m => m.trending);
    const popularMovies = filteredMovies.filter(m => m.popular);
    const topRatedMovies = filteredMovies.filter(m => m.topRated);
    const actionMovies = filteredMovies.filter(m => m.category === 'Action' || m.genre === 'Action');
    const dramaMovies = filteredMovies.filter(m => m.category === 'Drama' || m.genre === 'Drama');
    const sciFiMovies = filteredMovies.filter(m => m.category === 'Sci-Fi' || m.genre === 'Sci-Fi');

    const heroMovie = moviesData[0];

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleWatchNow = (movie) => {
        setPlayingMovie(movie);
    };

    const handleClosePlayer = () => {
        setPlayingMovie(null);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

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
