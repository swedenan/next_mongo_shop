import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'
import AuthContext from '@/context/AuthContext'
import getCurrentSession from './(auth)/actions/getCurrentUser'

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '900'],
})

export const metadata: Metadata = {
	title: 'Dev-Threads',
	description: 'E-commerce Website',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const user = await getCurrentSession()

	return (
		<html lang='en'>
			<body className={raleway.className}>
				<AuthContext>
					<Navbar user={user!} />
					{children}
				</AuthContext>
			</body>
		</html>
	)
}
