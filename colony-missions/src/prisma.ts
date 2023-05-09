import { PrismaClient, Mission, Colony } from '@prisma/client'

export const prisma = new PrismaClient()

export * from '@prisma/client'

export type MissionWithColony = Mission & { colony: Colony}
