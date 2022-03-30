export type CapitalizeOptions = {
  eachWord?: boolean;
  additionalSeparator?: string[];
};

const strings = {
  capitalize: (text: string, options?: CapitalizeOptions): string => {
    const CHAR_SPACE = " ";
    const parsedOptions: CapitalizeOptions = options ?? {
      eachWord: false,
      additionalSeparator: [],
    };

    const capText = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

    if (parsedOptions.eachWord) {
      const separators = [CHAR_SPACE, ...((parsedOptions.additionalSeparator as string[]) || [])];
      let result = text;
      for (const separator of separators) {
        result = result.split(separator).map(capText).join(separator);
      }
      return result;
    }

    return capText(text);
  },
};

export default strings;
