import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment-jalaali'
import { contentApi, Content } from '@/services/contentApi'

// Re-export Content type
export type { Content }

export interface ContentActivity {
  date: string // Jalali date in format 'jYYYY/jMM/jDD'
  added: number
  deleted: number
}

interface ContentState {
  contents: Content[]
  activities: ContentActivity[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Local storage keys
const TODAY_STATS_KEY = 'content_today_stats'
const TOTAL_STATS_KEY = 'content_total_stats'

// Safe localStorage access
const getLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') {
    return defaultValue
  }
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error accessing localStorage:', error)
    return defaultValue
  }
}

const setLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error setting localStorage:', error)
  }
}

// Helper functions for localStorage
const getTodayStats = (): { added: number; deleted: number } => {
  const today = moment().format('jYYYY/jMM/jDD')
  const stats = getLocalStorage(TODAY_STATS_KEY, {})
  return {
    added: stats[today]?.added || 0,
    deleted: stats[today]?.deleted || 0
  }
}

const updateTodayStats = (type: 'added' | 'deleted') => {
  const today = moment().format('jYYYY/jMM/jDD')
  const stats = getLocalStorage(TODAY_STATS_KEY, {})
  if (!stats[today]) {
    stats[today] = { added: 0, deleted: 0 }
  }
  stats[today][type] = (stats[today][type] || 0) + 1
  setLocalStorage(TODAY_STATS_KEY, stats)
}

const getTotalStats = (): { totalAdded: number; totalDeleted: number } => {
  return getLocalStorage(TOTAL_STATS_KEY, { totalAdded: 0, totalDeleted: 0 })
}

const updateTotalStats = (type: 'totalAdded' | 'totalDeleted') => {
  const stats = getTotalStats()
  stats[type] = (stats[type] || 0) + 1
  setLocalStorage(TOTAL_STATS_KEY, stats)
}

// Get activities for the last 7 days
const getActivities = (): ContentActivity[] => {
  if (typeof window === 'undefined') {
    return []
  }
  
  const activities: ContentActivity[] = []
  const stats = getLocalStorage(TODAY_STATS_KEY, {})
  
  // Get the last 7 days including today
  for (let i = 6; i >= 0; i--) {
    const date = moment().subtract(i, 'days')
    const today = date.format('jYYYY/jMM/jDD')
    const dayStats = stats[today] || { added: 0, deleted: 0 }
    activities.push({
      date: today,
      added: dayStats.added || 0,
      deleted: dayStats.deleted || 0
    })
  }
  return activities
}

// Async thunks
export const fetchContents = createAsyncThunk(
  'content/fetchContents',
  async () => {
    return await contentApi.getAll()
  }
)

export const addContent = createAsyncThunk(
  'content/addContent',
  async (content: Omit<Content, 'id' | 'createdDate' | 'createdAt'>) => {
    const result = await contentApi.create(content)
    updateTodayStats('added')
    updateTotalStats('totalAdded')
    return result
  }
)

export const updateContent = createAsyncThunk(
  'content/updateContent',
  async ({ id, content }: { id: number; content: Partial<Content> }) => {
    return await contentApi.update(id, content)
  }
)

export const deleteContent = createAsyncThunk(
  'content/deleteContent',
  async (id: number) => {
    await contentApi.delete(id)
    updateTodayStats('deleted')
    updateTotalStats('totalDeleted')
    return id
  }
)

const initialState: ContentState = {
  contents: [],
  activities: getActivities(),
  status: 'idle',
  error: null
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch contents
      .addCase(fetchContents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.contents = action.payload.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        state.activities = getActivities()
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch contents'
      })
      
      // Add content
      .addCase(addContent.fulfilled, (state, action) => {
        state.contents.unshift(action.payload)
        state.activities = getActivities()
      })
      
      // Update content
      .addCase(updateContent.fulfilled, (state, action) => {
        const index = state.contents.findIndex(content => content.id === action.payload.id)
        if (index !== -1) {
          state.contents[index] = {
            ...action.payload,
            createdDate: state.contents[index].createdDate,
            createdAt: state.contents[index].createdAt
          }
        }
      })
      
      // Delete content
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.contents = state.contents.filter(content => content.id !== action.payload)
        state.activities = getActivities()
      })
  }
})

// Selectors
export const selectTodayStats = (state: { content: ContentState }) => {
  if (typeof window === 'undefined') {
    return { added: 0, deleted: 0 }
  }
  return getTodayStats()
}

export const selectTotalStats = (state: { content: ContentState }) => {
  if (typeof window === 'undefined') {
    return { total: 0, totalAdded: 0, totalDeleted: 0 }
  }
  const { totalAdded, totalDeleted } = getTotalStats()
  return {
    total: state.content.contents.length,
    totalAdded,
    totalDeleted
  }
}

export default contentSlice.reducer
