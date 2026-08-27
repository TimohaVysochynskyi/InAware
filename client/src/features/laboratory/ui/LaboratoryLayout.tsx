import { useState } from "react";
import LaboratoryTopBar from "./LaboratoryTopBar";
import LaboratoryInfoSection from "./LaboratoryInfoSection";
import LaboratorySidebar from "./LaboratorySidebar";
import LaboratoryMap from "./LaboratoryMap";
import { LABORATORY_MAP_NODES } from "../model/laboratory-map.mock";

import css from "./LaboratoryLayout.module.css";

const LaboratoryLayout = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode =
    LABORATORY_MAP_NODES.find((node) => node.id === selectedNodeId) ?? null;

  return (
    <>
      <section className={css.page}>
        <div className={css.map}>
          <LaboratoryMap
            selectedNodeId={selectedNodeId}
            onNodeSelect={setSelectedNodeId}
          />
        </div>
        <div className={css.head}>
          <LaboratoryTopBar />
          <LaboratoryInfoSection />
        </div>
        {selectedNode && (
          <aside className={css.sidebar}>
            <LaboratorySidebar
              node={selectedNode}
              onClose={() => setSelectedNodeId(null)}
            />
          </aside>
        )}
      </section>
    </>
  );
};

export default LaboratoryLayout;
