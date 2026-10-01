'use client'
import { Navigation } from '@/components/Navigation'
import { StudentDashboard } from '@/components/StudentDashboard'
import { AppProvider } from '@/context/AppContext'

export default function Home() {
	return (
		<AppProvider>
			<main className='min-h-screen bg-slate-50/50 text-slate-900 pb-16'>
				<Navigation />
				<StudentDashboard />
			</main>
		</AppProvider>
	)
}
