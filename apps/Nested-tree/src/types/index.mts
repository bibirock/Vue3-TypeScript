export interface RawInputData {
  key: string;
  value: string;
}

export interface TreeStructure {
  name?: string;
  value?: string | null;
  isOpen?: boolean;
  child?: [] | Array<TreeStructure>;
}

export type TreeArray = Array<TreeStructure>;
export type InputType = Array<RawInputData>;
