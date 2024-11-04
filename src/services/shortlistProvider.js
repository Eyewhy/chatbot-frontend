import { useContext, createContext, useState } from "react";

const ShortlistContext = createContext();

const ShortlistProvider = ({ children }) => {
    const [shortlist, _setShortlist] = useState([]);

    function getShortlist() {
        return shortlist;
    }

    function setShortlist(list) {
        _setShortlist(list);
    }

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
        let newShortlist = [item, ...shortlist];
        setShortlist(newShortlist);
        return true;
    }

    function removeFromShortlist(item) {
        setShortlist(shortlist.filter(shortlistItem => shortlistItem['id'] !== item['id']));
    }

    return (
        <ShortlistContext.Provider value={{ getShortlist, setShortlist, inShortlist, addToShortlist, removeFromShortlist }}>
            {children}
        </ShortlistContext.Provider>
    );

};

/**
 * methods: getShortlist, setShortlist, inShortlist addToShortlist, removeFromShortlist
 */
const useShortlist = () => { return useContext(ShortlistContext); };

export default ShortlistProvider;
export { useShortlist };