import { Collapse, FormControl, Text, Textarea } from '@chakra-ui/react'
import { FieldError, UseFormRegister, FieldValues, Path } from 'react-hook-form'
import { fontSizing } from '@/styles/style'

interface PostInputProps<T extends FieldValues> {
    placeholder: string
    name: Path<T>
    register: UseFormRegister<T>
    error: FieldError | undefined
}

function PostsInput<T extends FieldValues>(props: PostInputProps<T>) {
    const { placeholder, name, error, register } = props
    const isCollapsed = error ? true : false

    return (
        <FormControl color={'circle.font'} minHeight={0}>
            <Textarea
                px={0}
                border={0}
                bg={'circle.backdrop'}
                borderRadius={'20'}
                padding={3}
                minHeight={'100px'}
                resize={'none'}
                placeholder={placeholder}
                fontSize={fontSizing.big}
                _active={{ background: 'none', boxShadow: 'none' }}
                _focus={{ background: 'none', boxShadow: 'none' }}
                _placeholder={{ color: 'circle.dark' }}
                id={name}
                variant={'hollow'}
                {...register(name)}
            />

            <Collapse in={isCollapsed} transition={{ enter: { duration: 0.5 } }}>
                <Text mt={'.5rem'} color={'circle.error'}>
                    {error && error.message}
                </Text>
            </Collapse>
        </FormControl>
    )
}

export default PostsInput
