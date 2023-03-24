import { createContext, ReactNode, useState } from 'react';

export const WatchlistContext = createContext({
    watchlist: Array<any>,
    addToWatchlist: (coin: any) => {},
    removeFromWatchlist: (coin: any) => {},
    isInWatchlist: (coin: any) => {}
});

interface WatchlistContextProviderProps {
	children: ReactNode;
}

export default function WatchlistContextProvider({ children }: WatchlistContextProviderProps) {
    const [ watchlist, setWatchlist ] = useState<object[]>([]);

    function addToWatchlist(coin: any) {
        setWatchlist((prevWatchlist) => {
            return [ ...prevWatchlist, coin ];
        });
    }

    function removeFromWatchlist(coin: any) {
        setWatchlist((prevWatchlist) => {
            return prevWatchlist.filter((item: any) => item.id !== coin.id);
        });
    }

    function isInWatchlist(coin: any) {
        return watchlist.some((item: any) => item.id === coin.id);
    }

    const value = {
        watchlist: watchlist,
        addToWatchlist: addToWatchlist,
        removeFromWatchlist: removeFromWatchlist,
        isInWatchlist: isInWatchlist
    };

    return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}