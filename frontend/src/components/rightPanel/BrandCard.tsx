import { Box, Card, useColorMode } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface BrandCardProps {
    children: ReactNode;
    noSpace?: boolean;
    dark?: boolean;
}

function BrandCard({ children, noSpace, dark }: BrandCardProps) {
    const { colorMode } = useColorMode();

    // Determine the background based on the `dark` prop and the current color mode
    const bg = dark
        ? colorMode === 'dark'
            ? 'circle.backdrop.dark'
            : 'circle.backdrop.light'
        : colorMode === 'dark'
            ? 'circle.darker.dark'
            : 'white';

    return (
        <Box margin={0} p={0} pl={noSpace ? 0 : '2rem'} mb="1rem">
            <Card
                color={colorMode === 'dark' ? 'circle.font.dark' : 'circle.font.light'}
                bg={bg}
                borderRadius="xl"
                width="100%"
                padding="1rem"
            >
                {children}
            </Card>
        </Box>
    );
}

export default BrandCard;
