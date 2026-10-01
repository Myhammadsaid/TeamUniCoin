'use client'

import { useRouter } from 'next/navigation'
import { FaUserGear, FaUserShield } from 'react-icons/fa6'
import { IoLogOutOutline } from 'react-icons/io5'

export default function AdminHeader({ isSuperAdmin }) {
	const router = useRouter()

	const handleLogout = () => {
		localStorage.removeItem('isAdminAuthenticated')
		localStorage.removeItem('isSuperAdmin')
		router.push('/admin/login')
	}

	return (
		<div className='max-w-7xl mx-auto flex justify-between items-center bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm gap-3'>
			<div className='flex items-center gap-3 sm:gap-3.5 min-w-0'>
				<div className='w-9 h-9 sm:w-11 sm:h-11 bg-indigo-50 text-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl shadow-sm shrink-0'>
					{isSuperAdmin ? <FaUserGear /> : <FaUserShield />}
				</div>
				<div className='min-w-0'>
					<h1 className='text-lg sm:text-2xl font-black text-slate-900 tracking-tight truncate flex items-center gap-2'>
						<span>
							{isSuperAdmin ? 'Super Admin Panel' : 'Admin Control Center'}
						</span>
						{isSuperAdmin && (
							<span className='bg-purple-100 text-purple-700 text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded-full uppercase'>
								Super Admin
							</span>
						)}
					</h1>
					<p className='text-[11px] sm:text-xs text-slate-400 font-medium truncate hidden sm:block'>
						Управление финансами, товарами, студентами и безопасностью
					</p>
				</div>
			</div>

			<button
				onClick={handleLogout}
				className='bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs transition flex items-center gap-2 shrink-0'
				aria-label='Выйти'
				title='Выйти'
			>
				<IoLogOutOutline className='w-4 h-4 shrink-0' />
				<span className='hidden sm:inline'>Выйти</span>
			</button>
		</div>
	)
}
