# KASANE - 襲 (Japanese Traditional Color Palette)

**KASANE (襲)** は、日本の伝統色（Traditional Colors of Japan）を現代の Web デザインや開発ワークフローにシームレスに統合するための、デザイナー・開発者向けツールキットです。

四季折々の色彩の美しさを、「見る」だけでなく「使う」ための実用的なジェネレーター機能を提供します。

## 🚀 Key Features

### 1. Traditional Color Archive

厳選された日本の伝統色をアーカイブ。Hex, RGB, HSL, CMYK 値に加え、色の由来や背景を確認できます。

### 2. Powerful Generators (Tools)

開発者とデザイナーのために設計された、実践的なツール群を搭載しています。

-   **Shopify Color Generator:**

    -   ブランドカラーと背景色を選ぶだけで、Shopify (Dawn/Horizon) テーマ用の `settings_data.json` を自動生成。
    -   アクセシビリティ（WCAG）に基づいたコントラスト自動計算、ボタン反転ロジック、OKLCH ベースの配色調整を搭載。

-   **Tailwind Palette Generator:**

    -   1 つの色から、Tailwind CSS (v3/v4) 用のカラーパレット（50-950）を生成。
    -   Hex, RGB, HSL, OKLCH 形式での出力に対応。最新の `oklch()` 記法にも完全対応。

-   **Text Gradient Generator:**

    -   美しいグラデーション文字を生成し、CSS (`background-clip: text`) を出力。

-   **Wagara Generator:**

    -   日本の伝統文様（和柄）のシームレスな SVG パターンを生成。

-   **Multi Color Palette:**
    -   伝統色に基づいた調和の取れた配色パターンを提案。

## 🛠️ Tech Stack

-   **Framework:** Astro (v5)
-   **UI Library:** React
-   **Styling:** Tailwind CSS
-   **Color Manipulation:** chroma.js / react-colorful
-   **Icons:** Lucide React

## 📂 Project Structure

```bash
src/
├── components/
│   ├── common/         # Header, Footer, ToolsGrid
│   ├── tools/          # Generator Logic (Shopify, Tailwind, etc.)
│   └── ColorCard.astro
├── data/
│   └── colors.json     # Traditional colors database
├── hooks/
│   └── useLocalStorage.ts
├── layouts/            # Base layout with SEO & OGP settings
├── pages/
│   ├── tools/          # Tool pages
│   ├── colors/         # Color archive (Pagination)
│   ├── about.astro
│   └── index.astro
└── types/              # TypeScript definitions
```

# Clone the repository

```bash
git clone https://github.com/your-username/kasane.git
```

# Navigate to the project directory

```bash
cd kasane
```

# Install dependencies

```bash
npm install
Development
Bash

npm run dev
Visit http://localhost:4321 in your browser.

Build
Bash

npm run build
```
