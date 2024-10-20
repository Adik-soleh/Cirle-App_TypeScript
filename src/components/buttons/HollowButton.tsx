import { Button } from '@chakra-ui/react'
import { fontSizing, hollowButtonHover } from '@/styles/style'
import { ReactNode } from 'react'

interface HollowButtonProps {
    onClick?: () => void
    text?: string
    dark?: boolean
    children?: ReactNode
}

function HollowButton({ onClick, text, dark, children }: HollowButtonProps) {
    return (
        <Button
            onClick={onClick}
            minWidth={'50px'}
            variant={'variant'}
            borderRadius={'9'}
            border={'1px'}
            px={'1.25rem'}
            fontSize={fontSizing.small}
            borderColor={dark ? 'circle.dark' : 'circle.font'}
            color={dark ? 'circle.dark' : 'circle.font'}
            _hover={hollowButtonHover}
        >
            {text}
            {children}
        </Button>
    )
}

export default HollowButton
