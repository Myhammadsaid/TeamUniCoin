'use client'

import { useState } from 'react'
import { FaBoxOpen, FaCheck } from 'react-icons/fa6'
import { LuCoins } from 'react-icons/lu'

export default function OrdersSection({ orders, completeOrder }) {
	const [orderSearchQuery, setOrderSearchQuery] = useState('')

	// Filtered orders using BiSearch input
	const filteredOrders = orders.filter(
		order =>
			order.studentName
				?.toLowerCase()
				.includes(orderSearchQuery.toLowerCase()) ||
			order.productTitle
				?.toLowerCase()
				.includes(orderSearchQuery.toLowerCase()) ||
			order.id?.toString().includes(orderSearchQuery),
	)

	return (
		<div className='bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 shadow-sm space-y-4 sm:space-y-6'>
			<div className='flex items-center justify-between flex-wrap gap-2'>
				<div className='flex items-center gap-3'>
					<div className='p-2 sm:p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0'>
						<FaBoxOpen className='w-5 h-5' />
					</div>
					<h2 className='text-base sm:text-lg font-bold text-slate-900'>
						Заказы студентов
					</h2>
				</div>
			</div>

			{/* Search Input for Accepting Orders using BiSearch */}
			<input
				type='text'
				placeholder='Поиск заказа по имени или товару...'
				value={orderSearchQuery}
				onChange={e => setOrderSearchQuery(e.target.value)}
				className='w-full p-2.5 sm:p-3 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600'
			/>

			<div className='space-y-2.5 sm:space-y-3 max-h-80 overflow-y-auto pr-1'>
				{filteredOrders.length > 0 ? (
					filteredOrders.map(order => (
						<div
							key={order.id}
							className='p-3.5 sm:p-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl flex justify-between items-center gap-3'
						>
							<div className='min-w-0'>
								<div className='font-bold text-sm text-slate-900 truncate'>
									{order.studentName}
								</div>
								<div className='text-[11px] sm:text-xs text-slate-500 flex items-center gap-1.5 mt-0.5 truncate'>
									<span className='truncate'>{order.productTitle}</span>
									<span>•</span>
									<span className='text-amber-600 font-bold flex items-center gap-1 shrink-0'>
										<LuCoins className='w-3.5 h-3.5' />
										{order.price}
									</span>
								</div>
							</div>

							{order.status === 'Новый' ? (
								<button
									onClick={() => completeOrder(order.id)}
									className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs p-2.5 sm:px-3.5 sm:py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm shrink-0'
									aria-label='Выдать заказ'
									title='Выдать'
								>
									<FaCheck className='w-3 h-3 shrink-0' />
									<span className='hidden sm:inline'>Выдать</span>
								</button>
							) : (
								<span className='text-xs bg-slate-200 text-slate-600 font-bold p-2 sm:px-3 sm:py-1.5 rounded-xl flex items-center gap-1.5 shrink-0'>
									<FaCheck className='w-3 h-3 text-emerald-600 shrink-0' />
									<span className='hidden sm:inline'>Выдано</span>
								</span>
							)}
						</div>
					))
				) : (
					<div className='p-6 text-center text-xs text-slate-400'>
						Заказы не найдены
					</div>
				)}
			</div>
		</div>
	)
}
