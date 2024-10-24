import mongoose from 'mongoose';

// Define the schema for Banner
const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'], // Title field, required
  },
  subtitle: {
    type: String,
    required: [true, 'Subtitle is required'], // Subtitle field, required
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'], // Cloudinary Image URL
  },
  link:
  {
    type: String,
    required: [false, 'Link URL is required'], // Link URL
  }
});

// Create and export the Banner model
const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
