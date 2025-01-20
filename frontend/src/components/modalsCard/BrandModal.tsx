import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface BrandModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    size: string
}

function BrandModal({ isOpen, onClose, children, size }: BrandModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalOverlay />
            <ModalContent borderRadius={'2xl'} bg={'black'}>
                {children}
            </ModalContent>
        </Modal>
    )
}

export default BrandModal
