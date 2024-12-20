import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { UserType } from '@/types/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'

import API from '@/connect/api'
import MainBar from '@/components/bars/MainBar'
import SideBar from '@/components/bars/SideBar'
import SuggestionCard from '@/components/rightPanel/SuggestionCard'
import DeveloperCard from '@/components/rightPanel/DeveloperCard'
import BrandTabs from '@/components/utils/BrandTabs'
import AccountListCard from '@/components/rightPanel/AccountListCard'
import NavigationHeading from '@/components/leftPannel/NavigationHeading'
import ProfileCard from '@/components/rightPanel/ProfileCard'
import CircleSpinner from '@/components/utils/CircleSpinner'

function FollowsPage() {
    const [followers, setFollowers] = useState<UserType[]>([])
    const [followings, setFollowings] = useState<UserType[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    useEffect(() => {
        async function getUsers() {
            setLoading(true)
            const users: UserType[] = await API.GET_ALL_USERS()

            if (loggedUser) {
                setFollowers(() => {
                    return users.filter((user) => {
                        return loggedUser.followers.some((follower) => follower.ownerId === user.id)
                    })
                })

                setFollowings(() => {
                    return users.filter((user) => {
                        return loggedUser.followings.some(
                            (following) => following.targetId === user.id
                        )
                    })
                })

                setLoading(false)
            }
        }

        getUsers()
    }, [loggedUser])

    return (
        <Grid templateColumns={'repeat(19, 1fr)'}>
            <GridItem colSpan={12}>
                <MainBar>
                    <Link to={'/'}>
                        <NavigationHeading icon={<BiLeftArrowAlt />} text={'Follows'} sticky />
                    </Link>
                    {isLoading ? (
                        <BrandTabs
                            leftTitle={'Followers'}
                            leftContent={
                                <Box mt={'3rem'}>
                                    <CircleSpinner />
                                </Box>
                            }
                            rightTitle={'Following'}
                            rightContent={
                                <Box mt={'3rem'}>
                                    <CircleSpinner />
                                </Box>
                            }
                        />
                    ) : (
                        <BrandTabs
                            leftTitle={'Followers'}
                            leftContent={<AccountListCard accounts={followers} />}
                            rightTitle={'Following'}
                            rightContent={<AccountListCard accounts={followings} />}
                        />
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

export default FollowsPage
