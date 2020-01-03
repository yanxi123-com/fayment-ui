import { Button, Col, Icon, Row, List as AntList, Divider } from "antd";
import cx from "classnames";
import { Loading } from "comps/loading/Loading";
import { confirmPromise, showInfo, showError } from "comps/popup";
import { openPopupForm } from "comps/PopupForm";
import { List } from "immutable";
import React, { useEffect, useState } from "react";
import { BaseFieldSchema } from "stores/GlobalStore";
import localStorage from "stores/local";
import Clipboard from "react-clipboard.js";

import css from "./Category.module.scss";

interface Category {
  title: string;
  accounts: Array<string>;
}

type AccountMap = {
  [account: string]: {
    balance1: number;
    balance2: number;
    balance3: number;
    total: number;
  };
};

export function formatEosAmount(num: number, digits: number = 4): string {
  return num.toFixed(digits).replace(/([.]?0+)$/, "");
}

export default function() {
  const [categories, setCategoriesOri] = useState<Array<Category>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [accountMap, setAccountMap] = useState<AccountMap>({});

  const setCategories = (categories: Array<Category>) => {
    setCategoriesOri(categories);
    localStorage.set("savedAssetsGroups", categories);
  };

  useEffect(() => {
    const categories = localStorage.get("savedAssetsGroups");
    if (categories != null) {
      setCategories(categories);
    } else {
      setCategories([{ title: "我的资产", accounts: [] }]);
    }
  }, []);

  function addCate() {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "title",
        title: "分组名"
      }
    ];
    openPopupForm({
      title: "添加分组",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        setCategories(
          List(categories)
            .push({ title: data.title, accounts: [] })
            .toJS()
        );
      }
    });
  }

  function addAccount() {
    const fields: Array<BaseFieldSchema> = [
      { type: "text", key: "account", title: "EOS 账号" }
    ];
    openPopupForm({
      title: "添加 EOS 账号",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        if (!categories) {
          return;
        }

        setCategories(
          List(categories)
            .updateIn([selectedIndex, "accounts"], list => {
              list.push(data.account);
              return list;
            })
            .toJS()
        );
      }
    });
  }

  function updateGroup(index: number) {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "title",
        title: "分组名",
        defaultValue: categories[index].title
      }
    ];
    openPopupForm({
      title: "修改分组",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        if (!categories) {
          return;
        }
        setCategories(
          List(categories)
            .setIn([index, "title"], data.title)
            .toJS()
        );
      }
    });
  }

  function updateAccount(groupIndex: number, accountIndex: number) {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "account",
        title: "EOS 账号",
        defaultValue: List(categories).getIn([
          groupIndex,
          "accounts",
          accountIndex
        ])
      }
    ];
    openPopupForm({
      title: "修改账户",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        setCategories(
          List(categories)
            .setIn([groupIndex, "accounts", accountIndex], data.account)
            .toJS()
        );
      }
    });
  }
  function deleteCate(index: number, parentIndex?: number) {
    const keyPath = parentIndex == null ? [] : [parentIndex, "accounts"];
    const name =
      parentIndex == null
        ? `分组 [${categories[index].title}] `
        : `账号 [${categories[parentIndex].accounts[index]}] `;
    confirmPromise("请确认", `确实要删除${name}吗？`).then(confirm => {
      if (confirm) {
        setCategories(
          List(categories)
            .deleteIn([...keyPath, index])
            .toJS() as any
        );
      }
    });
  }

  function switchObject(
    obj: any,
    keyPath1: Array<any>,
    keyPath2: Array<any>
  ): any {
    let a = List(obj);
    if (a.getIn(keyPath1) && a.getIn(keyPath2)) {
      a = a
        .setIn(keyPath2, a.getIn(keyPath1))
        .setIn(keyPath1, a.getIn(keyPath2));
    }
    return a.toJS();
  }

  function moveCate(
    direction: "up" | "down",
    index: number,
    parentIndex?: number
  ) {
    const otherIndex = direction === "up" ? index - 1 : index + 1;
    if (otherIndex < 0) {
      return;
    }
    if (parentIndex == null && otherIndex >= categories.length) {
      return;
    }
    if (
      parentIndex != null &&
      otherIndex >= categories[parentIndex].accounts.length
    ) {
      return;
    }
    console.log(index, otherIndex);
    const keyPath = parentIndex == null ? [] : [parentIndex, "accounts"];
    setCategories(
      switchObject(categories, [...keyPath, index], [...keyPath, otherIndex])
    );
  }

  if (categories == null) {
    return <Loading />;
  }

  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;
  let sumTotal = 0;
  if (categories[selectedIndex] != null) {
    categories[selectedIndex].accounts.forEach(account => {
      sum1 += accountMap[account] ? accountMap[account].balance1 : 0;
      sum2 += accountMap[account] ? accountMap[account].balance2 : 0;
      sum3 += accountMap[account] ? accountMap[account].balance3 : 0;
    });
    sumTotal += sum1 + sum2 + sum3;
  }

  return (
    <div className={css.container}>
      <Row>
        <Col span={7}>
          <AntList
            style={{ marginRight: 38 }}
            header={
              <div style={{ margin: 0, padding: 0 }}>
                分组列表
                <Button type="link" onClick={() => addCate()}>
                  <Icon type="plus" />
                </Button>
              </div>
            }
            bordered
            dataSource={categories}
            renderItem={(item, i) => (
              <AntList.Item
                actions={[
                  <Icon type="edit" onClick={() => updateGroup(i)} />,
                  <Icon type="up" onClick={() => moveCate("up", i)} />,
                  <Icon type="down" onClick={() => moveCate("down", i)} />,
                  <Icon type="delete" onClick={() => deleteCate(i)} />
                ]}
              >
                <Button
                  type="link"
                  className={cx(
                    css.level1Title,
                    i === selectedIndex && css.active
                  )}
                  onClick={() => setSelectedIndex(i)}
                >
                  {item.title}
                </Button>
              </AntList.Item>
            )}
          />
        </Col>
        <Col span={17}>
          {categories[selectedIndex] != null && (
            <div className="ant-table ant-table-default ant-table-scroll-position-left">
              <div className="ant-table-content">
                <div className="ant-table-body">
                  <table className="table">
                    <thead className="ant-table-thead">
                      <tr className="ant-table-row ant-table-row-level-0">
                        <th>序号</th>
                        <th>
                          账号
                          <Button type="link" onClick={() => addAccount()}>
                            <Icon type="plus" />
                          </Button>
                        </th>
                        <th>可用余额</th>
                        <th>质押</th>
                        <th>赎回中</th>
                        <th>总额度</th>
                        <th style={{ textAlign: "right" }}>操作</th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {categories[selectedIndex].accounts.map((account, i) => {
                        const info = accountMap[account] || {
                          balance1: 0,
                          balance2: 0,
                          balance3: 0,
                          total: 0
                        };
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <a
                                target="_blank"
                                href={`https://bloks.io/account/${account}`}
                              >
                                {account}
                              </a>
                            </td>
                            <td>{formatEosAmount(info.balance1)}</td>
                            <td>{formatEosAmount(info.balance2)}</td>
                            <td>{formatEosAmount(info.balance3)}</td>
                            <td className="text-right">
                              {formatEosAmount(info.total)}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <Icon
                                type="edit"
                                onClick={() => updateAccount(selectedIndex, i)}
                              />
                              <Divider type="vertical" />

                              <Icon
                                type="up"
                                onClick={() => moveCate("up", i, selectedIndex)}
                              />
                              <Divider type="vertical" />

                              <Icon
                                type="down"
                                onClick={() =>
                                  moveCate("down", i, selectedIndex)
                                }
                              />
                              <Divider type="vertical" />

                              <Icon
                                type="delete"
                                onClick={() => deleteCate(i, selectedIndex)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <thead className="ant-table-thead">
                      <tr className="ant-table-row ant-table-row-level-0">
                        <th>汇总</th>
                        <th>
                          <Clipboard
                            data-clipboard-text={categories[
                              selectedIndex
                            ].accounts.join(",")}
                            component="span"
                            style={{ color: "#007bff", cursor: "pointer" }}
                            onSuccess={() => {
                              showInfo("账号信息复制成功");
                            }}
                            onError={() => {
                              showError("复制失败");
                            }}
                          >
                            导出
                          </Clipboard>
                        </th>
                        <th>{formatEosAmount(sum1)}</th>
                        <th>{formatEosAmount(sum2)}</th>
                        <th>{formatEosAmount(sum3)}</th>
                        <th className="text-right">
                          {formatEosAmount(sumTotal)}
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
