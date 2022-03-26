import { ClassNameMap, CssShortener } from 'css-shortener';
import { Rule } from 'postcss';
import selectorParser from 'postcss-selector-parser';

type OutputMapCallback = (map: ClassNameMap) => {};

export default function(
  opts: {
    cssShortener?: CssShortener;
    outputMapCallback?: OutputMapCallback;
    except?: Set<string | RegExp>;
    disable?: boolean;
  } = {}
) {
  return {
    postcssPlugin: 'postcss-class-name-shortener',
    prepare() {
      if ((!opts.outputMapCallback && !opts.cssShortener) || opts.disable)
        return {};

      const exceptSet = opts.except || new Set();
      const cssShortener = opts.cssShortener ?? new CssShortener();

      function shouldSkip(nodeValue: string): boolean {
        if (exceptSet.has(nodeValue)) return true;
        for (const val of Array.from(exceptSet))
          if (val instanceof RegExp && val.test(nodeValue)) return true;
        return false;
      }

      const selectorProcessor = selectorParser(selectors => {
        selectors.walkClasses(
          (node: selectorParser.ClassName | selectorParser.Identifier) => {
            if (shouldSkip(node.value)) return;

            node.value = cssShortener.shortenClassName(node.value);
          }
        );
      });

      return {
        Rule(ruleNode: Rule) {
          selectorProcessor.process(ruleNode);
        },
        OnceExit() {
          if (opts.outputMapCallback) opts.outputMapCallback(cssShortener.map);
        },
      };
    },
  };
}

export const postcss = true;
