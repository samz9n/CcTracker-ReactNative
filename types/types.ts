export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  price: number
  priceChange: number
}

export interface News {
  title: string
  description: string
  url: string
  date: string
}
