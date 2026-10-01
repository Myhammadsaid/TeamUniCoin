'use client'

import { useEffect, useState } from 'react'
import { FaCalendarDays, FaPlus, FaTrashCan } from 'react-icons/fa6'
import { IoSaveOutline } from 'react-icons/io5'

export default function ScheduleSection({ schedule, saveDaySchedule }) {
	const [selectedDay, setSelectedDay] = useState('Понедельник')
	const [subjectInput, setSubjectInput] = useState('')
	const [tempSubjects, setTempSubjects] = useState([])

	useEffect(() => {
		if (schedule && schedule[selectedDay]) {
			setTempSubjects([...schedule[selectedDay]])
		} else {
			setTempSubjects([])
		}
	}, [selectedDay, schedule])

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
		<div className='max-w-7xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 shadow-sm space-y-4 sm:space-y-6'>
			<div className='flex items-center gap-3'>
				<div className='p-2 sm:p-2.5 bg-purple-50 text-purple-600 rounded-xl shrink-0'>
					<FaCalendarDays className='w-5 h-5' />
				</div>
				<div>
					<h2 className='text-lg sm:text-xl font-bold text-slate-900'>
						Конструктор расписания недели
					</h2>
					<p className='text-[11px] sm:text-xs text-slate-400'>
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
							className='w-full p-3 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600'
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
								className='w-full p-3 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600'
							/>
							<button
								type='button'
								onClick={handleAddSubjectToBuffer}
								className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 sm:px-4 rounded-xl sm:rounded-2xl transition flex items-center justify-center shadow-sm shrink-0'
								aria-label='Добавить предмет'
								title='Добавить предмет'
							>
								<FaPlus className='w-4 h-4' />
							</button>
						</div>
					</div>
				</div>

				<div className='lg:col-span-2 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-4'>
					<div>
						<div className='font-bold text-xs sm:text-sm text-slate-800 mb-3 flex items-center justify-between'>
							<span>Предметы на {selectedDay}:</span>
							<span className='text-[10px] sm:text-xs font-semibold text-slate-400 bg-white px-2 sm:px-2.5 py-1 rounded-lg border border-slate-200'>
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
										className='bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs sm:text-sm font-medium shadow-sm gap-2'
									>
										<span className='text-slate-800 truncate'>{sub}</span>
										<button
											type='button'
											onClick={() => handleRemoveFromBuffer(idx)}
											className='p-1.5 sm:p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition shrink-0'
											aria-label='Удалить предмет'
											title='Удалить предмет'
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
						className='w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md transition text-xs sm:text-sm flex items-center justify-center gap-2'
						aria-label={`Сохранить расписание для ${selectedDay}`}
						title={`Сохранить расписание для ${selectedDay}`}
					>
						<IoSaveOutline className='w-4 h-4 sm:w-5 sm:h-5 shrink-0' />
						<span className='hidden sm:inline'>
							Сохранить расписание для {selectedDay}
						</span>
					</button>
				</div>
			</div>
		</div>
	)
}
