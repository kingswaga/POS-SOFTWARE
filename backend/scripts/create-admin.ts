import bcrypt from 'bcryptjs'
import prisma from '../src/lib/prisma'

declare const process: {
  env: Record<string, string | undefined>
  exitCode?: number
}

const emailInput = process.env.ADMIN_EMAIL?.trim().toLowerCase()
const passwordInput = process.env.ADMIN_PASSWORD?.trim()
const name = process.env.ADMIN_NAME?.trim() || 'Administrator'

if (!emailInput || !passwordInput) {
  throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD before running create-admin.')
}

if (passwordInput.length < 6) {
  throw new Error('ADMIN_PASSWORD must be at least 6 characters long.')
}

const email = emailInput
const password = passwordInput

async function main() {
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    throw new Error(`A user with ${email} already exists.`)
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN',
    },
  })

  console.log(`Admin user created for ${email}.`)
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })