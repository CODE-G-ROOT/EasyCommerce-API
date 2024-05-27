import { v2 as cloudinary } from "cloudinary";
import { CLOUDNAME, API_KEY, API_SECRET } from "./utils";
import { UploadedFile } from "express-fileupload";
import { Request } from "express";

cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

export const uploadImage = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "replic",
  });
};

export const processImageUpload = async (file: UploadedFile) => {
  const img = file.tempFilePath;
  console.log(img);
  const result = await uploadImage(img);
  return result;
};

const handleSizeFileError = (file: any): void => {
  const maxImageSize = 52428800; //50MB
  if (file.size > maxImageSize)
    throw new Error("El tamaño del archivo supera los 50 MB");
};

const handleExtensionFile = (name: string): void => {
  const extensionesValidas = [
    "jpeg",
    "jpg",
    "gif",
    "webp",
    "svg",
    "mp4",
    "webm",
  ];

  const isValidate = extensionesValidas.includes(name);

  if (!isValidate)
    throw new Error("The extension file isn't validate, see the documentation");
};

export const handleFileUpload = async (req: Request) => {
  const image = req.files?.img;
  let files = [];

  if (!image) throw new Error("No se ha subido ningún archivo");

  if (Array.isArray(image)) {
    for (const file of image) {
      handleSizeFileError(file);
      const fileName = file.name.split(".");
      handleExtensionFile(fileName[1]);
      const name = fileName[0];
      const { public_id, resource_type, bytes, secure_url } =
        await processImageUpload(file);
      files.push({ name, public_id, resource_type, bytes, secure_url });
    }
    return files;
  } else {
    handleSizeFileError(image);
    files[0] = await processImageUpload(image as UploadedFile);
  }

  if (files.length === 0) throw new Error("Error with the img");

  return files;
};
