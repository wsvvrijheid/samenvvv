declare interface TwitterTrend {
  name: string
  url: string
  promoted_content: string | null
  query: string
  tweet_volume: number | null
}

declare type RawTrend = {
  updatedAt: string
  createdAt: string
  en: TwitterTrend[] | null
  nl: TwitterTrend[] | null
  tr: TwitterTrend[] | null
}

declare type Trend = {
  id: number
  updatedAt: string
  createdAt: string
  en: TwitterTrend[] | null
  nl: TwitterTrend[] | null
  tr: TwitterTrend[] | null
}
