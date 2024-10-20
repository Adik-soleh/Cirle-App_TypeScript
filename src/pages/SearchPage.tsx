import { Link } from 'react-router-dom'
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import { BiLeftArrowAlt, BiSearchAlt } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { UserType } from '@/types/types'

import fakeData from '@/data/user.json' // Import fake data here
import MainBar from '@/components/bars/MainBar'
import SideBar from '@/components/bars/SideBar'
import ProfileCard from '@/components/cards/ProfileCard'
import SuggestionCard from '@/components/cards/SuggestionCard'
import DeveloperCard from '@/components/cards/DeveloperCard'
import AccountCard from '@/components/cards/AccountCard'
import IconInput from '@/components/inputs/IconInput'
import NavigationHeading from '@/components/navigations/NavigationHeading'
import CircleSpinner from '@/components/utils/CircleSpinner'
import EmptyMessage from '@/components/utils/EmptyMessage'

function SearchPage() {
    const { register, watch } = useForm()

    const [searchResult, setSearchResult] = useState<UserType[]>([])
    const [searchKeyword, setSearchKeyword] = useState<string>('')
    const [isLoading, setLoading] = useState<boolean>(false)

    const debounced = useDebouncedCallback((keyword) => {
        const filteredResults = fakeData.fakeUsers.filter(user => 
            user.username.includes(keyword) || user.name.includes(keyword)
        );
        setSearchResult(filteredResults);
        setLoading(false);
    }, 500)

    watch((data) => {
        setLoading(true)
        setSearchResult([])
        setSearchKeyword(data.search)

        if (data.search) {
            debounced(data.search)
        } else {
            setLoading(false);
        }
    })

    if (!searchKeyword) {
        return (
            <Grid templateColumns={'repeat(19, 1fr)'}>
                <GridItem colSpan={12}>
                    <MainBar>
                        <Link to={'/'}>
                            <NavigationHeading icon={<BiLeftArrowAlt />} text={'Search'} sticky />
                        </Link>
                        <IconInput
                            type={'text'}
                            placeholder={'search'}
                            icon={<BiSearchAlt />}
                            name={'search'}
                            register={register}
                        />
                        <EmptyMessage
                            header={'Find someone ?'}
                            body={"I hope you always have a nice day!!."}
                        />
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

    return (
        <Grid templateColumns={'repeat(19, 1fr)'}>
            <GridItem colSpan={12}>
                <MainBar>
                    <Link to={'/'}>
                        <NavigationHeading icon={<BiLeftArrowAlt />} text={'Search'} sticky />
                    </Link>
                    <IconInput
                        type={'text'}
                        placeholder={'search'}
                        icon={<BiSearchAlt />}
                        name={'search'}
                        register={register}
                    />
                    <Flex direction={'column'} gap={'1rem'} px={'1rem'} mt={'1rem'}>
                        {searchResult.length ? (
                            searchResult.map((result) => (
                                <AccountCard
                                    key={result.id}
                                    id={result.id}
                                    name={result.name}
                                    username={result.username}
                                    avatar={result.avatar}
                                    bio={result.bio}
                                    isFollowed={result.isFollowed}
                                />
                            ))
                        ) : isLoading ? (
                            <Box mt={'2rem'}>
                                <CircleSpinner />
                            </Box>
                        ) : (
                            <EmptyMessage
                                header={`Mmm, we can't find "${searchKeyword}".`}
                                body={"Are you sure there's no typo?"}
                            />
                        )}
                    </Flex>
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

export default SearchPage
