import defaultMdxComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";

// MDX component map for the docs corpus — every .mdx file picks these up
// without an explicit import.
export function getMDXComponents(
  components?: Record<string, React.ComponentType<unknown>>,
) {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    Step,
    Steps,
    Callout,
    Card,
    Cards,
    ...components,
  };
}
