import { Link as ReactLink } from 'react-router-dom'
import { Container, Flex, Text, Image, Link as CircleLink } from '@chakra-ui/react'

import { fontSizing } from '../styles/style'
import LoginInput from '../components/inputs/LoginInput'


function LoginPage() {

    async function onLogin(){
        ( {
            title: 'Login',
            message: 'Welcome back!',
        })
    }


    return (
        <Container height={'100vh'} width={'400px'} alignContent={"center"}>
            <Flex direction={'column'} gap={'1rem'}>
                <Image src={'/circle.png'} width={'35%'} mt={'3rem'} />
                <Text fontSize={fontSizing.bigger} fontWeight={'600'} mt={'-.75rem'}>
                    <h2>Login to circle</h2>
                </Text>
                <LoginInput onLogin={onLogin} />
                <Text>
                   <p> Don't have an account?
                    <CircleLink
                        as={ReactLink}
                        to={'/register'}
                        color={'circle.accent'}
                        ml={'.25rem'}
                    >
                        Create one.
                    </CircleLink>
                    </p>
                </Text>
            </Flex>
        </Container>
    )
}

export default LoginPage