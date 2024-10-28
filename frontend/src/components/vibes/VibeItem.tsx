import { Card, Flex, Avatar, Box, Divider, useDisclosure, useColorMode } from '@chakra-ui/react';
import { VibeType } from '@/types/types';
import { vibeHover } from '@/styles/style';

import VibeItemHeader from '@/components/vibes/VibeItemHeader';
import VibeItemBody from '@/components/vibes/VibeItemBody';
import VibeItemFooter from '@/components/vibes/VibeItemFooter';
import ImageModal from '@/components/modals/ImageModal';
import { useNavigate } from 'react-router-dom';
import GhostButton from '@/components/buttons/GhostButton';

interface VibeItemProps {
    vibe: VibeType;
    noImage?: boolean;
    repliesTarget?: boolean;
    isReply?: boolean;
}

function VibeItem({ vibe, noImage, repliesTarget, isReply }: VibeItemProps) {
    const { id, content, image, createdAt, totalLikes, totalReplies, isLiked, badLabels, author } = vibe;

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode } = useColorMode();

    // Dynamic background and font colors based on the current color mode
    const bg = colorMode === 'dark' ? 'circle.darker.dark' : 'white';
    const fontColor = colorMode === 'dark' ? 'circle.font' : 'black';
    const dividerColor = colorMode === 'dark' ? 'circle.darker' : 'gray.200';

    function onAvatarClick() {
        if (author) {
            navigate(`/user/${author.id}`);
        }
    }

    if (author) {
        return (
            <Box>
                <Card
                    bg={bg}
                    color={fontColor}
                    p="1rem"
                    _hover={!isReply ? vibeHover : {}}
                >
                    <Flex gap="1rem">
                        <GhostButton onClick={onAvatarClick} onTop>
                            <Avatar src={author.avatar} />
                        </GhostButton>
                        <Flex direction="column" width="100%">
                            <VibeItemHeader
                                vibeId={id}
                                authorId={author.id}
                                name={author.name}
                                username={`@${author.username}`}
                                date={createdAt}
                                author={author}
                                isReply={isReply}
                                repliesTarget={repliesTarget}
                            />
                            <VibeItemBody
                                vibeId={id}
                                vibeContent={content}
                                vibeImage={image}
                                noImage={noImage}
                                onOpen={onOpen}
                            />
                            <VibeItemFooter
                                vibeId={id}
                                totalLike={totalLikes}
                                totalReply={totalReplies}
                                isLiked={isLiked}
                                author={author}
                                isReply={isReply}
                                badLabels={badLabels}
                                repliesTarget={repliesTarget}
                            />
                        </Flex>
                    </Flex>
                </Card>
                <Divider border="1px" borderColor={dividerColor} />
                {isOpen && <ImageModal isOpen={isOpen} onClose={onClose} vibeImage={image} />}
            </Box>
        );
    }

    return null;
}

export default VibeItem;
