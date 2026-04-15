export function H1(props: React.ComponentProps<"h1">) {
  return (
    <h1 {...props} className="text-4xl font-extrabold tracking-tight text-center scroll-m-20">
     {props.children}
    </h1>
  )
}
export function H2(props: React.ComponentProps<"h2">) {
  return (
    <h2 {...props} className="pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
{props.children}
    </h2>
  )
}
export function H3(props: React.ComponentProps<"h3">) {
  return (
    <h3 {...props} className="text-2xl font-semibold tracking-tight scroll-m-20">
      {props.children}    </h3>
  )
}
export function H4(props: React.ComponentProps<"h4">) {
  return (
    <h4 {...props} className="text-xl font-semibold tracking-tight scroll-m-20">
      {props.children}    </h4>
  )
}

export function P(props: React.ComponentProps<"p">) {
  return (
    <p {...props} className="leading-7 [&:not(:first-child)]:mt-6">
      {props.children}
    </p>
  )}

export function TypographyMuted(props: React.ComponentProps<"p">) {
  return (
    <p {...props} className="text-sm text-muted-foreground">{props.children}</p>
  )
}
