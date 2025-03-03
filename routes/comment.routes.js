import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/comment.controller.js";
import verifyToken from "../middlewares/token.middleware.js";
import { rolePolice } from "../middlewares/rolePolice.middleware.js";

const commentRouter=Router()

commentRouter.get("/",verifyToken,rolePolice('ADMIN'),getAll)
commentRouter.get("/:id",verifyToken,rolePolice('ADMIN'),getOne)
commentRouter.post("/",verifyToken,create)
commentRouter.patch("/:id",verifyToken,update)
commentRouter.delete("/:id",verifyToken,remove)
export default commentRouter
/**
 * @swagger
 * tags:
 *   - name: Comment
 *     description: comment bilan bog'liq barcha amallars
 */

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: "Comment ro'yxatini olish"
 *     description: "Bu so'rov markazlar ro'yxatini qaytaradi. Paginatsiya, saralash va filtratsiya parametrlari qo'llab-quvvatlanadi."
 *     operationId: getcomments
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: "Olingan sahifa raqami. Default: 1."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: "Sahifadagi elementlar soni. Default: 10."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: "Saralash uchun maydon nomi."
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         description: "Saralash tartibi. Default: 'ASC' (masalan, 'ASC' yoki 'DESC')."
 *         schema:
 *           type: string
 *       - in: query
 *         name: filter
 *         required: false
 *         description: "Filtr parametrlari (masalan, markaz nomi, status va hokazo)."
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: "Markazlar ro'yxati muvaffaqiyatli qaytarildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   photo:
 *                     type: string
 *                   location:
 *                     type: string
 *                   regionId:
 *                     type: integer
 *       400:
 *         description: "Noto'g'ri so'rov parametrlaridan foydalanilgan."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi"
 */



/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Comment ID bo'yicha olish
 *     description: Ushbu so'rov markazning batafsil ma'lumotlarini ID bo'yicha qaytaradi. Faqat 'ADMIN' yoki 'CEO' roliga ega foydalanuvchilar foydalanishi mumkin.
 *     operationId: getcommentById
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment unikalligi bo'yicha ID raqami.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment ma'lumotlari muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *       400:
 *         description: Noto'g'ri so'rov parametrlar
 *       401:
 *         description: Avtorizatsiya qilinmagan foydalanuvchi
 *       403:
 *         description: Foydalanuvchida kerakli ruxsat yo'q
 *       404:
 *         description: Markaz topilmadi
 *       500:
 *         description: Ichki server xatosi
 */


/**
 * @swagger
 * /comment:
 *   post:
 *     summary: "commentga kommentariya qo‘shish"
 *     description: "Ushbu endpoint commentga kommentariya yozish uchun ishlatiladi. Foydalanuvchi autentifikatsiyadan o‘tgan bo‘lishi kerak."
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - msg_txt
 *               - commentId
 *             properties:
 *               msg_txt:
 *                 type: string
 *                 example: "Juda zo‘r reklama!"
 *                 description: "Kommentariya matni"
 *               commentId:
 *                 type: integer
 *                 example: 123
 *                 description: "Kommentariya qoldirilayotgan commentning ID raqami"
 *     responses:
 *       201:
 *         description: "Kommentariya muvaffaqiyatli qo‘shildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kommentariya muvaffaqiyatli qo‘shildi"
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
 *         description: "Bunday ID bilan comment topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday ID bilan comment topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /comment/{id}:
 *   patch:
 *     summary: "Kommentariya matnini o‘zgartirish"
 *     description: "Ushbu endpoint orqali mavjud kommentariyaning matnini o‘zgartirish mumkin. Foydalanuvchi autentifikatsiyadan o‘tgan bo‘lishi kerak."
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "O‘zgartirilishi kerak bo‘lgan kommentariyaning ID raqami"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - msg_txt
 *             properties:
 *               msg_txt:
 *                 type: string
 *                 example: "Yangi fikrimni qo‘shdim!"
 *                 description: "Yangilangan kommentariya matni"
 *     responses:
 *       200:
 *         description: "Kommentariya muvaffaqiyatli yangilandi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kommentariya muvaffaqiyatli yangilandi"
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
 *         description: "Bunday ID bilan kommentariya topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday ID bilan kommentariya topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: "Kommentariyani o‘chirish"
 *     description: "Ushbu endpoint orqali mavjud kommentariyani o‘chirish mumkin. Foydalanuvchi autentifikatsiyadan o‘tgan bo‘lishi kerak."
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "O‘chirilishi kerak bo‘lgan kommentariyaning ID raqami"
 *     responses:
 *       200:
 *         description: "Kommentariya muvaffaqiyatli o‘chirildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kommentariya muvaffaqiyatli o‘chirildi"
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
 *         description: "Bunday ID bilan kommentariya topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday ID bilan kommentariya topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */
