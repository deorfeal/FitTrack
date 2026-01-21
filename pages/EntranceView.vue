<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// import { useLoaderStore } from "@/stores/loader";
// const loaderStore = useLoaderStore();

// import { useAlertStore } from "@/stores/alert";
// const alertStore = useAlertStore();

const isLogin = ref<boolean>(true);
const passwordIsShow = ref<boolean>(false);
const router = useRouter();

interface formItem {
  value: string;
  error: boolean;
}

const form = ref<Record<string, formItem>>({
  email: { value: "", error: false },
  password: { value: "", error: false },
  passwordRepeat: { value: "", error: false },
});

const title = computed(() => {
  return isLogin.value ? "Log In" : "Registration";
});

const btnText = computed(() => {
  return isLogin.value ? "Registration" : "Log In";
});

const passwordType = computed(() => {
  return passwordIsShow.value ? "text" : "password";
});

function toggleAuth(): void {
  isLogin.value = !isLogin.value;
}

function togglePasswordShow(): void {
  passwordIsShow.value = !passwordIsShow.value;
}

function validateForm(): boolean {
  let isValid = true;

  // Проверка email
  if (!form.value.email.value.includes("@")) {
    form.value.email.error = true;
    // alertStore.showAlert("Invalid email", "alert--error");
    isValid = false;
  } else {
    form.value.email.error = false;
  }

  // Проверка пароля
  if (form.value.password.value.length < 6) {
    form.value.password.error = true;
    // alertStore.showAlert(
    //   "Password must be at least 6 characters",
    //   "alert--error"
    // );
    isValid = false;
  } else {
    form.value.password.error = false;
  }

  // Проверка совпадения паролей
  if (
    !isLogin.value &&
    form.value.password.value !== form.value.passwordRepeat.value
  ) {
    form.value.passwordRepeat.error = true;
    // alertStore.showAlert("Passwords do not match", "alert--error");
    isValid = false;
  } else {
    form.value.passwordRepeat.error = false;
  }

  return isValid;
}

const singUp = async (): Promise<void> => {
  // loaderStore.showLoader();
  try {
    await createUserWithEmailAndPassword(
      getAuth(),
      form.value.email.value,
      form.value.password.value
    );
    // router.push("/menu");
  } catch (error: unknown) {
    if (error instanceof Error) {
      // alertStore.showAlert(`${error.message}`, "alert--error");
    }
  } finally {
    // loaderStore.hideLoader();
  }
};

const singIn = async (): Promise<void> => {
  // loaderStore.showLoader();
  try {
    await signInWithEmailAndPassword(
      getAuth(),
      form.value.email.value,
      form.value.password.value
    );
    // router.push("/menu");
  } catch (error: unknown) {
    if (error instanceof Error) {
      // alertStore.showAlert(`${error.message}`, "alert--error");
    }
  } finally {
    // loaderStore.hideLoader();
  }
};

const submitForm = (): void => {
  if (!validateForm()) return;

  if (isLogin.value) {
    singIn();
  } else {
    singUp();
  }
};
</script>

<template>
  <div class="entrance">
    <div class="container">
      <div class="entrance__inner">
        <h1 class="entrance__title">
          {{ title }}
        </h1>
        <form class="entrance__form form" action="#" method="post">
          <div class="form__box form-box">
            <input
              class="form-box__input filling filling--input"
              :class="{ 'filling--error': form.email.error }"
              type="email"
              placeholder="Email"
              v-model="form.email.value"
            />
          </div>
          <div class="form__box form-box">
            <input
              class="form-box__input filling filling--input"
              :class="{ 'filling--error': form.password.error }"
              :type="passwordType"
              placeholder="Password"
              v-model="form.password.value"
            />
            <div class="form-box__show" @click="togglePasswordShow">
              <TransitionGroup name="opacity">
                <svg
                  v-if="!passwordIsShow"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.99328 10.2678C8.29095 10.2678 8.5857 10.2092 8.86071 10.0953C9.13573 9.98135 9.38561 9.81439 9.59609 9.6039C9.80657 9.39342 9.97354 9.14354 10.0875 8.86853C10.2014 8.59352 10.26 8.29876 10.26 8.00109C10.26 7.70342 10.2014 7.40867 10.0875 7.13366C9.97354 6.85865 9.80657 6.60877 9.59609 6.39828C9.38561 6.1878 9.13573 6.02083 8.86071 5.90692C8.5857 5.79301 8.29095 5.73437 7.99328 5.73438C7.39211 5.73438 6.81556 5.97319 6.39047 6.39828C5.96538 6.82337 5.72656 7.39992 5.72656 8.00109C5.72656 8.60226 5.96538 9.17881 6.39047 9.6039C6.81556 10.029 7.39211 10.2678 7.99328 10.2678ZM7.99328 8.96866C7.73667 8.96866 7.49056 8.86672 7.30911 8.68526C7.12765 8.50381 7.02571 8.25771 7.02571 8.00109C7.02571 7.74448 7.12765 7.49837 7.30911 7.31692C7.49056 7.13547 7.73667 7.03353 7.99328 7.03353C8.24989 7.03353 8.496 7.13547 8.67745 7.31692C8.8589 7.49837 8.96084 7.74448 8.96084 8.00109C8.96084 8.25771 8.8589 8.50381 8.67745 8.68526C8.496 8.86672 8.24989 8.96866 7.99328 8.96866Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 3.46484C4.88488 3.46484 2.76518 5.15452 1.64672 6.36624C1.23129 6.80812 1 7.39178 1 7.99828C1 8.60477 1.23129 9.18844 1.64672 9.63031C2.76453 10.842 4.88359 12.5317 8 12.5317C11.1158 12.5317 13.2348 10.842 14.3533 9.63031C14.7687 9.18844 15 8.60477 15 7.99828C15 7.39178 14.7687 6.80812 14.3533 6.36624C13.2355 5.15452 11.1164 3.46484 8 3.46484ZM2.59874 7.24508C3.58897 6.17195 5.38809 4.76011 8 4.76011C10.6119 4.76011 12.4117 6.17195 13.4019 7.24508C13.5963 7.44767 13.7048 7.71754 13.7048 7.99828C13.7048 8.27901 13.5963 8.54888 13.4019 8.75148C12.411 9.8246 10.6119 11.2364 8.00065 11.2364C5.38809 11.2364 3.58832 9.8246 2.59809 8.75148C2.40375 8.54888 2.29523 8.27901 2.29523 7.99828C2.29523 7.71754 2.40375 7.44767 2.59809 7.24508H2.59874Z"
                    fill="white"
                  />
                </svg>
                <svg
                  v-if="passwordIsShow"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.14038 5.05078C2.59879 5.4391 2.09827 5.8817 1.64659 6.37169C1.23124 6.81348 1 7.39703 1 8.0034C1 8.60977 1.23124 9.19332 1.64659 9.63511C2.76547 10.8466 4.88475 12.5359 7.99924 12.5359C8.83841 12.5359 9.60505 12.4129 10.2992 12.2109L9.22303 11.1341C8.81904 11.2056 8.40952 11.2414 7.99924 11.2409C5.38786 11.2409 3.58845 9.82936 2.59842 8.75645C2.40411 8.55389 2.29562 8.28408 2.29562 8.0034C2.29562 7.72272 2.40411 7.4529 2.59842 7.25035C3.03825 6.77179 3.53215 6.34591 4.07019 5.98124L3.14038 5.05208V5.05078Z"
                    fill="white"
                  />
                  <path
                    d="M5.75193 7.66704C5.69899 8.0179 5.72918 8.37629 5.84006 8.71335C5.95095 9.05042 6.13943 9.35673 6.39034 9.60764C6.64124 9.85854 6.94756 10.047 7.28462 10.1579C7.62168 10.2688 7.98007 10.299 8.33093 10.246L5.75193 7.66704ZM10.2411 8.29447L7.7035 5.7569C8.04727 5.71256 8.39663 5.74766 8.7247 5.85951C9.05278 5.97135 9.35082 6.15696 9.59592 6.40205C9.84101 6.64715 10.0266 6.9452 10.1385 7.27327C10.2503 7.60135 10.2854 7.9507 10.2411 8.29447Z"
                    fill="white"
                  />
                  <path
                    d="M11.961 10.0062C12.4882 9.64582 12.9726 9.22655 13.4049 8.75652C13.5992 8.55397 13.7077 8.28415 13.7077 8.00347C13.7077 7.72279 13.5992 7.45297 13.4049 7.25042C12.4136 6.17751 10.6142 4.76595 8.00347 4.76595C7.58907 4.76595 7.19409 4.80156 6.82048 4.86567L5.74044 3.78563C6.47633 3.5753 7.23811 3.46937 8.00347 3.47094C11.1186 3.47094 13.2372 5.16028 14.3555 6.37176C14.7708 6.81355 15.0021 7.3971 15.0021 8.00347C15.0021 8.60984 14.7708 9.19339 14.3555 9.63518C13.9799 10.0425 13.4917 10.5028 12.8902 10.9354L11.961 10.0062ZM1.53361 2.44918C1.47177 2.38945 1.42244 2.318 1.38851 2.23901C1.35457 2.16001 1.33671 2.07504 1.33596 1.98907C1.33521 1.90309 1.3516 1.81783 1.38415 1.73825C1.41671 1.65868 1.46479 1.58638 1.52559 1.52559C1.58638 1.46479 1.65868 1.41671 1.73825 1.38415C1.81783 1.3516 1.90309 1.33521 1.98907 1.33596C2.07504 1.33671 2.16001 1.35457 2.23901 1.38851C2.318 1.42244 2.38945 1.47177 2.44918 1.53361L14.4785 13.5629C14.5965 13.6851 14.6617 13.8486 14.6602 14.0184C14.6588 14.1882 14.5907 14.3506 14.4706 14.4706C14.3506 14.5907 14.1882 14.6588 14.0184 14.6602C13.8486 14.6617 13.6851 14.5965 13.5629 14.4785L1.53361 2.44918Z"
                    fill="white"
                  />
                </svg>
              </TransitionGroup>
            </div>
          </div>
          <div v-if="!isLogin" class="form__box form-box">
            <input
              class="form-box__input filling filling--input"
              :class="{ 'filling--error': form.passwordRepeat.error }"
              :type="passwordType"
              placeholder="Repeat password"
              v-model="form.passwordRepeat.value"
            />
            <div class="form-box__show" @click="togglePasswordShow">
              <TransitionGroup name="opacity">
                <svg
                  v-if="!passwordIsShow"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.99328 10.2678C8.29095 10.2678 8.5857 10.2092 8.86071 10.0953C9.13573 9.98135 9.38561 9.81439 9.59609 9.6039C9.80657 9.39342 9.97354 9.14354 10.0875 8.86853C10.2014 8.59352 10.26 8.29876 10.26 8.00109C10.26 7.70342 10.2014 7.40867 10.0875 7.13366C9.97354 6.85865 9.80657 6.60877 9.59609 6.39828C9.38561 6.1878 9.13573 6.02083 8.86071 5.90692C8.5857 5.79301 8.29095 5.73437 7.99328 5.73438C7.39211 5.73438 6.81556 5.97319 6.39047 6.39828C5.96538 6.82337 5.72656 7.39992 5.72656 8.00109C5.72656 8.60226 5.96538 9.17881 6.39047 9.6039C6.81556 10.029 7.39211 10.2678 7.99328 10.2678ZM7.99328 8.96866C7.73667 8.96866 7.49056 8.86672 7.30911 8.68526C7.12765 8.50381 7.02571 8.25771 7.02571 8.00109C7.02571 7.74448 7.12765 7.49837 7.30911 7.31692C7.49056 7.13547 7.73667 7.03353 7.99328 7.03353C8.24989 7.03353 8.496 7.13547 8.67745 7.31692C8.8589 7.49837 8.96084 7.74448 8.96084 8.00109C8.96084 8.25771 8.8589 8.50381 8.67745 8.68526C8.496 8.86672 8.24989 8.96866 7.99328 8.96866Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 3.46484C4.88488 3.46484 2.76518 5.15452 1.64672 6.36624C1.23129 6.80812 1 7.39178 1 7.99828C1 8.60477 1.23129 9.18844 1.64672 9.63031C2.76453 10.842 4.88359 12.5317 8 12.5317C11.1158 12.5317 13.2348 10.842 14.3533 9.63031C14.7687 9.18844 15 8.60477 15 7.99828C15 7.39178 14.7687 6.80812 14.3533 6.36624C13.2355 5.15452 11.1164 3.46484 8 3.46484ZM2.59874 7.24508C3.58897 6.17195 5.38809 4.76011 8 4.76011C10.6119 4.76011 12.4117 6.17195 13.4019 7.24508C13.5963 7.44767 13.7048 7.71754 13.7048 7.99828C13.7048 8.27901 13.5963 8.54888 13.4019 8.75148C12.411 9.8246 10.6119 11.2364 8.00065 11.2364C5.38809 11.2364 3.58832 9.8246 2.59809 8.75148C2.40375 8.54888 2.29523 8.27901 2.29523 7.99828C2.29523 7.71754 2.40375 7.44767 2.59809 7.24508H2.59874Z"
                    fill="white"
                  />
                </svg>
                <svg
                  v-if="passwordIsShow"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.14038 5.05078C2.59879 5.4391 2.09827 5.8817 1.64659 6.37169C1.23124 6.81348 1 7.39703 1 8.0034C1 8.60977 1.23124 9.19332 1.64659 9.63511C2.76547 10.8466 4.88475 12.5359 7.99924 12.5359C8.83841 12.5359 9.60505 12.4129 10.2992 12.2109L9.22303 11.1341C8.81904 11.2056 8.40952 11.2414 7.99924 11.2409C5.38786 11.2409 3.58845 9.82936 2.59842 8.75645C2.40411 8.55389 2.29562 8.28408 2.29562 8.0034C2.29562 7.72272 2.40411 7.4529 2.59842 7.25035C3.03825 6.77179 3.53215 6.34591 4.07019 5.98124L3.14038 5.05208V5.05078Z"
                    fill="white"
                  />
                  <path
                    d="M5.75193 7.66704C5.69899 8.0179 5.72918 8.37629 5.84006 8.71335C5.95095 9.05042 6.13943 9.35673 6.39034 9.60764C6.64124 9.85854 6.94756 10.047 7.28462 10.1579C7.62168 10.2688 7.98007 10.299 8.33093 10.246L5.75193 7.66704ZM10.2411 8.29447L7.7035 5.7569C8.04727 5.71256 8.39663 5.74766 8.7247 5.85951C9.05278 5.97135 9.35082 6.15696 9.59592 6.40205C9.84101 6.64715 10.0266 6.9452 10.1385 7.27327C10.2503 7.60135 10.2854 7.9507 10.2411 8.29447Z"
                    fill="white"
                  />
                  <path
                    d="M11.961 10.0062C12.4882 9.64582 12.9726 9.22655 13.4049 8.75652C13.5992 8.55397 13.7077 8.28415 13.7077 8.00347C13.7077 7.72279 13.5992 7.45297 13.4049 7.25042C12.4136 6.17751 10.6142 4.76595 8.00347 4.76595C7.58907 4.76595 7.19409 4.80156 6.82048 4.86567L5.74044 3.78563C6.47633 3.5753 7.23811 3.46937 8.00347 3.47094C11.1186 3.47094 13.2372 5.16028 14.3555 6.37176C14.7708 6.81355 15.0021 7.3971 15.0021 8.00347C15.0021 8.60984 14.7708 9.19339 14.3555 9.63518C13.9799 10.0425 13.4917 10.5028 12.8902 10.9354L11.961 10.0062ZM1.53361 2.44918C1.47177 2.38945 1.42244 2.318 1.38851 2.23901C1.35457 2.16001 1.33671 2.07504 1.33596 1.98907C1.33521 1.90309 1.3516 1.81783 1.38415 1.73825C1.41671 1.65868 1.46479 1.58638 1.52559 1.52559C1.58638 1.46479 1.65868 1.41671 1.73825 1.38415C1.81783 1.3516 1.90309 1.33521 1.98907 1.33596C2.07504 1.33671 2.16001 1.35457 2.23901 1.38851C2.318 1.42244 2.38945 1.47177 2.44918 1.53361L14.4785 13.5629C14.5965 13.6851 14.6617 13.8486 14.6602 14.0184C14.6588 14.1882 14.5907 14.3506 14.4706 14.4706C14.3506 14.5907 14.1882 14.6588 14.0184 14.6602C13.8486 14.6617 13.6851 14.5965 13.5629 14.4785L1.53361 2.44918Z"
                    fill="white"
                  />
                </svg>
              </TransitionGroup>
            </div>
          </div>
          <div class="form__buttons buttons">
            <div class="buttons__btn btn btn--transparent" @click="toggleAuth">
              {{ btnText }}
            </div>
            <button
              class="buttons__btn btn btn--white"
              type="button"
              @click.prevent="submitForm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<!-- 
<style lang="scss">
// .entrance {
//   &__inner {
//     min-height: 100svh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }

//   &__title {
//     margin-bottom: 15px;
//     font-size: 24px;
//     line-height: 26px;
//     font-weight: 700;
//   }
// }
</style> -->
