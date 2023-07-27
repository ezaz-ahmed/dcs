import { getNewAccessToken } from "$lib/api"
import { isAuthenticated, token } from "$lib/stores/TokenStore"

export const load = async () => {
  const access_token = await getNewAccessToken()

  if (access_token) {
    token.update(() => access_token)
    isAuthenticated.update(() => true)
  }
}