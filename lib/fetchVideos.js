import youtube from '../api/youtube';
import { basicAPIOption, paginationOption } from '../api/youtubeAPIOption';

export const fetchVideos = async () => {
  return await youtube.get('/videos', basicAPIOption)
    .then(data => {
      return ({
        videos: data.data.items,
        nextPageToken: data.data.nextPageToken
      })
    })
    .catch(e => e)
}

export const handlePagination = (pageToken) => {
  return youtube.get('/videos', paginationOption({ pageToken }))
    .then(data => {
      return ({
        videos: data.data.items,
        nextPageToken: data.data.nextPageToken
      })
    })
    .catch(e => e)
}