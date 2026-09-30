import prisma from '../lib/prisma'

export const customerRepository = {
  findAll: () => prisma.customer.findMany(),
}
