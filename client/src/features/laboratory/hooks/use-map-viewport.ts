import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import type { MapViewport } from "../model/laboratory-map.types";

const MIN_SCALE = 0.4;
const MAX_SCALE = 2.5;
const ZOOM_SPEED = 0.0015;
const ZOOM_GLIDE = 0.11;
const MAX_FRAME_DELTA = 0.1;
const OFFSET_EPSILON = 0.05;
const SCALE_EPSILON = 0.0005;
const PAN_BUTTON = 2;

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

export const useMapViewport = (initialViewport: MapViewport) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [viewport, setViewport] = useState<MapViewport>(initialViewport);
    const [isPanning, setIsPanning] = useState(false);

    const currentRef = useRef<MapViewport>(initialViewport);
    const targetRef = useRef<MapViewport>(initialViewport);
    const frameRef = useRef<number | null>(null);
    const frameTimeRef = useRef(0);
    const lastPointerRef = useRef({ x: 0, y: 0 });

    const stopAnimation = useCallback(() => {
        if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }
        frameTimeRef.current = 0;
    }, []);

    const startAnimation = useCallback(() => {
        if (frameRef.current !== null) return;

        const step = (time: number) => {
            const previousTime = frameTimeRef.current || time;
            const deltaSeconds = Math.min(
                (time - previousTime) / 1000,
                MAX_FRAME_DELTA
            );
            frameTimeRef.current = time;

            const current = currentRef.current;
            const target = targetRef.current;

            // Експоненційне згладжування: за кожен кадр долається однакова
            // ЧАСТКА відстані, що лишилась до цілі, тому рух гальмує сам
            // собою - це і є ефект допливання. Формула через exp(-dt/T)
            // робить його незалежним від FPS: на 60 і на 144 Гц доїзд триває
            // однаково довго, бо враховується реальний час кадру, а не факт
            // самого кадру.
            const factor = 1 - Math.exp(-deltaSeconds / ZOOM_GLIDE);
            const next: MapViewport = {
                x: current.x + (target.x - current.x) * factor,
                y: current.y + (target.y - current.y) * factor,
                scale: current.scale + (target.scale - current.scale) * factor,
            };

            // Асимптота ніколи не дійде до цілі точно, тому нижче порога
            // просто клеїмось до неї і глушимо цикл.
            const settled =
                Math.abs(target.x - next.x) < OFFSET_EPSILON &&
                Math.abs(target.y - next.y) < OFFSET_EPSILON &&
                Math.abs(target.scale - next.scale) < SCALE_EPSILON;

            currentRef.current = settled ? { ...target } : next;
            setViewport(currentRef.current);

            if (settled) {
                frameRef.current = null;
                frameTimeRef.current = 0;
                return;
            }

            frameRef.current = requestAnimationFrame(step);
        };

        frameTimeRef.current = 0;
        frameRef.current = requestAnimationFrame(step);
    }, []);

    const applyZoom = useCallback(
        (
            multiplier: number,
            pointerX: number,
            pointerY: number,
            immediate: boolean
        ) => {
            // Для колеса рахуємо від ЦІЛІ, а не від поточного кадру: якщо
            // крутнути кілька разів підряд, кроки складаються, а не гасять
            // один одного недоїханою анімацією. Для пальців рахуємо від
            // поточного стану, бо там ніякої анімації немає.
            const base = immediate ? currentRef.current : targetRef.current;
            const nextScale = clamp(
                base.scale * multiplier,
                MIN_SCALE,
                MAX_SCALE
            );
            const ratio = nextScale / base.scale;

            // Точка полотна на екрані: screen = offset + point * scale.
            // Треба, щоб точка під курсором лишилась під курсором, тобто
            // pointer = offsetNext + point * scaleNext. Підставивши point з
            // першого рівняння, отримуємо:
            // offsetNext = pointer - (pointer - offset) * ratio
            const next: MapViewport = {
                scale: nextScale,
                x: pointerX - (pointerX - base.x) * ratio,
                y: pointerY - (pointerY - base.y) * ratio,
            };

            targetRef.current = next;

            if (immediate) {
                stopAnimation();
                currentRef.current = next;
                setViewport(next);
                return;
            }

            startAnimation();
        },
        [startAnimation, stopAnimation]
    );

    const panBy = useCallback((deltaX: number, deltaY: number) => {
        // Панорамування зсуває обидва стани одразу, щоб воно лишалось 1:1 за
        // курсором навіть посеред незавершеного доїзду зуму.
        const current = currentRef.current;
        const target = targetRef.current;

        targetRef.current = {
            ...target,
            x: target.x + deltaX,
            y: target.y + deltaY,
        };
        currentRef.current = {
            ...current,
            x: current.x + deltaX,
            y: current.y + deltaY,
        };
        setViewport(currentRef.current);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();

            const rect = container.getBoundingClientRect();
            // Множник, а не додавання: один тік колеса завжди міняє масштаб
            // на однаковий відсоток, тому зум відчувається рівним і на 0.4x,
            // і на 2.5x.
            applyZoom(
                Math.exp(-event.deltaY * ZOOM_SPEED),
                event.clientX - rect.left,
                event.clientY - rect.top,
                false
            );
        };

        // Слухач вішається вручну, бо React підключає wheel як passive
        // і всередині onWheel preventDefault не спрацював би - сторінка
        // скролилась би замість зуму.
        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [applyZoom]);

    useEffect(() => stopAnimation, [stopAnimation]);

    const handlePointerDown = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (event.button !== PAN_BUTTON) return;

            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            lastPointerRef.current = { x: event.clientX, y: event.clientY };
            setIsPanning(true);
        },
        []
    );

    const handlePointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (!isPanning) return;

            const deltaX = event.clientX - lastPointerRef.current.x;
            const deltaY = event.clientY - lastPointerRef.current.y;
            lastPointerRef.current = { x: event.clientX, y: event.clientY };

            // Зсув курсора додається до offset як є, без ділення на scale:
            // offset живе в екранних пікселях, бо в transform translate
            // стоїть перед scale і масштаб на нього не впливає.
            panBy(deltaX, deltaY);
        },
        [isPanning, panBy]
    );

    const stopPanning = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (!isPanning) return;

            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
            }
            setIsPanning(false);
        },
        [isPanning]
    );

    const handleContextMenu = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
        },
        []
    );

    return {
        containerRef,
        viewport,
        isPanning,
        applyZoom,
        panBy,
        handlePointerDown,
        handlePointerMove,
        stopPanning,
        handleContextMenu,
    };
};
