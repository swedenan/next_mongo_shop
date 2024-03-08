'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { User } from '@prisma/client'
import { mainLinks } from '@/constants'
import { userLinks } from '@/constants'

//icons
import {
	ChevronsLeftRight,
	Heart,
	ShoppingBasket,
	X,
	UserRound,
	Equal,
} from 'lucide-react'

interface NavbarProps {
	user: User
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
	const [openUserMenu, setOpenUserMenu] = useState(false)
	const [openMobileMenu, setOpenMobileMenu] = useState(false)
	// const [user, setUser] = useState(false)

	const handlerUserMenu = () => {
		setOpenUserMenu(!openUserMenu)
	}

	const handlerMobileMenu = () => {
		setOpenMobileMenu(!openMobileMenu)
	}

	return (
		<nav>
			<div className='main-container border-b border-1 flex justify-between items-center py-2 relative'>
				<Link href={'/'}>
					<div className='flex gap-1 items-center text-xl font-medium text-black'>
						<h1>DEV-THREADS</h1>
						<ChevronsLeftRight />
					</div>
				</Link>

				<ul className='flex gap-10 max-md:hidden'>
					{mainLinks.map(el => (
						<Link href={el.route} key={el.label}>
							<li>{el.label}</li>
						</Link>
					))}
				</ul>
				<div className='flex gap-5 text-xl [&>*]:cursor-pointer'>
					<ShoppingBasket />
					<Heart />
					<div className='max-md:hidden' onClick={handlerUserMenu}>
						<UserRound />
					</div>
					<div className='md:hidden' onClick={handlerMobileMenu}>
						{openMobileMenu ? <X /> : <Equal />}
					</div>
				</div>

				{/* USER MENU */}

				{openUserMenu && (
					<div className='z-10 absolute right-0 top-10 w-28 bg-gray-700 shadow-md rounded-md p-4 text-white max-md:hidden text-center'>
						{!user ? (
							<ul className='flex flex-col gap-3'>
								<Link href={'/sing-in'}>
									<li>Log In</li>
								</Link>
								<Link href={'/sing-up'}>
									<li>Sing Up</li>
								</Link>
							</ul>
						) : (
							<ul>
								{userLinks.map(el => (
									<Link key={el.label} href={el.route}>
										<li>{el.label}</li>
									</Link>
								))}
								<li
									className='cursor-pointer'
									onClick={() => signOut()}
								>
									Sing Out
								</li>
							</ul>
						)}
					</div>
				)}
			</div>

			{/* MOBILE MENU */}

			{openMobileMenu && (
				<div className='md:hidden'>
					<div className='absolute right-5 w-48 bg-gray-700 py-5 shadow-md rounded-md p-4 text-white z-[99999]'>
						<ul className='flex flex-col gap-5 items-center'>
							{mainLinks.map(el => (
								<Link href={el.route} key={el.label}>
									<li>{el.label}</li>
								</Link>
							))}
							{!user ? (
								<>
									<Link href={'/sing-in'}>
										<li>Log In</li>
									</Link>
									<Link href={'/sing-up'}>
										<li>Sing Up</li>
									</Link>
								</>
							) : (
								<>
									{userLinks.map(el => (
										<Link key={el.label} href={el.route}>
											<li>{el.label}</li>
										</Link>
									))}
									<li
										className='cursor-pointer'
										onClick={() => signOut()}
									>
										Sing Out
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			)}
		</nav>
	)
}

export default Navbar
