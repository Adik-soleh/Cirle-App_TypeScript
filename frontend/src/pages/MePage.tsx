import { Link } from 'react-router-dom'
import { Grid, GridItem, Card, useColorMode } from '@chakra-ui/react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { CgFeed } from "react-icons/cg";
import { GrMultimedia } from "react-icons/gr";
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'

import MainBar from '@/components/bars/MainBar'
import SideBar from '@/components/bars/SideBar'
import SuggestionCard from '@/components/cards/SuggestionCard'
import DeveloperCard from '@/components/cards/DeveloperCard'
import ProfileCardHeader from '@/components/cards/ProfileCardHeader'
import ProfileCardBody from '@/components/cards/ProfileCardBody'
import ProfileCardFooter from '@/components/cards/ProfileCardFooter'
import NavigationHeading from '@/components/leftPannel/NavigationHeading'
import BrandTabs from '@/components/utils/BrandTabs'
import VibeList from '@/components/post/PostsList'
import MediaCollection from '@/components/utils/MediaCollection'
import CircleSpinner from '@/components/utils/CircleSpinner'


interface MePageProps {
    dark?: boolean;
}

function MePage({dark}: MePageProps) {
    const { colorMode } = useColorMode();
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    if (loggedUser) {
        const { username, name, bio, avatar, banner, totalFollower, totalFollowing, vibes } =
            loggedUser

            const bg = dark
     ? colorMode === 'dark'
         ? 'circle.backdrop.dark'
         : 'circle.backdrop.light'
     : colorMode === 'dark'
         ? 'circle.darker.dark'
         : 'white';

        return (
            <Grid templateColumns={'repeat(19, 1fr)'}>
                <GridItem colSpan={12}>
                    <MainBar>
                        <Link to={'/'}>
                            <NavigationHeading icon={<BiLeftArrowAlt />} text={name} sticky />
                        </Link>
                        <Card
                            bg={bg}
                            px={'1rem'}
                            color={'circle.font'}
                            mb={'1.5rem'}
                        >
                            <ProfileCardHeader
                                buttonText={'Edit Profile'}
                                avatar={avatar}
                                banner={banner}
                            />
                            <ProfileCardBody
                                py={'1rem'}
                                username={username}
                                name={name}
                                bio={bio}
                            />
                            <ProfileCardFooter
                                totalFollower={totalFollower}
                                totalFollowing={totalFollowing}
                            />
                        </Card>
                        <BrandTabs
                            leftTitle={<><CgFeed/></>  }
                            leftContent={<VibeList vibes={vibes} />}
                            rightTitle={<GrMultimedia/>}
                            rightContent={<MediaCollection vibes={vibes} />}
                        />
                    </MainBar>
                </GridItem>
                <GridItem colSpan={7}>
                    <SideBar>
                        <SuggestionCard />
                        <DeveloperCard />
                    </SideBar>
                </GridItem>
            </Grid>
        )
    }

     // Determine the background based on the `dark` prop and the current color mode

    return (
        <Grid templateColumns={'repeat(19, 1fr)'} height={'100vh'}>
            <GridItem colSpan={19}>
                <CircleSpinner />
            </GridItem>
        </Grid>
    )
}

export default MePage
