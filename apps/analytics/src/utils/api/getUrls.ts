import axiosPrivate from '../../lib/axios'
import { urlsData } from 'types'
export async function getUrls():Promise<urlsData> {
    const response=await axiosPrivate.get(`/api/analytics/getUrls`)
    return response.data as urlsData
}
