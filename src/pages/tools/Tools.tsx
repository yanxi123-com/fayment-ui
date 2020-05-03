import { Col, List, Row } from "antd";
import cx from "classnames";
import React, { useState } from "react";

import Grid from "./Grid";
import css from "./Tools.module.scss";

export default function Tools() {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className={css.container}>
      <Row>
        <Col span={4}>
          <List
            className={css.list}
            dataSource={[
              {
                value: "grid",
                text: "网格交易工具",
              },
            ]}
            renderItem={(item, i) => (
              <List.Item
                onClick={() => {
                  setCurrentIndex(i);
                }}
                className={cx(
                  i === currentIndex && css.active,
                  i === currentIndex - 1 && css.preActive
                )}
              >
                <div className={css.level1Title}>{item.text}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={20}>
          <Grid />
        </Col>
      </Row>
    </div>
  );
}
