import { FormDataType } from "features/login/Login"
import { instance } from "api/common-api"
import { ResponseType } from "common/types/common-types"

export const authAPI = {
  me() {
    return instance.get<ResponseType<{ userId: number }>>(`auth/me`).then((res) => {
      return res.data
    })
  },
  logIn(data: FormDataType) {
    return instance.post<ResponseType<{ userId: number }>>(`auth/login`, data).then((res) => {
      return res.data
    })
  },
  logOut() {
    return instance.delete<ResponseType>(`auth/login`).then((res) => {
      return res.data
    })
  },
}
