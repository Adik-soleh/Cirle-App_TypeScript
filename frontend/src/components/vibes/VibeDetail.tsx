import { DetailedVibeType, UserType, PostDataType } from '@/types/types'
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import API from '@/networks/api'
import VibeList from '@/components/vibes/PostsList'
import VibeItem from '@/components/vibes/VibeItem'
import NewVibe from '@/components/vibes/NewPost'
import EmptyMessage from '@/components/utils/EmptyMessage'
import CircleSpinner from '@/components/utils/CircleSpinner'

interface VibeDetailProps {
    onReply: (data: PostDataType) => void
    vibe: DetailedVibeType
    noImage?: boolean
}

function VibeDetail({ vibe, onReply, noImage }: VibeDetailProps) {
    const { replies, ...rest } = vibe

    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        async function getUsers() {
            const users: UserType[] = await API.GET_ALL_USERS()
            setUsers(users)
        }

        getUsers()
    }, [])

    const repliesWithAuthor = replies.map((reply) => {
        return {
            ...reply,
            author: users.find((user) => user.id === reply.authorId),
        }
    })

    if (!replies.length)
        return (
            <Box>
                <VibeItem vibe={rest} noImage={noImage && noImage} repliesTarget />
                <NewVibe
                    placeholder={'Type your reply!'}
                    onPost={onReply}
                    imagePreviewId={'atDetail'}
                    textButton={'Reply'}
                />
                <EmptyMessage
                    header={'No replies to this vibe so far.'}
                    body={'Share your thoughts first!'}
                />
            </Box>
        )

    return (
        <Box>
            <VibeItem vibe={rest} noImage={noImage && noImage} isReply />
            <NewVibe
                placeholder={'Type your reply!'}
                onPost={onReply}
                imagePreviewId={'atDetail'}
                textButton={'Reply'}
            />
            {users.length ? (
                <VibeList vibes={repliesWithAuthor} noLink />
            ) : (
                <Box pt={'3rem'}>
                    <CircleSpinner />
                </Box>
            )}
        </Box>
    )
}

export default VibeDetail
