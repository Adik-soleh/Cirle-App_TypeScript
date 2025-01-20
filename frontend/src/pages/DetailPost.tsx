import { useReplies } from "@/hooks/useReplies";
import { Box } from "@chakra-ui/react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link, Params, useParams } from "react-router-dom";

import MainBar from "@/components/bars/MainBar";
import NavigationHeading from "@/components/leftPannel/NavigationHeading";
import VibeDetail from "@/components/post/DetailPost";
import CircleSpinner from "@/components/utils/CircleSpinner";

function VibeDetailPage() {
  const { id }: Readonly<Params<string>> = useParams();
  const targetId = id ? +id : NaN;

  const [vibe, onReply] = useReplies(targetId);

  return (
    <MainBar>
      <Link to={"/"}>
        <NavigationHeading icon={<BiLeftArrowAlt />} text={"Status"} sticky />
      </Link>
      {vibe ? (
        <VibeDetail vibe={vibe} onReply={onReply} />
      ) : (
        <Box pt={"3rem"} borderTop={"1px"} borderColor={"circle.darker"}>
          <CircleSpinner />
        </Box>
      )}
    </MainBar>
  );
}

export default VibeDetailPage;
