import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
// router.get('/', async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.json(patients);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
 router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
