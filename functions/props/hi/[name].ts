import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ params }) {
    console.log('props/[name] called');
    return {
      data: {
        message: `Hello from the API, ${params?.name || 'anonymous'}`,
      },
    }
  },
  options: {
    cache: {
      html: 60 * 60 * 24 * 7,
    },
  },
}
