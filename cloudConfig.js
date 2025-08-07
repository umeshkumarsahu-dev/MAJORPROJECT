const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,

});
console.log(cloudinary.config);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'wanderlust_DEV',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: file.originalname.split('.')[0],
  }),
});

module.exports = {
  cloudinary,
  storage
};
