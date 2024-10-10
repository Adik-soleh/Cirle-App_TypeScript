import { Button } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { fontSizing, hollowButtonHover } from '../../styles/style'

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
            minWidth={'115px'}
            variant={'outline'}
            borderRadius={'2xl'}
            border={'2px'}
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
