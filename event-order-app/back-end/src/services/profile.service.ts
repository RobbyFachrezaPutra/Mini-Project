import prisma from "../lib/prisma";
import { IProfileResponse } from "../interface/profile.interface";
import { uploadImageToCloudinary } from "../utils/cloudinary";

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

async function editProfileService(
  email: string,
  data: IProfileResponse,
  file?: Express.Multer.File
) {
  if (file) {
    const uploadResult = await uploadImageToCloudinary(file);
    data.profile_picture = uploadResult?.secure_url;
  }
  const updatedUser = await prisma.user.update({
    where: { email },
    data,
  });

  return updatedUser;
}

export { getProfileService, editProfileService };
