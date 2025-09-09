import { Router } from "express";
import { prismaClient } from "@repo/db/client";
import { SignInSchema, SignUpSchema } from "@repo/common/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const router: Router = Router();

router.post("/sign-up", async (req: Request, res: Response) => {
  try {
    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        // errors: parsedData.error.flatten()
        errors: parsedData.error,
      });
    }

    const { name, email, password } = parsedData.data;

    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User signed up successfully",
      userId: user.id,
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/sign-in", async (req: Request, res: Response) => {
  try {
    const parsedData = SignInSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error,
      });
    }

    const { email, password } = parsedData.data;

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Signed in successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
