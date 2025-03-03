
import { Router } from "express"
import upload from "../multer/multer.js"
import userRouter from "./user.routes.js";
import regionRouter from "./region.routes.js";
import categoryRouter from "./category.routes.js";
import bannerRouter from "./banner.routes.js";
import commentRouter from "./comment.routes.js";
import likeRouter from "./like.routes.js";
import verifyToken from "../middlewares/token.middleware.js";
import transActionRouter from "./transaction.routes.js";
const mainRouter = Router()
mainRouter.use("/user",userRouter)
mainRouter.use("/region",regionRouter)
mainRouter.use("/category",categoryRouter)
mainRouter.use("/banner",bannerRouter)
mainRouter.use("/comment",commentRouter)
mainRouter.use("/like",verifyToken,likeRouter)
mainRouter.use("/transaction",verifyToken,transActionRouter)
mainRouter.use("/upload", upload.array("image"), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
    }
    const filenames = req.files.map(file => file.filename);
    res.status(201).json({ images: filenames });
});
mainRouter.use("/uploadUserphoto", upload.single("image"), (req, res) => {
    if (!req.file|| req.file.length === 0) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(201).json({ image: req.file.filename });
});
export default mainRouter