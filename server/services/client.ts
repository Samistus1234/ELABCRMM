import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ClientService = {
  async createClient(data: any) {
    const qualification = await prisma.qualification.create({
      data: {
        type: data.qualification.type,
        specialization: data.qualification.specialization,
        yearCompleted: data.qualification.yearCompleted,
      },
    });

    return prisma.client.create({
      data: {
        ...data,
        qualificationId: qualification.id,
        dateOfBirth: new Date(data.dateOfBirth),
        applicationDate: new Date(data.applicationDate),
        expectedCompletionDate: new Date(data.expectedCompletionDate),
      },
      include: {
        qualification: true,
      },
    });
  },

  async updateClient(id: string, data: any) {
    if (data.qualification) {
      await prisma.qualification.update({
        where: { id: data.qualification.id },
        data: data.qualification,
      });
    }

    return prisma.client.update({
      where: { id },
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        applicationDate: new Date(data.applicationDate),
        expectedCompletionDate: new Date(data.expectedCompletionDate),
      },
      include: {
        qualification: true,
      },
    });
  },

  async deleteClient(id: string) {
    const client = await prisma.client.findUnique({
      where: { id },
      select: { qualificationId: true },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    await prisma.$transaction([
      prisma.communication.deleteMany({ where: { clientId: id } }),
      prisma.document.deleteMany({ where: { clientId: id } }),
      prisma.application.deleteMany({ where: { clientId: id } }),
      prisma.client.delete({ where: { id } }),
      prisma.qualification.delete({ where: { id: client.qualificationId } }),
    ]);

    return true;
  },

  async getClientById(id: string) {
    return prisma.client.findUnique({
      where: { id },
      include: {
        qualification: true,
        applications: true,
        documents: true,
        communications: true,
      },
    });
  },

  async getAllClients() {
    return prisma.client.findMany({
      include: {
        qualification: true,
        applications: true,
      },
    });
  },
};