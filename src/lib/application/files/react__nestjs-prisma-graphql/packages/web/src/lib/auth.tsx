import { initReactQueryAuth } from 'react-query-auth'
import { Spinner } from 'src/components/Elements'
import type {
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser
} from 'src/features/auth'
import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword
} from 'src/features/auth'
import storage from 'src/utils/storage'

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data
  storage.setToken(jwt)
  return user
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser()
    return data
  }
  return null
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data)
  const user = await handleUserResponse(response)
  return user
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data)
  const user = await handleUserResponse(response)
  return user
}

async function logoutFn() {
  storage.clearToken()
  window.location.assign(window.location.origin as unknown as string)
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    )
  }
}

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig)
