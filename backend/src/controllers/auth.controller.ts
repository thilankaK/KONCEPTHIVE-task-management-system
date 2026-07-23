// // import { Request, Response } from "express";

// // export const login = async (req: Request, res: Response) => {
// //   res.status(200).json({
// //     success: true,
// //     message: "Login endpoint working",
// //   });
// // };






// import { Request, Response } from "express";

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Email and password are required",
//     });
//   }

//   // Database logic next step
//   return res.status(200).json({
//     success: true,
//     message: "Validation successful",
//     data: {
//       email,
//     },
//   });
// };




import { Request, Response } from "express";
import prisma from "../config/prisma";
import { comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";


import { AuthRequest } from "../types/auth.types";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};