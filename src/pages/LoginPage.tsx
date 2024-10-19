import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { Container, Flex, Text, Image, Link as CircleLink } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { LoginDataType } from '@/types/types'
import { setLoggedUser } from '@/features/auth/authSlice'
import { useDispatch } from 'react-redux'

import useCircleToast from '@/hooks/useCircleToast'
import LoginInput from '@/components/inputs/LoginInput'
import fakeData from '@/data/user.json' // Adjust the path as necessary

function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const createToast = useCircleToast()

    async function onLogin(data: LoginDataType): Promise<void> {
        const watchedPromise = loginHandler(data)
        createToast(watchedPromise, {
            title: 'Login',
            message: 'Welcome back!',
        })
    }

    async function loginHandler(data: LoginDataType) {
        // Find user in fake data
        const user = fakeData.fakeUsers.find(
            (user) => user.username === data.username
        );

        if (user) {
            dispatch(setLoggedUser(user)); // Dispatch the user info

            navigate('/'); // Navigate to home after successful login
        } else {
            // Handle login failure
            return Promise.reject("Invalid username or password");
        }
    }

    return (
        <Container height={'100vh'} width={'400px'} alignContent={"center"}>
            <Flex direction={'column'} gap={'1rem'}>
                <Image src={'/circle.png'} width={'35%'} mt={'3rem'} />
                <Text fontSize={fontSizing.bigger} fontWeight={'600'} mt={'-.75rem'}>
                    Login to circle
                </Text>
                <LoginInput onLogin={onLogin} />
                <Text>
                    Don't have an account?
                    <CircleLink
                        as={ReactLink}
                        to={'/register'}
                        color={'circle.accent'}
                        ml={'.25rem'}
                    >
                        Create one.
                    </CircleLink>
                </Text>
            </Flex>
        </Container>
    )
}

export default LoginPage
