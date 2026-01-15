// @ts-check
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// 사이트 메타데이터
const SITE_URL = 'https://ycra-dev.github.io';
const BASE_PATH = '/knowledge';
const SITE_TITLE = 'ycra.dev knowledge';
const SITE_DESCRIPTION = '수학·물리·컴퓨터공학 개념을 정리하는 개인 백과사전';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages 배포 설정
	site: SITE_URL,
	base: BASE_PATH,

	integrations: [
		starlight({
			title: SITE_TITLE,
			description: SITE_DESCRIPTION,
			// 기본 언어를 한국어로 설정 (HTML lang="ko")
			defaultLocale: 'root',
			locales: {
				root: {
					label: '한국어',
					lang: 'ko',
				},
			},
			// favicon 설정 (public/favicon.svg 사용)
			favicon: '/favicon.svg',
			// SEO 및 메타 태그 설정
			head: [
				// 기본 robots 메타 (index, follow)
				{
					tag: 'meta',
					attrs: { name: 'robots', content: 'index, follow' },
				},
				// Open Graph 태그
				{
					tag: 'meta',
					attrs: { property: 'og:type', content: 'website' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:site_name', content: SITE_TITLE },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:locale', content: 'ko_KR' },
				},
				// Twitter Card 기본 설정
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary' },
				},
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ycra-dev/knowledge' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
		// sitemap 자동 생성
		sitemap(),
	],
});
