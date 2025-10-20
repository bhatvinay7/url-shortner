import axiosPrivate from '../../lib/axios'
import { overallAnalyticsData} from 'types'
export async function getOverallAnalytics():Promise<overallAnalyticsData> {
    const response=await axiosPrivate.get(`/api/analytics/overallAnalytics`)
    return response.data as overallAnalyticsData
}