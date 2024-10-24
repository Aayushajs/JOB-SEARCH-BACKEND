import express from 'express';
import multer from 'multer';
import { getAllCourses, addCourse, deleteCourse, updateCourse } from '../controllers/coursesController.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

// Create Cloudinary storage using Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'courses',
    allowedFormats: ['jpg', 'png'],
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Define routes
router.get('/', getAllCourses);
router.post('/add', upload.single('image'), addCourse);
router.delete('/delete/:id', deleteCourse);
router.put('/update/:id', upload.single('image'), updateCourse);

export default router;
