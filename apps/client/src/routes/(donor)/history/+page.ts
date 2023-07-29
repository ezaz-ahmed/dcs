import { donationList } from '$lib/api'

export const load = async ({ depends }) => {
  depends("history:invalidate")

  let page = 1,
    limit = 5

  const { result } = await donationList(page, limit)

  return {
    history: result?.items
  }
}