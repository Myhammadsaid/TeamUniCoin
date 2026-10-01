'use client'

import { AppProvider, useApp } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Иконки из react-icons
import {
	FaBoxOpen,
	FaCalendarDays,
	FaCheck,
	FaGift,
	FaPlus,
	FaTrashCan,
	FaUserShield,
} from 'react-icons/fa6'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { IoLogOutOutline, IoSaveOutline } from 'react-icons/io5'
import { LuCoins } from 'react-icons/lu'

function AdminDashboardContent() {
	const router = useRouter()
	const {
		students,
		addCoins,
		orders,
		completeOrder,
		schedule,
		saveDaySchedule,
	} = useApp()

	const [selectedStudent, setSelectedStudent] = useState('')
	const [coinsAmount, setCoinsAmount] = useState(50)

	const [selectedDay, setSelectedDay] = useState('Понедельник')
	const [subjectInput, setSubjectInput] = useState('')
	const [tempSubjects, setTempSubjects] = useState([])

	useEffect(() => {
		const isAuth = localStorage.getItem('isAdminAuthenticated')
		if (!isAuth) {
			router.push('/admin/login')
		}
	}, [router])

	useEffect(() => {
		if (schedule && schedule[selectedDay]) {
			setTempSubjects([...schedule[selectedDay]])
		} else {
			setTempSubjects([])
		}
	}, [selectedDay, schedule])

	const handleGiveCoins = e => {
		e.preventDefault()
		if (!selectedStudent) {
			alert('Выберите студента')
			return
		}
		addCoins(selectedStudent, coinsAmount)
		alert(`Успешно начислено ${coinsAmount} коинов!`)
	}

	const handleAddSubjectToBuffer = () => {
		if (!subjectInput.trim()) return
		setTempSubjects(prev => [...prev, subjectInput.trim()])
		setSubjectInput('')
	}

	const handleRemoveFromBuffer = index => {
		setTempSubjects(prev => prev.filter((_, i) => i !== index))
	}

	const handleSaveDay = () => {
		saveDaySchedule(selectedDay, tempSubjects)
		alert(`Расписание на "${selectedDay}" успешно сохранено!`)
	}

	return (
		<div className='min-h-screen bg-slate-50 p-6 md:p-12 space-y-8'>
			{/* Шапка панели */}
			<div className='max-w-7xl mx-auto flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm'>
				<div className='flex items-center gap-3.5'>
					<div className='w-11 h-11 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl shadow-sm'>
						<FaUserShield />
					</div>
					<div>
						<h1 className='text-2xl font-black text-slate-900 tracking-tight'>
							Admin Control Center
						</h1>
						<p className='text-xs text-slate-400 font-medium'>
							Управление финансами, заказами и расписанием
						</p>
					</div>
				</div>

				<button
					onClick={() => {
						localStorage.removeItem('isAdminAuthenticated')
						router.push('/admin/login')
					}}
					className='bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2'
				>
					<IoLogOutOutline className='w-4 h-4' />
					<span>Выйти</span>
				</button>
			</div>

			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Выдача коинов */}
				<div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6'>
					<div className='flex items-center gap-3'>
						<div className='p-2.5 bg-amber-50 text-amber-600 rounded-xl'>
							<FaGift className='w-5 h-5' />
						</div>
						<h2 className='text-lg font-bold text-slate-900'>
							Начисление Team Coins
						</h2>
					</div>

					<form onSubmit={handleGiveCoins} className='space-y-4'>
						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'>
								Выберите студента
							</label>
							<div className='relative'>
								<select
									value={selectedStudent}
									onChange={e => setSelectedStudent(e.target.value)}
									className='w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 appearance-none'
								>
									<option value=''>-- Выберите студента --</option>
									{students.map(s => (
										<option key={s.id} value={s.id}>
											{s.fullName} ({s.group})
										</option>
									))}
								</select>
								<HiOutlineUserGroup className='absolute right-4 top-4 text-slate-400 w-5 h-5 pointer-events-none' />
							</div>
						</div>

						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'>
								Количество коинов
							</label>
							<div className='relative'>
								<input
									type='number'
									value={coinsAmount}
									onChange={e => setCoinsAmount(e.target.value)}
									className='w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600'
								/>
								<LuCoins className='absolute right-4 top-4 text-amber-500 w-5 h-5 pointer-events-none' />
							</div>
						</div>

						<button
							type='submit'
							className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-sm transition text-sm flex items-center justify-center gap-2'
						>
							<FaGift className='w-4 h-4' />
							<span>Начислить коины</span>
						</button>
					</form>
				</div>

				{/* Заказы мерча */}
				<div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6'>
					<div className='flex items-center gap-3'>
						<div className='p-2.5 bg-indigo-50 text-indigo-600 rounded-xl'>
							<FaBoxOpen className='w-5 h-5' />
						</div>
						<h2 className='text-lg font-bold text-slate-900'>
							Заказы студентов
						</h2>
					</div>

					<div className='space-y-3 max-h-80 overflow-y-auto pr-1'>
						{orders.map(order => (
							<div
								key={order.id}
								className='p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center'
							>
								<div>
									<div className='font-bold text-sm text-slate-900'>
										{order.studentName}
									</div>
									<div className='text-xs text-slate-500 flex items-center gap-1.5 mt-0.5'>
										<span>{order.productTitle}</span>
										<span>•</span>
										<span className='text-amber-600 font-bold flex items-center gap-1'>
											<LuCoins className='w-3.5 h-3.5' />
											{order.price}
										</span>
									</div>
								</div>

								{order.status === 'Новый' ? (
									<button
										onClick={() => completeOrder(order.id)}
										className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm'
									>
										<FaCheck className='w-3 h-3' />
										<span>Выдать</span>
									</button>
								) : (
									<span className='text-xs bg-slate-200 text-slate-600 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5'>
										<FaCheck className='w-3 h-3 text-emerald-600' />
										<span>Выдано</span>
									</span>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Управление расписанием по дням недели */}
			<div className='max-w-7xl mx-auto bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2.5 bg-purple-50 text-purple-600 rounded-xl'>
						<FaCalendarDays className='w-5 h-5' />
					</div>
					<div>
						<h2 className='text-xl font-bold text-slate-900'>
							Конструктор расписания недели
						</h2>
						<p className='text-xs text-slate-400'>
							Выберите день недели, введите предмет, нажмите `+` и сохраните
							изменения
						</p>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					<div className='space-y-4'>
						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'>
								День недели
							</label>
							<select
								value={selectedDay}
								onChange={e => setSelectedDay(e.target.value)}
								className='w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600'
							>
								{[
									'Понедельник',
									'Вторник',
									'Среда',
									'Четверг',
									'Пятница',
									'Суббота',
									'Воскресенье',
								].map(day => (
									<option key={day} value={day}>
										{day}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'>
								Название предмета
							</label>
							<div className='flex gap-2'>
								<input
									type='text'
									placeholder='Например: Матанализ'
									value={subjectInput}
									onChange={e => setSubjectInput(e.target.value)}
									className='w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600'
								/>
								<button
									type='button'
									onClick={handleAddSubjectToBuffer}
									className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 rounded-2xl transition flex items-center justify-center shadow-sm'
									aria-label='Добавить предмет'
								>
									<FaPlus className='w-4 h-4' />
								</button>
							</div>
						</div>
					</div>

					<div className='lg:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-4'>
						<div>
							<div className='font-bold text-sm text-slate-800 mb-3 flex items-center justify-between'>
								<span>Предметы на {selectedDay}:</span>
								<span className='text-xs font-semibold text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200'>
									Всего: {tempSubjects.length}
								</span>
							</div>

							<div className='space-y-2 max-h-40 overflow-y-auto pr-1'>
								{tempSubjects.length === 0 ? (
									<p className='text-xs text-slate-400 py-4 text-center'>
										Список пуст. Добавьте предметы с помощью кнопки с плюсом.
									</p>
								) : (
									tempSubjects.map((sub, idx) => (
										<div
											key={idx}
											className='bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center text-sm font-medium shadow-sm'
										>
											<span className='text-slate-800'>{sub}</span>
											<button
												type='button'
												onClick={() => handleRemoveFromBuffer(idx)}
												className='p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition'
												aria-label='Удалить предмет'
											>
												<FaTrashCan className='w-4 h-4' />
											</button>
										</div>
									))
								)}
							</div>
						</div>

						<button
							onClick={handleSaveDay}
							className='w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-md transition text-sm flex items-center justify-center gap-2'
						>
							<IoSaveOutline className='w-5 h-5' />
							<span>Сохранить расписание для {selectedDay}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function AdminDashboardPage() {
	return (
		<AppProvider>
			<AdminDashboardContent />
		</AppProvider>
	)
}
