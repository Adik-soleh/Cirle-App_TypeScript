import { Flex, Text, Avatar } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { useState } from 'react'
import { UserType } from '@/types/types'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from '@/features/auth/authSlice'

import fakeUsers from '@/data/user.json' // Import the user data from JSON
import API from '@/networks/api'
import HollowButton from '@/components/buttons/HollowButton'
import CircleSpinner from '@/components/utils/CircleSpinner'
import { Link } from 'react-router-dom'

interface AccountCardProps {
    id: number
    username: string
    name: string
    bio: string | null
    avatar: string
    isFollowed: boolean
    noBio?: boolean
}

function AccountCard({ id, username, name, bio, avatar, isFollowed, noBio }: AccountCardProps) {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isUserFollowed, setUserFollowed] = useState<boolean>(isFollowed)

    const dispatch = useDispatch()

    // Get the user data from the imported JSON based on the ID
    const user = fakeUsers.fakeUsers.find((user) => user.id === id)

    async function onFollow() {
        try {
            setLoading(true)

            if (!isUserFollowed) {
                await API.FOLLOW_USER(id)
                return setUserFollowed(true)
            }

            await API.UNFOLLOW_USER(id)
            return setUserFollowed(false)
        } catch (error) {
            setUserFollowed(isFollowed)
        } finally {
            dispatchLatestUserData()
            setLoading(false)
        }
    }

    async function dispatchLatestUserData() {
        const loggedUser: UserType = await API.GET_LOGGED_USER()
        dispatch(setLoggedUser(loggedUser))
    }

    return (
        <Flex gap={'1rem'} alignItems={'center'}>
            <Link to={`/user/${id}`}>
                <Avatar src={user?.avatar || avatar} _hover={{ opacity: '.8', transition: 'opacity .3s ease' }} />
            </Link>
            <Flex direction={'column'} justifyContent={'center'} gap={0} mr={'auto'}>
                <Link to={`/user/${id}`}>
                    <Text
                        fontSize={fontSizing.small}
                        fontWeight={'700'}
                        _hover={{ opacity: '.8', transition: 'opacity .3s ease' }}
                    >
                        {user?.name || name}
                    </Text>
                    <Text
                        fontSize={fontSizing.smaller}
                        color={'circle.dark'}
                        _hover={{ opacity: '.8', transition: 'opacity .3s ease' }}
                    >
                        @{user?.username || username}
                    </Text>
                </Link>
                {(user?.bio || bio) && !noBio && <Text fontSize={fontSizing.smaller}>{user?.bio || bio}</Text>}
            </Flex>
            {isLoading ? (
                <HollowButton children={<CircleSpinner />} />
            ) : isUserFollowed ? (
                <HollowButton text={'Following'} onClick={onFollow} dark />
            ) : (
                <HollowButton text={'Follow'} onClick={onFollow} />
            )}
        </Flex>
    )
}

export default AccountCard
