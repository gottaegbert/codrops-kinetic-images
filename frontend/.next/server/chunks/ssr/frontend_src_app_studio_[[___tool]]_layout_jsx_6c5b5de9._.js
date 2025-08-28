module.exports = {

"[project]/frontend/src/app/studio/[[...tool]]/layout.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>StudioLayout),
    "generateStaticParams": (()=>generateStaticParams)
});
async function generateStaticParams() {
    return [
        {
            tool: []
        },
        {
            tool: [
                'desk'
            ]
        },
        {
            tool: [
                'vision'
            ]
        }
    ];
}
function StudioLayout({ children }) {
    return children;
}
}}),

};

//# sourceMappingURL=frontend_src_app_studio_%5B%5B___tool%5D%5D_layout_jsx_6c5b5de9._.js.map