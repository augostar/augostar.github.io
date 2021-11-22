interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...

  readonly ABC: string

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}