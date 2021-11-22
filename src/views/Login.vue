<template>
  <div class="title">
    <Title :title="title" />
  </div>
  <div class="box">
    <a-form
      id="form" ref="formRef" :model="form"
      :rules="rules"
    >
      <a-form-item name="name">
        <a-input v-model:value="form.name" type="text" placeholder="账号">
          <template #prefix>
            <Icon icon="cil:search" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="form.password"
          allow-clear
          placeholder="密码"
        >
          <template #prefix>
            <Icon icon="ri:lock-password-line" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item label="">
        <a-button class="but" type="primary" @click="onSumbit">
          登录
        </a-button>
        <a-button class="but" type="primary" @click="resetForm">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>



<script >
import { Icon } from '@iconify/vue';
import Title from '/@/components/basic/Title.vue';
import $axios from '/@/http/model/user';
import { AdminStore } from '/@/store/user';
import { notification } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import storage from '/@/utils/storage';

import { title } from '/@/config/basic';

export default defineComponent({
  components: {
    Icon,Title
  },
  setup() {
    let router = useRouter();
    const store = AdminStore();
    const formRef = ref();
    const form = reactive({
      pass: '',
      checkPass: '',
      age: undefined
    });
    // 提交参数
    let onSumbit = () => {
      formRef.value.
        validate().
        then(() => {
          $axios.login(form).then(function (response) {
            if (!response.token) {
              notification.error({
                message: '',
                description: '账号或者密码错误'
              });
            } else {
              notification.success({ message: ' 登录成功', description: '' });
              let pare = {
                name: response.name,
                nickName: response.nickName,
                id: response.id,
                token: response.token,
                portrait: response.portrait
              };
              store.$patch(pare);
              storage.setSessionStorage('info', pare);
              router.push({
                path: '/'
              });
            }
          });
        }).
        catch(() => {
          notification.success({
            message: '账号密码格式错误',
            description: ''
          });
        });
    };

    let rules = {
      name: [
        {
          required: true,
          message: '账号是必须的',
          trigger: ['change', 'blur']
        },
        {
          min: 5,
          max: 64,
          message: '账号长度 5 到 64 ',
          trigger: ['change', 'blur']
        }
      ],
      password: [
        {
          required: true,
          message: '密码是必须的',
          trigger: ['change', 'blur']
        },
        {
          min: 5,
          max: 64,
          message: '密码长度 5 到 64 ',
          trigger: ['change', 'blur']
        }
      ]
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      title:title ,
      form,
      rules,
      onSumbit,
      formRef,
      resetForm
    };
  }
});
</script>

<style lang="less" spaced>
#form {
  width: 40vmin;
  height: 26vmin;
  margin: auto;
  padding: 20px;
  border-radius: 15px;
  background:#e0e0e0;
  box-shadow: 35px 35px 70px #afafaf, -35px -35px 70px #ffffff;
  z-index: 9;
}
.box {
  // background-image: url(./robot.jpg);
  background-repeat: no-repeat;
  background-position: 200px center;
}

.but {
  width: 100%;
  margin: auto;
  margin-bottom: 15px;
}

.title {
  position: fixed;
  top: 100px;
  left: 50%;
  width: 100%;
  font-size:28px;
  color: #001529;
}
.login {
  position: absolute;
  width: 100vw;
  height: 100vh;
}

.box {
  width: 100vw;
  height: 100vh;
  display: flex;
}

input:-internal-autofill-selected {
  -webkit-text-fill-color: #000 !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

</style>

