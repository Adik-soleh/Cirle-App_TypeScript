import { PrismaClient } from "@prisma/client";
import { PORT } from "./configs/config";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

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
const router = express.Router();
const port = PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// router.use("/", swaggerUI.serve);

async function main() {
  router.post("/register", AuthControllers.register);
  router.post("/login", AuthControllers.login);
  router.patch("/auth/reset", authenticate, AuthControllers.resetPassword);

  router.get("/vibes", authenticate, Redis.getVibes, VibeControllers.getVibes);
  router.get("/vibes/:id", authenticate, VibeControllers.getVibe);
  router.get("/vibes/user/:id", authenticate, VibeControllers.getUserVibes);
  router.post("/vibes",uploader.single("image"),authenticate,VibeControllers.postVibes);
  router.delete("/vibes/:id", authenticate, VibeControllers.deleteVibe);

  router.get("/follow/:id", authenticate, FollowControllers.follow);
  router.get("/unfollow/:id", authenticate, FollowControllers.unfollow);

  router.get("/find", authenticate, UserControllers.searchUser);
  router.post("/likes", authenticate, LikeControllers.likeMechanism);
  router.get("/me", authenticate, UserControllers.getLoggedUser);

  router.get("/users/:id", authenticate, UserControllers.getUser);
  router.get("/users", authenticate, UserControllers.getUsers);
  router.patch(
    "/users/me",
    uploader.fields([
      { name: "avatar", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
    authenticate,
    UserControllers.editUser
  );

  router.delete("/replies/:id", authenticate, CommentsController.deleteComment);
  router.post(
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
