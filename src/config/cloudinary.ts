import { v2 as cloudinary } from "cloudinary";
import { CLOUDNAME, API_KEY, API_SECRET } from "../utils/utils";
import { UploadedFile } from "express-fileupload";
import { Request } from "express";
import { UploadedImage } from "../interfaces/types";

cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const validateFileSize = (file: any): void => {
  const maxImageSize = 52428800; //50MB
  if (file.size > maxImageSize)
    throw new Error("File size exceeds 50 MB.");
};

const validateFileExtension = (name: string): void => {
  const validExtensions = ["jpeg", "jpg", "gif", "webp", "svg", "mp4", "webm"];

  if (!validExtensions.includes(name.toLowerCase())) {
    throw new Error(
      "The file extension is invalid. Please refer to the documentation."
    );
  }
};

export const uploadImage = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "api",
  });
};


export const processImageUpload = async (file: UploadedFile): Promise<UploadedImage> => {
  const img = file.tempFilePath;
  const result = await uploadImage(img);
  return {
    name: file.name,
    public_id: result.public_id,
    resource_type: result.resource_type,
    bytes: result.bytes,
    secure_url: result.secure_url,
  };
};

export const handleFileUpload = async (
  req: Request
): Promise<UploadedImage[]> => {
  let image = req.files?.img;

  if (!image) throw new Error("No file uploaded");
  if (!Array.isArray(image)) {
    image = [image];
  }

  const files = await Promise.all(
    image.map(async (file) => {
      validateFileSize(file);
      const fileName = file.name.split(".");
      validateFileExtension(fileName[1]);
      return await processImageUpload(file);
    })
  );

  if (files.length === 0) throw new Error("Error processing image");
  return files;
};
