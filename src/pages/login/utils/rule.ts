import { reactive } from "vue";

export const formRules = reactive({
  username: {
    type: "string",
    required: true,
	min: 5,

    message: "请输入正确的用户名",
    trigger: ["blur"],
  },
  password: {
    type: "string",
    required: true,
    // len: 4,
	min: 5,
    message: "请填写密码",
    trigger: ["blur"],
  },
});
