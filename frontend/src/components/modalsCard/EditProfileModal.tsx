import { Card, Box, Flex, Divider, FormControl, FormLabel, Switch, useColorMode } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { useEditUser } from '@/hooks/useEditUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserSchema } from '@/validators/validator'
import { EditUserDataType } from '@/types/types'

import ProfileCardHeader from '@/components/rightPanel/ProfileCardHeader'
import BrandHeading from '@/components/utils/BrandHeading'
import SolidButton from '@/components/buttons/SolidButton'
import SolidInput from '@/components/inputs/SolidInput'
import { fontSizing } from '@/styles/style'

interface EditProfileModalProps {
    onClose: () => void
    avatar: string | any
    banner: string
    dark: boolean
}

function EditProfileModal({ avatar, banner, dark, onClose }: EditProfileModalProps) {
    const { colorMode } = useColorMode();
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    const [onEdit] = useEditUser({ onClose })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditUserDataType>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            name: loggedUser?.name,
            username: loggedUser?.username,
            bio: loggedUser?.bio || '',
            filterContent: loggedUser?.filterContent,
            avatar: null,
            banner: null,
        },
    })


    const bg = dark
    ? colorMode === 'dark'
        ? 'circle.backdrop.dark'
        : 'circle.backdrop.light'
    : colorMode === 'dark'
        ? 'circle.darker.dark'
        : 'white';
    return (
        <Box py={'2rem'}>
            <Card bg={bg} px={'1rem'} color={'circle.font'} mb={'1.5rem'}>
                <BrandHeading text={'Edit Profile'} />
                <ProfileCardHeader
                    avatar={avatar}
                    avatarName={'avatar'}
                    banner={banner}
                    bannerName={'banner'}
                    register={register}
                    editable
                />
            </Card>
            <Flex direction={'column'} gap={'.5rem'} px={'1rem'} mb="1rem">
                <SolidInput<EditUserDataType>
                    type={'text'}
                    placeholder={'Name'}
                    name={'name'}
                    register={register}
                    error={errors.name}
                />
                <SolidInput<EditUserDataType>
                    type={'text'}
                    placeholder={'Username'}
                    name={'username'}
                    register={register}
                    error={errors.username}
                />
                <SolidInput<EditUserDataType>
                    type={'text'}
                    placeholder={'Bio'}
                    name={'bio'}
                    register={register}
                    error={errors.bio}
                />
                <FormControl display="flex" alignItems="center" justifyContent={'flex-end'}>
                    <FormLabel htmlFor="email-alerts" mb="0" fontSize={fontSizing.small}>
                        Show sensitive content
                    </FormLabel>
                    <Switch id="email-alerts" {...register('filterContent')} />
                </FormControl>
            </Flex>
            <Divider borderColor={'circle.darker'} />
            <Box width={'25%'} px={'1rem'} pt={'1rem'} ml={'auto'}>
                <SolidButton text={'Save'} onClick={handleSubmit((data) => onEdit(data))} />
            </Box>
        </Box>
    )
}

export default EditProfileModal
