import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SideBarProps {
    children: ReactNode
}

function SideBar({ children }: SideBarProps): JSX.Element {
    return (
        <Box as="aside" w={'40%'} top={0} py={'2rem'}>
            {children}
        </Box>
    )
}

export default SideBar
