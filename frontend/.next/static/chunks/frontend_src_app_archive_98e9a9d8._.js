(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/frontend/src/app/archive/page.module.scss.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "archiveGrid": "page-module-scss-module__ixVDva__archiveGrid",
  "archiveItem": "page-module-scss-module__ixVDva__archiveItem",
  "container": "page-module-scss-module__ixVDva__container",
  "header": "page-module-scss-module__ixVDva__header",
  "image": "page-module-scss-module__ixVDva__image",
  "imageContainer": "page-module-scss-module__ixVDva__imageContainer",
  "itemContent": "page-module-scss-module__ixVDva__itemContent",
  "itemDate": "page-module-scss-module__ixVDva__itemDate",
  "itemDescription": "page-module-scss-module__ixVDva__itemDescription",
  "itemLink": "page-module-scss-module__ixVDva__itemLink",
  "itemTitle": "page-module-scss-module__ixVDva__itemTitle",
  "itemType": "page-module-scss-module__ixVDva__itemType",
  "page": "page-module-scss-module__ixVDva__page",
  "subtitle": "page-module-scss-module__ixVDva__subtitle",
  "title": "page-module-scss-module__ixVDva__title",
});
}}),
"[project]/frontend/src/app/archive/page.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ArchivePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$contexts$2f$LanguageContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/contexts/LanguageContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$modules$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/modules/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/frontend/src/app/archive/page.module.scss.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ArchivePage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$contexts$2f$LanguageContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    // 模拟档案数据
    const archiveItems = [
        {
            id: 1,
            type: 'Exhibition',
            title: 'Green in the paintings',
            date: '2025.01.15 - 2025.03.30',
            image: '/images/img1.webp',
            description: 'groundbreaking works that blur the boundaries between physical and virtual realms.'
        },
        {
            id: 2,
            type: 'Interview',
            title: 'In Conversation with Marina Chen',
            date: '2025.01.10',
            image: '/images/img2.webp',
            description: 'Artist Marina Chen discusses her latest series exploring the intersection of traditional techniques and digital media.'
        },
        {
            id: 3,
            type: 'Essay',
            title: 'The Future of Paper-Based Art',
            date: '2024.12.20',
            image: '/images/img3.webp',
            description: 'A critical examination of how paper-based artworks continue to evolve in our increasingly digital world.'
        },
        {
            id: 4,
            type: 'Exhibition',
            title: 'Small Scale, Big Impact',
            date: '2024.10.10 - 2024.12.15',
            image: '/images/img4.webp',
            description: 'Exploring how small-scale artworks can create profound emotional and conceptual impact.'
        },
        {
            id: 5,
            type: 'Review',
            title: 'Intimate Expressions: A Critical Review',
            date: '2024.11.05',
            image: '/images/img5.webp',
            description: 'A comprehensive review of recent works exploring intimacy and personal expression in contemporary art.'
        },
        {
            id: 6,
            type: 'Interview',
            title: 'Alex Rodriguez on Digital Transformation',
            date: '2024.09.15',
            image: '/images/img6.webp',
            description: 'The artist shares insights on how digital tools are transforming traditional art practices.'
        },
        {
            id: 7,
            type: 'Exhibition',
            title: 'Emerging Voices: New Perspectives',
            date: '2024.07.01 - 2024.09.30',
            image: '/images/img7.webp',
            description: 'A group exhibition featuring emerging artists pushing the boundaries of contemporary art.'
        },
        {
            id: 8,
            type: 'Essay',
            title: 'The Role of Curation in Digital Spaces',
            date: '2024.08.12',
            image: '/images/img8.webp',
            description: 'Examining how curatorial practices adapt to virtual and digital exhibition spaces.'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: "Archive"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/archive/page.jsx",
                            lineNumber: 84,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Exhibitions, interviews, essays, and reviews from MaKaleidos Gallery"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/archive/page.jsx",
                            lineNumber: 85,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/archive/page.jsx",
                    lineNumber: 83,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].archiveGrid,
                    children: archiveItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].archiveItem,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/archive/${item.id}`,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemLink,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageContainer,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: item.image,
                                            alt: item.title,
                                            width: 300,
                                            height: 200,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/archive/page.jsx",
                                            lineNumber: 95,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/archive/page.jsx",
                                        lineNumber: 94,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemContent,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemType,
                                                children: item.type
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/archive/page.jsx",
                                                lineNumber: 104,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemTitle,
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/archive/page.jsx",
                                                lineNumber: 105,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemDate,
                                                children: item.date
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/archive/page.jsx",
                                                lineNumber: 106,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$archive$2f$page$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemDescription,
                                                children: item.description
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/archive/page.jsx",
                                                lineNumber: 107,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/archive/page.jsx",
                                        lineNumber: 103,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/archive/page.jsx",
                                lineNumber: 93,
                                columnNumber: 29
                            }, this)
                        }, item.id, false, {
                            fileName: "[project]/frontend/src/app/archive/page.jsx",
                            lineNumber: 92,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/archive/page.jsx",
                    lineNumber: 90,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/archive/page.jsx",
            lineNumber: 82,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/archive/page.jsx",
        lineNumber: 81,
        columnNumber: 9
    }, this);
}
_s(ArchivePage, "ot2YhC7pP10gRrIouBKIa40vomw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$contexts$2f$LanguageContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = ArchivePage;
var _c;
__turbopack_context__.k.register(_c, "ArchivePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=frontend_src_app_archive_98e9a9d8._.js.map