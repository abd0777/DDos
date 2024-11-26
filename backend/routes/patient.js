import express from 'express';
import Patient from '../models/patientModel.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const patients = await Patient.find();  // Retrieve all patient data from the database
    res.json(patients);  // Return the patient data as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });  // Handle errors with a 500 status
  }
});

export default router;
