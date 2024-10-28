import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { inputAnatomy, switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle: inputStyle, defineMultiStyleConfig: inputConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys);
const { definePartsStyle: switchStyle, defineMultiStyleConfig: switchConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = switchStyle({
    container: {},
    thumb: {
        bg: 'circle.font',
    },
    track: {
        bg: 'circle.dark',
        _checked: {
            bg: 'circle.accent',
        },
    },
});

const hollow = inputStyle({
    field: {
        border: '1px solid',
        borderColor: 'circle.dark',
        background: 'transparent',
        borderRadius: 'lg',
        _hover: {
            background: 'none',
            boxShadow: 'none',
            borderColor: 'circle.accent',
        },
        _active: {
            background: 'none',
            boxShadow: 'none',
            borderColor: 'circle.accent',
        },
        _focus: {
            background: 'none',
            boxShadow: 'none',
            borderColor: 'circle.accent',
        },
        _autofill: {
            transition: 'background-color 0s 600000s, color 0s 600000s',
        },
        _placeholder: {
            color: 'circle.dark',
        },
    },
});

const switchTheme = switchConfig({ baseStyle });
const inputTheme = inputConfig({
    variants: { hollow },
});

// Define the config for initial color mode settings
const config: ThemeConfig = {
    initialColorMode: 'light', // default to light mode
    useSystemColorMode: false, // set to true if you want to follow the system preference
};

const circleTheme = extendTheme({
    config,
    colors: {
        circle: {
            backdrop: {
                light: '#f7f7f7',
                dark: '#171717',
            },
            backdropAccent: {
                light: '#e0e0e0',
                dark: '#1c1c1c',
            },
            font: {
                light: '#333',
                dark: '#dedede',
            },
            dark: {
                light: '#ccc',
                dark: '#505050',
            },
            darker: {
                light: '#999',
                dark: '#1f1f1f',
            },
            red: '#D71913',
            accent: '#006c6c',
            darkAccent: '#029898',
            error: '#cc0000',
            green: '#006e45',
        },
    },
    styles: {
        global: (props: any) => ({
            body: {
                fontFamily: 'Inter',
                color: props.colorMode === 'dark' ? 'circle.font.dark' : 'circle.font.light',
                bg: props.colorMode === 'dark' ? 'circle.backdrop.dark' : 'circle.backdrop.light',
                fontSize: '14.5px',
            },
        }),
    },
    components: { Input: inputTheme, Switch: switchTheme },
});

export default circleTheme;
