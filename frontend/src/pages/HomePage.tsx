import { Box, Grid, GridItem } from '@chakra-ui/react'
import { usePost } from '@/hooks/usePosts'

import MainBar from '@/components/bars/MainBar'
import SideBar from '@/components/bars/SideBar'
import ProfileCard from '@/components/rightPanel/ProfileCard'
import SuggestionCard from '@/components/rightPanel/SuggestionCard'
import DeveloperCard from '@/components/rightPanel/DeveloperCard'
import VibeList from '@/components/post/PostsList'
import NewVibe from '@/components/post/NewPost'
import NavigationHeading from '@/components/leftPannel/NavigationHeading'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { useEffect, useState } from 'react'
import { VibeType } from '@/types/types'
import EmptyMessage from '@/components/utils/EmptyMessage'

function HomePage() {
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    const [vibes, onPost] = usePost()
    const [preparedVibes, setPreparedVibes] = useState<VibeType[]>([])

    useEffect(() => {
        if (!loggedUser?.filterContent) {
            setPreparedVibes(() => {
                if (vibes) {
                    return vibes.filter((vibe) => !vibe.badLabels.length)
                }

                return []
            })
        } else {
            setPreparedVibes(() => {
                if (vibes) {
                    return vibes
                }

                return []
            })
        }
    }, [vibes, loggedUser])

    return (
        <Grid templateColumns={'repeat(19, 1fr)'}>
            <GridItem colSpan={12}>
                <MainBar>
                    <NavigationHeading text={'Home'} disabled />
                    <NewVibe
                        placeholder={"What is happening?!"}
                        imagePreviewId={'atHome'}
                        onPost={onPost}
                    />
                    {preparedVibes.length ? (
                        <VibeList vibes={preparedVibes} />
                    ) : (
                        <Box mt={'3rem'}>
                            <EmptyMessage header={'No status posted now..'} />
                        </Box>
                    )}
                </MainBar>
            </GridItem>
            <GridItem colSpan={7}>
                <SideBar>
                    <ProfileCard />
                    <SuggestionCard />
                    <DeveloperCard />
                </SideBar>
            </GridItem>
        </Grid>
    )
}

export default HomePage
