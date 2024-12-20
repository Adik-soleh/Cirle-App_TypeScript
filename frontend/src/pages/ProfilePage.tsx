import { Link, Params, useNavigate, useParams } from 'react-router-dom'
import { Grid, GridItem, Card, useColorMode } from '@chakra-ui/react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { UserType } from '@/types/types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { CgFeed } from "react-icons/cg";
import { GrMultimedia } from "react-icons/gr";

import MainBar from '@/components/bars/MainBar'
import SideBar from '@/components/bars/SideBar'
import SuggestionCard from '@/components/rightPanel/SuggestionCard'
import DeveloperCard from '@/components/rightPanel/DeveloperCard'
import ProfileCardHeader from '@/components/rightPanel/ProfileCardHeader'
import ProfileCardBody from '@/components/rightPanel/ProfileCardBody'
import ProfileCardFooter from '@/components/rightPanel/ProfileCardFooter'
import NavigationHeading from '@/components/leftPannel/NavigationHeading'
import BrandTabs from '@/components/utils/BrandTabs'
import VibeList from '@/components/post/PostsList'
import MediaCollection from '@/components/utils/MediaCollection'
import CircleSpinner from '@/components/utils/CircleSpinner'
import API from '@/connect/api'


interface ProfilePageProps {
    dark?: boolean
}

function ProfilePage({dark}: ProfilePageProps) {
    const { colorMode } = useColorMode();
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    const { id }: Readonly<Params<string>> = useParams()
    const targetId = id ? +id : NaN

    const [user, setUser] = useState<UserType | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        async function GET_USER() {
            const user: UserType = await API.GET_USER(targetId)

            if (loggedUser) {
                if (loggedUser.id === user.id) {
                    navigate('/me')
                }
            }

            setUser(user)
        }

        setUser(null)
        GET_USER()
    }, [loggedUser, targetId, navigate])

    if (user) {
        const {
            username,
            name,
            bio,
            avatar,
            banner,
            totalFollower,
            totalFollowing,
            isFollowed,
            vibes,
        } = user

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
                                buttonText={isFollowed ? 'Following' : 'Follow'}
                                avatar={avatar}
                                banner={banner}
                                isUserProfile={true}
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
                            leftTitle={<CgFeed/>}
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

    return (
        <Grid templateColumns={'repeat(19, 1fr)'} height={'100vh'}>
            <GridItem colSpan={19}>
                <CircleSpinner />
            </GridItem>
        </Grid>
    )
}

export default ProfilePage
