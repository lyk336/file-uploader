interface IUnits {
  bytes: number;
  KB: number;
  MB: number;
  GB: number;
}

export function formatSize(size: number): string {
  const units: IUnits = {
    bytes: size % 1024,
    KB: Math.floor(size / 1024),
    MB: Math.floor(size / 1024 / 1024),
    GB: Math.floor(size / 1024 / 1024 / 1024),
  };

  const formatedSize: Array<string> = [];

  for (const unit in units) {
    const value: number = units[unit as keyof IUnits];

    if (value === 0) continue;

    formatedSize.unshift(`${value} ${unit}`);
  }

  return formatedSize.join(', ');
}
