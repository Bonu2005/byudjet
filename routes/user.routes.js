import { Router } from "express";
import { createAdmin, getAll, getOne, login, registr, remove, sendOtp, update, veerifyOtp } from "../controllers/user.controller.js";
import { selfPolice } from "../middlewares/selfPolice.middleware.js";
import {rolePolice} from "../middlewares/rolePolice.middleware.js"
import verifyToken from "../middlewares/token.middleware.js";


const userRouter=Router()
userRouter.post("/sendOtp",sendOtp)
userRouter.post("/verifyOtp",veerifyOtp)
userRouter.post("/registr",registr)
userRouter.post("/login",login)

userRouter.get("/",verifyToken,rolePolice(['ADMIN']),getAll)
userRouter.get("/:id",verifyToken,rolePolice(['ADMIN']),getOne)
userRouter.post("/createAdmin",verifyToken,rolePolice(['ADMIN']),createAdmin)
userRouter.patch("/:id",verifyToken,selfPolice(["USER","ADMIN"]),update)
userRouter.get("/:id",verifyToken,selfPolice(["USER","ADMIN"]),remove)
export default userRouter
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: user bilan bog'liq barcha amallars
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: "user ro'yxatini olish"
 *     description: "Bu so'rov markazlar ro'yxatini qaytaradi. Paginatsiya, saralash va filtratsiya parametrlari qo'llab-quvvatlanadi."
 *     operationId: getusers
 *     tags:
 *       - User
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
 * /user/{id}:
 *   get:
 *     summary: user ID bo'yicha olish
 *     description: Ushbu so'rov markazning batafsil ma'lumotlarini ID bo'yicha qaytaradi. Faqat 'ADMIN' yoki 'CEO' roliga ega foydalanuvchilar foydalanishi mumkin.
 *     operationId: getuserById
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: user unikalligi bo'yicha ID raqami.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: user ma'lumotlari muvaffaqiyatli qaytarildi
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
 * /user/sendOtp:
 *   post:
 *     summary: "Foydalanuvchiga OTP kod yuborish"
 *     description: "Bu endpoint foydalanuvchining elektron pochtasiga OTP kod yuborish uchun ishlatiladi."
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *     responses:
 *       200:
 *         description: "OTP kod muvaffaqiyatli yuborildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP kod emailingizga yuborildi"
 *       400:
 *         description: "Xato so‘rov (email noto‘g‘ri yoki berilmagan)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email kiritilishi shart"
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /user/verifyOtp:
 *   post:
 *     summary: "OTP kodni tasdiqlash"
 *     description: "Bu endpoint foydalanuvchining elektron pochtasi va OTP kodini tekshirish uchun ishlatiladi."
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp1
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *               otp1:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: "OTP muvaffaqiyatli tasdiqlandi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP kod tasdiqlandi"
 *       400:
 *         description: "Xato so‘rov (email yoki OTP noto‘g‘ri)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Noto‘g‘ri email yoki OTP"
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /user/registr:
 *   post:
 *     summary: "Foydalanuvchini ro‘yxatdan o‘tkazish"
 *     description: "Bu endpoint yangi foydalanuvchini ro‘yxatdan o‘tkazish uchun ishlatiladi."
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phone
 *               - regionId
 *               - email
 *               - password
 *               - photo
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Ali Valiyev"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               regionId:
 *                 type: integer
 *                 example: 1
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "P@ssw0rd!"
 *               balance:
 *                 type: number
 *                 example: 1000.50
 *                 description: "Hisob balansi (ixtiyoriy)"
 *               role:
 *                 type: string
 *                 example: "admin"
 *                 description: "Foydalanuvchi roli (ixtiyoriy)"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *     responses:
 *       201:
 *         description: "Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tkazildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tkazildi"
 *       400:
 *         description: "Xato so‘rov (to‘ldirilmagan yoki noto‘g‘ri ma’lumotlar)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "To‘ldirilmagan maydonlar mavjud"
 *       500:
 *         description: "Ichki server xatosi"
 */


