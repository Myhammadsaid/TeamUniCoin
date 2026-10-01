'use client'

import { useState } from 'react'
import { FaGift } from 'react-icons/fa6'
import { LuCoins } from 'react-icons/lu'

export default function GiveCoinsSection({ students, addCoins }) {
	const [studentSearch, setStudentSearch] = useState('')
	const [selectedStudent, setSelectedStudent] = useState('')
	const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false)
	const [coinsAmount, setCoinsAmount] = useState(50)

	const filteredStudentsForCoins = students.filter(
		s =>
			s.fullName?.toLowerCase().includes(studentSearch.toLowerCase()) ||
			s.group?.toLowerCase().includes(studentSearch.toLowerCase()) ||
			s.groupID?.toLowerCase().includes(studentSearch.toLowerCase()),
	)

	const handleSelectStudentForCoins = student => {
		setSelectedStudent(student.id)
		setStudentSearch(`${student.fullName} (${student.group})`)
		setIsStudentDropdownOpen(false)
	}

	const handleGiveCoins = e => {
		e.preventDefault()
		if (!selectedStudent) {
			alert('Выберите студента из списка')
			return
		}
		addCoins(selectedStudent, Number(coinsAmount))
		alert(`Успешно начислено ${coinsAmount} коинов!`)
		setSelectedStudent('')
		setStudentSearch('')
	}

	return (
		<div className='bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 shadow-sm space-y-4 sm:space-y-6'>
			<div className='flex items-center gap-3'>
				<div className='p-2 sm:p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0'>
					<FaGift className='w-5 h-5' />
				</div>
				<h2 className='text-base sm:text-lg font-bold text-slate-900'>
					Начисление Team Coins
				</h2>
			</div>

			<form onSubmit={handleGiveCoins} className='space-y-4'>
				<div className='relative'>
					<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'>
						Поиск студента
					</label>
					<input
						type='text'
						placeholder='Поиск по имени или группе...'
						value={studentSearch}
						onChange={e => {
							setStudentSearch(e.target.value)
							setSelectedStudent('')
							setIsStudentDropdownOpen(true)
						}}
						onFocus={() => setIsStudentDropdownOpen(true)}
						onBlur={() => {
							setTimeout(() => setIsStudentDropdownOpen(false), 200)
						}}
						className='w-full p-3 sm:p-3.5 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600'
					/>

					{isStudentDropdownOpen && (
						<div className='absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto p-1.5 space-y-1'>
							{filteredStudentsForCoins.length > 0 ? (
								filteredStudentsForCoins.map(student => (
									<button
										key={student.id}
										type='button'
										onClick={() => handleSelectStudentForCoins(student)}
										className='w-full text-left p-2.5 rounded-xl hover:bg-indigo-50/70 transition flex items-center justify-between gap-2'
									>
										<div className='min-w-0'>
											<div className='font-bold text-xs sm:text-sm text-slate-900 truncate'>
												{student.fullName}
											</div>
											<div className='text-[10px] sm:text-xs text-slate-400 truncate'>
												{student.group} ({student.groupID})
											</div>
										</div>
										<span className='text-xs font-bold text-amber-600 shrink-0 bg-amber-50 px-2 py-0.5 rounded-md'>
											{student.coins} 🪙
										</span>
									</button>
								))
							) : (
								<div className='p-3 text-xs text-slate-400 text-center'>
									Студенты не найдены
								</div>
							)}
						</div>
					)}
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
							className='w-full p-3 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 pr-10'
						/>
						<LuCoins className='absolute right-3.5 top-3.5 text-amber-500 w-5 h-5 pointer-events-none' />
					</div>
				</div>

				<button
					type='submit'
					className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-sm transition text-xs sm:text-sm flex items-center justify-center gap-2'
					aria-label='Начислить коины'
					title='Начислить коины'
				>
					<FaGift className='w-4 h-4 shrink-0' />
					<span>Начислить коины</span>
				</button>
			</form>
		</div>
	)
}
