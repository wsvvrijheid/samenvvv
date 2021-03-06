declare interface ITrend {
  name: string
  url: string
  promoted_content: string | null
  query: string
  tweet_volume: number | null
}

declare interface ITrendsData {
  tr: ITrend[] | null
  en: ITrend[] | null
  nl: ITrend[] | null
  updated_at: string
}
