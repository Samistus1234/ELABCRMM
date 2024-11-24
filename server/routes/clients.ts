import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all clients
router.get('/', authenticateToken, async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        qualification: true,
        applications: true,
      },
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching clients' });
  }
});

// Get single client
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        qualification: true,
        applications: true,
        documents: true,
        communications: true,
      },
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching client' });
  }
});

// Create client
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      passportNumber,
      dateOfBirth,
      dataflowCaseNumber,
      applicationDate,
      expectedCompletionDate,
      qualification,
      packageType,
      paymentAmount,
    } = req.body;

    // Create qualification first
    const newQualification = await prisma.qualification.create({
      data: {
        type: qualification.type,
        specialization: qualification.specialization,
        yearCompleted: qualification.yearCompleted,
      },
    });

    // Create client with qualification
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        passportNumber,
        dateOfBirth: new Date(dateOfBirth),
        dataflowCaseNumber,
        applicationDate: new Date(applicationDate),
        expectedCompletionDate: new Date(expectedCompletionDate),
        qualificationId: newQualification.id,
        packageType,
        paymentAmount,
      },
      include: {
        qualification: true,
      },
    });

    res.status(201).json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Error creating client' });
  }
});

// Update client
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      passportNumber,
      dateOfBirth,
      dataflowCaseNumber,
      applicationDate,
      expectedCompletionDate,
      qualification,
      packageType,
      status,
      paymentStatus,
      paymentAmount,
    } = req.body;

    // Update qualification
    await prisma.qualification.update({
      where: { id: qualification.id },
      data: {
        type: qualification.type,
        specialization: qualification.specialization,
        yearCompleted: qualification.yearCompleted,
      },
    });

    // Update client
    const client = await prisma.client.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        passportNumber,
        dateOfBirth: new Date(dateOfBirth),
        dataflowCaseNumber,
        applicationDate: new Date(applicationDate),
        expectedCompletionDate: new Date(expectedCompletionDate),
        packageType,
        status,
        paymentStatus,
        paymentAmount,
      },
      include: {
        qualification: true,
      },
    });

    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error updating client' });
  }
});

// Delete client
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get client's qualification ID
    const client = await prisma.client.findUnique({
      where: { id },
      select: { qualificationId: true },
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Delete client and related records
    await prisma.$transaction([
      prisma.communication.deleteMany({ where: { clientId: id } }),
      prisma.document.deleteMany({ where: { clientId: id } }),
      prisma.application.deleteMany({ where: { clientId: id } }),
      prisma.client.delete({ where: { id } }),
      prisma.qualification.delete({ where: { id: client.qualificationId } }),
    ]);

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting client' });
  }
});

export default router;