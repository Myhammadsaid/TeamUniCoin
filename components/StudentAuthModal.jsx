'use client'

import { useApp } from '@/context/AppContext'
import { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import {
	FaGraduationCap,
	FaLock,
	FaUserCheck,
	FaUserPlus,
} from 'react-icons/fa6'

export const StudentAuthModal = () => {
	const { students, loginStudent, registerStudent } = useApp()
	const [mode, setMode] = useState('login') // 'login' or 'register'

	// Login State
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedStudentId, setSelectedStudentId] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const dropdownRef = useRef(null)

	// Register State
	const [formData, setFormData] = useState({
		fullName: '',
		groupID: 'IFC-101',
		group: 'BSc Business Management',
		courseYear: 1,
		password: '',
	})

	// Закрытие выпадающего списка при клике вне компонента
	useEffect(() => {
		const handleClickOutside = event => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// Фильтрация студентов по поисковому запросу
	const filteredStudents = students.filter(
		s =>
			s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			s.groupID.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	const handleSelectStudent = student => {
		setSelectedStudentId(student.id)
		setSearchQuery(student.fullName)
		setIsDropdownOpen(false)
	}

	const handleLoginSubmit = e => {
		e.preventDefault()
		if (!selectedStudentId) {
			alert('Выберите студента для входа!')
			return
		}
		if (!loginPassword) {
			alert('Введите пароль!')
			return
		}

		const result = loginStudent(selectedStudentId, loginPassword)
		if (!result.success) {
			alert(result.message)
		}
	}

	const handleRegisterSubmit = e => {
		e.preventDefault()
		if (!formData.fullName.trim()) {
			alert('Введите ваше имя!')
			return
		}
		if (!formData.password || formData.password.length < 4) {
			alert('Пароль должен содержать минимум 4 символа!')
			return
		}
		registerStudent(formData)
	}

	return (
		<div className='fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4'>
			<div className='bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 space-y-6'>
				<div className='text-center space-y-2'>
					<div className='w-14 h-14 bg-indigo-600 text-white rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-lg'>
						<FaGraduationCap />
					</div>
					<h2 className='text-2xl font-black text-slate-900 tracking-tight'>
						{mode === 'login' ? 'Вход для студентов' : 'Регистрация студента'}
					</h2>
					<p className='text-xs text-slate-400'>
						{mode === 'login'
							? 'Найдите свой аккаунт и введите пароль'
							: 'Заполните данные и защитите свой профиль паролем'}
					</p>
				</div>

				<div className='flex p-1 bg-slate-100 rounded-2xl gap-1'>
					<button
						type='button'
						onClick={() => setMode('login')}
						className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
							mode === 'login'
								? 'bg-white text-indigo-600 shadow-sm'
								: 'text-slate-500 hover:text-slate-900'
						}`}
					>
						<FaUserCheck className='w-3.5 h-3.5' />
						<span>Вход</span>
					</button>
					<button
						type='button'
						onClick={() => setMode('register')}
						className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
							mode === 'register'
								? 'bg-white text-indigo-600 shadow-sm'
								: 'text-slate-500 hover:text-slate-900'
						}`}
					>
						<FaUserPlus className='w-3.5 h-3.5' />
						<span>Регистрация</span>
					</button>
				</div>

				{mode === 'login' ? (
					<form onSubmit={handleLoginSubmit} className='space-y-4'>
						{/* Поле поиска по имени или ID группы с выпадающим списком */}
						<div className='relative' ref={dropdownRef}>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
								Поиск аккаунта
							</label>
							<div className='relative'>
								<input
									type='text'
									placeholder='Введите имя или группу...'
									value={searchQuery}
									onFocus={() => setIsDropdownOpen(true)}
									onChange={e => {
										setSearchQuery(e.target.value)
										setIsDropdownOpen(true)
										setSelectedStudentId('')
									}}
									className='w-full p-3.5 pl-10 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
								/>
								<BiSearch className='absolute left-4 top-4 text-slate-400 w-4 h-4 pointer-events-none' />
							</div>

							{isDropdownOpen && (
								<div className='absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl max-h-56 overflow-y-auto z-50'>
									{filteredStudents.length > 0 ? (
										filteredStudents.map(s => (
											<div
												key={s.id}
												onClick={() => handleSelectStudent(s)}
												className='px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition border-b border-slate-50 last:border-none'
											>
												<div className='font-semibold'>{s.fullName}</div>
												<div className='text-xs text-slate-400'>
													Группа: {s.groupID}
												</div>
											</div>
										))
									) : (
										<div className='px-4 py-3 text-sm text-slate-400 text-center'>
											Ничего не найдено
										</div>
									)}
								</div>
							)}
						</div>

						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
								Пароль
							</label>
							<div className='relative'>
								<input
									type='password'
									placeholder='••••••••'
									value={loginPassword}
									onChange={e => setLoginPassword(e.target.value)}
									className='w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
									required
								/>
								<FaLock className='absolute right-4 top-4 text-slate-400 w-4 h-4 pointer-events-none' />
							</div>
						</div>

						<button
							type='submit'
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition text-sm'
						>
							Войти в личный кабинет
						</button>
					</form>
				) : (
					<form onSubmit={handleRegisterSubmit} className='space-y-4'>
						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
								Полное ФИО
							</label>
							<input
								type='text'
								placeholder='Например: Мухаммадсаид Абдувохидов'
								value={formData.fullName}
								onChange={e =>
									setFormData({ ...formData, fullName: e.target.value })
								}
								className='w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
								required
							/>
						</div>

						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
								ID Группы
							</label>
							<input
								type='text'
								placeholder='IFC-101'
								value={formData.groupID}
								onChange={e =>
									setFormData({ ...formData, groupID: e.target.value })
								}
								className='w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
								required
							/>
						</div>

						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
								Направление / Специальность
							</label>
							<input
								type='text'
								placeholder='BSc Business Management'
								value={formData.group}
								onChange={e =>
									setFormData({ ...formData, group: e.target.value })
								}
								className='w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
								required
							/>
						</div>

						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
								Создайте пароль
							</label>
							<div className='relative'>
								<input
									type='password'
									placeholder='Минимум 4 символа'
									value={formData.password}
									onChange={e =>
										setFormData({ ...formData, password: e.target.value })
									}
									className='w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
									required
								/>
								<FaLock className='absolute right-4 top-4 text-slate-400 w-4 h-4 pointer-events-none' />
							</div>
						</div>

						<button
							type='submit'
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition text-sm'
						>
							Зарегистрироваться
						</button>
					</form>
				)}
			</div>
		</div>
	)
}
