import { format } from 'timeago.js'

async function formatTime (itemListPromise ){
    return itemListPromise.then((itemList) => {
        if (itemList === 'error') return 'error';
        itemList.forEach(( item ) => {
            timeAgo(item, 'time');
        })
        return itemList
    })
}

function formatTimeSync (itemList, attr='time'){
    itemList.forEach(( item ) => {
        timeAgo(item, attr);
    })
}

function timeAgo (item, attr) {item[attr] = format(new Date(item[attr]));};

export default formatTime
export { timeAgo, formatTimeSync }