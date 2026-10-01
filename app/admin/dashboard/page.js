'use client'

import { AppProvider, useApp } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import AdminHeader from '@/components/admin/AdminHeader'
import GiveCoinsSection from '@/components/admin/GiveCoinsSection'
import OrdersSection from '@/components/admin/OrdersSection'
import ScheduleSection from '@/components/admin/ScheduleSection'
import StoreManagementSection from '@/components/admin/StoreManagementSection'
import SuperAdminSection from '@/components/admin/SuperAdminSection'

function AdminDashboardContent() {
	const router = useRouter()
	const {
		students,
		addCoins,
		orders,
		completeOrder,
		schedule,
		saveDaySchedule,
		products,
		addProduct,
		updateProduct,
		deleteProduct,
		addStudent,
		updateStudent,
		deleteStudent,
		updateAdminPassword,
	} = useApp()

	const [isSuperAdmin, setIsSuperAdmin] = useState(false)

	useEffect(() => {
		const isAuth = localStorage.getItem('isAdminAuthenticated')
		const superAdminRole = localStorage.getItem('isSuperAdmin') === 'true'

		if (!isAuth) {
			router.push('/admin/login')
		} else {
			setIsSuperAdmin(superAdminRole)
		}
	}, [router])

	return (
		<div className='min-h-screen bg-slate-50 p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8'>
			{/* 1. Header */}
			<AdminHeader isSuperAdmin={isSuperAdmin} />

			{/* 2. Super Admin Panel (Conditional) */}
			{isSuperAdmin && (
				<SuperAdminSection
					students={students}
					updateAdminPassword={updateAdminPassword}
					addStudent={addStudent}
					updateStudent={updateStudent}
					deleteStudent={deleteStudent}
				/>
			)}

			{/* 3. Coin Distribution & Order Acceptance Grid */}
			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'>
				<GiveCoinsSection students={students} addCoins={addCoins} />
				<OrdersSection orders={orders} completeOrder={completeOrder} />
			</div>

			{/* 4. Store Management */}
			<StoreManagementSection
				products={products}
				addProduct={addProduct}
				updateProduct={updateProduct}
				deleteProduct={deleteProduct}
			/>

			{/* 5. Weekly Schedule Builder */}
			<ScheduleSection schedule={schedule} saveDaySchedule={saveDaySchedule} />
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
