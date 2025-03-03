import { Router } from "express";
import { create, remove} from "../controllers/like.controller.js";
import verifyToken from "../middlewares/token.middleware.js";

const likeRouter=Router()


likeRouter.post("/",verifyToken,create)
likeRouter.delete("/:id",verifyToken,remove)
export default likeRouter

/**
 * @swagger
 * /like:
 *   post:
 *     summary: "Bannerga like qo‘shish"
 *     description: "Ushbu endpoint bannerga like qo‘shish uchun ishlatiladi. Foydalanuvchi autentifikatsiyadan o‘tgan bo‘lishi kerak."
 *     tags:
 *       - Like
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bannerId
 *             properties:
 *               bannerId:
 *                 type: integer
 *                 example: 123
 *                 description: "Like qo‘shilayotgan bannerning ID raqami"
 *     responses:
 *       201:
 *         description: "Like muvaffaqiyatli qo‘shildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Like muvaffaqiyatli qo‘shildi"
 *       400:
 *         description: "Xato so‘rov (yetishmayotgan yoki noto‘g‘ri ma’lumotlar)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Noto‘g‘ri ma’lumot kiritildi"
 *       401:
 *         description: "Foydalanuvchi autentifikatsiyadan o‘tmagan"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Avtorizatsiyadan o‘tish talab qilinadi"
 *       404:
 *         description: "Bunday ID bilan banner topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday ID bilan banner topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */



/**
 * @swagger
 * /like/{id}:
 *   delete:
 *     summary: "Like-ni o‘chirish"
 *     description: "Ushbu endpoint mavjud like-ni o‘chirish uchun ishlatiladi. Foydalanuvchi autentifikatsiyadan o‘tgan bo‘lishi kerak."
 *     tags:
 *       - Like
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "O‘chirilishi kerak bo‘lgan like-ning ID raqami"
 *     responses:
 *       200:
 *         description: "Like muvaffaqiyatli o‘chirildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Like muvaffaqiyatli o‘chirildi"
 *       401:
 *         description: "Foydalanuvchi autentifikatsiyadan o‘tmagan"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Avtorizatsiyadan o‘tish talab qilinadi"
 *       404:
 *         description: "Bunday ID bilan like topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday ID bilan like topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */
