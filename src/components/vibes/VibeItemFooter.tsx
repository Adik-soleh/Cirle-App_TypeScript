import { CardFooter, Center, Flex, Spacer, Tooltip } from "@chakra-ui/react";
import { BiSolidHeart, BiCommentDetail, BiSolidCircle } from "react-icons/bi";
import { UserType } from "@/types/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "@/networks/api";
import VibeItemButton from "./VibeItemButton";

interface VibeItemFooterProps {
  vibeId: number;
  totalLike: number;
  totalReply: number;
  isLiked: boolean;
  author: UserType;
  isReply?: boolean;
  repliesTarget?: boolean;
  badLabels: string[];
}

function VibeItemFooter({
  vibeId,
  totalLike,
  totalReply,
  isLiked,
  badLabels,
}: VibeItemFooterProps) {
  const [isVibeLiked, setVibeLiked] = useState<boolean>(isLiked);
  const [totalVibeLike, setTotalVibeLike] = useState<number>(totalLike);

  const navigate = useNavigate();

  // optimistic updates
  async function onToggleLike() {
    try {
      setVibeLiked((oldState) => !oldState);
      setTotalVibeLike((oldState) => {
        if (!isVibeLiked) {
          return oldState + 1;
        }

        return oldState - 1;
      });

      await API.TOGGLE_LIKE(vibeId);
    } catch (error) {
      setVibeLiked(isLiked);
      setTotalVibeLike(totalLike);
    }
  }

  return (
    <CardFooter padding={0} mt={".5rem"}>
      <Spacer />

      {totalReply !== undefined && totalLike !== undefined && (
        <Flex gap={"1rem"}>
          <VibeItemButton
            icon={<BiSolidHeart />}
            value={totalVibeLike}
            color={isVibeLiked ? "circle.red" : "circle.dark"}
            hoverColor={isVibeLiked ? "circle.dark" : "circle.red"}
            onClick={onToggleLike}
          />
          <VibeItemButton
            icon={<BiCommentDetail />}
            value={totalReply}
            color={"circle.dark"}
            hoverColor={"circle.accent"}
            onClick={() => navigate(`/vibe/${vibeId}`)}
          />
        </Flex>
      )}
    </CardFooter>
  );
}

export default VibeItemFooter;
