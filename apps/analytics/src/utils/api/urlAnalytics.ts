import axiosPrivate from '../../lib/axios'
import {individualUrlAnalyticsData} from 'types'
export async function getUrlAnalytics(urlId:string):Promise<individualUrlAnalyticsData> {
    const response=await axiosPrivate.get(`/api/analytics/url/${encodeURIComponent(urlId)}`)
    return response.data as individualUrlAnalyticsData
}