import { PrismaClient } from "@prisma/client";
import { PORT } from "./configs/config";
import express from "express";
import cors from "cors";

import VibeControllers from "./controllers/PostControllers";
import AuthControllers from "./controllers/AuthControllers";
import CommentsController from "./controllers/CommentControllers";
import LikeControllers from "./controllers/LikeControllers";
import UserControllers from "./controllers/UserControllers";
import FollowControllers from "./controllers/FollowControllers";
import authenticate from "./middlewares/authenticate";
import uploader from "./middlewares/upload";
import Redis from "./middlewares/prisma";

const prisma = new PrismaClient();

const app = express();
const v1 = express.Router();
const port = PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", v1);


async function main() {
  v1.post("/register", AuthControllers.register);
  v1.post("/login", AuthControllers.login);
  v1.patch("/auth/reset", authenticate, AuthControllers.resetPassword);

  v1.get("/vibes", authenticate, Redis.getVibes, VibeControllers.getVibes);
  v1.get("/vibes/:id", authenticate, VibeControllers.getVibe);
  v1.get("/vibes/user/:id", authenticate, VibeControllers.getUserVibes);
  v1.post("/vibes",uploader.single("image"),authenticate,VibeControllers.postVibes);
  v1.delete("/vibes/:id", authenticate, VibeControllers.deleteVibe);

  v1.get("/follow/:id", authenticate, FollowControllers.follow);
  v1.get("/unfollow/:id", authenticate, FollowControllers.unfollow);

  v1.get("/find", authenticate, UserControllers.searchUser);
  v1.post("/likes", authenticate, LikeControllers.likeMechanism);
  v1.get("/me", authenticate, UserControllers.getLoggedUser);

  v1.get("/users/:id", authenticate, UserControllers.getUser);
  v1.get("/users", authenticate, UserControllers.getUsers);
  v1.patch(
    "/users/me",
    uploader.fields([
      { name: "avatar", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
    authenticate,
    UserControllers.editUser
  );

  v1.delete("/replies/:id", authenticate, CommentsController.deleteComment);
  v1.post(
    "/replies",
    uploader.single("image"),
    authenticate,
    CommentsController.postComment
  );

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
