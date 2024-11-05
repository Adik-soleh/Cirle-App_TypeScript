import { useColorMode, Box } from '@chakra-ui/react';
import { BiSun, BiMoon } from 'react-icons/bi';
// import "./DarkMode"
import '../DarkMode/DarkMode.css'

function DarkModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleColorMode}
                checked={colorMode === 'dark'}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                {colorMode === 'light' ? <BiSun /> : <BiMoon />}
            </label>
        </Box>
    );
}

export default DarkModeToggle;
