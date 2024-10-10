import { Box, FormControl, Link as CircleLink } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoginDataType } from '../../types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '../../validators/validator'

import SolidButton from '../buttons/SolidButton'
import ValidatedInput from './ValidatedInput'


interface LoginInputProps {
    onLogin: (data: LoginDataType) => void
}

function LoginInput(props: LoginInputProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginDataType>({
        resolver: zodResolver(LoginSchema),
    })

    return (
        <FormControl display={'flex'} flexDirection={'column'} gap={'.5rem'}>
            <ValidatedInput<LoginDataType>
                autoFocus
                type={'text'}
                placeholder={'Username'}
                name={'username'}
                register={register}
                error={errors.username}
            />
            <ValidatedInput<LoginDataType>
                type={'password'}
                placeholder={'Password'}
                name={'password'}
                register={register}
                error={errors.password}
            />

            <CircleLink as={ReactLink} to={'/forgot'} ml={'auto'}>
                <h2>Forgot password?</h2>
            </CircleLink>

            <Box mt={'.5rem'}>
                <SolidButton
                    text={'Login'}
                    onClick={handleSubmit((data) => {
                        props.onLogin(data)
                    })}
                />
            </Box>
        </FormControl>
    )
}

export default LoginInput
