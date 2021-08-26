import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler() {
    console.log('props/[...all] called');
    return {
      data: {
        server: true,
        message: 'Catch all props',
      },
    }
  },
  options: {
    cache: {
      html: 60 * 60 * 24 * 7,
    },
  },
}
