import { hash, compare, genSaltSync } from "bcrypt";
import prisma from "../lib/prisma";

const hashPassword = (password: string) => {
  const salt = genSaltSync(10);
  return hash(password, salt);
};

export const resetPasswordService = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  // 1. Cari user
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, password: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 2. Verifikasi password lama
  const isMatch = await compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  // 3. Hash password baru
  const hashedPassword = await hashPassword(newPassword);

  // 4. Update password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return {
    message: "Password updated successfully",
    data: {
      id: user.id,
      email: user.email,
    },
  };
};
