import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler() {
    console.log('props/index called');
    return {
      data: {
        server: true,
        message: 'Welcome to Reactesse Edge',
      },
    }
  },
  options: {
    cache: {
      html: 60 * 60 * 24 * 7,
    },
  },
}
