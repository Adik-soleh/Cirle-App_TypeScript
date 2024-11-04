import { Avatar, Flex, Spacer, Box, Divider, Input, FormControl } from '@chakra-ui/react'
import { RiImageAddFill } from "react-icons/ri";
import { useForm } from 'react-hook-form'
import { PostDataType } from '@/types/types'
import { PostSchema } from '@/validators/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import ImagePreview from '@/components/utils/ImagePreview'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'

import SolidButton from '@/components/buttons/SolidButton'
import PostInput from '@/components/inputs/PostInput'

interface NewPostProps {
    onPost: (data: PostDataType) => Promise<void> | void
    placeholder: string
    textButton?: string
    imagePreviewId: string
}

function NewVibe(props: NewPostProps) {
    const { placeholder, textButton, imagePreviewId } = props
    const [imagePreview, setImagePreview] = useState<string>('')
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
    } = useForm<PostDataType>({
        resolver: zodResolver(PostSchema),
    })

    function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files

        if (files?.length) {
            setImagePreview(URL.createObjectURL(files[0]))
        }
    }

    return (
        <Box>
            <Flex direction={'column'} justifyContent={'center'} gap={'1rem'}>
                <Flex alignItems={'start'} gap={'1rem'} mx={'1rem'} mt={'1rem'}>
                    <Avatar src={loggedUser?.avatar} />
                    <PostInput
                        placeholder={placeholder}
                        name={'content'}
                        register={register}
                        error={errors.content}
                    />
                </Flex>
                <ImagePreview imagePreview={imagePreview} onClose={() => setImagePreview('')} />
                <Divider borderColor={'circle.darker'} />
                <Flex
                    alignItems={'center'}
                    gap={'1rem'}
                    color={'circle.accent'}
                    mb={'1rem'}
                    mr={'1rem'}
                >
                    <Spacer />
                    <FormControl display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                        <Input
                            type={'file'}
                            height={0}
                            width={0}
                            border={0}
                            id={imagePreviewId}
                            variant={'hollow'}
                            placeholder={placeholder}
                            {...register('image')}
                            onChange={(e) => onImageChange(e)}
                        />
                        <label htmlFor={imagePreviewId}>
                            <RiImageAddFill fontSize={'2rem'} />
                        </label>
                    </FormControl>
                    <Box width={'15%'}>
                        <SolidButton
                            text={textButton ? textButton : 'Post'}
                            onClick={handleSubmit(async (data) => {
                                await props.onPost(data)

                                resetField('content')
                                resetField('image')
                                setImagePreview('')
                            })}
                        />
                    </Box>
                </Flex>
            </Flex>
            <Divider border={'1px'} borderColor={'circle.darker'} />
        </Box>
    )
}

export default NewVibe
