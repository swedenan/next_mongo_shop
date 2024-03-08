import prisma from '@/lib/prismadb'
import getUserSession from './getUserSession'

const getCurrentSession = async () => {
	try {
		const session = await getUserSession()

		if (!session?.user?.email) return null

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		})

		if (!currentUser) return null
	} catch (err) {
		console.log(err)
		return null
	}
}

export default getCurrentSession
