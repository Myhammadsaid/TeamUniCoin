'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
	const [passcode, setPasscode] = useState('')
	const router = useRouter()

	const handleLogin = e => {
		e.preventDefault()
		// Простой пин-код для защиты админки (можно изменить на нужный)
		if (passcode === '2026') {
			localStorage.setItem('isAdminAuthenticated', 'true')
			router.push('/admin/dashboard')
		} else {
			alert('Неверный код доступа администратора! (Используйте: 2026)')
		}
	}

	return (
		<div className='min-h-screen bg-slate-900 flex items-center justify-center p-6'>
			<div className='bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6'>
				<div className='text-center space-y-2'>
					<div className='w-12 h-12 bg-indigo-600 text-white rounded-2xl mx-auto flex items-center justify-center text-xl font-bold'>
						🔒
					</div>
					<h1 className='text-2xl font-black text-slate-900'>
						Staff Portal Login
					</h1>
					<p className='text-xs text-slate-400'>
						Введите PIN-код администратора для доступа
					</p>
				</div>

				<form onSubmit={handleLogin} className='space-y-4'>
					<div>
						<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'>
							Admin Passcode
						</label>
						<input
							type='password'
							placeholder='••••'
							value={passcode}
							onChange={e => setPasscode(e.target.value)}
							className='w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-indigo-600'
							autoFocus
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition'
					>
						Войти в систему
					</button>
				</form>
			</div>
		</div>
	)
}
