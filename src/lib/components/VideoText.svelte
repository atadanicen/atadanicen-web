<script lang="ts">
    import { onMount } from 'svelte';

    export let src: string;
    export let className = '';
    export let autoPlay = true;
    export let muted = true;
    export let loop = true;
    export let preload: 'auto' | 'metadata' | 'none' = 'auto';
    export let fontSize: string | number = 12;
    export let fontWeight: string | number = 'bold';
    export let textAnchor = 'middle';
    export let dominantBaseline = 'middle';
    export let fontFamily = 'sans-serif';
    export let as: string = 'div';
    export let content: string | string[] = '';
    
    // New border customization props
    export let strokeColor = 'gray';
    export let strokeWidth: string | number = 0.75; // e.g., 2px or '0.2vw'

    let svgMask = '';
    let dataUrlMask = '';
    let borderSvgUrl = '';

    $: dynamic_content = Array.isArray(content) ? content.join('') : content;

    function updateSvgMask() {
        const responsiveFontSize = typeof fontSize === 'number' ? `${fontSize}vw` : fontSize;
        const responsiveStrokeWidth = typeof strokeWidth === 'number' ? `${strokeWidth}px` : strokeWidth;

        // Mask SVG (only needs text fill shape)
        svgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
      <text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}'
        text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}'>
        ${dynamic_content}
      </text>
    </svg>`;
        dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

        // Overlay SVG for the solid text border
        const borderSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
      <text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}'
        text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}'
        fill='none' stroke='${strokeColor}' stroke-width='${responsiveStrokeWidth}'>
        ${dynamic_content}
      </text>
    </svg>`;
        borderSvgUrl = `url("data:image/svg+xml,${encodeURIComponent(borderSvg)}")`;
    }

    onMount(() => {
        updateSvgMask();
    });

    $: if (content || fontSize || fontWeight || textAnchor || dominantBaseline || fontFamily || strokeColor || strokeWidth) {
        updateSvgMask();
    }
</script>

<svelte:window on:resize={updateSvgMask} />

<svelte:element this={as} class={`relative h-full w-full ${className}`}>
    <!-- Masked Video Layer -->
    <div
        class="absolute inset-0 flex items-center justify-center"
        style="
      mask-image: {dataUrlMask};
      -webkit-mask-image: {dataUrlMask};
      mask-size: contain;
      -webkit-mask-size: contain;
      mask-repeat: no-repeat;
      -webkit-mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-position: center;
    "
    >
        <video
            class="h-full w-full object-cover"
            autoplay={autoPlay}
            {muted}
            {loop}
            {preload}
            playsinline
        >
            <source {src} />
            Your browser does not support the video tag.
        </video>
    </div>

    <!-- Solid Text Border Overlay Layer -->
    <div
        class="pointer-events-none absolute inset-0"
        style="
      background-image: {borderSvgUrl};
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    "
    ></div>

    <span class="sr-only">{dynamic_content}</span>
</svelte:element>