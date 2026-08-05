import { supabase } from './supabase'

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { data, error } = await supabase.storage.from('media').upload(filePath, file)

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`)
  }

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath)

  return publicUrl
}

export async function deleteFile(url: string): Promise<void> {
  try {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    const filePath = pathParts.slice(pathParts.indexOf('media') + 1).join('/')

    const { error } = await supabase.storage.from('media').remove([filePath])

    if (error) {
      console.error('Error deleting file:', error)
    }
  } catch (error) {
    console.error('Error parsing file URL:', error)
  }
}
