import { usePost } from "@/hooks/usePosts";
import { Box } from "@chakra-ui/react";

import MainBar from "@/components/bars/MainBar";
import NavigationHeading from "@/components/leftPannel/NavigationHeading";
import NewVibe from "@/components/post/NewPost";
import VibeList from "@/components/post/PostsList";
import EmptyMessage from "@/components/utils/EmptyMessage";
import { RootState } from "@/redux";
import { VibeType } from "@/types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HomePage() {
  const loggedUser = useSelector(
    (states: RootState) => states.loggedUser.value
  );

  const [vibes, onPost] = usePost();
  const [preparedVibes, setPreparedVibes] = useState<VibeType[]>([]);

  useEffect(() => {
    if (!loggedUser?.filterContent) {
      setPreparedVibes(() => {
        if (vibes) {
          return vibes.filter((vibe) => !vibe.badLabels.length);
        }

        return [];
      });
    } else {
      setPreparedVibes(() => {
        if (vibes) {
          return vibes;
        }

        return [];
      });
    }
  }, [vibes, loggedUser]);

  return (
    <MainBar>
      <NavigationHeading text={"Home"} disabled />
      <NewVibe
        placeholder={"What is happening?!"}
        imagePreviewId={"atHome"}
        onPost={onPost}
      />
      {preparedVibes.length ? (
        <VibeList vibes={preparedVibes} />
      ) : (
        <Box mt={"3rem"}>
          <EmptyMessage header={"No status posted now.."} />
        </Box>
      )}
    </MainBar>
  );
}

export default HomePage;
