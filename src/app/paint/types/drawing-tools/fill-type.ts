export enum FillType {
  EMPTY = 1,
  FILL_SECONDARY = 2,
  FILL_PRIMARY = 3,
}

export const ALL_FILL_TYPES: FillType[] = (
  Object.keys(FillType) as Array<keyof typeof FillType>
)
  .map((t) => FillType[t])
  .filter((t) => typeof t === 'number');
