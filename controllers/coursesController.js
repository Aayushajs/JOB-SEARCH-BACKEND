import Course from '../models/courseModel.js';
import cloudinary from '../utils/cloudinary.js';
 

export const addCourse = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newCourse = new Course({
      title: req.body.title,
      youtubeLink:req.body.youtubeLink,
      description: req.body.description,
      image: result.secure_url,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get all  courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).json(courses);
    
}  catch (error) {
  res.status(500).json({ message: error.message });
  console.log(error);

}
  };



// Add more methods for updating and deleting courses...


 export const updateCourse = async (req, res) => {
  try {
    const { title, description, youtubeLink } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, youtubeLink, imageUrl },
      { new: true }
    );

    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
