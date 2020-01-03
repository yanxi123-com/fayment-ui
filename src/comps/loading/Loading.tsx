import React from "react";
import { Spin } from "antd";

export function Loading() {
  return (
    <div style={{ padding: 100, textAlign: "center" }}>
      <Spin size="large" />
    </div>
  );
}
