import { Button } from '@chakra-ui/react'
import { solidButtonHover } from '@/styles/style'

interface SolidButtonProps {
    onClick?: () => void
    text: string
    py?: string
}

function SolidButton({ onClick, text, py }: SolidButtonProps) {
    return (
        <Button
            onClick={onClick}
            width={'100%'}
            borderRadius={'2xl'}
            bg={"ButtonShadow"}
            color={'black'}
            py={py ? py : undefined}
            _hover={solidButtonHover}
        >
            {text}
        </Button>
    )
}

export default SolidButton
