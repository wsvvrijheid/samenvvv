declare interface Tweet {
  id: number
  user: {
    name: string
    username: string
    profile: string
  }
  image?: string
  videos?: {
    bitrate: number
    content_type: string
    url: string
  }[]
  text: string
  likes: number
  retweets: number
}
