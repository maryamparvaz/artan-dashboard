import moment from 'moment-jalaali'

const API_URL = 'https://683f06fb1cd60dca33de0507.mockapi.io/content/content'

export interface Content {
  id: number
  title: string
  description: string
  createdDate: string // Jalali date in format 'jYYYY/jMM/jDD'
  createdAt: string // ISO string for sorting/comparison
}

// Helper function to format date in Jalali
const formatJalaliDate = (date: Date) => {
  return moment(date).format('jYYYY/jMM/jDD')
}

export const contentApi = {
  // Get all content
  getAll: async (): Promise<Content[]> => {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch content')
    }
    const data = await response.json()
    // Ensure dates are properly formatted
    return data.map((item: any) => ({
      ...item,
      createdDate: item.createdDate || formatJalaliDate(new Date(item.createdAt)),
      createdAt: item.createdAt || new Date().toISOString()
    }))
  },

  // Create new content
  create: async (content: Omit<Content, 'id' | 'createdDate' | 'createdAt'>): Promise<Content> => {
    const now = new Date()
    const contentWithDates = {
      ...content,
      createdDate: formatJalaliDate(now),
      createdAt: now.toISOString()
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contentWithDates),
    })
    if (!response.ok) {
      throw new Error('Failed to create content')
    }
    return response.json()
  },

  // Update content
  update: async (id: number, content: Partial<Content>): Promise<Content> => {
    // Don't update dates when updating content
    const { createdDate, createdAt, ...updateData } = content as any

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
    if (!response.ok) {
      throw new Error('Failed to update content')
    }
    return response.json()
  },

  // Delete content
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete content')
    }
  }
} 