import { describe, vi, expect, test } from 'vitest'
import axios from 'axios'
import { mount } from '@vue/test-utils'
import UserList from '../UserList.vue'

// Mocking axios
vi.mock('axios')

describe('UserList.vue', () => {
  test('The component correctly fetches and displays user data from the API', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Awais Bashir' }] })
    const wrapper = mount(UserList)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Awais Bashir')
  })

  test('The component shows a loading state while the data is being fetched', async () => {
    axios.get.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: [] }), 300)),
    )
    const wrapper = mount(UserList)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Loading...')
  })

  test('An error message is displayed if the API request fails', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch users'))
    const wrapper = mount(UserList)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Failed to fetch users')
  })
})
