import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import useQuery from '../../hooks/useQuery'

function ResetPassword() {
  const navigate = useNavigate()
  const query = useQuery()
  const { resetPassword } = useAuth()

  const handleRedirect = () => {
    return navigate('/login', { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const password = e.target.elements.password.value

    if (!password) {
      toast.error('Password is equired!')
      return
    }
    await resetPassword(query.get('oobCode'), password)
    handleRedirect()
  }
  return (
    <>
      <Container>
        <ResetPasswordContainer>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Enter you new password</FormLabel>
              <FormInput
                type="password"
                id="password"
                placeholder="*****"
                required
              />
            </FormGroup>
            <FormButton type="submit">Reset</FormButton>
          </Form>
        </ResetPasswordContainer>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ResetPasswordContainer = styled.div`
  width: 40%;
  padding: 4rem;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`

const Form = styled.form``

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const FormLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
  padding-bottom: 1rem;
  letter-spacing: 1px;
`

const FormInput = styled.input`
  height: 3rem;
  padding: 0 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  border: 1.5px solid black;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border: 1.5px solid green;
  }
`

const FormButton = styled.button`
  border: none;
  background-color: blue;
  padding: 1rem 2rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 0.5rem;
  cursor: pointer;
  &:active {
    outline: none;
    transform: translateY(1px);
  }
`

export default ResetPassword
