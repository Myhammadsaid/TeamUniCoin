'use client'

import { useApp } from '@/context/AppContext'
import { useState } from 'react'

import {
	FaBookOpen,
	FaCalendarDays,
	FaGift,
	FaPlus,
	FaRocket,
	FaTrophy,
} from 'react-icons/fa6'
import { HiOutlineLightBulb, HiOutlineSparkles } from 'react-icons/hi2'
import { IoLogOutOutline, IoTimeOutline } from 'react-icons/io5'
import { LuCoins, LuShoppingBag } from 'react-icons/lu'

export const StudentDashboard = () => {
	const {
		currentStudent,
		schedule,
		products,
		students,
		orders,
		buyProduct,
		logoutStudent,
	} = useApp()

	const [selectedCategory, setSelectedCategory] = useState('Все товары')
	const [activeTabSchedule, setActiveTabSchedule] = useState('Понедельник')

	// Расчет рейтинга и места в лидерборде
	const leaderboard = [...students].sort((a, b) => b.coins - a.coins)
	const userRankIndex = leaderboard.findIndex(s => s?.id === currentStudent?.id)
	const userRank = userRankIndex !== -1 ? userRankIndex + 1 : '-'

	// Подсчет активных заявок
	const pendingClaimsCount = orders.filter(
		o => o.studentId === currentStudent?.id && o.status === 'Новый',
	).length

	const filteredProducts =
		selectedCategory === 'Все товары'
			? products
			: products.filter(p => p.category === selectedCategory)

	// Подтверждение покупки
	const handleBuyProduct = product => {
		const studentCoins = currentStudent?.coins || 0
		if (studentCoins < product.price) {
			alert(
				`Недостаточно коинов! Вам не хватает ${product.price - studentCoins} 🪙.`,
			)
			return
		}

		const confirmed = window.confirm(
			`Вы уверены, что хотите приобрести "${product.title}" за ${product.price} коинов?`,
		)
		if (confirmed) {
			buyProduct(product)
		}
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6 md:space-y-8'>
			{/* Верхний блок приветствия и баланса */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
				<div className='lg:col-span-2 bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden'>
					<div className='space-y-3 z-10'>
						<div className='flex items-center justify-between gap-2'>
							<div className='flex items-center gap-2 flex-wrap'>
								<span className='bg-indigo-50 text-indigo-700 font-semibold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full'>
									{currentStudent?.group || 'Студент'}
								</span>
								<span className='text-slate-400 text-[11px] sm:text-xs font-mono'>
									ГРУППА: {currentStudent?.groupID || 'IFC-101'}
								</span>
							</div>
							<button
								onClick={logoutStudent}
								className='text-xs font-semibold text-rose-500 hover:text-rose-600 bg-rose-50 p-2 sm:px-3 sm:py-1.5 rounded-xl flex items-center gap-1.5 transition shrink-0'
								aria-label='Сменить профиль'
								title='Сменить профиль'
							>
								<IoLogOutOutline className='w-4 h-4' />
								<span className='hidden sm:inline'>Сменить профиль</span>
							</button>
						</div>
						<h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 sm:gap-3'>
							<span>
								С возвращением,{' '}
								{currentStudent?.fullName?.split(' ')[0] || 'Студент'}!
							</span>
							<span className='inline-block animate-bounce text-indigo-600 shrink-0'>
								<HiOutlineSparkles className='w-6 h-6 sm:w-8 sm:h-8' />
							</span>
						</h1>
						<p className='text-slate-500 text-xs sm:text-sm max-w-xl leading-relaxed'>
							Зарабатывайте коины за активное участие, отличные успехи и
							мероприятия. Обменивайте их в официальном магазине!
						</p>
					</div>

					<div className='flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6 z-10'>
						<div className='bg-slate-50 text-slate-700 font-medium text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-slate-100 flex items-center gap-2'>
							<FaTrophy className='text-amber-500 w-3.5 h-3.5 shrink-0' />
							<span>Топ #{userRank} в Лидерборде</span>
						</div>

						<div className='bg-slate-50 text-slate-700 font-medium text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-slate-100 flex items-center gap-2'>
							<FaRocket className='text-indigo-500 w-3.5 h-3.5 shrink-0' />
							<span>Коины за достижения</span>
						</div>
					</div>
				</div>

				{/* Блок баланса */}
				<div className='bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between'>
					<div className='flex justify-between items-center'>
						<span className='text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400'>
							Доступный баланс
						</span>
						<span className='bg-amber-50 text-amber-700 text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-lg flex items-center gap-1.5'>
							<span className='w-2 h-2 rounded-full bg-amber-500 animate-pulse' />
							Текущий счет
						</span>
					</div>

					<div className='my-3 sm:my-4'>
						<div className='text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-2'>
							{currentStudent?.coins?.toLocaleString() || 0}
							<span>🪙</span>
						</div>
					</div>

					<div className='pt-3 sm:pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium'>
						<span className='flex items-center gap-1.5 text-[11px] sm:text-xs'>
							<IoTimeOutline className='w-4 h-4 text-slate-400' />
							Активные заявки:
						</span>
						<span className='bg-indigo-50 text-indigo-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold text-[11px] sm:text-xs'>
							{pendingClaimsCount} В процессе
						</span>
					</div>
				</div>
			</div>

			{/* Магазин наград */}
			<div className='space-y-4 sm:space-y-6'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4'>
					<div className='flex items-center gap-3'>
						<div className='p-2 sm:p-2.5 bg-indigo-50 text-indigo-600 rounded-xl sm:rounded-2xl shrink-0'>
							<LuShoppingBag className='w-5 h-5 sm:w-6 sm:h-6' />
						</div>
						<div>
							<h2 className='text-xl sm:text-2xl font-bold text-slate-900 tracking-tight'>
								Магазин наград
							</h2>
							<p className='text-[11px] sm:text-xs text-slate-500'>
								Выберите товар для обмена на ваши коины
							</p>
						</div>
					</div>

					<div className='relative w-full sm:w-56'>
						<select
							value={selectedCategory}
							onChange={e => setSelectedCategory(e.target.value)}
							className='w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 pl-3.5 sm:pl-4 pr-10 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer shadow-sm transition'
						>
							{[
								'Все товары',
								'Фирменная кружка',
								'Официальный мерч',
								'VIP Доступ',
								'Онлайн-курсы',
							].map(cat => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500'>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M19 9l-7 7-7-7'
								/>
							</svg>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
					{filteredProducts.map((product, idx) => {
						const bgColors = ['bg-amber-900', 'bg-indigo-600', 'bg-emerald-700']
						return (
							<div
								key={product.id}
								className='bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-6 hover:shadow-md transition'
							>
								<div
									className={`h-28 sm:h-36 rounded-xl sm:rounded-2xl ${
										bgColors[idx % bgColors.length]
									} flex items-center justify-center text-white shadow-inner`}
								>
									<FaGift className='w-10 h-10 sm:w-12 sm:h-12 text-white/90' />
								</div>

								<div className='space-y-1.5'>
									<div className='flex justify-between items-center gap-2'>
										<h3 className='font-bold text-base sm:text-lg text-slate-900'>
											{product.title}
										</h3>
										<span className='bg-amber-50 text-amber-700 font-extrabold text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-xl flex items-center gap-1 shrink-0'>
											<LuCoins className='w-3.5 h-3.5' />
											{product.price}
										</span>
									</div>
									<p className='text-xs text-slate-500 leading-relaxed line-clamp-2'>
										{product.description}
									</p>
								</div>

								<button
									onClick={() => handleBuyProduct(product)}
									className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-2'
									aria-label={`Obtain ${product.title}`}
									title={`Obtain ${product.title}`}
								>
									<LuShoppingBag className='w-4 h-4 shrink-0' />
									<span>Приобрести</span>
								</button>
							</div>
						)
					})}
				</div>
			</div>

			{/* Расписание */}
			<div className='bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-100 shadow-sm space-y-4 sm:space-y-6'>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4'>
					<div className='flex items-center gap-3'>
						<div className='p-2 sm:p-2.5 bg-purple-50 text-purple-600 rounded-xl sm:rounded-2xl shrink-0'>
							<FaCalendarDays className='w-5 h-5' />
						</div>
						<div>
							<h2 className='text-lg sm:text-xl font-bold text-slate-900 tracking-tight'>
								Расписание занятий
							</h2>
							<p className='text-[11px] sm:text-xs text-slate-500'>
								Выберите день недели для просмотра учебного плана
							</p>
						</div>
					</div>

					<div className='relative w-full sm:w-56'>
						<select
							value={activeTabSchedule}
							onChange={e => setActiveTabSchedule(e.target.value)}
							className='w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 pl-3.5 sm:pl-4 pr-10 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer shadow-sm transition'
						>
							{Object.keys(schedule).map(day => (
								<option key={day} value={day}>
									{day}
								</option>
							))}
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500'>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M19 9l-7 7-7-7'
								/>
							</svg>
						</div>
					</div>
				</div>

				<div className='bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 space-y-3'>
					{schedule[activeTabSchedule] &&
					schedule[activeTabSchedule].length > 0 ? (
						<div className='space-y-2'>
							{schedule[activeTabSchedule].map((sub, i) => (
								<div
									key={i}
									className='bg-white p-3 sm:p-3.5 rounded-xl border border-slate-100 text-xs sm:text-sm font-medium text-slate-700 flex items-center justify-between shadow-sm gap-2'
								>
									<div className='flex items-center gap-2.5 sm:gap-3 min-w-0'>
										<FaBookOpen className='text-indigo-500 w-4 h-4 shrink-0' />
										<span className='truncate'>{sub}</span>
									</div>
									<span className='text-[10px] sm:text-xs text-indigo-600 bg-indigo-50 px-2 sm:px-2.5 py-1 rounded-lg font-semibold shrink-0'>
										Занятие #{i + 1}
									</span>
								</div>
							))}
						</div>
					) : (
						<p className='text-xs text-slate-400 py-6 text-center'>
							На этот день занятий не запланировано
						</p>
					)}
				</div>
			</div>

			{/* Лидерборд */}
			<div className='bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-100 shadow-sm space-y-4 sm:space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2 sm:p-2.5 bg-amber-50 text-amber-600 rounded-xl sm:rounded-2xl shrink-0'>
						<FaTrophy className='w-5 h-5' />
					</div>
					<h2 className='text-base sm:text-lg font-bold text-slate-900'>
						Лидерборд студентов
					</h2>
				</div>

				<div className='space-y-2.5 sm:space-y-3 max-h-80 overflow-y-auto pr-1'>
					{leaderboard.map((s, idx) => (
						<div
							key={s.id}
							className={`flex justify-between items-center p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border ${
								s.id === currentStudent?.id
									? 'bg-indigo-50/60 border-indigo-200'
									: 'bg-slate-50 border-slate-100'
							}`}
						>
							<div className='flex items-center gap-2.5 sm:gap-3 min-w-0'>
								<span
									className={`font-black text-xs w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
										idx === 0
											? 'bg-amber-100 text-amber-700'
											: idx === 1
												? 'bg-slate-200 text-slate-700'
												: idx === 2
													? 'bg-amber-800/10 text-amber-800'
													: 'text-indigo-600'
									}`}
								>
									#{idx + 1}
								</span>
								<div className='min-w-0'>
									<div className='font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 truncate'>
										<span className='truncate'>{s.fullName}</span>
										{s.id === currentStudent?.id && (
											<span className='text-[9px] sm:text-[10px] bg-indigo-600 text-white font-semibold px-1.5 sm:px-2 py-0.5 rounded-full shrink-0'>
												Вы
											</span>
										)}
									</div>
									<div className='text-[10px] sm:text-xs text-slate-400 truncate'>
										ГРУППА: {s.groupID}
									</div>
								</div>
							</div>

							<div className='font-extrabold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 shrink-0 ml-2'>
								<LuCoins className='w-3.5 h-3.5 text-amber-600' />
								<span>{s.coins} коинов</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Как заработать коины */}
			<div className='bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-100 shadow-sm space-y-4 sm:space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2 sm:p-2.5 bg-emerald-50 text-emerald-600 rounded-xl sm:rounded-2xl shrink-0'>
						<HiOutlineLightBulb className='w-5 h-5' />
					</div>
					<h2 className='text-base sm:text-lg font-bold text-slate-900'>
						Как заработать коины
					</h2>
				</div>

				<div className='space-y-3 sm:space-y-4'>
					<div className='flex items-start gap-3 p-3 sm:p-3.5 bg-emerald-50/60 rounded-xl sm:rounded-2xl border border-emerald-100'>
						<div className='p-1.5 bg-emerald-100 text-emerald-700 rounded-lg mt-0.5 shrink-0'>
							<FaPlus className='w-3 h-3' />
						</div>
						<div>
							<div className='font-bold text-sm text-emerald-950'>
								Победа в хакатонах и викторинах
							</div>
							<div className='text-sm text-emerald-700 mt-0.5'>
								От +30 коинов за призовые места.
							</div>
						</div>
					</div>

					<div className='flex items-start gap-3 p-3 sm:p-3.5 bg-emerald-50/60 rounded-xl sm:rounded-2xl border border-emerald-100'>
						<div className='p-1.5 bg-emerald-100 text-emerald-700 rounded-lg mt-0.5 shrink-0'>
							<FaPlus className='w-3 h-3' />
						</div>
						<div>
							<div className='font-bold text-sm text-emerald-950'>
								Волонтерство на мероприятиях
							</div>
							<div className='text-sm text-emerald-700 mt-0.5'>
								+5 коинов за каждую смену волонтера.
							</div>
						</div>
					</div>

					<div className='flex items-start gap-3 p-3 sm:p-3.5 bg-emerald-50/60 rounded-xl sm:rounded-2xl border border-emerald-100'>
						<div className='p-1.5 bg-emerald-100 text-emerald-700 rounded-lg mt-0.5 shrink-0'>
							<FaPlus className='w-3 h-3' />
						</div>
						<div>
							<div className='font-bold text-sm text-emerald-950'>
								Активная жизнь на кампусе
							</div>
							<div className='text-sm text-emerald-700 mt-0.5'>
								+10 бонусных коинов за особые achievements и инициативы.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
