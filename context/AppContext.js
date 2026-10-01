'use client'

import {
	INITIAL_PRODUCTS,
	INITIAL_SCHEDULE,
	INITIAL_STUDENTS,
} from '@/mock/InitialData'
import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
	// Initialize students with default passwords if not present
	const [students, setStudents] = useState(() =>
		INITIAL_STUDENTS.map(s => ({
			...s,
			password: s.password || '123456', // Default fallback password for initial mock data
		})),
	)

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

	const [products, setProducts] = useState(INITIAL_PRODUCTS)
	const [orders, setOrders] = useState([
		{
			id: 'o1',
			studentName: 'Абдувохидов Мухаммадсаид',
			studentId: '1',
			studentGroup: 'IFC-101',
			productTitle: 'Web Development Bootcamp Course Access',
			price: 120,
			status: 'Новый',
		},
	])

	const [currentStudentId, setCurrentStudentId] = useState(null)

	useEffect(() => {
		const savedStudentId = localStorage.getItem('currentStudentId')
		if (savedStudentId) {
			setCurrentStudentId(savedStudentId)
		}
	}, [])

	const currentStudent =
		students.find(s => s.id === currentStudentId) || students[0]

	// Student Authentication with Password Check
	const loginStudent = (studentId, password) => {
		const student = students.find(s => s.id === studentId)
		if (!student) {
			return { success: false, message: 'Студент не найден!' }
		}
		if (student.password !== password) {
			return { success: false, message: 'Неверный пароль!' }
		}

		setCurrentStudentId(student.id)
		localStorage.setItem('currentStudentId', student.id)
		return { success: true }
	}

	const registerStudent = newStudentData => {
		const newStudent = {
			id: Date.now().toString(),
			coins: 0,
			courseYear: Number(newStudentData.courseYear) || 1,
			...newStudentData,
		}
		setStudents(prev => [...prev, newStudent])
		setCurrentStudentId(newStudent.id)
		localStorage.setItem('currentStudentId', newStudent.id)
		return newStudent
	}

	const logoutStudent = () => {
		setCurrentStudentId(null)
		localStorage.removeItem('currentStudentId')
	}

	// Product Store Management
	const addProduct = newProduct => {
		const product = {
			id: 'p_' + Date.now().toString(),
			...newProduct,
			price: Number(newProduct.price),
		}
		setProducts(prev => [...prev, product])
	}

	const updateProduct = (id, updatedFields) => {
		setProducts(prev =>
			prev.map(p =>
				p.id === id
					? { ...p, ...updatedFields, price: Number(updatedFields.price) }
					: p,
			),
		)
	}

	const deleteProduct = id => {
		setProducts(prev => prev.filter(p => p.id !== id))
	}

	// Purchases
	const buyProduct = product => {
		if (!currentStudent) {
			alert('Пожалуйста, войдите в систему!')
			return
		}
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
			studentGroup: currentStudent.groupID,
			productTitle: product.title,
			price: product.price,
			status: 'Новый',
		}
		setOrders(prev => [newOrder, ...prev])
		alert(`Успешно куплено: ${product.title}`)
	}

	// Admin Actions
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
				currentStudentId,
				students,
				schedule,
				products,
				orders,
				loginStudent,
				registerStudent,
				logoutStudent,
				buyProduct,
				addCoins,
				completeOrder,
				saveDaySchedule,
				addProduct,
				updateProduct,
				deleteProduct,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useApp = () => useContext(AppContext)
