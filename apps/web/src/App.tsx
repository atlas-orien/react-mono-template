import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RouterProvider, createBrowserRouter, Navigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { GlobalRequestError, PageLoading } from "@workspace/app-components"
import { loginSuccess } from "@/store/authSlice"
import type { RootState } from "@/store"
import { publicRoutes } from "@/routes/publicRoutes"
import { protectedRoutes } from "@/routes/protectedRoutes"
import { ToastProvider } from "@workspace/ui-components/stable/toast"
import { meApi } from "./api"
import { toRequestError } from "@workspace/services/errors/request-error"
import { clearRequestErrorMessage } from "./store/requestErrorSlice"

export default function App() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin)
  const requestErrorMessage = useSelector(
    (state: RootState) => state.requestError.message
  )
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")

  const restoreQuery = useQuery({
    queryKey: ["auth", "restore", token],
    enabled: Boolean(token),
    retry: false,
    queryFn: async () => meApi(),
  })

  useEffect(() => {
    if (!token || !restoreQuery.data) return
    dispatch(loginSuccess({ token, user: restoreQuery.data }))
  }, [dispatch, restoreQuery.data, token])

  useEffect(() => {
    if (!restoreQuery.isError) return
    console.warn(
      "🔁 Failed to restore session:",
      toRequestError(restoreQuery.error)
    )
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
  }, [restoreQuery.error, restoreQuery.isError])

  const isRestored = !token || restoreQuery.status !== "pending"

  const router = useMemo(() => {
    if (!isRestored) return null

    return createBrowserRouter([
      isLogin ? protectedRoutes : publicRoutes,
      {
        path: "*",
        element: <Navigate to={isLogin ? "/" : "/login"} replace />,
      },
    ])
  }, [isLogin, isRestored])

  if (!router) return <PageLoading fullscreen />

  return (
    <>
      <GlobalRequestError
        message={requestErrorMessage}
        closeLabel="关闭错误提示"
        onClose={() => dispatch(clearRequestErrorMessage())}
      />
      <RouterProvider router={router} />
      <ToastProvider position="top-center" />
    </>
  )
}
