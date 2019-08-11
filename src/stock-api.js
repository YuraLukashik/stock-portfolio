import stockdata from "stock-data.js";
export async function loadSymbolHistory(symbol) {
    const data = await stockdata.historical({
        symbol,
        API_TOKEN: 'qmso5iE3ybaRQKMvlWCrh5vNePWKYG4tetzlkXVAiyxu8wX0ITmXv56XQuB0',
        options: {
            date_from: '2016-12-20',
            date_to: '2019-07-19'
        }
    });
    const keys = Object.keys(data.history).sort();
    return keys.map(key => ({
        day: key,
        price: parseFloat(data.history[key].open)
    }));
}
export function scale(history, factor) {
    return history.map(item => {
        item.price *= factor;
        return item;
    });
}
export function firstPrice(history) {
    return history[0].price;
}
