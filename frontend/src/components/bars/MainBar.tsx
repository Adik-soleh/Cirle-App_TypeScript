import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MainBarProps {
    children: ReactNode;
}

function MainBar({ children }: MainBarProps) {
    return (
        <>
        <Box
            as={'section'}
            w={'100%'}
            border={'1px'}
            borderColor={'circle.darker'}
            minHeight={'100vh'}
            px={{ base: '4', md: '8' }} 
            maxWidth="1200px" 
            mx="auto" 
            display="flex"
            flexDirection="column" 
            overflowX="hidden"
            mb={"2rem"}
        >

            {children}
        </Box>
            </>
    );
}

export default MainBar;
