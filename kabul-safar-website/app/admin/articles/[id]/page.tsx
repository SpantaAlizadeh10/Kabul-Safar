'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Save, Upload, X } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import { uploadFile, deleteFile } from '@/lib/upload'
import { supabase } from '@/lib/supabase'

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: '',
    author: '',
    content: '',
    status: 'draft' as 'draft' | 'published',
    cover_image: '',
    published_at: null as string | null,
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState('')

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching article:', error)
      alert('خطا در بارگذاری مقاله')
      router.push('/admin')
      return
    }

    setFormData({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || '',
      category: data.category || '',
      author: data.author || '',
      content: data.content,
      status: data.status,
      cover_image: data.cover_image || '',
      published_at: data.published_at,
    })

    // Extract audio URL from content if exists
    const audioMatch = data.content.match(/<audio[^>]*src="([^"]*)"[^>]*>/)
    if (audioMatch) {
      setAudioUrl(audioMatch[1])
    }

    setLoading(false)
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    return await uploadFile(file, 'images')
  }

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        // Delete old cover image if exists
        if (formData.cover_image) {
          await deleteFile(formData.cover_image)
        }
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
        // Delete old audio if exists
        if (audioUrl) {
          await deleteFile(audioUrl)
        }
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

    setSaving(true)

    try {
      const slug = formData.slug || generateSlug(formData.title)

      // Remove existing audio tag and add new one if audioUrl exists
      let finalContent = formData.content.replace(/<audio[^>]*>.*?<\/audio>/g, '')
      if (audioUrl) {
        finalContent = `${finalContent}<br><audio controls src="${audioUrl}"></audio>`
      }

      const { error } = await supabase
        .from('articles')
        .update({
          title: formData.title,
          slug,
          excerpt: formData.excerpt,
          content: finalContent,
          category: formData.category,
          author: formData.author,
          cover_image: formData.cover_image,
          status: publish ? 'published' : 'draft',
          published_at: publish && formData.status !== 'published' ? new Date().toISOString() : formData.status === 'published' ? formData.published_at : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.id)

      if (error) throw error

      router.push('/admin')
    } catch (error) {
      console.error('Error updating article:', error)
      alert('خطا در بروزرسانی مقاله')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin"
            className="p-2 hover:bg-gray-200 rounded-lg transition"
          >
            <ArrowRight size={24} />
          </Link>
          <h1 className="text-3xl font-bold">ویرایش مقاله</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان مقاله *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="عنوان مقاله را وارد کنید"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="slug-magale"
              dir="ltr"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              خلاصه مقاله
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="خلاصه کوتاه از مقاله"
            />
          </div>

          {/* Category & Author */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                دسته‌بندی
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="مثال: ویزای ایران"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نویسنده
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="نام نویسنده"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تصویر کاور
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <Upload size={18} />
                <span>انتخاب تصویر</span>
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
                    className="h-20 rounded-lg"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, cover_image: '' })}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Audio Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              فایل صوتی (اختیاری)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <Upload size={18} />
                <span>انتخاب فایل صوتی</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </label>
              {audioFile && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{audioFile.name}</span>
                  <button
                    onClick={() => {
                      setAudioFile(null)
                      setAudioUrl('')
                    }}
                    className="p-1 text-red-500 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {audioUrl && !audioFile && (
                <div className="flex items-center gap-2">
                  <audio controls src={audioUrl} className="h-8" />
                  <button
                    onClick={() => {
                      setAudioUrl('')
                    }}
                    className="p-1 text-red-500 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              محتوای مقاله *
            </label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              onImageUpload={handleImageUpload}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <Link
              href="/admin"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              انصراف
            </Link>
            <button
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
            >
              <Save size={18} />
              <span>ذخیره پیش‌نویس</span>
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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
