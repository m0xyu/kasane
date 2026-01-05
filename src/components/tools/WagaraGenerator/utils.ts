// src/components/tools/WagaraGenerator/utils.ts

/**
 * SVGをファイルとしてダウンロード
 * @param svgData 生のSVG文字列 または Data URI
 * @param filename 拡張子なしのファイル名
 */
export const downloadAsSvg = (svgData: string, filename: string) => {
    const svgContent = svgData.startsWith('data:')
        ? decodeURIComponent(svgData.split(',')[1])
        : svgData;

    const blob = new Blob([svgContent], {
        type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

/**
 * SVGをPNG画像としてダウンロード
 * @param svgData 生のSVG文字列 または Data URI
 * @param filename 拡張子なしのファイル名
 * @param width 出力する画像の幅（デフォルト1200px）
 */
export const downloadAsPng = (
    svgData: string,
    filename: string,
    width = 1200
) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.src = svgData.startsWith('data:')
        ? svgData
        : `data:image/svg+xml;base64,${btoa(
              unescape(encodeURIComponent(svgData))
          )}`;

    img.onload = () => {
        const canvas = document.createElement('canvas');
        const aspect = img.height / img.width;

        if (!Number.isFinite(aspect)) return;

        canvas.width = width;
        canvas.height = width * aspect;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        try {
            const dataUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `${filename}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            console.error('PNG conversion failed', e);
        }
    };

    img.onerror = (e) => {
        console.error('Failed to load SVG for PNG conversion', e);
    };
};
