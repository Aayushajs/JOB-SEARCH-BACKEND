import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';
import { uploadBanner, getBanners } from '../controllers/bannerController.js';
import { deleteBanner } from '../controllers/bannerController.js';

const router = express.Router();

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'banners',
    format: async () => 'png',
    public_id: (req, file) => Date.now().toString(),
  },
});

const upload = multer({ storage });

// Routes
router.post('/banner', upload.single('image'), uploadBanner); // Upload a banner
router.get('/banners', getBanners); // Fetch all banners
router.delete('/banner/:id', deleteBanner); // Delete a banner


export default router;
