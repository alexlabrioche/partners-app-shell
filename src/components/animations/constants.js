export const base = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

export const slideRightVariant = {
  initial: { ...base.initial, x: "100%" },
  in: { ...base.in, x: 0 },
  out: { ...base.out, x: "100%" },
};

export const slideTopVariant = {
  initial: { ...base.initial, y: "-100%" },
  in: { ...base.in, y: 0 },
  out: { ...base.out, y: "-100%" },
};

export const slideBottomVariant = {
  initial: { ...base.initial, y: "100%" },
  in: { ...base.in, y: 500 },
  out: { ...base.out, y: "100%" },
};

export const slideLeftVariant = {
  initial: { ...base.initial, x: "-100%" },
  in: { ...base.in, x: 0 },
  out: { ...base.out, x: "-100%" },
};

export const modalVariant = {
  initial: { ...base.initial, scale: 0, rotate: "15deg", y: 100 },
  in: { ...base.in, scale: 1, rotate: 0, y: 0 },
  out: { ...base.out, scale: 0.6, rotate: "-5deg", y: -100 },
};
