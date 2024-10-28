import { Text, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { fontSizing } from '@/styles/style'

import GhostButton from '@/components/buttons/GhostButton'

interface NavigationItemProps {
    onLogout?: () => void
    icon: ReactNode
    text: string | any
    avatar?: number | string | any
}

function NavigationItem({ icon,avatar, text, onLogout }: NavigationItemProps) {
    return (
        <GhostButton onClick={onLogout}>
            <Flex
                gap={'1rem'}
                alignItems={'center'}
                fontSize={fontSizing.bigger}
                color={'circle.font'}
            >
                {avatar}
                {icon}
                <Text
                    as={'h1'}
                    fontSize={fontSizing.big}
                    fontWeight={'600'}
                    display={'flex'}
                    alignItems={'center'}
                    gap={'1rem'}
                    color={'circle.font'}
                    >
                    {text}

                </Text>
            </Flex>
        </GhostButton>
    )


}
export function LogoutItem({ icon,avatar, text, onLogout }: NavigationItemProps) {
    return (
        <GhostButton onClick={onLogout}>
            <Flex
                gap={'1rem'}
                alignItems={'center'}
                fontSize={fontSizing.biggest}
                color={'circle.font'}
                >
                {icon}
                <Text
                    as={'h1'}
                    fontSize={fontSizing.big}
                    fontWeight={'700'}
                    display={'flex'}
                    alignItems={'center'}
                    gap={'1rem'}
                    color={'circle.font'}
                    >
                    {text}

                        {avatar}
                </Text>
            </Flex>
        </GhostButton>
    )
}

export default NavigationItem
