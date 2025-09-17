'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// 翻译数据
const translations = {
    en: {
        navigation: {
            home: 'Home',
            about: 'About',
            exhibitions: 'Exhibitions',
            news: 'News',
            review: 'Review',
            archive: 'Archive',
            contact: 'Contact',
            menu: 'Menu'
        },
        about: {
            title: 'About MaKaleidos',
            subtitle: 'A forward-thinking online gallery and editorial platform for works on paper and small-scale art.',
            heading: 'About MaKaleidos',
            description1: 'MaKaleidos is not only a forward-thinking online gallery focused on works on paper and small-scale art, but also operates in the manner of a light magazine. Alongside exhibitions, we produce editorial content closely connected to the artists we work with—investigating, documenting, and presenting their ideas in depth, and offering multi-layered insight that frames their work within a broader human and cultural context.',
            description2: 'We also invite contributions from writers, curators, and viewers: considered reviews and reflections on works on paper and small art pieces. Selected submissions are edited and published as part of our ongoing conversation. It is an open platform, facilitating a community that centres on works on paper and small-scale art, connecting from across the world.',
            description3: 'The gallery name is invented, combining "Ma," derived from the Japanese aesthetic concept of "ma", which refers to the pause or interval that gives space its meaning, here extended to mean a small, intimate space, and "Kaleidos," from "kaleidoscope." Together, they express our aim: to show as much diversity of forms of expression and cultural perspectives as a small space can hold.',
            contact: 'Contact the Gallery'
        },
        home: {
            title: 'MaKaleidos',
            scrollHint: 'Scroll Navigating',
            issue: 'ISSUE NO.1',
            artist: 'FRANCESCO ZANATTA',
            exhibition: 'DIGITAL METAMORPHOSIS',
            visions: 'CONTEMPORARY VISIONS',
            onThisPage: 'On this page:',
            press: 'Press',
            pressRelease: 'Press Release',
            interview: 'Interview',
            biography: 'Biography',
            selectedExhibition: 'Selected Exhibition',
            selectedPress: 'Selected Press',
            statement: 'Artist Statement',
            currentExhibitionButton: 'Current Exhibition',
            explore: 'Explore'
        },
        exhibition: {
            artistResume: 'Artist Resume',
            download: 'Download',
            downloadArtistCV: 'Download artist CV',
            resumeLanguageNote: 'Available in alternate language'
        },
        review: {
            title: 'Review',
            leadParagraphs: [
                'We are building an open archive of reflections on works on paper and small-scale art, seen from a global perspective. We welcome thoughtful writing from writers, curators, and viewers—reviews, essays, and personal reflections alike. If a work or exhibition has moved you, challenged you, or opened a new way of seeing, we invite you to share your response.',
                'Our aim is to gather art writing on small works across cultures, so that diverse perspectives can be read side by side. By collecting these voices, we hope to trace how small works resonate in different places and contexts, sustaining a conversation that extends beyond any single exhibition.'
            ],
            guidelinesTitle: 'Submission guidelines',
            guidelines: [
                'Please include a short text and a few photographs of the work or exhibition—phone images are absolutely fine. The focus should be on contemporary works on paper or small-scale art.',
                'Send submissions to: general@makaleidos.com'
            ]
        },
        footer: {
            description: 'Contemporary art gallery reimagining the digital exhibition experience.',
            gallery: 'Gallery',
            currentExhibitions: 'Current Exhibitions',
            featuredArtists: 'Featured Artists',
            collections: 'Collections',
            content: 'Content',
            artMagazine: 'Art Magazine',
            artistInterviews: 'Artist Interviews',
            exhibitionArchive: 'Exhibition Archive',
            archive: 'Archive',
            connect: 'Connect',
            aboutUs: 'About Us',
            contact: 'Contact',
            newsletter: 'Newsletter',
            copyright: '© 2025 MaKaleidos. All rights reserved.',
            tower: 'Tower',
            paper: 'Paper',
            spiral: 'Spiral'
        },
        contact: {
            title: 'Contact',
            subtitle: 'Get in touch with MaKaleidos Gallery',
            info: 'Contact Information',
            email: 'Email: info@makaleidos.com',
            inquiries: 'For submissions and inquiries'
        },
        exhibitions: {
            title: 'Exhibitions',
            subtitle: 'Virtual exhibitions and digital art experiences',
            current: 'Current Exhibitions',
            description: 'Explore our current virtual exhibitions featuring contemporary artists and their works on paper and small-scale art.'
        },
        news: {
            comingSoonTitle: 'News Coming Soon',
            comingSoonDescription: 'We are curating editorial features and announcements. Check back shortly!'
        }
    },
    zh: {
        navigation: {
            home: '首页',
            about: '关于',
            exhibitions: '展览',
            news: '新闻',
            review: '评论',
            archive: '档案',
            contact: '联系',
            menu: '菜单'
        },
        about: {
            title: '关于 MaKaleidos',
            subtitle: '一家具有前瞻性的线上画廊与编辑平台，专注于纸上作品和小型艺术品。',
            heading: '关于 MaKaleidos',
            description1: 'MaKaleidos 不仅是一家具有前瞻性的线上画廊，专注于纸上作品和小型艺术品，还以轻杂志的方式运作。除了展览，我们还策划与合作艺术家紧密相关的编辑内容——如同做一次细致的采访与田野笔记，深入探访、记录并呈现他们的观念与创作过程；同时延伸出多层次的思考，将这些作品置于更广阔的人文与文化语境之中。',
            description2: '我们欢迎写作者、策展人以及观众的加入，分享你对纸上作品与小型艺术的评论与思考。经筛选与编辑后，这些文字将成为我们持续对话的一部分。MaKaleidos 是一个开放的平台，致力于围绕纸上作品与小型艺术建立一个社区，汇聚世界各地的多元视角与文化背景，让它们在同一个小空间中相遇、交流、并不断生成新的意义。',
            description3: '画廊的名字是我们创造的，结合了 "Ma"——源自日语美学概念"間（ま）"，指赋予空间意义的间隙或停顿，在这里被延伸为小而亲密的空间——以及 "Kaleidos"，取自 "kaleidoscope（万花筒）"。两者结合，表达了我们的愿景：在有限的空间中，展现尽可能多样的艺术表达与文化视角。',
            contact: '联系画廊'
        },
        home: {
            title: 'MaKaleidos',
            subtitle: '线上艺术画廊',
            scrollHint: '滚动导航',
            issue: '第一期',
            artist: '弗朗切斯科·克莱门特',
            exhibition: '数字变形',
            visions: '当代视野',
            onThisPage: '本页内容：',
            press: '媒体报道',
            pressRelease: '新闻稿',
            interview: '访谈',
            biography: '艺术家简介',
            selectedExhibition: '精选展览',
            selectedPress: '精选媒体',
            statement: '艺术家声明',
            currentExhibitionButton: '当前展览',
            explore: '了解更多'
        },
        exhibition: {
            artistResume: '艺术家简历',
            download: '下载',
            downloadArtistCV: '下载艺术家 CV',
            resumeLanguageNote: '提供其他语言版本'
        },
        review: {
            title: '评论',
            leadParagraphs: [
                '我们正在建立一个面向全球视角的开放档案，聚焦于纸上作品与小型艺术的评论与思考。我们欢迎来自写作者、策展人以及观众的文字——无论是评论、随笔，还是个人感悟。只要有一件作品或一次展览曾打动你、启发你，或为你开启了新的观看方式，我们都鼓励你与我们分享你的想法。',
                '我们的目标是搜集并分享来自不同文化背景的关于小型艺术的评论，让多元视角能够并置、互见。通过汇集这些声音，我们希望记录下小型艺术在不同地域与语境中所激发的共鸣，并延续一场超越单一展览的持续对话。'
            ],
            guidelinesTitle: '投稿要求',
            guidelines: [
                '投稿需包含一篇文字，以及几张作品或展览的照片——手机拍摄的图片也完全可以——唯一的要求是内容需聚焦于当代纸上作品或小件艺术作品。',
                '请将材料发送至 general@makaleidos.com'
            ]
        },
        footer: {
            description: '重新构想数字展览体验的当代艺术画廊。',
            gallery: '画廊',
            currentExhibitions: '当前展览',
            featuredArtists: '特色艺术家',
            collections: '收藏',
            content: '内容',
            artMagazine: '艺术杂志',
            artistInterviews: '艺术家访谈',
            exhibitionArchive: '展览档案',
            archive: '档案',
            connect: '联系',
            aboutUs: '关于我们',
            contact: '联系我们',
            newsletter: '订阅通讯',
            copyright: '© 2025 MaKaleidos. 版权所有。',
            tower: '塔楼',
            paper: '纸张',
            spiral: '螺旋'
        },
        contact: {
            title: '联系我们',
            subtitle: '与 MaKaleidos 画廊取得联系',
            info: '联系信息',
            email: '邮箱：info@makaleidos.com',
            inquiries: '投稿与咨询'
        },
        exhibitions: {
            title: '展览',
            subtitle: '虚拟展览与数字艺术体验',
            current: '当前展览',
            description: '探索我们当前的虚拟展览，展示当代艺术家的纸上作品和小型艺术品。'
        },
        news: {
            comingSoonTitle: '新闻内容即将上线',
            comingSoonDescription: '我们正在整理相关的专题与公告，敬请稍候。'
        }
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    // 从localStorage加载语言设置
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && ['en', 'zh'].includes(savedLanguage)) {
            setLanguage(savedLanguage);
        }
    }, []);

    // 保存语言设置到localStorage
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    // 翻译函数
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
