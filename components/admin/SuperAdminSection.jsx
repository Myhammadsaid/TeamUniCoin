'use client'

import { useState } from 'react'
import {
	FaKey,
	FaPenToSquare,
	FaPlus,
	FaTrashCan,
	FaUserGear,
	FaUserPlus,
} from 'react-icons/fa6'
import { IoSaveOutline } from 'react-icons/io5'

export default function SuperAdminSection({
	students,
	updateAdminPassword,
	addStudent,
	updateStudent,
	deleteStudent,
}) {
	const [adminPasswordInput, setAdminPasswordInput] = useState('')
	const [editingStudentId, setEditingStudentId] = useState(null)
	const [studentForm, setStudentForm] = useState({
		fullName: '',
		group: '',
		groupID: '',
		coins: 0,
	})

	const handleChangeAdminPassword = e => {
		e.preventDefault()
		if (!adminPasswordInput.trim()) {
			alert('Введите новый пароль')
			return
		}
		if (updateAdminPassword) {
			updateAdminPassword(adminPasswordInput.trim())
		} else {
			localStorage.setItem('adminPassword', adminPasswordInput.trim())
		}
		alert('Пароль администратора успешно изменен!')
		setAdminPasswordInput('')
	}

	const handleStudentSubmit = e => {
		e.preventDefault()
		if (!studentForm.fullName || !studentForm.group || !studentForm.groupID) {
			alert('Заполните имя, группу и ID группы!')
			return
		}

		if (editingStudentId) {
			if (updateStudent) updateStudent(editingStudentId, studentForm)
			alert('Данные студента успешно обновлены!')
			setEditingStudentId(null)
		} else {
			if (addStudent) addStudent(studentForm)
			alert('Новый студент успешно добавлен!')
		}

		setStudentForm({ fullName: '', group: '', groupID: '', coins: 0 })
	}

	const handleEditStudent = student => {
		setEditingStudentId(student.id)
		setStudentForm({
			fullName: student.fullName,
			group: student.group,
			groupID: student.groupID,
			coins: student.coins || 0,
		})
	}

	const handleDeleteStudent = student => {
		if (confirm(`Удалить студента ${student.fullName}?`)) {
			if (deleteStudent) deleteStudent(student.id)
		}
	}

	return (
		<div className='max-w-7xl mx-auto bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-6'>
			<div className='flex items-center gap-3 border-b border-slate-800 pb-4'>
				<div className='p-2.5 bg-purple-600/20 text-purple-400 rounded-xl shrink-0'>
					<FaUserGear className='w-6 h-6' />
				</div>
				<div>
					<h2 className='text-lg sm:text-xl font-black text-white'>
						Панель управления Суперадминистратора
					</h2>
					<p className='text-xs text-slate-400'>
						Управление паролями администрации и базов данных студентов
					</p>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8'>
				{/* Password Manager */}
				<div className='bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-700/60 space-y-4'>
					<div className='flex items-center gap-2 text-purple-400 font-bold text-xs sm:text-sm uppercase tracking-wider'>
						<FaKey className='w-4 h-4' />
						<span>Смена пароля Admin</span>
					</div>

					<form onSubmit={handleChangeAdminPassword} className='space-y-3'>
						<div>
							<label className='block text-[11px] text-slate-300 mb-1 font-medium'>
								Новый пароль для Admin
							</label>
							<input
								type='password'
								placeholder='Введите новый пароль'
								value={adminPasswordInput}
								onChange={e => setAdminPasswordInput(e.target.value)}
								className='w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500'
							/>
						</div>
						<button
							type='submit'
							className='w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5'
						>
							<IoSaveOutline className='w-4 h-4' />
							<span>Сохранить пароль</span>
						</button>
					</form>
				</div>

				{/* Add/Edit Student Form */}
				<div className='lg:col-span-2 bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-700/60 space-y-4'>
					<div className='flex items-center gap-2 text-purple-400 font-bold text-xs sm:text-sm uppercase tracking-wider'>
						<FaUserPlus className='w-4 h-4' />
						<span>
							{editingStudentId
								? 'Редактировать студента'
								: 'Добавить нового студента'}
						</span>
					</div>

					<form
						onSubmit={handleStudentSubmit}
						className='grid grid-cols-1 sm:grid-cols-2 gap-3.5'
					>
						<div>
							<label className='block text-[11px] text-slate-300 mb-1 font-medium'>
								ФИО Студента
							</label>
							<input
								type='text'
								placeholder='Иванов Иван'
								value={studentForm.fullName}
								onChange={e =>
									setStudentForm({ ...studentForm, fullName: e.target.value })
								}
								className='w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500'
								required
							/>
						</div>

						<div>
							<label className='block text-[11px] text-slate-300 mb-1 font-medium'>
								Название группы
							</label>
							<input
								type='text'
								placeholder='Web Dev 101'
								value={studentForm.group}
								onChange={e =>
									setStudentForm({ ...studentForm, group: e.target.value })
								}
								className='w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500'
								required
							/>
						</div>

						<div>
							<label className='block text-[11px] text-slate-300 mb-1 font-medium'>
								ID Группы
							</label>
							<input
								type='text'
								placeholder='WD-101'
								value={studentForm.groupID}
								onChange={e =>
									setStudentForm({ ...studentForm, groupID: e.target.value })
								}
								className='w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500'
								required
							/>
						</div>

						<div>
							<label className='block text-[11px] text-slate-300 mb-1 font-medium'>
								Начальные coins
							</label>
							<input
								type='number'
								value={studentForm.coins}
								onChange={e =>
									setStudentForm({
										...studentForm,
										coins: Number(e.target.value),
									})
								}
								className='w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500'
							/>
						</div>

						<div className='sm:col-span-2 flex gap-2 pt-1'>
							<button
								type='submit'
								className='flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5'
							>
								<FaPlus className='w-3.5 h-3.5' />
								<span>
									{editingStudentId
										? 'Сохранить изменения'
										: 'Добавить студента'}
								</span>
							</button>
							{editingStudentId && (
								<button
									type='button'
									onClick={() => {
										setEditingStudentId(null)
										setStudentForm({
											fullName: '',
											group: '',
											groupID: '',
											coins: 0,
										})
									}}
									className='px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition'
								>
									Отмена
								</button>
							)}
						</div>
					</form>
				</div>
			</div>

			{/* Student List Management Table */}
			<div className='space-y-3 pt-2'>
				<h3 className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
					Управление списком студентов ({students.length})
				</h3>

				<div className='max-h-60 overflow-y-auto space-y-2 pr-1'>
					{students.map(s => (
						<div
							key={s.id}
							className='p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center justify-between gap-3 text-xs'
						>
							<div className='min-w-0'>
								<div className='font-bold text-white truncate'>
									{s.fullName}
								</div>
								<div className='text-slate-400 text-[11px] truncate'>
									{s.group} • ID: {s.groupID} • {s.coins} coins
								</div>
							</div>
							<div className='flex items-center gap-1 shrink-0'>
								<button
									onClick={() => handleEditStudent(s)}
									className='p-2 text-purple-400 hover:bg-slate-700/80 rounded-lg transition'
									title='Редактировать'
								>
									<FaPenToSquare className='w-3.5 h-3.5' />
								</button>
								<button
									onClick={() => handleDeleteStudent(s)}
									className='p-2 text-rose-400 hover:bg-slate-700/80 rounded-lg transition'
									title='Удалить'
								>
									<FaTrashCan className='w-3.5 h-3.5' />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
