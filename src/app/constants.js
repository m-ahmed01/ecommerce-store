

export const ITEMS_PER_PAGE =21;

export function discountedPrice(item){
    return Math.round(item.price * (1 - item.discountPercentage / 100)); 
}


// npx json-server --watch data.json --port 8080  
// npm start