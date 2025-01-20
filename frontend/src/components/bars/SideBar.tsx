import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SideBarProps {
    children: ReactNode
}

function SideBar({ children }: SideBarProps): JSX.Element {
    return (
        <Box as="aside" w={'40%'} top={0} py={'2rem'}  >
            <Box position={"fixed"}>
            {children}
            </Box>
        </Box>
    )
}

export default SideBar
