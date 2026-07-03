import express, { Request, Response } from "express";
import { authService } from "./auth.service";
import { userService } from "../user/user.service";

const authRouter = express.Router();

/** 
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad Request
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Invalid Credentials
 */
 

authRouter.post("/register", async (req: Request, res: Response) => {
  const user = req.body;
  const result = await userService.createUser(user);
  res.status(201).send(result);
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.send(result);
  } catch (error: any) {
    res.status(401).send({ message: error.message });
  }
});

export default authRouter;
