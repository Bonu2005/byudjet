import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/banner.controller.js";
import verifyToken from "../middlewares/token.middleware.js";
import { rolePolice } from "../middlewares/rolePolice.middleware.js";

const bannerRouter=Router()

bannerRouter.get("/",getAll)
bannerRouter.get("/:id",getOne)
bannerRouter.post("/",verifyToken,rolePolice(["ADMIN"]),create)
bannerRouter.patch("/:id",verifyToken,rolePolice(["ADMIN"]),update)
bannerRouter.delete("/:id",verifyToken,rolePolice(["ADMIN"]),remove)
export default bannerRouter

/**
 * @swagger
 * tags:
 *   - name: Banner
 *     description: Banner bilan bog'liq barcha amallars
 */

/**
 * @swagger
 * /banner:
 *   get:
 *     summary: "Markazlar ro'yxatini olish"
 *     description: "Bu so'rov markazlar ro'yxatini qaytaradi. Paginatsiya, saralash va filtratsiya parametrlari qo'llab-quvvatlanadi."
 *     operationId: getbanners
 *     tags:
 *       - Banner
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
 * /banner/{id}:
 *   get:
 *     summary: Markazni ID bo'yicha olish
 *     description: Ushbu so'rov markazning batafsil ma'lumotlarini ID bo'yicha qaytaradi. Faqat 'ADMIN' yoki 'CEO' roliga ega foydalanuvchilar foydalanishi mumkin.
 *     operationId: getBannerById
 *     tags:
 *       - Banner
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
 * /banner:
 *   post:
 *     summary: "Yangi banner yaratish"
 *     description: "Ushbu endpoint orqali yangi banner yaratish mumkin. Faqat ADMIN ro‘liga ega foydalanuvchilar ruxsat oladi."
 *     tags:
 *       - Banner
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
 *               - description
 *               - target
 *               - image
 *               - categoryId
 *               - regions
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yangi banner"
 *                 description: "Banner nomi"
 *               description:
 *                 type: string
 *                 example: "Bu banner reklama uchun"
 *                 description: "Banner haqida qisqacha ma'lumot"
 *               target:
 *                 type: number
 *                 example: 10000
 *                 description: "Banner maqsadi (byudjet yoki ko‘rsatish soni)"
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                 description: "Bannerga tegishli rasmlar (URL formatida)"
 *               categoryId:
 *                 type: number
 *                 example: 2
 *                 description: "Banner tegishli bo‘lgan kategoriya ID"
 *               regions:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1, 2, 3]
 *                 description: "Banner ko‘rsatiladigan hududlar IDlari"
 *     responses:
 *       201:
 *         description: "Banner muvaffaqiyatli yaratildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Banner muvaffaqiyatli yaratildi"
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
 * /banner/{id}:
 *   patch:
 *     summary: "Bannerni o‘zgartirish"
 *     description: "Ushbu endpoint orqali mavjud banner ma'lumotlarini o‘zgartirish mumkin. Faqat ADMIN ro‘liga ega foydalanuvchilar ruxsat oladi."
 *     tags:
 *       - Banner
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "O‘zgartirilishi kerak bo‘lgan banner ID raqami"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yangilangan banner"
 *                 description: "Banner nomi"
 *               description:
 *                 type: string
 *                 example: "Bu banner yangilangan reklama uchun"
 *                 description: "Banner haqida qisqacha ma'lumot"
 *               target:
 *                 type: number
 *                 example: 15000
 *                 description: "Banner maqsadi (byudjet yoki ko‘rsatish soni)"
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example: ["https://example.com/new-image1.jpg", "https://example.com/new-image2.jpg"]
 *                 description: "Yangilangan banner rasmlari (URL formatida)"
 *               categoryId:
 *                 type: number
 *                 example: 3
 *                 description: "Banner tegishli bo‘lgan yangi kategoriya ID"
 *               regions:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [2, 4, 5]
 *                 description: "Banner ko‘rsatiladigan yangilangan hududlar IDlari"
 *     responses:
 *       200:
 *         description: "Banner muvaffaqiyatli yangilandi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Banner muvaffaqiyatli yangilandi"
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
 * /banner/{id}:
 *   delete:
 *     summary: "Bannerni o‘chirish"
 *     description: "Ushbu endpoint orqali mavjud bannerni o‘chirish mumkin. Faqat ADMIN ro‘liga ega foydalanuvchilar ruxsat oladi."
 *     tags:
 *       - Banner
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "O‘chirilishi kerak bo‘lgan banner ID raqami"
 *     responses:
 *       200:
 *         description: "Banner muvaffaqiyatli o‘chirildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Banner muvaffaqiyatli o‘chirildi"
 *       400:
 *         description: "Xato so‘rov (noto‘g‘ri ID yoki noto‘g‘ri format)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Noto‘g‘ri ID yuborildi"
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
