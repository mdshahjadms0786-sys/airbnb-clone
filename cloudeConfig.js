const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "wanderlust_DEV",
        allowed_formats: ["png", "jpg", "jpeg", "gif", "webp"],
        resource_type: "auto",
        transformation: [{ width: 1200, height: 800, crop: "limit" }]
    },
});

module.exports = {
    cloudinary,
    storage,
};
