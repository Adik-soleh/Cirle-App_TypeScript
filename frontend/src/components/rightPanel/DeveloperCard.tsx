import { Flex, Text } from '@chakra-ui/react'
import { BiLogoGithub, BiLogoLinkedinSquare, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi'
import { fontSizing } from '@/styles/style'

import BrandCard from './BrandCard'
import GhostButton from '@/components/buttons/GhostButton'

function DeveloperCard() {
    return (
        <BrandCard>
            <Flex color={'circle.dark'} alignItems={'center'} gap={'.25rem'} mb={'.25rem'}>
                <Text color={'circle.font'} fontSize={fontSizing.small}>
                    Developed by @soleh
                </Text>
                <Text color={'circle.dark'} fontSize={fontSizing.small}>
                    •
                </Text>
                <GhostButton color="circle.dark">
                    <BiLogoGithub fontSize={fontSizing.big} />
                </GhostButton>
                <GhostButton color="circle.dark">
                    <BiLogoLinkedinSquare fontSize={fontSizing.big} />
                </GhostButton>
                <GhostButton color="circle.dark">
                    <BiLogoInstagram fontSize={fontSizing.big} />
                </GhostButton>
                <GhostButton color="circle.dark">
                    <BiLogoTwitter fontSize={fontSizing.big} />
                </GhostButton>
            </Flex>
        </BrandCard>
    )
}

export default DeveloperCard
