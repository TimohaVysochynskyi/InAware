import { useMemo } from "react";
import { useMapViewport } from "../../hooks/use-map-viewport";
import {
  LABORATORY_MAP_CONNECTIONS,
  LABORATORY_MAP_NODES,
} from "../../model/laboratory-map.mock";
import type {
  MapConnectionVariant,
  MapViewport,
} from "../../model/laboratory-map.types";
import css from "./LaboratoryMap.module.css";

type Props = {
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
};

type ConnectorStyle = {
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: string;
};

const INITIAL_VIEWPORT: MapViewport = { x: 0, y: 0, scale: 1 };
const NODE_WIDTH = 87;
const NODE_HEIGHT = 77;
const CONNECTOR_INSET = 48;
const CANVAS_PADDING = 400;
const NODE_GRADIENT_ID = "laboratoryMapNodeGradient";

const CONNECTOR_STYLES: Record<MapConnectionVariant, ConnectorStyle> = {
  solid: { stroke: "#FFFFFF", strokeWidth: 1 },
  dashed: { stroke: "#FFFFFF", strokeWidth: 1.5, strokeDasharray: "20 20" },
  faded: { stroke: "#8A8A8A", strokeWidth: 1, strokeDasharray: "12 12" },
};

const LaboratoryMap = ({ selectedNodeId, onNodeSelect }: Props) => {
  const {
    containerRef,
    viewport,
    isPanning,
    handlePointerDown,
    handlePointerMove,
    stopPanning,
    handleContextMenu,
  } = useMapViewport(INITIAL_VIEWPORT);

  const { bounds, connectors } = useMemo(() => {
    const nodesById = new Map(
      LABORATORY_MAP_NODES.map((node) => [node.id, node])
    );

    // SVG-шар з лініями обрізає все, що виходить за його межі, тому він
    // розтягується на габарити всіх нод плюс запас. viewBox береться такий
    // самий, як і розміри, тож координати всередині SVG збігаються один в
    // один з координатами нод і перераховувати їх не треба.
    const xs = LABORATORY_MAP_NODES.map((node) => node.x);
    const ys = LABORATORY_MAP_NODES.map((node) => node.y);
    const minX = Math.min(...xs) - CANVAS_PADDING;
    const minY = Math.min(...ys) - CANVAS_PADDING;
    const nextBounds = {
      x: minX,
      y: minY,
      width: Math.max(...xs) + CANVAS_PADDING - minX,
      height: Math.max(...ys) + CANVAS_PADDING - minY,
    };

    const nextConnectors = LABORATORY_MAP_CONNECTIONS.flatMap((connection) => {
      const from = nodesById.get(connection.from);
      const to = nodesById.get(connection.to);
      if (!from || !to) return [];

      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      const offsetX = Math.cos(angle) * CONNECTOR_INSET;
      const offsetY = Math.sin(angle) * CONNECTOR_INSET;

      // Лінія йде між центрами нод, але з обох кінців відступає на
      // CONNECTOR_INSET уздовж свого ж кута, щоб не заповзати під гексагони.
      return [
        {
          id: `${connection.from}-${connection.to}`,
          variant: connection.variant,
          x1: from.x + offsetX,
          y1: from.y + offsetY,
          x2: to.x - offsetX,
          y2: to.y - offsetY,
        },
      ];
    });

    return { bounds: nextBounds, connectors: nextConnectors };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${css.viewport} ${isPanning ? css.viewportPanning : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopPanning}
      onPointerCancel={stopPanning}
      onLostPointerCapture={stopPanning}
      onContextMenu={handleContextMenu}
    >
      <svg className={css.defs} aria-hidden="true">
        <defs>
          <linearGradient
            id={NODE_GRADIENT_ID}
            x1="85.1026"
            y1="40.9287"
            x2="1.19095"
            y2="40.9287"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0817308" stopColor="#7C8D94" />
            <stop offset="0.264423" stopColor="#BCC1C7" />
            <stop offset="0.442308" stopColor="#FDFEFE" />
            <stop offset="0.533654" stopColor="#CAD7E0" />
            <stop offset="0.764423" stopColor="#F8FAFB" />
            <stop offset="0.980769" stopColor="#9FB2B9" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className={css.canvas}
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`,
        }}
      >
        <svg
          className={css.connectors}
          style={{
            left: bounds.x,
            top: bounds.y,
            width: bounds.width,
            height: bounds.height,
          }}
          viewBox={`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`}
          aria-hidden="true"
        >
          {connectors.map((connector) => (
            <line
              key={connector.id}
              x1={connector.x1}
              y1={connector.y1}
              x2={connector.x2}
              y2={connector.y2}
              {...CONNECTOR_STYLES[connector.variant]}
            />
          ))}
        </svg>

        {LABORATORY_MAP_NODES.map((node) => (
          <button
            key={node.id}
            type="button"
            className={`${css.node} ${
              node.id === selectedNodeId ? css.nodeSelected : ""
            }`}
            style={{ left: node.x, top: node.y }}
            onClick={() => onNodeSelect(node.id)}
          >
            <svg
              className={css.nodeShape}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              viewBox={`0 0 ${NODE_WIDTH} ${NODE_HEIGHT}`}
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M63 -2.75382e-06L84 37.5L63 75L21 75L-1.63918e-06 37.5L21 -9.17939e-07L63 -2.75382e-06Z"
                transform="translate(1.5 1)"
                fill="#101010"
              />
              <path
                className={css.nodeOutline}
                d="M64.4394 0.499997L64.583 0.755857L85.7197 38.5L64.583 76.2441L64.4395 76.5L21.8535 76.5L21.71 76.2441L0.573241 38.5L21.71 0.755858L21.8535 0.499999L64.4394 0.499997Z"
                fill={`url(#${NODE_GRADIENT_ID})`}
                fillOpacity="0.15"
                stroke="white"
              />
            </svg>
            <span className={css.nodeOrder}>{node.order}</span>
            <span className={css.nodeLabel}>{node.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LaboratoryMap;
