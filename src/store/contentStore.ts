import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment-jalaali'
import { contentApi, Content } from '@/services/contentApi'

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
    return await contentApi.create(content)
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
    return id
  }
)

// Mock data for activities (last 7 days)
const generateMockActivities = (): ContentActivity[] => {
  const activities: ContentActivity[] = []
  for (let i = 6; i >= 0; i--) {
    const date = moment().subtract(i, 'days')
    activities.push({
      date: date.format('jYYYY/jMM/jDD'),
      added: Math.floor(Math.random() * 10) + 1,
      deleted: Math.floor(Math.random() * 5)
    })
  }
  return activities
}

const initialState: ContentState = {
  contents: [],
  activities: generateMockActivities(),
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
        // Sort contents by createdAt in descending order (newest first)
        state.contents = action.payload.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch contents'
      })
      
      // Add content
      .addCase(addContent.fulfilled, (state, action) => {
        state.contents.unshift(action.payload)
        const today = moment().format('jYYYY/jMM/jDD')
        const todayActivity = state.activities.find(activity => activity.date === today)
        if (todayActivity) {
          todayActivity.added += 1
        }
      })
      
      // Update content
      .addCase(updateContent.fulfilled, (state, action) => {
        const index = state.contents.findIndex(content => content.id === action.payload.id)
        if (index !== -1) {
          // Preserve the original dates
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
        const today = moment().format('jYYYY/jMM/jDD')
        const todayActivity = state.activities.find(activity => activity.date === today)
        if (todayActivity) {
          todayActivity.deleted += 1
        }
      })
  }
})

// Selectors
export const selectTodayStats = (state: { content: ContentState }) => {
  const today = moment().format('jYYYY/jMM/jDD')
  const todayActivity = state.content.activities.find(activity => activity.date === today)
  return {
    added: todayActivity?.added || 0,
    deleted: todayActivity?.deleted || 0
  }
}

export const selectTotalStats = (state: { content: ContentState }) => {
  const { contents, activities } = state.content
  const totalAdded = activities.reduce((sum, activity) => sum + activity.added, 0)
  const totalDeleted = activities.reduce((sum, activity) => sum + activity.deleted, 0)
  
  return {
    total: contents.length,
    totalAdded,
    totalDeleted
  }
}

export default contentSlice.reducer
