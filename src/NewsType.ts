export interface NewsType {
  abstract: string
  pub_date: string
  headline: Headline
  _id: string
}

interface Headline {
  main: string
}
