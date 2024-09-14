import { format } from 'timeago.js'

async function formatTime (itemListPromise ){
    return itemListPromise.then((itemList) => {
        itemList.forEach(( item ) => {
            timeAgo(item);
        })
        return itemList
    })
}

function timeAgo (item) {item['time'] = format(new Date(item['time']));};

export default formatTime
export { timeAgo }