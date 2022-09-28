import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const timeslots = await prisma.timeslot.findMany();

  res.status(200).json(timeslots);
};
