import { method } from "@/utils/rules";

export const QueryFreightFormRules = {
  packageInfo: {
    rules: [
      {
        required: true,
        message: "请输入包裹信息",
      },
    ]
  }
}