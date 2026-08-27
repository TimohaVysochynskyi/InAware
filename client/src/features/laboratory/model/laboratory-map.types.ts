export type MapNodeStatus = "passed" | "available" | "locked";

export type MapNode = {
    id: string;
    order: number;
    label: string;
    title: string;
    level: number;
    category: string;
    status: MapNodeStatus;
    x: number;
    y: number;
};

export type MapConnectionVariant = "solid" | "dashed" | "faded";

export type MapConnection = {
    from: string;
    to: string;
    variant: MapConnectionVariant;
};

export type MapViewport = {
    x: number;
    y: number;
    scale: number;
};
