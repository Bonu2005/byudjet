import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/region.controller.js";
import verifyToken from "../middlewares/token.middleware.js";
import { rolePolice } from "../middlewares/rolePolice.middleware.js";
const regionRouter=Router()

regionRouter.get("/",getAll)
regionRouter.get("/:id",getOne)
regionRouter.post("/",verifyToken,rolePolice(["ADMIN"]),create)
regionRouter.patch("/:id",verifyToken,rolePolice(["ADMIN"]),update)
regionRouter.delete("/:id",verifyToken,rolePolice(["ADMIN"]),remove)
export default regionRouter
/**
 * @swagger
 * tags:
 *   - name: Region
 *     description: region bilan bog'liq barcha amallars
 */

/**
 * @swagger
 * /region:
 *   get:
 *     summary: "region ro'yxatini olish"
 *     description: "Bu so'rov markazlar ro'yxatini qaytaradi. Paginatsiya, saralash va filtratsiya parametrlari qo'llab-quvvatlanadi."
 *     operationId: getregions
 *     tags:
 *       - Region
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
 * /region/{id}:
 *   get:
 *     summary: region ID bo'yicha olish
 *     description: Ushbu so'rov markazning batafsil ma'lumotlarini ID bo'yicha qaytaradi. Faqat 'ADMIN' yoki 'CEO' roliga ega foydalanuvchilar foydalanishi mumkin.
 *     operationId: getregionById
 *     tags:
 *       - Region
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: region unikalligi bo'yicha ID raqami.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: region ma'lumotlari muvaffaqiyatli qaytarildi
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
 * /region:
 *   post:
 *     summary: "Yangi hudud (region) qo‘shish"
 *     description: "Ushbu endpoint yangi hudud qo‘shish uchun ishlatiladi. Faqat ADMIN ro‘liga ega foydalanuvchilar foydalanishi mumkin."
 *     tags:
 *       - Region
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
 *                 example: "Toshkent"
 *     responses:
 *       201:
 *         description: "Hudud muvaffaqiyatli qo‘shildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hudud muvaffaqiyatli qo‘shildi"
 *       400:
 *         description: "Xato so‘rov (noto‘g‘ri yoki yetishmayotgan ma’lumotlar)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Noto‘g‘ri ma’lumot kiritildi"
 *       403:
 *         description: "Ruxsat yo‘q (faqat ADMIN foydalanishi mumkin)"
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
 * /region/{id}:
 *   patch:
 *     summary: "Hudud (region) nomini o'zgartirish"
 *     description: "Ushbu endpoint mavjud hududning nomini yangilash uchun ishlatiladi. Faqat ADMIN ro‘liga ega foydalanuvchilar foydalanishi mumkin."
 *     tags:
 *       - Region
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "Hududning unikal identifikatori"
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
 *                 example: "Samarqand"
 *     responses:
 *       200:
 *         description: "Hudud nomi muvaffaqiyatli yangilandi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hudud nomi yangilandi"
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
 *       403:
 *         description: "Ruxsat yo‘q (faqat ADMIN foydalanishi mumkin)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sizda ushbu amalni bajarish uchun ruxsat yo‘q"
 *       404:
 *         description: "Bunday ID bilan hudud topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday ID bilan hudud topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /region/{id}:
 *   delete:
 *     summary: "Hududni o‘chirish"
 *     description: "Ushbu endpoint mavjud hududni o‘chirish uchun ishlatiladi. Faqat ADMIN ro‘liga ega foydalanuvchilar foydalanishi mumkin."
 *     tags:
 *       - Region
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "Hududning unikal identifikatori"
 *     responses:
 *       200:
 *         description: "Hudud muvaffaqiyatli o‘chirildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hudud muvaffaqiyatli o‘chirildi"
 *       403:
 *         description: "Ruxsat yo‘q (faqat ADMIN foydalanishi mumkin)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sizda ushbu amalni bajarish uchun ruxsat yo‘q"
 *       404:
 *         description: "Bunday ID bilan hudud topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday ID bilan hudud topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */

