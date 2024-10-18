import { Flex } from '@chakra-ui/react'
import { UserType } from '@/types/types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'

import fakeData from '@/data/user.json' // Import fake data here
import AccountCard from './AccountCard'
import BrandCard from './BrandCard'
import BrandHeading from '@/components/utils/BrandHeading'
import CircleSpinner from '@/components/utils/CircleSpinner'

function SuggestionCard() {
    const [users, setUsers] = useState<UserType[]>([])
    const loggedUser: UserType | undefined = useSelector(
        (states: RootState) => states.loggedUser.value
    )

    useEffect(() => {
        const getUsers = () => {
            if (loggedUser) {
                // Filter out users who are followed and the logged-in user
                const filteredUsers = fakeData.filter(user => 
                    !user.isFollowed && user.id !== loggedUser.id
                );

                // Randomly select 3 users
                const randomUsers = filteredUsers.sort(() => Math.random() - 0.5).slice(0, 3);
                setUsers(randomUsers);
            }
        }

        getUsers();
    }, [loggedUser])

    if (users.length) {
        return (
            <BrandCard>
                <BrandHeading text={'Suggested for you'} />
                <Flex direction={'column'} gap={'1rem'}>
                    {users.map((user) => (
                        <AccountCard
                            key={user.id}
                            id={user.id}
                            username={user.username}
                            name={user.name}
                            bio={user.bio}
                            avatar={user.avatar}
                            isFollowed={user.isFollowed}
                            noBio
                        />
                    ))}
                </Flex>
            </BrandCard>
        )
    }

    return (
        <BrandCard>
            <BrandHeading text={'Suggested accounts'} />
            <CircleSpinner />
        </BrandCard>
    )
}

export default SuggestionCard
