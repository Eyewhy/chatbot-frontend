import { useContext, createContext, useState, useEffect } from "react";

const ShortlistContext = createContext();

const ShortlistProvider = ({ children }) => {
    const [shortlist, _setShortlist] = useState(() => {
        try {
            const raw = localStorage.getItem('shortlist');
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            // ensure notified flag exists
            return Array.isArray(parsed) ? parsed.map(item => Object.assign({}, item, { notified: item.notified === true })) : [];
        } catch (e) {
            return [];
        }
    });

    function setShortlist(list) {
        _setShortlist(list);
    }

    // persist shortlist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('shortlist', JSON.stringify(shortlist));
        } catch (e) {
            // ignore storage errors
        }
    }, [shortlist]);

    function inShortlist(item) {
        for (let i=0;i<shortlist.length;i++) {
            if (shortlist[i]['id'] === item['id']) return i;
        }
        return -1;
    }

    /**
     * 
     * @param {JSON} item 
     * @returns true if added
     */
    function addToShortlist(item) {
        if (inShortlist(item) !== -1) return false;
        // ensure notified flag exists on added item
        const itemWithFlag = Object.assign({}, item, { notified: item.notified === true });
        let newShortlist = [itemWithFlag, ...shortlist];
        setShortlist(newShortlist);
        return true;
    }

    function removeFromShortlist(item) {
        setShortlist(shortlist.filter(shortlistItem => shortlistItem['id'] !== item['id']));
    }

    /**
     * Mark helpers as notified by id array
     * @param {Array<number>} ids
     */
    function markNotified(ids) {
        if (!Array.isArray(ids) || ids.length === 0) return;
        const newList = shortlist.map(s => {
            if (ids.includes(s.id)) return Object.assign({}, s, { notified: true });
            return s;
        });
        setShortlist(newList);
    }

    return (
        <ShortlistContext.Provider value={{ shortlist, setShortlist, inShortlist, addToShortlist, removeFromShortlist, markNotified }}>
            {children}
        </ShortlistContext.Provider>
    );

};

/**
 * methods: .shortlist, setShortlist, inShortlist addToShortlist, removeFromShortlist
 */
const useShortlist = () => { return useContext(ShortlistContext); };

export default ShortlistProvider;
export { useShortlist };