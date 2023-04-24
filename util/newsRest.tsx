import axios from 'axios'

const getCoinTelegraphNews = async () => {
  try {
    const response = await axios.get(
      'https://crypto-news16.p.rapidapi.com/news/cointelegraph',
      {
        headers: {
          'X-RapidAPI-Key':
            '71c7cffc00msh626cea577b58fabp161ce3jsncef1a0ff73e5',
          'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com',
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getCoinDeskNews = async () => {
  try {
    const response = await axios.get(
      'https://crypto-news16.p.rapidapi.com/news/top/20',
      {
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key':
            '71c7cffc00msh626cea577b58fabp161ce3jsncef1a0ff73e5',
          'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com',
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export { getCoinTelegraphNews, getCoinDeskNews }
