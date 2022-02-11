import {ipcRenderer} from "electron"
import {
  serializeState,
  toAccessTokenKey,
  toRefreshTokenKey
} from "../../auth0/utils"
import {BrimLake} from "../../brim"
import ipc from "../../electron/ipc"
import invoke from "../../electron/ipc/invoke"
import {getAuth0} from "./getAuth0"

export const login = (ws: BrimLake, abortSignal: AbortSignal) => (
  dispatch
): Promise<string> => {
  const client = dispatch(getAuth0(ws))

  const handleAuth = (resolve, reject) => async (event, args) => {
    const {workspaceId, code, error, errorDesc} = args
    if (error) {
      reject(new Error(`${error}, ${errorDesc}`))
      return
    }
    if (!code) {
      return reject(new Error("No code returned from login"))
    }
    try {
      const {accessToken, refreshToken} = await client.exchangeCode(code)

      // store both tokens in os default keychain
      invoke(ipc.secrets.setKey(toAccessTokenKey(workspaceId), accessToken))
      invoke(ipc.secrets.setKey(toRefreshTokenKey(workspaceId), refreshToken))

      resolve(accessToken)
    } catch (e) {
      console.error("error exchanging code for tokens: ", e)
      reject(e)
    }
  }

  client.openLoginUrl(
    serializeState({workspaceId: ws.id, windowId: global.windowId})
  )
  return new Promise<string | null>((res, rej) => {
    const handleAuthCb = handleAuth(res, rej)
    ipcRenderer.once("windows:authCallback", handleAuthCb)
    abortSignal.addEventListener("abort", () => {
      ipcRenderer.removeListener("windows:authCallback", handleAuthCb)
      res(null)
    })
  })
}
