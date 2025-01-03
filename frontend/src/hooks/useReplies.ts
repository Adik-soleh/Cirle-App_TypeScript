import { DetailedVibeType, ReplyType, PostDataType } from "@/types/types";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";

import API from "@/connect/api";
import useCircleToast from "@/hooks/useCircleToast";

function useReplies(
  targetId: number | null = null
): [
  DetailedVibeType | null | undefined,
  (data: PostDataType) => void,
  (targetId: number) => void
] {
  const createToast = useCircleToast();
  const queryClient: QueryClient = useQueryClient();

  const { data: vibe } = useQuery<DetailedVibeType | null>({
    queryKey: ["vibe", targetId],
    queryFn: () => {
      if (targetId) {
        return API.GET_SINGLE_POST(targetId);
      }

      return null;
    },
  });

  const postReply = useMutation({
    mutationFn: POST_REPLY,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vibe"] });
    },
  });

  const deleteReply = useMutation({
    mutationFn: DELETE_REPLY,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vibe"] });
    },
  });

  async function onReply(data: PostDataType): Promise<void> {
    const formData: FormData = new FormData();

    if (targetId) {
      formData.append("targetId", targetId.toString());
      formData.append("content", data.content);
      formData.append("image", data.image ? data.image[0] : null);

      postReply.mutate(formData);
    }
  }

  function onDelete(targetId: number): void {
    deleteReply.mutate(targetId);
  }

  async function POST_REPLY(data: FormData): Promise<ReplyType> {
    const postReply: Promise<ReplyType> = API.POST_REPLY(data);
    createToast(postReply, {
      title: "Post Reply",
      message: "Reply successfully posted!",
    });

    return postReply;
  }

  async function DELETE_REPLY(targetId: number): Promise<ReplyType> {
    const deleteReply: Promise<ReplyType> = API.DELETE_REPLY(targetId);
    createToast(deleteReply, {
      title: "Delete Reply",
      message: "Reply successfully deleted!",
    });

    return deleteReply;
  }

  return [vibe, onReply, onDelete];
}

export { useReplies };
