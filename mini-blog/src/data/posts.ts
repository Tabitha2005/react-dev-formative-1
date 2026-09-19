import type { Post } from '../types/post'

const HOUR = 60 * 60 * 1000

export const posts: Post[] = [
  {
    id: 1,
    title: 'Why I stopped fighting the TypeScript compiler',
    author: 'Amara Okafor',
    content:
      'For months I treated red squiggles as an enemy. Now I read the error first, and it usually tells me exactly which assumption in my code was wrong.',
    date: new Date(Date.now() - 2 * HOUR).toISOString(),
  },
  {
    id: 2,
    title: 'Three CSS tricks that saved my layout',
    author: 'Daniel Mensah',
    content:
      'Use gap instead of margins between flex items, try min() and max() for fluid sizing, and let grid handle anything with rows and columns.',
    date: '2026-09-10T14:00:00.000Z',
  },
  {
    id: 3,
    title: 'Small commits make debugging easier',
    author: 'Amara Okafor',
    content:
      'When each commit does one thing, git bisect can find a bug in minutes. A giant commit hides the problem inside a pile of unrelated changes.',
    date: '2026-09-03T09:30:00.000Z',
  },
]
