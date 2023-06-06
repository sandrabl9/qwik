import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

export const useLoginUserActions = routeAction$(
  (data, { cookie, redirect }) => {
    const { email, password } = data;

    if (email === "sandra@email.com" && password === "12345") {
      cookie.set("jwt", "este es mi jwt", { secure: true, path: "/" });
      redirect(302, "/");
      return {
        success: true,
        jwt: "este mi jwt",
      };
    }
    return {
      success: false,
    };
  },
  zod$({
    email: z.string().email("Email no valid"),
    password: z.string().min(5, "Min length five"),
  })
);

export default component$(() => {
  useStylesScoped$(styles);
  const actions = useLoginUserActions();

  return (
    <Form action={actions} class="login-form">
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button>Ingresar</button>
      </div>

      <code>{JSON.stringify(actions.value, undefined, 2)}</code>
    </Form>
  );
});
