'use client'

import { StudentAuthModal } from '@/components/StudentAuthModal'
import { StudentDashboard } from '@/components/StudentDashboard'
import { AppProvider, useApp } from '@/context/AppContext'

function MainContent() {
	const { currentStudentId } = useApp()

	return (
		<main className='min-h-screen bg-slate-50/50 text-slate-900 pb-16 relative'>
			{!currentStudentId && <StudentAuthModal />}
			<StudentDashboard />
		</main>
	)
}

export default function Home() {
	return (
		<AppProvider>
			<MainContent />
		</AppProvider>
	)
}
