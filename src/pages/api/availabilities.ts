import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const availabilities = await prisma.availability.findMany({
    where: { practitionerId: +req.query.practitionerId },
  });

  res.status(200).json(availabilities);
};
