import React from "react";
import css from "./Groups.module.scss";

import {
  PlusOutlined,
  EditOutlined,
  UpOutlined,
  DownOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import cx from "classnames";
import { GroupsProps } from "hooks/useGroups";
import { List as AntList, Button } from "antd";

let actionClicked = false;

export default function (props: GroupsProps) {
  const {
    addGroup,
    groups,
    setCurrentGroupIndex,
    currentGroupIndex,
    updateGroup,
    moveGroup,
    deleteGroup,
  } = props;

  if (!groups) {
    return null;
  }

  return (
    <AntList
      className={css.list}
      header={
        <div style={{ margin: 0, padding: 0 }}>
          分组列表
          <Button type="link" onClick={() => addGroup()}>
            <PlusOutlined />
          </Button>
        </div>
      }
      dataSource={groups}
      renderItem={(item, i) => (
        <AntList.Item
          actions={[
            <EditOutlined
              className={css.icon}
              onClick={() => {
                actionClicked = true;
                updateGroup(i);
              }}
            />,
            <UpOutlined
              className={css.icon}
              onClick={() => {
                actionClicked = true;
                moveGroup("up", i);
              }}
            />,
            <DownOutlined
              className={css.icon}
              onClick={() => {
                actionClicked = true;
                moveGroup("down", i);
              }}
            />,
            <DeleteOutlined
              className={css.icon}
              onClick={() => {
                actionClicked = true;
                deleteGroup(i);
              }}
            />,
          ]}
          onClick={() => {
            if (actionClicked) {
              actionClicked = false;
              return;
            }

            setCurrentGroupIndex(i);
          }}
          className={cx(
            i === currentGroupIndex && css.active,
            i === currentGroupIndex - 1 && css.preActive
          )}
        >
          <div className={css.level1Title}>{item.name}</div>
        </AntList.Item>
      )}
    />
  );
}
