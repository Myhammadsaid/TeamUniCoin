'use client'

import { useApp } from '@/context/AppContext'
import { useState } from 'react'

// Импорт иконок из react-icons
import {
	FaBookOpen,
	FaCalendarDays,
	FaFire,
	FaGift,
	FaPlus,
	FaTrophy,
} from 'react-icons/fa6'
import { HiOutlineLightBulb, HiOutlineSparkles } from 'react-icons/hi2'
import { IoTimeOutline } from 'react-icons/io5'
import { LuCoins, LuShoppingBag } from 'react-icons/lu'

export const StudentDashboard = () => {
	const { currentStudent, schedule, products, students, buyProduct } = useApp()
	const [selectedCategory, setSelectedCategory] = useState('All Items')
	const [activeTabSchedule, setActiveTabSchedule] = useState('Понедельник')

	const leaderboard = [...students].sort((a, b) => b.coins - a.coins)

	const filteredProducts =
		selectedCategory === 'All Items'
			? products
			: products.filter(p => p.category === selectedCategory)

	return (
		<div className='max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8'>
			{/* Верхний блок приветствия и баланса */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden'>
					<div className='space-y-3 z-10'>
						<div className='flex items-center gap-2'>
							<span className='bg-indigo-50 text-indigo-700 font-semibold text-xs px-3 py-1 rounded-full'>
								{currentStudent.group}
							</span>
							<span className='text-slate-400 text-xs font-mono'>
								GROUP: {currentStudent.groupID}
							</span>
						</div>
						<h1 className='text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3'>
							<span>
								Welcome back, {currentStudent.fullName.split(' ')[0]}!
							</span>
							<span className='inline-block animate-bounce text-indigo-600'>
								<HiOutlineSparkles className='w-8 h-8' />
							</span>
						</h1>
						<p className='text-slate-500 text-sm max-w-xl leading-relaxed'>
							Earn Team Coins through participation, excellence, and campus
							events. Redeem them in the official store!
						</p>
					</div>

					<div className='flex flex-wrap gap-3 mt-6 z-10'>
						<div className='bg-slate-50 text-slate-700 font-medium text-xs px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2'>
							<FaTrophy className='text-amber-500 w-3.5 h-3.5' />
							<span>Top #1 in Leaderboard</span>
						</div>
						<div className='bg-slate-50 text-slate-700 font-medium text-xs px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2'>
							<FaFire className='text-rose-500 w-3.5 h-3.5' />
							<span>7 Day Active Streak</span>
						</div>
					</div>
				</div>

				{/* Блок баланса */}
				<div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between'>
					<div className='flex justify-between items-center'>
						<span className='text-xs font-bold uppercase tracking-wider text-slate-400'>
							Available Balance
						</span>
						<span className='bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5'>
							<span className='w-2 h-2 rounded-full bg-amber-500 animate-pulse' />
							Live State
						</span>
					</div>

					<div className='my-4'>
						<div className='text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-2.5'>
							{currentStudent.coins.toLocaleString()}
							<span>🪙</span>
						</div>
					</div>

					<div className='pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium'>
						<span className='flex items-center gap-1.5'>
							<IoTimeOutline className='w-4 h-4 text-slate-400' />
							Pending Claims:
						</span>
						<span className='bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold'>
							0 Active
						</span>
					</div>
				</div>
			</div>

			{/* Магазин наград */}
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div className='flex items-center gap-3'>
						<div className='p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl'>
							<LuShoppingBag className='w-6 h-6' />
						</div>
						<div>
							<h2 className='text-2xl font-bold text-slate-900 tracking-tight'>
								Campus Rewards Store
							</h2>
							<p className='text-xs text-slate-500'>
								Select an item to redeem using your Team Coins
							</p>
						</div>
					</div>

					<div className='flex gap-2 bg-slate-100 p-1.5 rounded-2xl'>
						{['All Items', 'Official Mug', 'Official Merch'].map(cat => (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
									selectedCategory === cat
										? 'bg-indigo-600 text-white shadow-md'
										: 'text-slate-600 hover:text-slate-900'
								}`}
							>
								{cat}
							</button>
						))}
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{filteredProducts.map((product, idx) => {
						const bgColors = ['bg-amber-900', 'bg-indigo-600', 'bg-emerald-700']
						return (
							<div
								key={product.id}
								className='bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition'
							>
								<div
									className={`h-36 rounded-2xl ${
										bgColors[idx % bgColors.length]
									} flex items-center justify-center text-white shadow-inner`}
								>
									<FaGift className='w-12 h-12 text-white/90' />
								</div>

								<div className='space-y-1.5'>
									<div className='flex justify-between items-center'>
										<h3 className='font-bold text-lg text-slate-900'>
											{product.title}
										</h3>
										<span className='bg-amber-50 text-amber-700 font-extrabold text-xs px-2.5 py-1 rounded-xl flex items-center gap-1'>
											<LuCoins className='w-3.5 h-3.5' />
											{product.price}
										</span>
									</div>
									<p className='text-xs text-slate-500 leading-relaxed'>
										{product.description}
									</p>
								</div>

								<button
									onClick={() => buyProduct(product)}
									className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl text-sm transition shadow-sm flex items-center justify-center gap-2'
								>
									<LuShoppingBag className='w-4 h-4' />
									<span>Redeem Item</span>
								</button>
							</div>
						)
					})}
				</div>
			</div>

			{/* Расписание занятий */}
			<div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2.5 bg-purple-50 text-purple-600 rounded-2xl'>
						<FaCalendarDays className='w-5 h-5' />
					</div>
					<div>
						<h2 className='text-xl font-bold text-slate-900 tracking-tight'>
							Расписание занятий
						</h2>
						<p className='text-xs text-slate-500'>
							Выберите день недели для просмотра учебного плана
						</p>
					</div>
				</div>

				<div className='flex flex-wrap gap-2'>
					{Object.keys(schedule).map(day => (
						<button
							key={day}
							onClick={() => setActiveTabSchedule(day)}
							className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
								activeTabSchedule === day
									? 'bg-indigo-600 text-white shadow-md'
									: 'bg-slate-50 text-slate-600 hover:bg-slate-100'
							}`}
						>
							{day}
						</button>
					))}
				</div>

				<div className='bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3'>
					{schedule[activeTabSchedule] &&
					schedule[activeTabSchedule].length > 0 ? (
						<div className='space-y-2'>
							{schedule[activeTabSchedule].map((sub, i) => (
								<div
									key={i}
									className='bg-white p-3.5 rounded-xl border border-slate-100 text-sm font-medium text-slate-700 flex items-center justify-between shadow-sm'
								>
									<div className='flex items-center gap-3'>
										<FaBookOpen className='text-indigo-500 w-4 h-4' />
										<span>{sub}</span>
									</div>
									<span className='text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg font-semibold'>
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
			<div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2.5 bg-amber-50 text-amber-600 rounded-2xl'>
						<FaTrophy className='w-5 h-5' />
					</div>
					<h2 className='text-lg font-bold text-slate-900'>
						Лидерборд студентов
					</h2>
				</div>

				<div className='space-y-3 max-h-80 overflow-y-auto pr-1'>
					{leaderboard.map((s, idx) => (
						<div
							key={s.id}
							className='flex justify-between items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100'
						>
							<div className='flex items-center gap-3'>
								<span
									className={`font-black text-xs w-6 h-6 rounded-lg flex items-center justify-center ${
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
								<div>
									<div className='font-bold text-sm text-slate-900'>
										{s.fullName}
									</div>
									<div className='text-xs text-slate-400'>{s.group}</div>
								</div>
							</div>

							<div className='font-extrabold text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5'>
								<LuCoins className='w-3.5 h-3.5 text-amber-600' />
								<span>{s.coins} coins</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Инструкция / Правила */}
			<div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl'>
						<HiOutlineLightBulb className='w-5 h-5' />
					</div>
					<h2 className='text-lg font-bold text-slate-900'>
						How to Earn Team Coins
					</h2>
				</div>

				<div className='space-y-4'>
					<div className='flex items-start gap-3 p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100'>
						<div className='p-1.5 bg-emerald-100 text-emerald-700 rounded-lg mt-0.5'>
							<FaPlus className='w-3 h-3' />
						</div>
						<div>
							<div className='font-bold text-xs text-emerald-950'>
								Win Hackathons or Quizzes
							</div>
							<div className='text-xs text-emerald-700 mt-0.5'>
								+50 to +150 Coins for top place placements.
							</div>
						</div>
					</div>

					<div className='flex items-start gap-3 p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100'>
						<div className='p-1.5 bg-emerald-100 text-emerald-700 rounded-lg mt-0.5'>
							<FaPlus className='w-3 h-3' />
						</div>
						<div>
							<div className='font-bold text-xs text-emerald-950'>
								Volunteering at Campus Events
							</div>
							<div className='text-xs text-emerald-700 mt-0.5'>
								+30 Coins per event shift.
							</div>
						</div>
					</div>

					<div className='flex items-start gap-3 p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100'>
						<div className='p-1.5 bg-emerald-100 text-emerald-700 rounded-lg mt-0.5'>
							<FaPlus className='w-3 h-3' />
						</div>
						<div>
							<div className='font-bold text-xs text-emerald-950'>
								Perfect Attendance Month
							</div>
							<div className='text-xs text-emerald-700 mt-0.5'>
								+25 Bonus Team Coins awarded by faculty.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
