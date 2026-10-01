'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaCoins, FaGraduationCap, FaUserShield } from 'react-icons/fa6'
import { IoMoonSharp } from 'react-icons/io5'

export const Navigation = () => {
	const pathname = usePathname()
	const isAdmin = pathname?.startsWith('/admin')

	return (
		<nav className='bg-white border-b border-slate-100 py-3.5 px-6 md:px-12 flex justify-between items-center shadow-sm'>
			{/* Левая часть: логотип и название */}
			<div className='flex items-center gap-3.5'>
				<div className='w-11 h-11 bg-amber-400 rounded-2xl flex items-center justify-center text-amber-950 shadow-md'>
					<FaCoins className='w-6 h-6' />
				</div>
				<div>
					<div className='font-black tracking-tight text-indigo-600 text-base md:text-lg leading-tight'>
						TEAM COINS
					</div>
					<div className='text-xs text-slate-400 font-medium tracking-wide'>
						Team University
					</div>
				</div>
			</div>

			{/* Правая часть: переключатель Student / Admin и иконка темы */}
			<div className='flex items-center gap-3'>
				<div className='bg-slate-100/80 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/60 shadow-inner'>
					<Link
						href='/'
						className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
							!isAdmin
								? 'bg-white text-indigo-600 shadow-sm'
								: 'text-slate-500 hover:text-slate-900'
						}`}
					>
						<FaGraduationCap className='w-4 h-4' />
						<span>Student</span>
					</Link>

					<Link
						href='/admin/login'
						className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
							isAdmin
								? 'bg-white text-indigo-600 shadow-sm'
								: 'text-slate-500 hover:text-slate-900'
						}`}
					>
						<FaUserShield className='w-4 h-4' />
						<span>Admin</span>
					</Link>
				</div>

				{/* Кнопка переключения темы */}
				<button
					aria-label='Toggle Theme'
					className='w-10 h-10 bg-slate-100/80 border border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shadow-sm'
				>
					<IoMoonSharp className='w-4 h-4' />
				</button>
			</div>
		</nav>
	)
}
