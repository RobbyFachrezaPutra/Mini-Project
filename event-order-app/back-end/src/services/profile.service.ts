import prisma from "../lib/prisma";
import {
  uploadImageToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary";

async function getProfileService(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      profile_picture: true,
      role: true,
    },
  });

  if (!user) {
    return {
      status: false,
      code: 404,
      message: "User not found",
    };
  }
  return user;
}

async function updateProfileService(
  email: string,
  data: {
    first_name?: string;
    last_name?: string;
    profile_picture?: string;
    referral_code?: string;
  },
  file?: Express.Multer.File
) {
  if (file) {
    const uploadResult = await uploadImageToCloudinary(file);
    data.profile_picture = uploadResult?.secure_url;
  }

  return await prisma.user.update({
    where: { email },
    data,
  });
}

async function deleteProfilePictureService(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { profile_picture: true },
  });

  if (
    user?.profile_picture &&
    user.profile_picture !== "Profile_avatar_placeholder_large.png"
  ) {
    try {
      await deleteFromCloudinary(user.profile_picture);
    } catch (err) {
      console.error("Failed to delete from Cloudinary:", err);
    }
  }

  return await prisma.user.update({
    where: { email },
    data: { profile_picture: "Profile_avatar_placeholder_large.png" },
  });
}

export { getProfileService, updateProfileService, deleteProfilePictureService };
