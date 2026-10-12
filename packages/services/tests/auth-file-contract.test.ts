import { afterEach, describe, expect, it, vi } from "vitest"

import { meApi } from "../src/api/auth"
import { uploadAvatarToFileServiceApi } from "../src/api/file"

afterEach(() => vi.unstubAllGlobals())

function respond(data: unknown) {
  return new Response(JSON.stringify({ code: 0, data, message: "ok" }))
}

describe("Auth and File Service contracts", () => {
  it("resolves an avatar object reference with the authenticated file access API", async () => {
    vi.stubGlobal("localStorage", { getItem: () => "access-token" })
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(respond({
        id: "user-1", username: "alice", avatar: { object_key: "avatars/user-1" },
      }))
      .mockResolvedValueOnce(respond({
        bucket_id: "avatar", download_url: "https://storage.example/avatar?signature=abc",
      }))
    vi.stubGlobal("fetch", fetchMock)

    expect((await meApi()).avatar).toBe("https://storage.example/avatar?signature=abc")
    expect(fetchMock.mock.calls[1][0]).toBe("/file/sign/access?bucket_id=avatar&key=avatars%2Fuser-1")
    expect(fetchMock.mock.calls[1][1].headers.Authorization).toBe("Bearer access-token")
  })

  it("uploads avatar bytes with their content type and retains the server object reference", async () => {
    vi.stubGlobal("localStorage", { getItem: () => "access-token" })
    const result = {
      bucket_id: "avatar", key: "avatars/user-1", url: "https://storage.example/avatar",
      sha256: "hash", size: 4, already_uploaded: false,
    }
    const fetchMock = vi.fn().mockResolvedValue(respond(result))
    vi.stubGlobal("fetch", fetchMock)
    const file = new File(["data"], "avatar.png", { type: "image/png" })

    expect(await uploadAvatarToFileServiceApi(file)).toEqual(result)
    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toBe("/file/sign/upload/avatar?ext=png")
    expect(options.method).toBe("PUT")
    expect(options.body).toBe(file)
    expect(options.headers["Content-Type"]).toBe("image/png")
    expect(options.headers.Authorization).toBe("Bearer access-token")
  })
})
