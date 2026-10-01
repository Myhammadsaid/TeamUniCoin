'use client'

import { useState } from 'react'
import { FaPenToSquare, FaPlus, FaStore, FaTrashCan } from 'react-icons/fa6'
import { LuCoins } from 'react-icons/lu'

export default function StoreManagementSection({
	products,
	addProduct,
	updateProduct,
	deleteProduct,
}) {
	const [categories, setCategories] = useState([
		'Все товары',
		'Фирменная кружка',
		'Официальный мерч',
		'VIP Доступ',
		'Онлайн-курсы',
	])
	const [editingProductId, setEditingProductId] = useState(null)
	const [isCustomCategory, setIsCustomCategory] = useState(false)
	const [customCategoryInput, setCustomCategoryInput] = useState('')
	const [productForm, setProductForm] = useState({
		title: '',
		price: '',
		category: 'Официальный мерч',
		description: '',
	})

	const handleCategoryChange = e => {
		const value = e.target.value
		if (value === 'NEW_CATEGORY') {
			setIsCustomCategory(true)
			setProductForm({ ...productForm, category: '' })
		} else {
			setIsCustomCategory(false)
			setProductForm({ ...productForm, category: value })
		}
	}

	const handleProductSubmit = e => {
		e.preventDefault()
		const finalCategory = isCustomCategory
			? customCategoryInput.trim()
			: productForm.category

		if (!productForm.title || !productForm.price || !finalCategory) {
			alert('Заполните все обязательные поля!')
			return
		}

		if (isCustomCategory && !categories.includes(finalCategory)) {
			setCategories(prev => [...prev, finalCategory])
		}

		const payload = {
			...productForm,
			category: finalCategory,
		}

		if (editingProductId) {
			updateProduct(editingProductId, payload)
			alert('Товар успешно обновлен!')
			setEditingProductId(null)
		} else {
			addProduct(payload)
			alert('Товар успешно добавлен!')
		}

		setIsCustomCategory(false)
		setCustomCategoryInput('')
		setProductForm({
			title: '',
			price: '',
			category: categories[0] || 'Официальный мерч',
			description: '',
		})
	}

	const handleEditProduct = product => {
		setEditingProductId(product.id)
		if (!categories.includes(product.category)) {
			setCategories(prev => [...prev, product.category])
		}
		setIsCustomCategory(false)
		setProductForm({
			title: product.title,
			price: product.price,
			category: product.category,
			description: product.description,
		})
	}

	const handleCancelEdit = () => {
		setEditingProductId(null)
		setIsCustomCategory(false)
		setCustomCategoryInput('')
		setProductForm({
			title: '',
			price: '',
			category: categories[0] || 'Официальный мерч',
			description: '',
		})
	}

	return (
		<div className='max-w-7xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 shadow-sm space-y-4 sm:space-y-6'>
			<div className='flex items-center gap-3'>
				<div className='p-2 sm:p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0'>
					<FaStore className='w-5 h-5' />
				</div>
				<div>
					<h2 className='text-lg sm:text-xl font-bold text-slate-900'>
						Управление товарами магазина
					</h2>
					<p className='text-[11px] sm:text-xs text-slate-400'>
						Добавляйте, редактируйте и удаляйте товары из каталога
					</p>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8'>
				{/* Form */}
				<form
					onSubmit={handleProductSubmit}
					className='space-y-3.5 sm:space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100'
				>
					<h3 className='font-bold text-xs sm:text-sm text-slate-800'>
						{editingProductId ? 'Редактировать товар' : 'Добавить новый товар'}
					</h3>

					<div>
						<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
							Название товара
						</label>
						<input
							type='text'
							value={productForm.title}
							onChange={e =>
								setProductForm({ ...productForm, title: e.target.value })
							}
							className='w-full p-2.5 sm:p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
							required
						/>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
								Цена (Coins)
							</label>
							<input
								type='number'
								value={productForm.price}
								onChange={e =>
									setProductForm({ ...productForm, price: e.target.value })
								}
								className='w-full p-2.5 sm:p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
								required
							/>
						</div>

						<div>
							<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
								Категория
							</label>
							<select
								value={isCustomCategory ? 'NEW_CATEGORY' : productForm.category}
								onChange={handleCategoryChange}
								className='w-full p-2.5 sm:p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
							>
								{categories.map(cat => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
								<option value='NEW_CATEGORY'>+ Создать новую категорию</option>
							</select>
						</div>
					</div>

					{isCustomCategory && (
						<div className='space-y-1 animate-fadeIn'>
							<label className='block text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1'>
								Новая категория
							</label>
							<input
								type='text'
								placeholder='Введите имя новой категории'
								value={customCategoryInput}
								onChange={e => setCustomCategoryInput(e.target.value)}
								className='w-full p-2.5 sm:p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
								required
							/>
						</div>
					)}

					<div>
						<label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1'>
							Описание
						</label>
						<textarea
							rows={3}
							value={productForm.description}
							onChange={e =>
								setProductForm({
									...productForm,
									description: e.target.value,
								})
							}
							className='w-full p-2.5 sm:p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none'
						/>
					</div>

					<div className='flex gap-2 pt-1 sm:pt-2'>
						<button
							type='submit'
							className='flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 sm:py-3 rounded-xl transition text-xs shadow-sm flex items-center justify-center gap-1.5'
							aria-label={
								editingProductId ? 'Сохранить товар' : 'Добавить товар'
							}
							title={editingProductId ? 'Сохранить' : 'Добавить'}
						>
							<FaPlus className='w-3.5 h-3.5 shrink-0' />
							<span>{editingProductId ? 'Сохранить' : 'Добавить'}</span>
						</button>

						{editingProductId && (
							<button
								type='button'
								onClick={handleCancelEdit}
								className='px-3 sm:px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 sm:py-3 rounded-xl transition text-xs'
							>
								Отмена
							</button>
						)}
					</div>
				</form>

				{/* List */}
				<div className='lg:col-span-2 space-y-2.5 sm:space-y-3 max-h-[420px] overflow-y-auto pr-1'>
					{products.map(product => (
						<div
							key={product.id}
							className='p-3.5 sm:p-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl flex justify-between items-center gap-3 hover:bg-slate-100/60 transition'
						>
							<div className='space-y-1 min-w-0'>
								<div className='flex items-center gap-2 flex-wrap'>
									<span className='font-bold text-xs sm:text-sm text-slate-900 truncate'>
										{product.title}
									</span>
									<span className='text-[10px] font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full shrink-0'>
										{product.category}
									</span>
								</div>
								<p className='text-[11px] sm:text-xs text-slate-500 line-clamp-1'>
									{product.description}
								</p>
								<div className='text-[11px] sm:text-xs font-extrabold text-amber-600 flex items-center gap-1'>
									<LuCoins className='w-3.5 h-3.5' />
									<span>{product.price} coins</span>
								</div>
							</div>

							<div className='flex items-center gap-1 shrink-0'>
								<button
									type='button'
									onClick={() => handleEditProduct(product)}
									className='p-2 sm:p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition'
									title='Редактировать'
									aria-label='Редактировать'
								>
									<FaPenToSquare className='w-4 h-4' />
								</button>
								<button
									type='button'
									onClick={() => {
										if (confirm(`Удалить товар "${product.title}"?`)) {
											deleteProduct(product.id)
										}
									}}
									className='p-2 sm:p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition'
									title='Удалить'
									aria-label='Удалить'
								>
									<FaTrashCan className='w-4 h-4' />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
