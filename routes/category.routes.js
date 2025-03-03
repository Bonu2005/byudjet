import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/category.controller.js";
import verifyToken from "../middlewares/token.middleware.js";
import { rolePolice } from "../middlewares/rolePolice.middleware.js";

const categoryRouter=Router()

categoryRouter.get("/",getAll)
categoryRouter.get("/:id",getOne)
categoryRouter.post("/",verifyToken,rolePolice(["ADMIN"]),create)
categoryRouter.patch("/:id",verifyToken,rolePolice(["ADMIN"]),update)
categoryRouter.delete("/:id",verifyToken,rolePolice(['ADMIN']),remove)
export default categoryRouter
/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category bilan bog'liq barcha amallars
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: "Category ro'yxatini olish"
 *     description: "Bu so'rov Category ro'yxatini qaytaradi. Paginatsiya, saralash va filtratsiya parametrlari qo'llab-quvvatlanadi."
 *     operationId: getcategory
 *     tags:
 *       - Category
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
 * /category/{id}:
 *   get:
 *     summary: Category ID bo'yicha olish
 *     description: Ushbu so'rov markazning batafsil ma'lumotlarini ID bo'yicha qaytaradi. Faqat 'ADMIN' yoki 'CEO' roliga ega foydalanuvchilar foydalanishi mumkin.
 *     operationId: getCategoryById
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Markazning unikalligi bo'yicha ID raqami.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Markazning ma'lumotlari muvaffaqiyatli qaytarildi
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
 * /category:
 *   post:
 *     summary: "Yangi kategoriya yaratish"
 *     description: "Ushbu endpoint orqali yangi kategoriya yaratish mumkin. Faqat ADMIN ro‘liga ega foydalanuvchilar ruxsat oladi."
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Texnologiya"
 *                 description: "Kategoriya nomi"
 *     responses:
 *       201:
 *         description: "Kategoriya muvaffaqiyatli yaratildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kategoriya muvaffaqiyatli yaratildi"
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
 *       403:
 *         description: "Ruxsat yo‘q (faqat ADMIN)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sizda ushbu amalni bajarish uchun ruxsat yo‘q"
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: "Kategoriyaning nomini o‘zgartirish"
 *     description: "Ushbu endpoint orqali mavjud kategoriyaning nomini o‘zgartirish mumkin. Faqat ADMIN ro‘liga ega foydalanuvchilar ruxsat oladi."
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "O‘zgartirilishi kerak bo‘lgan kategoriyaning ID raqami"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yangilangan texnologiya"
 *                 description: "Yangilangan kategoriya nomi"
 *     responses:
 *       200:
 *         description: "Kategoriya muvaffaqiyatli yangilandi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kategoriya muvaffaqiyatli yangilandi"
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
 *       403:
 *         description: "Ruxsat yo‘q (faqat ADMIN)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sizda ushbu amalni bajarish uchun ruxsat yo‘q"
 *       404:
 *         description: "Bunday ID bilan kategoriya topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday ID bilan kategoriya topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: "Kategoriyani o‘chirish"
 *     description: "Ushbu endpoint orqali mavjud kategoriyani o‘chirish mumkin. Faqat ADMIN ro‘liga ega foydalanuvchilar ruxsat oladi."
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "O‘chirilishi kerak bo‘lgan kategoriyaning ID raqami"
 *     responses:
 *       200:
 *         description: "Kategoriya muvaffaqiyatli o‘chirildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kategoriya muvaffaqiyatli o‘chirildi"
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
 *       403:
 *         description: "Ruxsat yo‘q (faqat ADMIN)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sizda ushbu amalni bajarish uchun ruxsat yo‘q"
 *       404:
 *         description: "Bunday ID bilan kategoriya topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday ID bilan kategoriya topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */
