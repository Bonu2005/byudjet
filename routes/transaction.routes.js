import { Router } from "express";
import { create, getAll, getOne } from "../controllers/transaction.controller.js";
import verifyToken from "../middlewares/token.middleware.js";

const transActionRouter=Router()
transActionRouter.get("/",getAll)
transActionRouter.get("/:id",getOne)
transActionRouter.post("/",verifyToken,create)
export default transActionRouter
/**
 * @swagger
 * tags:
 *   - name: Transaction
 *     description: transaction bilan bog'liq barcha amallars
 */

/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: "transaction ro'yxatini olish"
 *     description: "Bu so'rov markazlar ro'yxatini qaytaradi. Paginatsiya, saralash va filtratsiya parametrlari qo'llab-quvvatlanadi."
 *     operationId: gettransactions
 *     tags:
 *       - Transaction
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
 * /transaction/{id}:
 *   get:
 *     summary: transaction ID bo'yicha olish
 *     description: Ushbu so'rov markazning batafsil ma'lumotlarini ID bo'yicha qaytaradi. Faqat 'ADMIN' yoki 'CEO' roliga ega foydalanuvchilar foydalanishi mumkin.
 *     operationId: gettransactionById
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: transaction unikalligi bo'yicha ID raqami.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: transaction ma'lumotlari muvaffaqiyatli qaytarildi
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
 * /transaction:
 *   post:
 *     summary: "Yangi tranzaksiya yaratish"
 *     description: "Ushbu endpoint orqali banner uchun yangi tranzaksiya yaratish mumkin. Foydalanuvchi avtorizatsiyadan o‘tgan bo‘lishi shart."
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bannerId:
 *                 type: integer
 *                 example: 5
 *                 description: "Tranzaksiya bog‘lanadigan banner ID"
 *               summa:
 *                 type: number
 *                 example: 1000
 *                 description: "Tranzaksiya summasi (musbat bo‘lishi kerak)"
 *     responses:
 *       200:
 *         description: "Tranzaksiya muvaffaqiyatli yaratildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tranzaksiya muvaffaqiyatli yaratildi"
 *                 transaction:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     bannerId:
 *                       type: integer
 *                       example: 5
 *                     summa:
 *                       type: number
 *                       example: 1000
 *                     userId:
 *                       type: integer
 *                       example: 2
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
 *         description: "Banner topilmadi"
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