import { prisma } from '@/backend/utils/prisma'

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany()
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    })
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    })
  }

  async createUser(data: { email: string; name?: string }) {
    return await prisma.user.create({
      data,
    })
  }

  async updateUser(id: string, data: { email?: string; name?: string }) {
    return await prisma.user.update({
      where: { id },
      data,
    })
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    })
  }
}

export const userService = new UserService()
