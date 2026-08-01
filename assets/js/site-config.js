/*
 * Site content and visual settings.
 * Most routine updates only need this file; see CONTENT_GUIDE.md.
 */
window.SITE_CONFIG = {
    githubUsername: 'Serendisand',
    playlistIds: ['3778678', '3779629', '19723756', '2250011882', '3136952023'],
    texts: {
        zh: {
            loading: "正在从 GitHub 获取创作轨迹 ...",
            reposTitle: "开源项目",
            galleryTitle: "精选照片",
            footerText: "Serendisand",
            footerSub: "We found that your request fell into the water.",
            siteTitle: "Serendisand []~(￣▽￣)~*干杯~",
            tagline: "热爱生活，以及生活给予我的一切",
            langBtn: "中文",
            repoCountPrefix: "仓库",
            noDesc: "无具体描述，但代码本身会说话。",
            profileFallbackBio: "写代码，也写诗。在比特与流沙之间搭建个人宇宙。",
            locationFallback: "数字游牧",
            blogFallback: {
                text: "柑音手帐",
                url: "https://Serendisand.github.io/Tangerine-Echo-Journal/"
            },
            followersLabel: "追随者",
            followingLabel: "正在关注",
            reposLabel: "仓库",
            themeNames: { 'swan-white': '天鹅白', 'quantum-black': '量子黑', 'sand-gold': '流沙金', 'mist-gray': '雾霭灰', 'ocean-teal': '深海蓝', 'sunset-rose': '暮色粉', 'forest-moss': '苔原绿' },
            nameFirst: "Serendisand",
            nameSecond: "Serendisand",
            links: [
                { icon: "fab fa-github", name: "GitHub", url: "https://github.com/Serendisand", tooltip: "GitHub主页" },
                { icon: "fas fa-book", name: "柑音手帐", url: "https://Serendisand.github.io/Tangerine-Echo-Journal/", tooltip: "打开柑音手帐" }
            ]
        },
        en: {
            loading: "Fetching creative traces from GitHub ...",
            reposTitle: "Open Source Projects",
            galleryTitle: "Featured Photos",
            footerText: "Serendisand",
            footerSub: "We found that your request fell into the water.",
            siteTitle: "Serendisand []~(￣▽￣)~* Cheers~",
            tagline: "Love life, and all that life gives me",
            langBtn: "English",
            repoCountPrefix: "repos",
            noDesc: "No description, but code speaks for itself.",
            profileFallbackBio: "Coding & poetry. Building a personal universe between bits and drifting sand.",
            locationFallback: "Digital Nomad",
            blogFallback: {
                text: "Tangerine Echo Journal",
                url: "https://Serendisand.github.io/Tangerine-Echo-Journal/"
            },
            followersLabel: "Followers",
            followingLabel: "Following",
            reposLabel: "Repos",
            themeNames: { 'swan-white': 'Swan White', 'quantum-black': 'Quantum Black', 'sand-gold': 'Sand Gold', 'mist-gray': 'Mist Gray', 'ocean-teal': 'Ocean Teal', 'sunset-rose': 'Sunset Rose', 'forest-moss': 'Forest Moss' },
            nameFirst: "Serendisand",
            nameSecond: "Serendisand",
            links: [
                { icon: "fab fa-github", name: "GitHub", url: "https://github.com/Serendisand", tooltip: "GitHub Home" },
                { icon: "fas fa-book", name: "Tangerine Echo Journal", url: "https://Serendisand.github.io/Tangerine-Echo-Journal/", tooltip: "Open Tangerine Echo Journal" }
            ]
        }
    },
    themes: { 'swan-white': { bgBody: '#f5f4f0', textPrimary: '#1e1e1c', borderLight: '#dcd7cd', cardBg: '#faf9f6', cardBorder: '#e9e3db', accentMuted: '#6b6a64', dotInactive: '#ccc6bd', dotActive: '#5a5952', btnBg: '#2c2b28', btnText: '#f0eee9', statBg: '#ffffff', repoCardBg: '#ffffff', loaderBorder: '#cbc6bb', loaderTop: '#5a5952', ctrlBg: '#f0ede8', ctrlText: '#1e1e1c', linkColor: '#1e1e1c', isLight: true, vinylBg: '#e0dcd3', vinylIcon: '#1e1e1c', ringColor: '#d4cfc4' }, 'quantum-black': { bgBody: '#0a0a0a', textPrimary: '#ffffff', borderLight: '#3a3a3a', cardBg: '#141414', cardBorder: '#3d3d3d', accentMuted: '#e0e0e0', dotInactive: '#5a5a5a', dotActive: '#ffffff', btnBg: '#2a2a2a', btnText: '#ffffff', statBg: '#1e1e1e', repoCardBg: '#1a1a1a', loaderBorder: '#5a5a5a', loaderTop: '#ffffff', ctrlBg: '#2a2a2a', ctrlText: '#ffffff', linkColor: '#ffffff', isLight: false, vinylBg: '#3a3a3a', vinylIcon: '#ffffff', ringColor: '#3a3a3a' }, 'sand-gold': { bgBody: '#fef7e8', textPrimary: '#3e362c', borderLight: '#e2d5bd', cardBg: '#fffaf0', cardBorder: '#e8dbc8', accentMuted: '#a18c6f', dotInactive: '#ddcfb5', dotActive: '#b48c48', btnBg: '#c9ae7b', btnText: '#2c2b28', statBg: '#ffffffd9', repoCardBg: '#ffffff', loaderBorder: '#ddcfb5', loaderTop: '#b48c48', ctrlBg: '#fef0df', ctrlText: '#3e362c', linkColor: '#3e362c', isLight: true, vinylBg: '#f5e6d0', vinylIcon: '#b48c48', ringColor: '#e8cf9a' }, 'mist-gray': { bgBody: '#ece9e2', textPrimary: '#2f2e2b', borderLight: '#cfcbc2', cardBg: '#f4f2ef', cardBorder: '#ddd8cf', accentMuted: '#7c7a72', dotInactive: '#bcb7ac', dotActive: '#585650', btnBg: '#5c5a54', btnText: '#f2f0eb', statBg: '#ffffff', repoCardBg: '#ffffff', loaderBorder: '#bcb7ac', loaderTop: '#585650', ctrlBg: '#e5e0d8', ctrlText: '#2f2e2b', linkColor: '#2f2e2b', isLight: true, vinylBg: '#ddd8cf', vinylIcon: '#585650', ringColor: '#cdc8bd' }, 'ocean-teal': { bgBody: '#eef4f2', textPrimary: '#1c3a38', borderLight: '#cbdcd8', cardBg: '#ffffff', cardBorder: '#d2e3df', accentMuted: '#4f7e78', dotInactive: '#bbd1cc', dotActive: '#2c6e64', btnBg: '#2c6e64', btnText: '#f0f7f5', statBg: '#ffffff', repoCardBg: '#ffffff', loaderBorder: '#bbd1cc', loaderTop: '#2c6e64', ctrlBg: '#e2f0ec', ctrlText: '#1c3a38', linkColor: '#1c3a38', isLight: true, vinylBg: '#cbdcd8', vinylIcon: '#2c6e64', ringColor: '#c2dbd4' }, 'sunset-rose': { bgBody: '#fff5f2', textPrimary: '#5e2e3c', borderLight: '#f0dbd4', cardBg: '#fffcf9', cardBorder: '#f3e0d9', accentMuted: '#b5727c', dotInactive: '#f0cfc7', dotActive: '#c1545e', btnBg: '#c1545e', btnText: '#fff9f8', statBg: '#ffffff', repoCardBg: '#ffffff', loaderBorder: '#f0cfc7', loaderTop: '#c1545e', ctrlBg: '#ffeae4', ctrlText: '#5e2e3c', linkColor: '#5e2e3c', isLight: true, vinylBg: '#f0dbd4', vinylIcon: '#c1545e', ringColor: '#f0cdc3' }, 'forest-moss': { bgBody: '#1e2a24', textPrimary: '#e2e7e0', borderLight: '#3f5448', cardBg: '#2a3a32', cardBorder: '#4f6b5b', accentMuted: '#bfd5c7', dotInactive: '#5c7b69', dotActive: '#bdd9b0', btnBg: '#bdd9b0', btnText: '#1e2a24', statBg: '#2a3a32', repoCardBg: '#2a3a32', loaderBorder: '#5c7b69', loaderTop: '#bdd9b0', ctrlBg: '#2f4238', ctrlText: '#e2e7e0', linkColor: '#e2e7e0', isLight: false, vinylBg: '#3f5448', vinylIcon: '#bdd9b0', ringColor: '#4f6b5b' } }
};
