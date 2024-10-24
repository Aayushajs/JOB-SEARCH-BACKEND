import Banner from '../models/banner.js';

// POST: Upload a new banner
export const uploadBanner = async (req, res) => {
  const { title, subtitle , link } = req.body;
  const image = req.file.path; // Cloudinary image URL
 
  try {
    const newBanner = new Banner({
      title,
      subtitle,
      image,
      link,
    });
    await newBanner.save();
    res.status(201).json({ message: 'Banner uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Fetch all banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// delete banner 
export const deleteBanner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const deletedBanner = await Banner.findByIdAndDelete(bannerId);
        if (!deletedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }
    } catch(err){
        res.status(500).json({error:err.message});
    }
}