"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { login } from "@/app/actions/auth";

function MaterialSymbolsVisibilityOutlineRounded(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.912T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"
      />
    </svg>
  );
}

function MaterialSymbolsVisibilityOffOutlineRounded(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862m3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.613-4.012T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.512 2.738T19.3 16.45m.5 6.15l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l18.4 18.4q.275.275.275.7t-.275.7t-.7.275t-.7-.275M5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.613 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.187-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2"
      />
    </svg>
  );
}

function MaterialSymbolsLoginRounded(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M13 16.15q-.275-.275-.275-.7t.275-.7l1.85-1.85H6q-.425 0-.712-.288T5 12t.288-.712T6 11h8.85l-1.85-1.85q-.3-.3-.3-.712t.3-.713q.275-.275.7-.275t.7.275l3.55 3.55q.15.15.213.325t.062.375t-.062.375t-.213.325l-3.55 3.55q-.3.3-.712.3t-.713-.3M3 21q-.825 0-1.412-.587T1 19V5q0-.825.588-1.412T3 3h5q.425 0 .713.288T9 4t-.288.713T8 5H3v14h5q.425 0 .713.288T9 20t-.288.713T8 21z"
      />
    </svg>
  );
}

const ERROR_MESSAGES = {
  unauthenticated: "请先登录以访问",
  expired: "登录已过期，请重新登录",
};

function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined);
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const proxyError = searchParams.get("error");
  const proxyMessage = ERROR_MESSAGES[proxyError] || null;

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center page-enter">
      <div className={`w-full max-w-md mx-auto transition-transform ${state?.error ? "animate-shake" : ""}`}>
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            欢迎回来
          </h1>
          <p className="text-gray-400 text-sm">
            请输入密码以继续访问
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8">
          <form action={formAction} className="space-y-5">
            {/* Proxy redirect error banner */}
            {proxyMessage && !state?.error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-4h-2z" />
                </svg>
                {proxyMessage}
              </div>
            )}

            {/* Password Field */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                密码
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入访问密码"
                  className={`w-full px-4 py-3 pr-11 text-sm rounded-xl border ${
                    state?.error
                      ? "border-red-300 bg-red-50/50 focus:ring-red-300/40 focus:border-red-400"
                      : "border-gray-200 bg-gray-50 focus:ring-primary/40 focus:border-primary"
                  } text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white transition-all`}
                  autoFocus
                  autoComplete="current-password"
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-0.5"
                  tabIndex={-1}
                  aria-label={showPassword ? "隐藏密码" : "显示密码"}
                >
                  {showPassword ? (
                    <MaterialSymbolsVisibilityOffOutlineRounded className="text-lg" />
                  ) : (
                    <MaterialSymbolsVisibilityOutlineRounded className="text-lg" />
                  )}
                </button>
              </div>

              {/* Server Action Error */}
              {state?.error && (
                <div className="mt-2">
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.712T12 7t-.712.288T11 8v4q0 .425.288.713T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                    </svg>
                    {state.error}
                  </p>
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              id="login-submit"
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer btn-press"
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  验证中…
                </>
              ) : (
                <>
                  <MaterialSymbolsLoginRounded className="text-xl" />
                  登 录
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-gray-300 mt-6">
          NextTV · 影视无限
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
