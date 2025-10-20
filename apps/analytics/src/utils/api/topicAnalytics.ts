import axiosPrivate from '../../lib/axios'
import { topicAnalyticsData} from 'types'
export async function getTopicAnalytics(topic:string):Promise<topicAnalyticsData> {
    const response=await axiosPrivate.get(`/api/analytics/topic/${encodeURIComponent(topic)}`)
    return response.data as topicAnalyticsData
}