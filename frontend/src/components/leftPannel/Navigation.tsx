import { Link, useNavigate } from 'react-router-dom'
import { Flex, Spacer, Image, Box, useDisclosure, Avatar } from '@chakra-ui/react'
import { BiSolidHome, BiSearchAlt, BiHeart, BiUser } from 'react-icons/bi'
import { CgLogOut } from "react-icons/cg";

import { useDispatch, useSelector } from 'react-redux'
import { unsetLoggedUser } from '@/features/auth/authSlice'
import API from '@/connect/api'

import NavigationItem, { LogoutItem } from './NavigationItem'
import SolidButton from '@/components/buttons/SolidButton'
import BrandModal from '@/components/modalsCard/BrandModal'
import NewVibe from '@/components/post/NewPost'
import { usePost } from '@/hooks/usePosts'
import { RootState } from '@/redux';
import { UserType } from '@/types/types';
import DarkModeToggle from '@/DarkMode/useColorMode';

function Navigation() {
    const loggedUser: UserType | undefined = useSelector(
        (states: RootState) => states.loggedUser.value
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [, onPost] = usePost({ onClose })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function onLogout() {
        API.SET_TOKEN('')
        dispatch(unsetLoggedUser())

        navigate('/')
    }


    return (
        <Flex
            as={'nav'}
            direction={'column'}
            pr={'2rem'}
            gap={'2rem'}
            height={'90vh'}
            pos={'fixed'}
            w={'266px'}
            >
            <Image src={'/circle.png'} objectFit={'cover'} width={'85%'} mb={'1rem'} />
            <DarkModeToggle/>
            <Link to={'/'}>
                <NavigationItem icon={<BiSolidHome />} text={'Home'} />
            </Link>
            <Link to={'/search'}>
                <NavigationItem icon={<BiSearchAlt />} text={'Search'} />
            </Link>
            <Link to={'/follows'}>
                <NavigationItem icon={<BiHeart />} text={'Follows'} />
            </Link>
            <Link to={'/me'}>
                <NavigationItem icon={<BiUser />} text={'Profile'} />
            </Link>
            <SolidButton onClick={onOpen} text={'Create Post'} py={'1.5rem'} />
            <Spacer />

            <LogoutItem icon={<CgLogOut />} text={loggedUser?.name} onLogout={onLogout} avatar={<Avatar sx={{width: 10, height: 10}} src={loggedUser?.avatar}/>} />
            <BrandModal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <Box pt={'.5rem'}>
                    <NewVibe
                        placeholder={"What is happening?!"}
                        imagePreviewId={'atModal'}
                        onPost={onPost}
                    />
                </Box>
            </BrandModal>
        </Flex>
    )
}

export default Navigation
