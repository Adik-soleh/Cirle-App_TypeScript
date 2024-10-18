import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { VibeType } from '@/types/types'
import dummyData from "@/data/dummy.json"

import VibeItem from './VibeItem'
import EmptyMessage from '@/components/utils/EmptyMessage'

interface VibeListProps {
    vibes: VibeType[]
    noLink?: boolean
}

function VibeList({ noLink }: VibeListProps) {
    if (dummyData.vibes.length) {
        return (
            <Box>
                {dummyData.vibes.map((vibe) => {
                    if (noLink) {
                        return <VibeItem vibe={vibe} key={vibe.id} isReply />
                    }

                    return (
                        <Link to={`/vibe/${vibe.id}`} key={vibe.id}>
                            <VibeItem vibe={vibe} />
                        </Link>
                    )
                })}
            </Box>
        )
    }

    return <EmptyMessage header={'No vibe has been posted at this moment.'} />
}

export default VibeList
