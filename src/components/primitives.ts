import { tv } from "tailwind-variants";



export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FFD66B] to-[#FFD66B]",
      blue: "from-[#6EC1E4] to-[#6EC1E4]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
      white: "from-[#FFFFFF] to-[#FFFFFF]",
      black: "from-[#000000] to-[#000000]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "green",
        "pink",
        "foreground",
        "white",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FFD66B] to-[#FFB457]",
      blue: "from-[#6EC1E4] to-[#6EC1E4]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
      white: "from-[#FFFFFF] to-[#FFFFFF]",
      black: "from-[#000000] to-[#000000]",
    }
  },
  defaultVariants: {
    fullWidth: true,
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "green",
        "pink",
        "foreground",
        "white",
        "black",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});
