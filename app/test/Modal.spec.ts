import { mount } from '@vue/test-utils'
import Modal from './Modal.vue'
import { closeModal } from 'jenesius-vue-modal'

// Mock the 'jenesius-vue-modal' library
jest.mock('jenesius-vue-modal', () => ({
  closeModal: jest.fn(),
}))

describe('Modal.vue', () => {
  // Clear mock calls after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the message when passed as a prop', () => {
    const message = 'Test Message'
    const wrapper = mount(Modal, {
      props: {
        message,
      },
    })
    expect(wrapper.text()).toContain(message)
  })

  it('renders a dynamic component when passed as a prop', () => {
    const childComponent = {
      template: '<div class="child-component">Child Component</div>',
    }
    const wrapper = mount(Modal, {
      props: {
        component: childComponent,
      },
    })
    expect(wrapper.find('.child-component').exists()).toBe(true)
  })

  it('calls closeModal when the close button is clicked', async () => {
    const wrapper = mount(Modal)
    // Find the close button specifically
    const closeButton = wrapper.findAll('button').find(b => b.text() === '閉じる')
    await closeButton!.trigger('click')
    expect(closeModal).toHaveBeenCalled()
  })

  it('calls closeModal when the overlay is clicked', async () => {
    const wrapper = mount(Modal)
    await wrapper.find('.fixed').trigger('click')
    expect(closeModal).toHaveBeenCalled()
  })
})
