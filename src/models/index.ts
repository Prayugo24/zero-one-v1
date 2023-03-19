export interface News {
    id: number
    title: string
    content: string
    status: string
    news_topics?: NewsTopics[] | null
    topics?: Topics[] | null
}

export interface Topics {
    id: number
    name : string
}

export interface NewsTopics {
    id: number
    news_id: number
    topics_id: number
}

export interface NewsQueryParams {
    start_index?: number;
    limit?: number;
    status?: string;
    topic?: string;
}

export interface TopicQueryParams {
    start_index?: number;
    limit?: number;
}