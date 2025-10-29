export default {
  multipass: true,
  plugins: [
    { name: 'preset-default' },
    { name: 'removeDimensions' },
    { name: 'removeAttrs', params: { attrs: ['fill', 'stroke'] } },
    {
      name: 'addAttributesToSVGElement',
      params: { attributes: [{ fill: 'none' }, { stroke: 'currentColor' }] },
    },
  ],
};