import { Prisma } from '@prisma/client'

interface SearchDto {
    keyword: string | Prisma.FieldRef<'User', 'String'>
}

export default SearchDto
