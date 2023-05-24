import React from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { FormikHelpers, useFormik } from "formik"
import { useAppSelector } from "app/store"
import { Navigate } from "react-router-dom"
import { useActions } from "common/hooks"
import { selectIsLoggedIn } from "features/login/auth-selectors"
import s from "./style.module.css"
import { ResponseType } from "common/types"
import { authThunks } from "features/login/auth-reducer"

export const Login: React.FC = () => {
  const { logIn } = useActions(authThunks)

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Required"
      } else if (values.password.length < 3) {
        errors.password = "Must be 3 characters or more"
      }

      return errors
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers: FormikHelpers<FormDataType>) => {
      logIn(values)
        .unwrap()
        .catch((reason: ResponseType) => {
          const { fieldsErrors } = reason
          if (fieldsErrors) {
            fieldsErrors.forEach((fieldError) => {
              formikHelpers.setFieldError(fieldError.field, fieldError.error)
            })
          }
        })
    },
  })

  if (isLoggedIn) {
    return <Navigate to={"/todolist-list"} />
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{" "}
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              <Button
                type={"submit"}
                variant={"contained"}
                disabled={!(formik.isValid && formik.dirty)}
                color={"primary"}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
//types
export type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
}

type FormikErrorType = Partial<Omit<FormDataType, "captcha">>
