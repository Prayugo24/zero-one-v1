export interface News {
    id: number
    title: string
    content: string
    status: string
}

export interface Topics {
    id: number
    name : string
}

export interface NewsTopics {
    news_id: number
    topics_id: number
}

export interface NewsRequest {
    title: string
    content: string
    status: string
}