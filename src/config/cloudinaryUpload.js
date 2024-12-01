const cloudinary = require("cloudinary").v2;
require("dotenv/config");
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const cloudinaryUpload = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: 'uploads', // Thay đổi folder nếu cần
      });
      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error('Upload failed');
    }
  };
  
  let uploadFromBuffer = (file) => {

    return new Promise((resolve, reject) => {
 
      let cld_upload_stream = cloudinary.uploader.upload_stream(
       {
         folder: "upload"
       },
       (error, result) => {
 
         if (result) {
           resolve(result);
         } else {
           reject(error);
          }
        }
      );
 
      streamifier.createReadStream(file).pipe(cld_upload_stream);
    });
 
 };

module.exports = {
    cloudinaryUpload,
    uploadFromBuffer
}
