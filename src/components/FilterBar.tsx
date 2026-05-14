import posthog from "posthog-js";
import { useEffect, useState } from "react";

type Props = {
  filter: "all" | "active" | "completed";
  setFilter: (value: "all" | "active" | "completed") => void;
};

export function FilterBar({ filter, setFilter }: Props) {
  const base =
    "px-3 py-1 text-2xl font-bold [-webkit-text-stroke:1px_black] cursor-pointer transition";
  const [showFlag, setShowFlag] = useState(false);

  useEffect(() => {
    const unsubscribe = posthog.onFeatureFlags((flags) => {
      console.log("loaded flags:", flags)

      const value = posthog.isFeatureEnabled("show-urgent-filter")
      console.log("show-urgent-filter:", value)

      setShowFlag(value === true)
    })

    posthog.reloadFeatureFlags()

    return () => {
      unsubscribe?.()
    }
  }, [])

  return (
    <div className="flex px-4 justify-start w-full gap-2">
      <button
        className={`${base} ${filter === "all" ? "text-orange-300" : "text-transparent"
          }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <div className="w-1 border rounded border-orange-900 bg-transparent" />
      <button
        className={`${base} ${filter === "active" ? "text-orange-300" : "text-transparent"
          }`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <div className="w-1 border rounded border-orange-900 bg-transparent" />
      <button
        className={`${base} ${filter === "completed" ? "text-orange-300" : "text-transparent"
          }`}
        onClick={() => setFilter("completed")}
      >
        Done
      </button>
      {showFlag && (<>
        <div className="w-1 border rounded border-orange-900 bg-transparent" />
        <button className={`${base} ${filter === "completed" ? "text-orange-300" : "text-transparent"
          }`}>
          Urgent tasks
        </button>
      </>
      )}
    </div>
  );
}