/**
 * Project order & contents — edit this file to add/reorder projects or media.
 * `order` controls display order on the Work page.
 *
 * NOTE: This file has been hand-curated (cover images pulled into each gallery,
 * custom image ordering, per-item aspect ratios, and the Vape brand columns).
 * Re-running build_assets.py will overwrite these tweaks, so edit here directly.
 *
 * Each gallery item carries an `aspect` (width / height) so the project page
 * can lay images out in justified rows that line up flush at the bottom.
 */
window.PROJECTS_MANIFEST = [
    {
        slug: "city-park",
        title: "City Park — Corporate Rebrand",
        order: 1,
        cover: { type: "image", src: "ASSETS/projects/city-park/cover.jpg", aspect: 1.7778 },
        items: [
            { type: "image", src: "ASSETS/projects/city-park/cover.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/city-park/01.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/city-park/02.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/city-park/03.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/city-park/04.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/city-park/05.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/city-park/06.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/city-park/07.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/city-park/08.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/city-park/09.jpg", aspect: 1.7778 },
            { type: "video", src: "ASSETS/projects/city-park/10.mp4", aspect: 0.5625 },
            { type: "image", src: "ASSETS/projects/city-park/11.jpg", aspect: 1.7778 },
        ],
    },
    {
        slug: "westlo-district",
        title: "Westlo District",
        order: 2,
        cover: { type: "image", src: "ASSETS/projects/westlo-district/cover.jpg", aspect: 1.7778 },
        items: [
            { type: "video", src: "ASSETS/projects/westlo-district/09.mp4", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/westlo-district/cover.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/westlo-district/01.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/westlo-district/07.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/westlo-district/02.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/westlo-district/03.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/westlo-district/05.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/westlo-district/08.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/westlo-district/06.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/westlo-district/04.jpg", aspect: 1.7778 },
        ],
    },
    {
        slug: "central-cee",
        title: "Central Cee Concert Poster",
        order: 3,
        cover: { type: "video", src: "ASSETS/projects/central-cee/cover.mp4", aspect: 0.5625 },
        items: [
            { type: "video", src: "ASSETS/projects/central-cee/cover.mp4", aspect: 0.5625 },
            { type: "image", src: "ASSETS/projects/central-cee/03.jpg", aspect: 0.5625 },
            { type: "image", src: "ASSETS/projects/central-cee/02.jpg", aspect: 0.5625 },
            { type: "video", src: "ASSETS/projects/central-cee/04.mp4", aspect: 0.5625 },
            { type: "image", src: "ASSETS/projects/central-cee/01.jpg", aspect: 2.0 },
        ],
    },
    {
        slug: "tamarack",
        title: "Tamarack — Corporate Rebrand",
        order: 4,
        cover: { type: "image", src: "ASSETS/projects/tamarack/cover.jpg", aspect: 1.7778 },
        items: [
            { type: "image", src: "ASSETS/projects/tamarack/cover.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/tamarack/01.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/tamarack/02.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/tamarack/03.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/tamarack/04.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/tamarack/05.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/tamarack/06.jpg", aspect: 1.1056 },
            { type: "image", src: "ASSETS/projects/tamarack/07.jpg", aspect: 1.7778 },
        ],
    },
    {
        slug: "vape-brand-exploration",
        title: "Vape Brand Exploration",
        order: 5,
        cover: { type: "image", src: "ASSETS/projects/vape-brand-exploration/cover.jpg", aspect: 1.776 },
        // Arranged as three brand columns, left to right: Alta, Keyner, Portal.
        columns: [
            [
                { type: "image", src: "ASSETS/projects/vape-brand-exploration/01.jpg", aspect: 1.7778 },
                { type: "image", src: "ASSETS/projects/vape-brand-exploration/02.jpg", aspect: 1.7778 },
                { type: "image", src: "ASSETS/projects/vape-brand-exploration/07.jpg", aspect: 1.778 },
            ],
            [
                { type: "image", src: "ASSETS/projects/vape-brand-exploration/cover.jpg", aspect: 1.776 },
                { type: "image", src: "ASSETS/projects/vape-brand-exploration/04.jpg", aspect: 0.6667 },
                { type: "image", src: "ASSETS/projects/vape-brand-exploration/03.jpg", aspect: 1.0 },
            ],
            [
                { type: "image", src: "ASSETS/projects/vape-brand-exploration/06.jpg", aspect: 1.7778 },
                { type: "image", src: "ASSETS/projects/vape-brand-exploration/05.jpg", aspect: 0.7591 },
                { type: "image", src: "ASSETS/projects/vape-brand-exploration/08.jpg", aspect: 1.778 },
            ],
        ],
        items: [],
    },
    {
        slug: "the-bogart-hills",
        title: "The Bogart Hills",
        order: 6,
        cover: { type: "image", src: "ASSETS/projects/the-bogart-hills/cover.jpg", aspect: 1.7778 },
        items: [
            { type: "image", src: "ASSETS/projects/the-bogart-hills/cover.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/the-bogart-hills/01.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/the-bogart-hills/02.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/the-bogart-hills/03.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/the-bogart-hills/04.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/the-bogart-hills/05.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/the-bogart-hills/06.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/the-bogart-hills/07.jpg", aspect: 1.7778 },
        ],
    },
    {
        slug: "maximes-golden-hour",
        title: "Maxime's Golden Hour",
        order: 7,
        cover: { type: "image", src: "ASSETS/projects/maximes-golden-hour/cover.jpg", aspect: 1.7778 },
        items: [
            { type: "image", src: "ASSETS/projects/maximes-golden-hour/cover.jpg", aspect: 1.7778 },
            { type: "image", src: "ASSETS/projects/maximes-golden-hour/02.jpg", aspect: 0.45 },
            { type: "image", src: "ASSETS/projects/maximes-golden-hour/03.jpg", aspect: 1.5652 },
            { type: "image", src: "ASSETS/projects/maximes-golden-hour/04.jpg", aspect: 0.45 },
            { type: "video", src: "ASSETS/projects/maximes-golden-hour/01.mp4", aspect: 0.5625 },
        ],
    },
    {
        slug: "personal-necklace-project",
        title: "Personal Necklace Project",
        order: 8,
        cover: { type: "image", src: "ASSETS/projects/personal-necklace-project/cover.jpg", aspect: 0.8 },
        items: [
            { type: "image", src: "ASSETS/projects/personal-necklace-project/cover.jpg", aspect: 0.8 },
            { type: "image", src: "ASSETS/projects/personal-necklace-project/01.jpg", aspect: 0.8024 },
            { type: "image", src: "ASSETS/projects/personal-necklace-project/02.jpg", aspect: 0.8024 },
            { type: "image", src: "ASSETS/projects/personal-necklace-project/03.jpg", aspect: 0.8024 },
        ],
    },
];
