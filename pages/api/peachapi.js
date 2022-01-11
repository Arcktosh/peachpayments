import { create } from "apisauce"

const api = create({
  baseURL:
    process.env.NEXT_PUBLIC_PEACH_PAYMENTS_URL || "https://test.oppwa.com/v1",
})

api.addRequestTransform((request) => {
  // TODO: Dynamize with your api
  const jwtToken = process.env.NEXT_PUBLIC_PEACH_TOKEN
  request.headers.Authorization = `Bearer ${jwtToken}`
})

export default api
