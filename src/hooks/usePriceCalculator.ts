import { useEffect, useState } from "react";
import {
  calculateEstimate,
  serviceRules,
  type ServiceId,
} from "../lib/data";

export function usePriceCalculator(
  service: ServiceId,
  setService: (service: ServiceId) => void,
) {
  const [quantity, setQuantity] = useState<number | string>(3);
  const [firstOrder, setFirstOrder] = useState(false);
  const rule = serviceRules[service];
  const estimate = calculateEstimate(service, quantity, firstOrder);

  useEffect(() => {
    setQuantity((current) =>
      rule.unit === "pcs" ? 1 : Math.max(rule.min, Number(current) || 3),
    );
  }, [rule.min, rule.unit]);

  return {
    service,
    setService,
    quantity,
    setQuantity,
    firstOrder,
    setFirstOrder,
    ...estimate,
  };
}

export type PriceCalculator = ReturnType<typeof usePriceCalculator>;
