export type ResponseType<T = {}> = {
  fieldsErrors: FieldErrorType[]
  messages: string[]
  resultCode: number
  data: T
}

type FieldErrorType = {
  error: string
  field: string
}
