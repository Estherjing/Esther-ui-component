export default function getPrefix(suffixCls?: string, customizePrefixCls?: string) {
    if (customizePrefixCls) return customizePrefixCls;
  
    return suffixCls ? `Esther-${suffixCls}` : 'Esther-ui';
  }
  