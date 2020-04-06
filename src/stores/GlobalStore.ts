import { createContext } from "react";
import { decorate, observable } from "mobx";
import local from "./local";
import { Metadata } from "grpc-web";

interface User {
  email: string;
  token: string;
}

export interface BaseFieldSchema {
  type:
    | "text"
    | "password"
    | "textarea"
    | "number"
    | "boolean"
    | "datetime"
    | "image"
    | "enum";
  key: string;
  title: string;
  placeholder?: string;
  defaultValue?: string;
  enumValues?: string[];
}

export interface UserDataVersion {
  currentVersion: number; // 当前版本，进入页面时，version 设为 1，每次修改 version + 1
  uploadingVersion?: number; // 正在上传的
  cloudVersion?: number; // 云上数据版本，上传完成后更新
  cloudUpdatedAt?: Date;
}

export interface FormSchema {
  title?: string;
  width?: number;
  labelSpan?: number;
  fields: Array<BaseFieldSchema>;
  onSubmit: (value: { [key: string]: any }) => void | Promise<void>;
  extraNode?: React.ReactNode;
}

export class GlobalStore {
  user: User | undefined;
  popupFormSchema: FormSchema | undefined;
  currentGroupsVersion: UserDataVersion | undefined;

  constructor() {
    this.user = local.get("user");
  }

  setLoginInfo = (email: string, token: string) => {
    this.user = { email, token };
    local.set("user", {
      email,
      token,
    });
  };

  logout = () => {
    local.remove("user");
    this.user = undefined;
  };

  setPopupFormSchema(s: FormSchema | undefined) {
    this.popupFormSchema = s;
  }
}

decorate(GlobalStore, {
  user: observable,
  popupFormSchema: observable,
  currentGroupsVersion: observable,
});

export const globalStore = new GlobalStore();

export const globalContext = createContext<GlobalStore>(globalStore);

export function getAuthMD(): Metadata | undefined {
  if (globalStore.user == null) {
    return undefined;
  }
  return {
    Authorization: `bearer ${globalStore.user.token}`,
  };
}
