import type { TemplateId, TemplateData } from '@/lib/types'
import Template1 from './template1'
import Template2 from './template2'

type TemplateComponent = (props: TemplateData) => React.ReactElement

// Adding a new template = add one entry here. Nothing else changes.
const REGISTRY: Record<TemplateId, TemplateComponent> = {
  template_1: Template1,
  template_2: Template2,
}

export function getTemplate(id: TemplateId): TemplateComponent {
  return REGISTRY[id] ?? Template1
}
