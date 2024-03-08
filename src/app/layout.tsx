import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import Nav from '@/components/ui/Nav/Nav'
import './globals.css'

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '900'],
})

export const metadata: Metadata = {
	title: 'Dev-Threads',
	description: 'E-commerce Website',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={raleway.className}>
				<Nav />
				{children}
			</body>
		</html>
	)
}
