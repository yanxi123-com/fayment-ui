import React, { useEffect, useState, useCallback } from "react";
import { formatDateFriendly } from "lib/format";

interface Props {
  date: number | string | Date | undefined;
}

export default function(props: Props) {
  const { date } = props;
  const [str, setStr] = useState<string>();

  const setDate = useCallback(() => {
    if (date == null) {
      setStr(undefined);
    } else {
      setStr(formatDateFriendly(date));
    }
  }, [date]);

  useEffect(() => {
    setDate();
    const interval = setInterval(() => {
      setDate();
    }, 1000 * 30);

    return () => {
      clearInterval(interval);
    };
  }, [setDate]);

  return <>{str || null}</>;
}
