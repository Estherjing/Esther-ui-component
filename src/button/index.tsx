import * as React from 'react';
import getPrefix from '../utils/getPrefix';
import classnames  from 'classnames';
import omit from 'rc-util/lib/omit';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { tuple } from '../utils/type';
import { cloneElement } from '../utils/reactNode';


const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
export type ButtonType = typeof ButtonTypes[number];

const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];

interface IButtonProps {
  type: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  disabled: boolean;
  ghost: boolean;
  shape: 'default' | 'circle' | 'round';
  size: SizeType;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  block?: boolean;
  danger?: boolean;
}

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & IButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
  } & IButtonProps &
    Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str: any) {
  return typeof str === 'string';
}
function isUnborderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link';
}

function isReactFragment(node: React.ReactNode) {
  return React.isValidElement(node) && node.type === React.Fragment;
}

function insertSpace(child: React.ReactChild, needInserted: boolean) {
  // Check the child if is undefined or null.
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE),
    });
  }
  if (typeof child === 'string') {
    return isTwoCNChar(child) ? <span>{child.split('').join(SPACE)}</span> : <span>{child}</span>;
  }
  if (isReactFragment(child)) {
    return <span>{child}</span>;
  }
  return child;
}

function spaceChildren(children: React.ReactNode, needInserted: boolean) {
  let isPrevChildPure: boolean = false;
  const childList: React.ReactNode[] = [];
  React.Children.forEach(children, child => {
    const type = typeof child;
    const isCurrentChildPure = type === 'string' || type === 'number';
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1;
      const lastChild = childList[lastIndex];
      childList[lastIndex] = `${lastChild}${child}`;
    } else {
      childList.push(child);
    }

    isPrevChildPure = isCurrentChildPure;
  });

  // Pass to React.Children.map to auto fill key
  return React.Children.map(childList, child =>
    insertSpace(child as React.ReactChild, needInserted),
  );
}

const prefix = getPrefix('button');

const Button = (props: ButtonProps) => {
  const { className, shape, type, size: customizeSize, children, icon, ghost, block, danger, htmlType, ...rest } = props;
  const size = React.useContext(SizeContext);
  const buttonRef =React.createRef<HTMLAnchorElement>() || React.createRef<HTMLElement>();
  
  const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
  const sizeFullname = customizeSize || size;
  const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';
  // const iconType = innerLoading ? 'loading' : icon;

  const isNeedInserted = () =>
  React.Children.count(children) === 1 && !icon && !isUnborderedButtonType(type);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick, disabled } = props;
    // https://github.com/ant-design/ant-design/issues/30207
    if (disabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };
  const classes = classnames(
    prefix,
    {
      [`${prefix}-${shape}`]: shape !== 'default' && shape, // Note: Shape also has `default`
      [`${prefix}-${type}`]: type,
      [`${prefix}-${sizeCls}`]: sizeCls,
      // [`${prefix}-icon-only`]: !children && children !== 0 && !!iconType,
      [`${prefix}-background-ghost`]: ghost && !isUnborderedButtonType(type),
      // [`${prefix}-loading`]: innerLoading,
      // [`${prefix}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
      [`${prefix}-block`]: block,
      [`${prefix}-dangerous`]: !!danger,
      // [`${prefix}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const kids =
  children || children === 0
    ? spaceChildren(children, true)
    : null;

const linkButtonRestProps = omit(rest as AnchorButtonProps & { navigate: any }, ['navigate']);
if (linkButtonRestProps.href !== undefined) {
  return (
    <a {...linkButtonRestProps} className={classes} onClick={handleClick} ref={buttonRef}>
      {kids}
    </a>
  );
}

const buttonNode = (
  <button
    {...(rest as NativeButtonProps)}
    type={htmlType}
    className={classes}
    onClick={handleClick}
  >
    {kids}
  </button>
);

  if (isUnborderedButtonType(type)) {
    return buttonNode;
  }

  return <div>{buttonNode}</div>;

}

export default Button;
