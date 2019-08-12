export type Stock = {
    id: number
    symbol: string
    percent: number
}
export type Portfolio = Stock[]

export type History = {
    day: string
    price: number
}[]
