import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: import.meta.env.URARA_SITE_PROTOCOL ?? import.meta.env.DEV ? 'http://' : 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'urara-demo.netlify.app',
  title: 'Hazel',
  subtitle: 'Engineering Blog Portfolio',
  lang: 'en-US',
  description: 'Engineering Blog Portfolio',
  author: {
    avatar: '/assets/maskable@512.png',
    name: 'Hazel',
    status: '',
    metadata: [
      {
        text: '',
        icon: 'i-simple-icons-github',
        link: 'https://github.com/LavaWaffle'
      },
      {
        text: '',
        icon: 'i-simple-icons-maildotru',
        link: 'mailto:parab3@illinois.edu'
      }
    ],
    bio: 'Aspiring Computer Engineer at the University of Illinois at Urbana-Champaign.'
  },
  themeColor: '#3D4451'
}
