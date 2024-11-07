import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PostDataType, VibeType } from '@/types/types'

import API from '@/connect/api'
import useCircleToast from '@/hooks/useCircleToast'

interface useVibesParams {
    onClose?: () => void
}

function usePost(
    params: useVibesParams = {}
): [VibeType[] | undefined, (data: PostDataType) => Promise<void>, (targetId: number) => void] {
    const createToast = useCircleToast()
    const queryClient: QueryClient = useQueryClient()

    const { data: vibes } = useQuery<VibeType[]>({
        queryKey: ['posts'],
        queryFn: API.GET_ALL_POSTS,
    })

    const postVibe = useMutation({
        mutationFn: POST_VIBE,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

    const deleteVibe = useMutation({
        mutationFn: DELETE_VIBE,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

    async function onPost(data: PostDataType): Promise<void> {

        const formData: FormData = new FormData()

        formData.append('content', data.content)
        formData.append('image', data.image ? data.image[0] : null)

        postVibe.mutate(formData)

        if (params.onClose) {
            params.onClose()
        }
    }

    function onDelete(targetId: number): void {
        deleteVibe.mutate(targetId)
    }

    async function POST_VIBE(data: FormData): Promise<string> {
        const postVIbe: Promise<string> = API.POST(data)
        createToast(postVIbe, {
            title: 'Post Vibe',
            message: 'Vibe successfully posted!',
        })

        return postVIbe
    }

    async function DELETE_VIBE(targetId: number): Promise<VibeType> {
        const deleteVibe: Promise<VibeType> = API.DELETE_POST(targetId)
        createToast(deleteVibe, {
            title: 'Delete Vibe',
            message: 'Vibe successfully deleted!',
        })

        return deleteVibe
    }

    return [vibes, onPost, onDelete]
}

export { usePost }
