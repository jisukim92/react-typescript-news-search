export interface NewsType {
  abstract: string
  pub_date: string
  headline: Headline
  _id: string
  web_url: string
}

interface Headline {
  main: string
}
