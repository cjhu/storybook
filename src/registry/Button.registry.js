import Button from '../components/Button'

export default {
  component: Button,
  name: 'Button',
  props: [
    {
      name: 'label',
      type: 'string',
      default: 'Button',
      options: null,
    },
    {
      name: 'variant',
      type: 'select',
      default: 'primary',
      options: ['primary', 'secondary', 'destructive', 'ghost'],
    },
    {
      name: 'size',
      type: 'select',
      default: 'md',
      options: ['sm', 'md', 'lg'],
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: false,
      options: null,
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: false,
      options: null,
    },
  ],
}
