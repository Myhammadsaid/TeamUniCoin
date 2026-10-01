'use client'

import {
	INITIAL_PRODUCTS,
	INITIAL_SCHEDULE,
	INITIAL_STUDENTS,
} from '@/mock/InitialData'
import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
	const [students, setStudents] = useState(INITIAL_STUDENTS)
	// Расписание теперь в виде объекта по дням недели
	const [schedule, setSchedule] = useState(
		INITIAL_SCHEDULE || {
			Понедельник: [],
			Вторник: [],
			Среда: [],
			Четверг: [],
			Пятница: [],
			Суббота: [],
			Воскресенье: [],
		},
	)

	const [products] = useState(INITIAL_PRODUCTS)
	const [orders, setOrders] = useState([
		{
			id: 'o1',
			studentName: 'Алексей Смирнов',
			studentGroup: 'IFC-101',
			productTitle: 'Футболка х1',
			price: 15,
			status: 'Новый',
		},
	])

	const currentStudent = students[0]

	// Покупка студентом
	const buyProduct = product => {
		if (currentStudent.coins < product.price) {
			alert('Недостаточно Team Coins!')
			return
		}
		setStudents(prev =>
			prev.map(s =>
				s.id === currentStudent.id
					? { ...s, coins: s.coins - product.price }
					: s,
			),
		)

		const newOrder = {
			id: Date.now().toString(),
			studentName: currentStudent.fullName,
			studentId: currentStudent.id,
			productTitle: product.title,
			price: product.price,
			status: 'Новый',
		}
		setOrders(prev => [newOrder, ...prev])
		alert(`Успешно куплено: ${product.title}`)
	}

	// Админ: начисление коинов
	const addCoins = (studentId, amount) => {
		setStudents(prev =>
			prev.map(s =>
				s.id === studentId ? { ...s, coins: s.coins + Number(amount) } : s,
			),
		)
	}

	const completeOrder = orderId => {
		setOrders(prev =>
			prev.map(o => (o.id === orderId ? { ...o, status: 'Выдан' } : o)),
		)
	}

	// Супер-админ: студенты
	const addStudent = newStudent => {
		setStudents(prev => [...prev, { ...newStudent, coins: 0 }])
	}

	const deleteStudent = id => {
		setStudents(prev => prev.filter(s => s.id !== id))
	}

	// Новое управление расписанием (добавление предметов по дням с сохранением)
	const saveDaySchedule = (day, subjectsList) => {
		setSchedule(prev => ({
			...prev,
			[day]: subjectsList,
		}))
	}

	return (
		<AppContext.Provider
			value={{
				currentStudent,
				students,
				schedule,
				products,
				orders,
				buyProduct,
				addCoins,
				completeOrder,
				addStudent,
				deleteStudent,
				saveDaySchedule,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useApp = () => useContext(AppContext)
