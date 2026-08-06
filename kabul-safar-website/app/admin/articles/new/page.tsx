'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Save, Upload, X } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import { uploadFile } from '@/lib/upload'
import { supabase } from '@/lib/supabase'

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: '',
    author: '',
    content: '',
    status: 'draft' as 'draft' | 'published',
    cover_image: '',
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState('')

  const handleImageUpload = async (file: File): Promise<string> => {
    return await uploadFile(file, 'images')
  }

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const url = await uploadFile(file, 'covers')
        setFormData({ ...formData, cover_image: url })
      } catch (error) {
        console.error('Error uploading cover image:', error)
        alert('خطا در آپلود تصویر کاور')
      }
    }
  }

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      try {
        const url = await uploadFile(file, 'audio')
        setAudioUrl(url)
      } catch (error) {
        console.error('Error uploading audio:', error)
        alert('خطا در آپلود فایل صوتی')
      }
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (publish: boolean = false) => {
    if (!formData.title || !formData.content) {
      alert('لطفا عنوان و محتوای مقاله را وارد کنید')
      return
    }

    setLoading(true)

    try {
      const slug = formData.slug || generateSlug(formData.title)
      const finalContent = audioUrl
        ? `${formData.content}<br><audio controls src="${audioUrl}"></audio>`
        : formData.content

      const { data, error } = await supabase
        .from('articles')
        .insert({
          title: formData.title,
          slug,
          excerpt: formData.excerpt,
          content: finalContent,
          category: formData.category,
          author: formData.author,
          cover_image: formData.cover_image,
          status: publish ? 'published' : 'draft',
          published_at: publish ? new Date().toISOString() : null,
        })
        .select()
        .single()

      if (error) throw error

      router.push('/admin')
    } catch (error) {
      console.error('Error creating article:', JSON.stringify(error, null, 2))
      console.error('Error details:', error)
      alert(`خطا در ایجاد مقاله: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-all hover:bg-[#0dadd1] hover:text-white hover:shadow-lg"
          >
            <ArrowRight size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900">مقاله جدید</h1>
            <p className="text-sm text-slate-500">مقاله جدید را ایجاد و منتشر کنید</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-slate-200/50 p-8 space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              عنوان مقاله *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value })
                if (!formData.slug) {
                  setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })
                }
              }}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition-all focus:border-[#0dadd1] focus:ring-4 focus:ring-[#0dadd1]/10 focus:outline-none"
              placeholder="عنوان مقاله را وارد کنید"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition-all focus:border-[#0dadd1] focus:ring-4 focus:ring-[#0dadd1]/10 focus:outline-none font-mono text-sm"
              placeholder="slug-magale"
              dir="ltr"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              خلاصه مقاله
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition-all focus:border-[#0dadd1] focus:ring-4 focus:ring-[#0dadd1]/10 focus:outline-none resize-none"
              rows={3}
              placeholder="خلاصه کوتاه از مقاله"
            />
          </div>

          {/* Category & Author */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                دسته‌بندی
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition-all focus:border-[#0dadd1] focus:ring-4 focus:ring-[#0dadd1]/10 focus:outline-none"
                placeholder="مثال: ویزای ایران"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                نویسنده
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition-all focus:border-[#0dadd1] focus:ring-4 focus:ring-[#0dadd1]/10 focus:outline-none"
                placeholder="نام نویسنده"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              تصویر کاور
            </label>
            <div className="flex items-center gap-4">
              <label className="group flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-3 cursor-pointer transition-all hover:border-[#0dadd1] hover:bg-[#0dadd1]/5">
                <Upload size={18} className="text-slate-400 group-hover:text-[#0dadd1] transition-colors" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-[#0dadd1] transition-colors">انتخاب تصویر</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="hidden"
                />
              </label>
              {formData.cover_image && (
                <div className="relative">
                  <img
                    src={formData.cover_image}
                    alt="Cover"
                    className="h-20 w-20 rounded-xl object-cover shadow-md ring-2 ring-white"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, cover_image: '' })}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-all hover:bg-red-600 hover:scale-110"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Audio Upload */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              فایل صوتی (اختیاری)
            </label>
            <div className="flex items-center gap-4">
              <label className="group flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-3 cursor-pointer transition-all hover:border-[#0dadd1] hover:bg-[#0dadd1]/5">
                <Upload size={18} className="text-slate-400 group-hover:text-[#0dadd1] transition-colors" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-[#0dadd1] transition-colors">انتخاب فایل صوتی</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </label>
              {audioFile && (
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
                  <span className="text-sm font-medium text-slate-700">{audioFile.name}</span>
                  <button
                    onClick={() => {
                      setAudioFile(null)
                      setAudioUrl('')
                    }}
                    className="rounded-lg p-1 text-red-500 transition-all hover:bg-red-100 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              محتوای مقاله *
            </label>
            <div className="rounded-xl border-2 border-slate-200 ring-4 ring-transparent transition-all focus-within:border-[#0dadd1] focus-within:ring-[#0dadd1]/10">
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                onImageUpload={handleImageUpload}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
            <Link
              href="/admin"
              className="rounded-xl border-2 border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-400"
            >
              انصراف
            </Link>
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-slate-700 hover:to-slate-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>ذخیره پیش‌نویس</span>
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0dadd1] to-[#377bc9] px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-[#0c9cc0] hover:to-[#306bb0] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>انتشار</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
