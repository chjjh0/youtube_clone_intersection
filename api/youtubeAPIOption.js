import dotenv from 'dotenv'
dotenv.config()

export const basicAPIOption = {
  params: {
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 10,
    key: process.env.REACT_APP_API_KEY
  }
}

export const paginationOption = ({ pageToken }) => ({
  params: {
    ...basicAPIOption.params,
    pageToken
  }
})

export const channelsOption = (id) => ({
  params: {
    part: 'snippet',
    id,
    key: process.env.REACT_APP_API_KEY
  }
})