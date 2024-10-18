import { Grid, GridItem } from '@chakra-ui/react'

import MainBar from '@/components/bars/MainBar'
import LifePanel from '@/components/bars/SideBar'
import ProfileCard from '@/components/cards/ProfileCard'
import SuggestionCard from '@/components/cards/SuggestionCard'
import NavigationHeading from '@/components/navigations/NavigationHeading'


function HomePage() {
   return (
        <Grid templateColumns={'repeat(19, 1fr)'}>
            <GridItem colSpan={12}>
                <MainBar>
                    <NavigationHeading text={'HomePage'} disabled />
                    {/* <NewVibe
                        placeholder={"What's on your mind?"}
                        imagePreviewId={'atHome'}
                        onPost={onPost}
                    /> */}
                    {/* {preparedVibes.length ? (
                        <VibeList vibes={preparedVibes} />
                    ) : (
                        <Box mt={'3rem'}>
                            <CircleSpinner />
                        </Box>
                    )} */}
                </MainBar>
            </GridItem>
            <GridItem colSpan={7}>
                <LifePanel>
                    <ProfileCard />
                    <SuggestionCard />
                    {/* <DeveloperCard /> */}
                </LifePanel>
            </GridItem>
        </Grid>
    )
}

export default HomePage
