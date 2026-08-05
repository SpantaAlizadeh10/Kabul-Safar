'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  status: 'draft' | 'published'
  created_at: string
  cover_image?: string
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching articles:', error)
    } else {
      setArticles(data || [])
    }
    setLoading(false)
  }

  const deleteArticle = async (id: string) => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این مقاله را حذف کنید؟')) {
      return
    }

    const { error } = await supabase.from('articles').delete().eq('id', id)

    if (error) {
      console.error('Error deleting article:', error)
      alert('خطا در حذف مقاله')
    } else {
      setArticles(articles.filter((a) => a.id !== id))
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">داشبورد مدیریت مقالات</h1>
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            <span>مقاله جدید</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">عنوان</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">دسته‌بندی</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">نویسنده</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">وضعیت</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">تاریخ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    هنوز مقاله‌ای وجود ندارد
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{article.excerpt}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{article.category || '-'}</td>
                    <td className="px-6 py-4 text-gray-700">{article.author || '-'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          article.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {article.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {new Date(article.created_at).toLocaleDateString('fa-IR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-blue-600 transition"
                          title="مشاهده"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 transition"
                          title="ویرایش"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => deleteArticle(article.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
