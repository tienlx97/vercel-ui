function PreviewShell({ children }) {
  return (
    <div className="border-gray-alpha-400 bg-background-100 group relative rounded-lg border">
      {children}
    </div>
  )
}

export const Preview = ({ children, name, componentRegistry }) => {
  if (!name) {
    return <PreviewShell>{children}</PreviewShell>
  }

  const entry = componentRegistry[name]

  if (!entry) {
    throw new Error(
      `No component with name ${name} found in registry, run "pnpm --filter vercel-site build-geist" to update the registry.`
    )
  }

  const RegistryComponent = entry.component

  if (!RegistryComponent) return null

  return (
    <div className="mt-4 xl:mt-7">
      <PreviewShell>
        <div className="flex w-full overflow-x-auto md:overflow-visible">
          <div className="w-full p-6">
            <RegistryComponent />
          </div>
        </div>
        {/* <CodeDrawer>{children}</CodeDrawer> */}
      </PreviewShell>
    </div>
  )
}
